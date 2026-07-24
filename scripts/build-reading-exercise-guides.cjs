const fs = require("fs");
const path = require("path");

const [part6Path, part7Path] = process.argv.slice(2);
if (!part6Path || !part7Path) {
  throw new Error("Usage: node scripts/build-reading-exercise-guides.cjs <part6-json> <part7-json>");
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const choicesFromObject = (options = {}) => ["A", "B", "C", "D"].map((letter) => options[letter]);
const p6Source = readJson(part6Path);
const p7Source = readJson(part7Path);

const part6 = {
  part: "6",
  title: "TOEIC Part 6 Exercise 1-10 全題詳解",
  totalExercises: p6Source.exercises.length,
  totalDocuments: p6Source.exercises.reduce((sum, exercise) => sum + exercise.documents.length, 0),
  totalQuestions: p6Source.exercises.reduce(
    (sum, exercise) => sum + exercise.documents.reduce((docSum, document) => docSum + document.questions.length, 0),
    0
  ),
  sourceName: "ESL Lounge Student",
  sourceIndex: "https://www.esl-lounge.com/student/toeic-reading-part-six.php",
  notice: "題組與詳解由使用者提供的整理檔匯入；本站保留來源標示與原始練習連結。",
  exercises: p6Source.exercises.map((exercise, exerciseIndex) => ({
    exercise: exercise.exercise,
    code: `TOEIC${String(55 + exerciseIndex).padStart(3, "0")}`,
    sourceUrl: `https://www.esl-lounge.com/student/toeic/toeic-${String(55 + exerciseIndex).padStart(3, "0")}-reading-part-six-${exercise.exercise}.php`,
    documents: exercise.documents.map((document, documentIndex) => ({
      document: documentIndex + 1,
      title: document.title,
      text: document.blank_text.join("\n\n"),
      completedText: document.completed_text.join("\n\n"),
      questions: document.questions.map((question) => ({
        number: question.number,
        prompt: `Choose the best answer for blank (${question.number}).`,
        choices: choicesFromObject(question.options),
        correctOption: question.correct_option,
        answer: question.answer,
        completedSentence: question.completed_sentence_or_inserted_sentence,
        translation: question.translation_zh_tw,
        testPoint: question.test_point,
        explanation: question.explanation_zh_tw,
        distractorAnalysis: question.distractor_analysis_zh_tw
      }))
    }))
  }))
};

const part7 = {
  part: "7",
  title: "TOEIC Part 7 Exercise 1-8 全題詳解",
  totalExercises: p7Source.exercises.length,
  totalDocuments: p7Source.exercises.reduce((sum, exercise) => sum + exercise.blocks.length, 0),
  totalQuestions: p7Source.exercises.reduce(
    (sum, exercise) => sum + exercise.blocks.reduce((blockSum, block) => blockSum + block.questions.length, 0),
    0
  ),
  sourceName: "ESL Lounge Student",
  sourceIndex: "https://www.esl-lounge.com/student/toeic-reading-part-seven.php",
  notice: "題組與詳解由使用者提供的整理檔匯入；本站保留來源標示與原始練習連結。",
  exercises: p7Source.exercises.map((exercise, exerciseIndex) => ({
    exercise: exercise.exercise,
    code: `TOEIC${String(65 + exerciseIndex).padStart(3, "0")}`,
    sourceUrl: `https://www.esl-lounge.com/student/toeic/toeic-${String(65 + exerciseIndex).padStart(3, "0")}-reading-part-seven-${exercise.exercise}.php`,
    documents: exercise.blocks.map((block, blockIndex) => ({
      document: blockIndex + 1,
      title: block.title,
      sourceType: block.source_type,
      text: block.text,
      summary: block.summary_zh,
      questions: block.questions.map((question) => ({
        number: question.number,
        prompt: question.question,
        promptZh: question.question_zh,
        choices: choicesFromObject(question.options),
        correctOption: question.correct_option,
        answer: question.answer,
        evidenceNote: question.evidence,
        explanation: question.explanation_zh,
        distractorAnalysis: question.distractor_analysis_zh,
        testPoint: question.skill,
        note: question.note || ""
      }))
    }))
  }))
};

const output = { "6": part6, "7": part7 };
const targetPath = path.resolve(__dirname, "..", "modules", "reading-exercise-guides.js");
fs.writeFileSync(
  targetPath,
  `window.TOEIC_READING_EXERCISE_GUIDES = ${JSON.stringify(output, null, 2)};\n`,
  "utf8"
);
console.log(`Wrote Part 6 ${part6.totalQuestions} questions and Part 7 ${part7.totalQuestions} questions to ${targetPath}`);
