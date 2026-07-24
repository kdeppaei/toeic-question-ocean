(function () {
  "use strict";

  const CONFIG = Object.freeze({
    projectId: "toeic-ocean-sync-20260725-tw",
    databaseId: "(default)",
    collection: "syncRecords",
    schema: 1,
    maxEncryptedCharacters: 780000
  });
  const CODE_PATTERN = /^TQ1-([A-Z2-9]{20})-([A-Za-z0-9_-]{43})$/;
  const RECORD_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  function bytesToBase64Url(bytes) {
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function base64UrlToBytes(value) {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64 + "=".repeat((4 - base64.length % 4) % 4));
    return Uint8Array.from(binary, character => character.charCodeAt(0));
  }

  function randomRecordId() {
    const bytes = crypto.getRandomValues(new Uint8Array(20));
    return [...bytes].map(value => RECORD_ALPHABET[value % RECORD_ALPHABET.length]).join("");
  }

  async function compress(bytes) {
    if (!("CompressionStream" in window)) return { bytes, format: "none" };
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"));
    return { bytes: new Uint8Array(await new Response(stream).arrayBuffer()), format: "gzip" };
  }

  async function decompress(bytes, format) {
    if (format === "none") return bytes;
    if (format !== "gzip" || !("DecompressionStream" in window)) {
      throw new Error("此瀏覽器無法解開這份壓縮備份，請更新瀏覽器後再試。");
    }
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  async function encryptPayload(payload, recordId) {
    if (!crypto?.subtle) throw new Error("目前瀏覽器不支援安全加密，請改用最新版瀏覽器。");
    const keyBytes = crypto.getRandomValues(new Uint8Array(32));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(payload));
    const compressed = await compress(encoded);
    const key = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["encrypt"]);
    const ciphertext = new Uint8Array(await crypto.subtle.encrypt({
      name: "AES-GCM",
      iv,
      additionalData: new TextEncoder().encode(recordId)
    }, key, compressed.bytes));
    return {
      key: bytesToBase64Url(keyBytes),
      iv: bytesToBase64Url(iv),
      payload: bytesToBase64Url(ciphertext),
      compression: compressed.format,
      originalBytes: encoded.byteLength
    };
  }

  async function decryptPayload(record, recordId, keyText) {
    try {
      const key = await crypto.subtle.importKey("raw", base64UrlToBytes(keyText), "AES-GCM", false, ["decrypt"]);
      const plaintext = await crypto.subtle.decrypt({
        name: "AES-GCM",
        iv: base64UrlToBytes(record.iv),
        additionalData: new TextEncoder().encode(recordId)
      }, key, base64UrlToBytes(record.payload));
      const bytes = await decompress(new Uint8Array(plaintext), record.compression);
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (error) {
      if (/瀏覽器無法解開/.test(String(error?.message))) throw error;
      throw new Error("同步代碼不正確，或雲端資料已損毀。");
    }
  }

  function firestoreBaseUrl() {
    return `https://firestore.googleapis.com/v1/projects/${CONFIG.projectId}/databases/${CONFIG.databaseId}/documents`;
  }

  function toFirestoreDocument(record) {
    return {
      fields: {
        schema: { integerValue: String(record.schema) },
        cipher: { stringValue: record.cipher },
        compression: { stringValue: record.compression },
        iv: { stringValue: record.iv },
        payload: { stringValue: record.payload },
        createdAt: { timestampValue: record.createdAt },
        originalBytes: { integerValue: String(record.originalBytes) }
      }
    };
  }

  function fromFirestoreDocument(document) {
    const fields = document?.fields || {};
    return {
      schema: Number(fields.schema?.integerValue || 0),
      cipher: fields.cipher?.stringValue || "",
      compression: fields.compression?.stringValue || "none",
      iv: fields.iv?.stringValue || "",
      payload: fields.payload?.stringValue || "",
      createdAt: fields.createdAt?.timestampValue || document?.createTime || "",
      originalBytes: Number(fields.originalBytes?.integerValue || 0)
    };
  }

  const defaultTransport = {
    async create(recordId, record) {
      const response = await fetch(`${firestoreBaseUrl()}/${CONFIG.collection}?documentId=${recordId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toFirestoreDocument(record))
      });
      if (!response.ok) {
        const details = await response.json().catch(() => ({}));
        throw new Error(details?.error?.message || `雲端暫時無法保存（${response.status}）。`);
      }
      return fromFirestoreDocument(await response.json());
    },
    async read(recordId) {
      const response = await fetch(`${firestoreBaseUrl()}/${CONFIG.collection}/${recordId}`);
      if (response.status === 404) throw new Error("找不到這組同步代碼，請確認是否完整貼上。");
      if (!response.ok) {
        const details = await response.json().catch(() => ({}));
        throw new Error(details?.error?.message || `雲端暫時無法讀取（${response.status}）。`);
      }
      return fromFirestoreDocument(await response.json());
    }
  };
  let transport = defaultTransport;

  function parseCode(code) {
    const normalized = String(code || "").trim().replace(/\s+/g, "");
    const match = normalized.match(CODE_PATTERN);
    if (!match) throw new Error("代碼格式不正確；請貼上完整的 TQ1 同步代碼。");
    return { code: normalized, recordId: match[1], key: match[2] };
  }

  async function createBackup(payload) {
    const recordId = randomRecordId();
    const encrypted = await encryptPayload(payload, recordId);
    if (encrypted.payload.length > CONFIG.maxEncryptedCharacters) {
      throw new Error("學習紀錄已超過單份雲端備份上限，請先匯出本機 JSON 保存。");
    }
    const createdAt = new Date().toISOString();
    const record = {
      schema: CONFIG.schema,
      cipher: "AES-256-GCM",
      compression: encrypted.compression,
      iv: encrypted.iv,
      payload: encrypted.payload,
      createdAt,
      originalBytes: encrypted.originalBytes
    };
    await transport.create(recordId, record);
    return {
      code: `TQ1-${recordId}-${encrypted.key}`,
      createdAt,
      originalBytes: encrypted.originalBytes
    };
  }

  async function readBackup(code) {
    const parsed = parseCode(code);
    const record = await transport.read(parsed.recordId);
    if (record.schema !== CONFIG.schema || record.cipher !== "AES-256-GCM") {
      throw new Error("這份雲端紀錄版本目前無法讀取。");
    }
    return {
      payload: await decryptPayload(record, parsed.recordId, parsed.key),
      createdAt: record.createdAt,
      originalBytes: record.originalBytes
    };
  }

  window.TOEIC_CLOUD_SYNC = Object.freeze({
    config: CONFIG,
    createBackup,
    readBackup,
    parseCode,
    test: Object.freeze({
      setTransport(nextTransport) { transport = nextTransport || defaultTransport; },
      resetTransport() { transport = defaultTransport; }
    })
  });
}());
