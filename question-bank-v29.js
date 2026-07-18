(() => {
  const sourceNote = "Original literacy-heavy TOEIC-style simulation item for v2.9 reading-core expansion.";
  const pushSet = ({ groupId, part, category, passage, tags, items }) => {
    window.BUILTIN_BANK.push(...items.map((item, index) => ({
      id: `${groupId}-Q${index + 1}`,
      part,
      difficulty: item.difficulty || "800",
      category,
      prompt: item.prompt,
      choices: item.choices,
      answer: item.answer,
      explanation: item.explanation,
      translation: item.translation || "請依據文章內容選出最佳答案。",
      passage,
      audioText: "",
      tags: [...tags, ...(item.tags || [])],
      groupId,
      sourceNote
    })));
  };

  [
    {
      groupId: "P6-G20",
      category: "政策公告",
      passage: `Staff Notice

Beginning March 4, all employees who reserve shared workstations must confirm their bookings by 8:30 A.M. on the day of use. Workstations that are not confirmed by that time will be released to employees on the waiting list. This policy was introduced after several departments reported that desks remained unused even though they had been reserved. Employees who often travel to client sites may still reserve desks up to two weeks in advance, but they should cancel unnecessary bookings as early as possible.`,
      items: [
        { prompt: "What is the notice mainly about?", choices: ["A revised workstation reservation rule", "A new client travel reimbursement form", "A change in office cleaning hours", "A plan to close several departments"], answer: 0, explanation: "整篇公告都在說共享工位預約必須在當天早上確認，否則釋出給候補者。", difficulty: "600" },
        { prompt: "According to the notice, what happens if a booking is not confirmed by 8:30 A.M.?", choices: ["It is released to someone on a waiting list", "It is charged to the employee's department", "It is automatically extended for two weeks", "It is moved to a client site"], answer: 0, explanation: "第二句指出未於 8:30 前確認的工位會 released to employees on the waiting list。", difficulty: "600" },
        { prompt: "Why was the policy introduced?", choices: ["Reserved desks were sometimes left unused", "Employees requested larger computer monitors", "Several client visits were canceled", "The company reduced its travel budget"], answer: 0, explanation: "文章說此政策是因為有部門回報 desks remained unused even though they had been reserved。" },
        { prompt: "What are employees who travel often asked to do?", choices: ["Cancel bookings they do not need", "Reserve desks only on the day of use", "Use the waiting list every morning", "Submit travel receipts before booking"], answer: 0, explanation: "最後一句說經常拜訪客戶的員工可提前預約，但應及早取消不必要的預約。" }
      ],
      tags: ["part6", "notice", "policy", "condition"]
    },
    {
      groupId: "P6-G21",
      category: "客戶信件",
      passage: `Dear Mr. Novak,

Thank you for asking about the delay in your equipment order. Our shipping team has confirmed that the barcode scanner and charging stand left our warehouse on Tuesday. However, the protective cases were held for an additional quality check because a supplier reported a packaging issue. Rather than sending a partial shipment, we will combine all three items and upgrade the delivery service at no extra cost. You will receive a new tracking number as soon as the cases pass inspection.`,
      items: [
        { prompt: "Why is the company writing to Mr. Novak?", choices: ["To explain why an order has been delayed", "To reject a request for a refund", "To advertise a new barcode scanner", "To schedule an installation appointment"], answer: 0, explanation: "開頭直接說 Thank you for asking about the delay in your equipment order，後文解釋延遲原因。", difficulty: "600" },
        { prompt: "Which item required an additional quality check?", choices: ["Protective cases", "Charging stands", "Barcode scanners", "Warehouse shelves"], answer: 0, explanation: "文章說 protective cases were held for an additional quality check。", difficulty: "600" },
        { prompt: "What has the company decided NOT to do?", choices: ["Send only part of the order first", "Upgrade the delivery service", "Provide a new tracking number", "Wait for the cases to pass inspection"], answer: 0, explanation: "Rather than sending a partial shipment 表示公司決定不先寄部分商品。" },
        { prompt: "What will Mr. Novak receive later?", choices: ["A new tracking number", "A refund receipt", "A supplier's address", "A replacement scanner manual"], answer: 0, explanation: "最後一句說他會在 protective cases 通過檢查後收到 new tracking number。" }
      ],
      tags: ["part6", "email", "order", "logic"]
    },
    {
      groupId: "P6-G22",
      category: "活動邀請",
      passage: `Invitation

The City Business Alliance invites local store owners to attend a breakfast forum on April 9. The forum will focus on how small businesses can use customer data responsibly while improving online services. A privacy consultant will explain new consent requirements, and two retailers will describe how they redesigned loyalty programs after receiving customer feedback. Attendance is free, but seating is limited to one representative per business. Participants will receive a worksheet for reviewing their own data-collection practices.`,
      items: [
        { prompt: "Who is the forum intended for?", choices: ["Local store owners", "Privacy consultants only", "City government inspectors", "Online service customers"], answer: 0, explanation: "第一句說 invites local store owners to attend。", difficulty: "600" },
        { prompt: "What topic will be discussed at the forum?", choices: ["Responsible use of customer data", "Restaurant kitchen design", "Airport transportation", "Hiring seasonal employees"], answer: 0, explanation: "第二句指出主題是 use customer data responsibly while improving online services。", difficulty: "600" },
        { prompt: "What did the two retailers do?", choices: ["Redesigned loyalty programs", "Opened new breakfast cafes", "Collected inspection fees", "Canceled customer accounts"], answer: 0, explanation: "文章說 two retailers will describe how they redesigned loyalty programs。" },
        { prompt: "What limitation is mentioned?", choices: ["Only one representative may attend per business", "The event is open only to alliance members", "Participants must bring printed receipts", "Registration costs increase after April 9"], answer: 0, explanation: "Attendance is free, but seating is limited to one representative per business。" }
      ],
      tags: ["part6", "invitation", "privacy", "main-idea"]
    },
    {
      groupId: "P6-G23",
      category: "流程更新",
      passage: `Process Update

The accounting department has changed the way project expenses are reviewed. Previously, supervisors approved receipts first and then sent them to accounting. Under the new procedure, employees upload receipts directly to the expense portal, where the system checks whether each receipt includes a project code, date, and vendor name. Supervisors will review only requests that pass this first check. The change should reduce the number of incomplete requests returned at the end of each month.`,
      items: [
        { prompt: "What has changed?", choices: ["The order in which expense requests are reviewed", "The location of the accounting office", "The amount employees may spend on travel", "The deadline for monthly payroll deposits"], answer: 0, explanation: "文章比較 previously 與 under the new procedure，重點是審核順序改變。", difficulty: "600" },
        { prompt: "What does the system check for?", choices: ["A project code, date, and vendor name", "A supervisor's travel schedule", "A customer's phone number", "A department's seating chart"], answer: 0, explanation: "第三句列出系統檢查 project code, date, and vendor name。", difficulty: "600" },
        { prompt: "Which requests will supervisors review?", choices: ["Requests that pass the first system check", "Requests with missing vendor names", "Requests submitted by accounting staff", "Requests returned at the end of the month"], answer: 0, explanation: "Supervisors will review only requests that pass this first check。" },
        { prompt: "What is the expected benefit of the change?", choices: ["Fewer incomplete requests will be returned", "Employees will stop using project codes", "Vendors will approve receipts faster", "Accounting will no longer review expenses"], answer: 0, explanation: "最後一句說此改變應減少月底被退回的不完整申請。" }
      ],
      tags: ["part6", "process", "sequence", "expense"]
    },
    {
      groupId: "P6-G24",
      category: "產品通知",
      passage: `Product Notice

Customers who purchased the LX-40 smart thermostat before January 15 may request a free software update. The update improves the device's ability to adjust room temperature when windows are opened for short periods. It does not change the thermostat's display or mobile-app layout. To receive the update, customers must enter the serial number from the back of the device on our support page. Installations usually begin within twenty-four hours after the request is submitted.`,
      items: [
        { prompt: "Who is eligible for the free update?", choices: ["Customers who bought the thermostat before January 15", "Customers who replaced windows this year", "Anyone who downloads the mobile app", "Only customers with a damaged display"], answer: 0, explanation: "第一句說 before January 15 購買 LX-40 的顧客可申請免費更新。", difficulty: "600" },
        { prompt: "What does the update improve?", choices: ["Temperature adjustment when windows are opened briefly", "The design of the mobile-app layout", "The color of the thermostat display", "The device's warranty period"], answer: 0, explanation: "第二句指出更新改善窗戶短暫打開時調整室溫的能力。" },
        { prompt: "What is NOT changed by the update?", choices: ["The mobile-app layout", "The temperature adjustment function", "The support page", "The installation start time"], answer: 0, explanation: "文章說 It does not change the thermostat's display or mobile-app layout。" },
        { prompt: "What must customers provide?", choices: ["The device's serial number", "A photograph of a window", "A printed sales brochure", "A technician's password"], answer: 0, explanation: "To receive the update, customers must enter the serial number。", difficulty: "600" }
      ],
      tags: ["part6", "product-notice", "condition", "technology"]
    },
    {
      groupId: "P6-G25",
      category: "研究摘要",
      passage: `Research Summary

The operations team reviewed three months of warehouse data to understand why evening orders were more likely to ship late. The team found that most delays occurred after 7 P.M., when fewer staff members were assigned to packaging. Adding two scanners did not significantly reduce delays because workers still had to wait for shipping labels. The team recommends moving one label printer closer to the packing area and testing the change for two weeks before hiring additional staff.`,
      items: [
        { prompt: "What issue did the team study?", choices: ["Late shipments for evening orders", "Employee attendance at safety training", "Customer complaints about product color", "Monthly rent for warehouse space"], answer: 0, explanation: "第一句說研究 evening orders were more likely to ship late 的原因。", difficulty: "600" },
        { prompt: "When did most delays occur?", choices: ["After 7 P.M.", "Before the warehouse opened", "During lunch breaks", "At the beginning of each month"], answer: 0, explanation: "第二句指出 most delays occurred after 7 P.M.。", difficulty: "600" },
        { prompt: "Why did adding scanners not solve the problem?", choices: ["Workers still waited for shipping labels", "The scanners were too expensive", "Customers used the wrong order form", "The packaging area was closed"], answer: 0, explanation: "文章說 adding two scanners did not reduce delays because workers still had to wait for shipping labels。" },
        { prompt: "What does the team recommend doing first?", choices: ["Testing a printer relocation", "Hiring a full evening crew", "Changing the warehouse address", "Canceling evening orders"], answer: 0, explanation: "最後一句建議先把一台標籤印表機移近包裝區並測試兩週，再決定是否增聘。" }
      ],
      tags: ["part6", "report", "cause-effect", "operations"]
    },
    {
      groupId: "P6-G26",
      category: "課程公告",
      passage: `Course Announcement

Participants in next month's public-speaking course should complete the online questionnaire by June 3. The instructor will use the responses to divide participants into groups with similar goals. Those who want extra practice with visual aids should bring a short slide deck to the first session. The course office will provide laptops and projectors, but participants must bring their own adapters if their computers require them. A final practice presentation will be recorded for private review only.`,
      items: [
        { prompt: "Why should participants complete the questionnaire?", choices: ["To help the instructor form groups", "To request a refund for the course", "To reserve projectors for the office", "To choose the date of the final session"], answer: 0, explanation: "第二句說 instructor will use the responses to divide participants into groups。", difficulty: "600" },
        { prompt: "Who should bring a short slide deck?", choices: ["Participants wanting extra practice with visual aids", "Everyone using office laptops", "Only instructors recording presentations", "People who missed the first session"], answer: 0, explanation: "Those who want extra practice with visual aids should bring a short slide deck。", difficulty: "600" },
        { prompt: "What will the course office provide?", choices: ["Laptops and projectors", "Computer adapters", "Printed certificates", "Private coaching reports"], answer: 0, explanation: "文章說 office will provide laptops and projectors。" },
        { prompt: "What is implied about the final practice recording?", choices: ["It will not be shared publicly", "It will replace the first session", "It must be submitted by June 3", "It will be shown to all departments"], answer: 0, explanation: "for private review only 表示錄影只供私人檢討，不公開分享。" }
      ],
      tags: ["part6", "course", "inference", "instruction"]
    },
    {
      groupId: "P6-G27",
      category: "專案更新",
      passage: `Project Update

The mobile ticketing project remains on schedule, but the design team has changed one feature after reviewing accessibility feedback. The original plan required users to swipe left to display a QR code. Test users with limited hand movement found this difficult, so the final version will include a clearly labeled button instead. This change will not affect the launch date because the engineering team had already built a similar button for the refund screen. A final usability test is planned for next Thursday.`,
      items: [
        { prompt: "What changed in the project?", choices: ["A swipe action was replaced with a button", "The launch date was canceled", "A refund screen was removed", "The QR code feature was dropped"], answer: 0, explanation: "文章說原本要 swipe left，因無障礙回饋改成 clearly labeled button。", difficulty: "600" },
        { prompt: "Why was the change made?", choices: ["Some test users had difficulty with the swipe action", "The QR code could not be scanned", "The engineering team missed the deadline", "Customers requested paper tickets"], answer: 0, explanation: "Test users with limited hand movement found this difficult 是改設計的原因。" },
        { prompt: "Why will the launch date remain unchanged?", choices: ["A similar button had already been built", "The accessibility feedback was ignored", "The refund screen was delayed", "The test users completed the project"], answer: 0, explanation: "因工程團隊 already built a similar button for the refund screen，所以不影響上市日期。" },
        { prompt: "What is scheduled for next Thursday?", choices: ["A final usability test", "A public product launch", "A refund policy meeting", "A printed ticket inspection"], answer: 0, explanation: "最後一句說 A final usability test is planned for next Thursday。", difficulty: "600" }
      ],
      tags: ["part6", "project-update", "accessibility", "inference"]
    }
  ].forEach(set => pushSet({ ...set, part: "6" }));

  [
    {
      groupId: "P7-R54",
      category: "單篇閱讀",
      passage: `Article: A Quieter Way to Measure Store Traffic

Several small retailers in Harborside Market have begun using ceiling-mounted sensors to estimate how many customers enter each hour. Unlike cameras, the sensors do not record faces or store video. They count movement patterns and send only hourly totals to a shared dashboard. Store owners say the data helps them decide when to schedule employees and when to prepare extra checkout stations.

The market association introduced the system after merchants complained that weekend staffing decisions were based mostly on guesses. However, the association also required each participating store to post a notice explaining what information is collected. A privacy review will be conducted after the first three months.`,
      items: [
        { prompt: "What is the article mainly about?", choices: ["A privacy-conscious way to track customer traffic", "A plan to replace store employees with cameras", "A new market building opening on weekends", "A customer reward program for small retailers"], answer: 0, explanation: "文章重點是用不錄影、不記臉的感測器統計客流，並兼顧隱私。", difficulty: "600" },
        { prompt: "What information is sent to the dashboard?", choices: ["Hourly customer totals", "Video files of shoppers", "Employee schedules", "Customer names and addresses"], answer: 0, explanation: "第一段說 sensors send only hourly totals to a shared dashboard。" },
        { prompt: "Why did the market association introduce the system?", choices: ["Merchants wanted better information for staffing decisions", "Customers asked for more security cameras", "The city required stores to reduce checkout stations", "The association planned to close weekend markets"], answer: 0, explanation: "第二段說商家抱怨 weekend staffing decisions were based mostly on guesses。", difficulty: "600" },
        { prompt: "What must participating stores do?", choices: ["Post a notice about collected information", "Store customer videos for three months", "Hire a privacy consultant every weekend", "Stop using shared dashboards"], answer: 0, explanation: "協會要求 each participating store to post a notice explaining what information is collected。" }
      ],
      tags: ["part7", "single-passage", "article", "privacy", "core-reading"]
    },
    {
      groupId: "P7-R55",
      category: "單篇閱讀",
      passage: `E-mail

To: Product Testing Team
From: Helena Morris, Research Manager
Subject: Trial Report Revision

Thank you for submitting the first draft of the trial report. The overall results are useful, but the report needs two revisions before I can send it to the client. First, the section about battery performance should distinguish between indoor and outdoor tests. The current version combines both results, which makes the device appear less reliable than it was during indoor use. Second, please move the customer interview summary to the appendix. The client requested technical findings in the main report and supporting comments at the end.

Please send the revised version by 3 P.M. Friday.`,
      items: [
        { prompt: "Why did Helena write the e-mail?", choices: ["To request changes to a report", "To cancel a customer interview", "To approve the final client version", "To schedule additional outdoor tests"], answer: 0, explanation: "信件明確列出 two revisions before sending report to client。", difficulty: "600" },
        { prompt: "What problem does Helena mention about the battery section?", choices: ["It combines indoor and outdoor results", "It uses only customer interview comments", "It is missing the client's name", "It was placed in the appendix"], answer: 0, explanation: "文中說 current version combines both results，導致可靠性呈現不準確。" },
        { prompt: "Where should the customer interview summary be placed?", choices: ["In the appendix", "In the first paragraph", "In a separate e-mail", "In the battery performance table"], answer: 0, explanation: "Second, please move the customer interview summary to the appendix。", difficulty: "600" },
        { prompt: "What can be inferred about the client?", choices: ["The client prefers technical findings before supporting comments", "The client has rejected all battery tests", "The client will rewrite the appendix", "The client requested a shorter deadline"], answer: 0, explanation: "信中說 client requested technical findings in the main report and supporting comments at the end。" }
      ],
      tags: ["part7", "single-passage", "email", "revision", "core-reading"]
    },
    {
      groupId: "P7-R56",
      category: "單篇閱讀",
      passage: `Website Notice: Community Tool Library

The Eastview Community Center now allows residents to borrow small home-repair tools for up to seven days. Items include drills, measuring kits, paint rollers, and basic gardening tools. Residents must present proof of address and complete a short safety agreement before borrowing any item.

Tools may be renewed once if no one else has requested them. Late returns will result in a temporary borrowing suspension rather than a fee. The center chose this policy because staff members wanted the service to remain affordable while still encouraging timely returns. Donations of clean, working tools are accepted on the first Saturday of each month.`,
      items: [
        { prompt: "What service is described?", choices: ["A tool-borrowing program for residents", "A paid home-repair class", "A gardening supply store", "A monthly property inspection"], answer: 0, explanation: "Notice 說 residents can borrow small home-repair tools for up to seven days。", difficulty: "600" },
        { prompt: "What must residents do before borrowing tools?", choices: ["Show proof of address and sign a safety agreement", "Pay a late-return fee in advance", "Donate a working tool", "Take a seven-day gardening course"], answer: 0, explanation: "第一段最後一句列出 proof of address 和 safety agreement。" },
        { prompt: "When may tools be renewed?", choices: ["When no other resident has requested them", "Whenever a borrower pays an additional fee", "Only on the first Saturday of each month", "After a temporary suspension ends"], answer: 0, explanation: "第二段說 Tools may be renewed once if no one else has requested them。" },
        { prompt: "Why did the center choose suspensions instead of late fees?", choices: ["To keep the service affordable", "To increase tool donations", "To limit borrowing to gardeners", "To replace the safety agreement"], answer: 0, explanation: "文章說選擇此政策是因為希望 service to remain affordable 同時鼓勵準時歸還。" }
      ],
      tags: ["part7", "single-passage", "notice", "policy", "core-reading"]
    },
    {
      groupId: "P7-R57",
      category: "單篇閱讀",
      passage: `Memo

To: Regional Sales Staff
From: Marco Ruiz, Sales Director
Subject: Customer Visit Notes

Starting next quarter, sales representatives should enter customer visit notes into the client portal within two business days of each visit. The notes should include the customer's current goal, any concern discussed, and the next action promised by our team. Please do not include personal details that are unrelated to the customer's business needs.

The change is intended to help service teams respond more consistently when a representative is unavailable. It will also allow managers to identify common concerns across regions. Representatives who already keep private notes may continue to do so, but the portal entry will be considered the official record.`,
      items: [
        { prompt: "What are sales representatives asked to do?", choices: ["Enter visit notes into a portal promptly", "Stop visiting customers next quarter", "Send private notes to regional managers", "Record personal details about clients"], answer: 0, explanation: "第一段說 should enter customer visit notes into the client portal within two business days。", difficulty: "600" },
        { prompt: "Which information should be included in the notes?", choices: ["The next action promised by the team", "A customer's personal family details", "A representative's travel receipts", "The manager's quarterly bonus"], answer: 0, explanation: "notes should include current goal, concern, and next action promised。" },
        { prompt: "Why is the change being made?", choices: ["To help service teams respond consistently", "To replace all regional sales visits", "To reduce the number of client portals", "To make private notes the official record"], answer: 0, explanation: "第二段說 change is intended to help service teams respond more consistently。" },
        { prompt: "What is suggested about private notes?", choices: ["They may continue, but they are not the official record", "They must be uploaded before every visit", "They will be reviewed by all customers", "They are required only for unavailable representatives"], answer: 0, explanation: "最後一句說 private notes 可繼續，但 portal entry will be considered official record。" }
      ],
      tags: ["part7", "single-passage", "memo", "portal", "core-reading"]
    },
    {
      groupId: "P7-R58",
      category: "單篇閱讀",
      passage: `Announcement

The Weston Public Library will extend its weekday hours during the final two weeks of May to support students preparing for certification exams. From May 18 to May 29, the study rooms on the second floor will remain open until 10 P.M. Reservations are required for groups of three or more, but individual students may use any open seat without reserving.

To keep the extended hours quiet and useful, food deliveries will not be allowed after 8 P.M., and phone calls must be taken in the lobby. Library staff will provide extra charging cables at the information desk, but laptops are not available for loan during the evening schedule.`,
      items: [
        { prompt: "Why is the library extending its hours?", choices: ["To help students preparing for certification exams", "To host evening food deliveries", "To renovate the second floor", "To loan laptops to local workers"], answer: 0, explanation: "第一句說 extended hours 是為 support students preparing for certification exams。", difficulty: "600" },
        { prompt: "Who must make reservations?", choices: ["Groups of three or more", "All individual students", "Anyone using a charging cable", "Visitors taking phone calls"], answer: 0, explanation: "Reservations are required for groups of three or more。" },
        { prompt: "What is prohibited after 8 P.M.?", choices: ["Food deliveries", "Using open seats", "Borrowing charging cables", "Studying for exams"], answer: 0, explanation: "第二段說 food deliveries will not be allowed after 8 P.M.。" },
        { prompt: "What can students borrow from the information desk?", choices: ["Charging cables", "Laptops", "Certification textbooks", "Room keys"], answer: 0, explanation: "Library staff will provide extra charging cables at the information desk。" }
      ],
      tags: ["part7", "single-passage", "announcement", "rules", "core-reading"]
    },
    {
      groupId: "P7-R59",
      category: "雙篇閱讀",
      passage: `Notice

The GreenLine Bike-Share Program will replace the payment kiosks at Central Station on Monday. During the replacement, riders may unlock bicycles only through the GreenLine mobile app. The work is expected to finish by 4 P.M.

Customer Message

To: GreenLine Support
From: Dana Kim
Subject: Monday Rental

I plan to rent two bicycles at Central Station at 10 A.M. Monday for visitors from our overseas office. One visitor does not have a smartphone. If the kiosks will be unavailable, can I reserve two bicycles in advance or pick them up from another nearby station? We need to reach the museum before our 11 A.M. tour.`,
      items: [
        { prompt: "What will happen at Central Station on Monday?", choices: ["Payment kiosks will be replaced", "All bicycles will be removed permanently", "The mobile app will stop working", "A museum tour will be canceled"], answer: 0, explanation: "Notice 第一行說 replace the payment kiosks at Central Station on Monday。", difficulty: "600" },
        { prompt: "Why is Dana concerned?", choices: ["One visitor cannot use the required mobile app", "The museum is closed on Monday", "The bicycles are too far from the station", "The overseas office has canceled its visit"], answer: 0, explanation: "Dana 說 one visitor does not have a smartphone，而公告說只能用 app 解鎖。" },
        { prompt: "When does Dana plan to rent the bicycles?", choices: ["At 10 A.M. Monday", "At 4 P.M. Monday", "Before the station opens", "After an 11 A.M. tour"], answer: 0, explanation: "Customer Message 說 plan to rent two bicycles at 10 A.M. Monday。", difficulty: "600" },
        { prompt: "What solution does Dana suggest?", choices: ["Using another nearby station", "Replacing the kiosks herself", "Changing the museum tour to Tuesday", "Buying two smartphones"], answer: 0, explanation: "Dana 問是否可 reserve 或 pick them up from another nearby station。" }
      ],
      tags: ["part7", "double-passage", "notice-email", "cross-reference"]
    },
    {
      groupId: "P7-R60",
      category: "雙篇閱讀",
      passage: `Job Posting

Northgate Medical Supply seeks a Customer Training Specialist to teach clinic staff how to use our inventory software. The position requires experience explaining technical processes to nontechnical audiences. Travel to client locations is expected twice a month. Applicants should submit a resume and a sample training outline by September 8.

E-mail

To: Hiring Committee
From: Amira Lewis
Subject: Training Specialist Application

I am attaching my resume and a sample outline from a workshop I designed for pharmacy assistants last year. In my current role, I create short videos that explain ordering procedures to clinic receptionists. I can travel regularly, but I would prefer to avoid overnight trips until November because I am completing a local certification program.`,
      items: [
        { prompt: "What is the job mainly responsible for?", choices: ["Teaching clinic staff to use inventory software", "Delivering medical supplies twice a month", "Hiring pharmacy assistants", "Creating certification exams"], answer: 0, explanation: "Job Posting 第一段說 teach clinic staff how to use inventory software。", difficulty: "600" },
        { prompt: "What must applicants provide?", choices: ["A resume and a sample training outline", "Two clinic references only", "A certification program receipt", "A medical supply catalog"], answer: 0, explanation: "Posting 最後一句要求 resume 和 sample training outline。", difficulty: "600" },
        { prompt: "Why might Amira have a scheduling limitation?", choices: ["She is completing a local certification program", "She cannot explain ordering procedures", "She has never designed a workshop", "She refuses to travel to clients"], answer: 0, explanation: "Amira 說 until November 因為 completing a local certification program。" },
        { prompt: "Which requirement does Amira clearly meet?", choices: ["Experience explaining processes to clinic staff", "Availability for overnight travel immediately", "Experience repairing medical equipment", "Ability to hire a committee"], answer: 0, explanation: "她提到目前工作為 clinic receptionists 製作說明 ordering procedures 的短片，符合向非技術對象說明流程。" }
      ],
      tags: ["part7", "double-passage", "job", "inference"]
    },
    {
      groupId: "P7-R61",
      category: "雙篇閱讀",
      passage: `Warranty Card

The AeroBrew Coffee Maker includes a one-year warranty covering electrical defects and pump failure. Damage caused by improper cleaning, commercial use, or unauthorized repairs is not covered. Customers requesting service must provide proof of purchase and the product serial number.

Online Chat

Customer: My AeroBrew stopped pumping water after eight months. I used it only at home, and I still have the receipt. However, I cleaned the tank with a vinegar solution last week. Does that affect the warranty?
Agent: Vinegar cleaning is allowed if the instructions in the manual were followed. Please send a photo of the serial number, and we can begin the service request.`,
      items: [
        { prompt: "What problem does the customer report?", choices: ["The coffee maker stopped pumping water", "The receipt was lost", "The product was used commercially", "The manual was missing"], answer: 0, explanation: "Chat 中 customer 說 stopped pumping water after eight months。", difficulty: "600" },
        { prompt: "Which damage is NOT covered by the warranty?", choices: ["Damage from unauthorized repairs", "Pump failure from normal home use", "Electrical defects", "Problems reported with proof of purchase"], answer: 0, explanation: "Warranty Card 說 unauthorized repairs caused damage is not covered。" },
        { prompt: "Why does the agent say the customer may continue the request?", choices: ["Vinegar cleaning is allowed if instructions were followed", "The warranty lasts eight months only", "Commercial use is always covered", "Serial numbers are optional"], answer: 0, explanation: "Agent 回覆 vinegar cleaning allowed if manual instructions followed。", difficulty: "800" },
        { prompt: "What information must the customer send next?", choices: ["A photo of the serial number", "A list of commercial users", "A repair invoice from another shop", "A new cleaning solution receipt"], answer: 0, explanation: "Agent 要求 send a photo of the serial number。" }
      ],
      tags: ["part7", "double-passage", "warranty", "condition"]
    },
    {
      groupId: "P7-R62",
      category: "雙篇閱讀",
      passage: `Conference Agenda

9:00-9:30 Registration and Coffee
9:30-10:15 Keynote: Designing Services for Older Customers
10:30-11:15 Breakout A: Accessible Payment Tools
10:30-11:15 Breakout B: Training Staff to Give Clear Instructions
11:30-12:15 Panel Discussion: Measuring Customer Trust

Text Message

Rina: I can only attend one breakout session. Our bank already has accessible payment software, but our branch staff still struggle to explain digital services clearly. Which session should I attend?
Owen: Breakout B seems more useful. It focuses on staff communication, and the keynote should cover the broader design issues anyway.`,
      items: [
        { prompt: "What is the conference keynote about?", choices: ["Designing services for older customers", "Training staff to give instructions", "Measuring customer trust", "Accessible payment tools"], answer: 0, explanation: "Agenda 9:30-10:15 Keynote 標題為 Designing Services for Older Customers。", difficulty: "600" },
        { prompt: "Why does Owen recommend Breakout B?", choices: ["It matches Rina's staff communication problem", "It is the only session before registration", "It covers accessible payment software", "It replaces the keynote"], answer: 0, explanation: "Rina 的痛點是 staff struggle to explain digital services clearly；Breakout B 是 training staff to give clear instructions。" },
        { prompt: "Which session is Rina less likely to need?", choices: ["Accessible Payment Tools", "Training Staff to Give Clear Instructions", "The keynote", "The panel discussion"], answer: 0, explanation: "她說 bank already has accessible payment software，所以較不需要 Breakout A。", difficulty: "800" },
        { prompt: "When does the panel discussion begin?", choices: ["11:30", "9:00", "10:15", "10:30"], answer: 0, explanation: "Agenda 顯示 Panel Discussion 時間是 11:30-12:15。" }
      ],
      tags: ["part7", "double-passage", "schedule", "recommendation"]
    },
    {
      groupId: "P7-R63",
      category: "雙篇閱讀",
      passage: `Invoice Note

Invoice #8842 includes the annual software subscription for three departments: Sales, Accounting, and Customer Support. The subscription begins on July 1 and includes unlimited online training but does not include on-site workshops. Payment is due within thirty days.

E-mail

To: Billing Department
From: Keiko Tanaka, Accounting
Subject: Invoice #8842

We approved the subscription fee, but the cost center listed on the invoice is outdated. Please replace cost center 41-A with 47-C before we process payment. Also, our Customer Support team would like to schedule online training during the second week of July. Please confirm whether the training sessions need to be reserved in advance.`,
      items: [
        { prompt: "What is included in the subscription?", choices: ["Unlimited online training", "On-site workshops", "Hardware replacement", "Three months of free consulting"], answer: 0, explanation: "Invoice Note 說 includes unlimited online training but not on-site workshops。", difficulty: "600" },
        { prompt: "What does Keiko ask Billing to change?", choices: ["The cost center", "The subscription start date", "The number of departments", "The payment deadline"], answer: 0, explanation: "E-mail 要求 replace cost center 41-A with 47-C。", difficulty: "600" },
        { prompt: "When does Customer Support want training?", choices: ["During the second week of July", "Before July 1", "Within thirty days of payment", "After the subscription ends"], answer: 0, explanation: "Keiko 說 Customer Support team would like training during the second week of July。" },
        { prompt: "What is suggested about the payment?", choices: ["It has not been processed yet", "It was rejected because training is unavailable", "It was paid before the invoice was corrected", "It includes extra on-site workshop fees"], answer: 0, explanation: "Please replace cost center... before we process payment 表示尚未付款。" }
      ],
      tags: ["part7", "double-passage", "invoice", "cross-reference"]
    },
    {
      groupId: "P7-R64",
      category: "雙篇閱讀",
      passage: `Article

The city of Brookmere has started a pilot program that allows residents to report damaged sidewalks through a mobile app. Reports must include a photograph and a location marker. City engineers review submissions every morning and assign repair crews based on safety risk rather than the order in which reports are received.

Resident Comment

I used the app to report a broken sidewalk outside my apartment building on Monday evening. By Tuesday afternoon, the report was marked as reviewed, but the repair date was listed as \"pending.\" I understand emergencies come first, but the app should explain why some reviewed reports do not yet have repair dates.`,
      items: [
        { prompt: "What does the mobile app allow residents to do?", choices: ["Report damaged sidewalks", "Schedule apartment repairs", "Pay city engineering fees", "Vote on pilot programs"], answer: 0, explanation: "Article 第一句說 residents can report damaged sidewalks through a mobile app。", difficulty: "600" },
        { prompt: "How are repair crews assigned?", choices: ["Based on safety risk", "Based on report order only", "Based on apartment size", "Based on resident membership"], answer: 0, explanation: "Article 說 assign repair crews based on safety risk rather than order received。" },
        { prompt: "What does the resident want improved?", choices: ["The explanation of pending repair dates", "The requirement to include photographs", "The location marker accuracy", "The city's emergency response time"], answer: 0, explanation: "Comment 最後說 app should explain why reviewed reports do not yet have repair dates。" },
        { prompt: "What is implied about the resident's report?", choices: ["It was reviewed but not yet scheduled", "It lacked a photograph", "It was the city's highest-risk case", "It was submitted on Tuesday afternoon"], answer: 0, explanation: "居民說 report marked as reviewed, but repair date was pending。" }
      ],
      tags: ["part7", "double-passage", "civic", "inference"]
    },
    {
      groupId: "P7-R65",
      category: "雙篇閱讀",
      passage: `Training Schedule

Data Security Refresher
Monday 1:00-2:00 P.M. Room 204
Tuesday 9:00-10:00 A.M. Online
Wednesday 3:00-4:00 P.M. Room 118

Memo

To: Department Coordinators
From: IT Compliance Office

All employees who handle customer records must complete the refresher this week. Online attendance is available only for employees working remotely on the day of the session. Coordinators should send attendance lists by Friday afternoon. Employees who completed the same refresher during the January audit do not need to attend again, but their names should still be included on the list with the note \"completed in January.\"`,
      items: [
        { prompt: "Who must complete the refresher this week?", choices: ["Employees who handle customer records", "Only department coordinators", "All employees hired in January", "Employees who work in Room 204"], answer: 0, explanation: "Memo 說 employees who handle customer records must complete the refresher。", difficulty: "600" },
        { prompt: "Who may attend the online session?", choices: ["Employees working remotely that day", "Anyone who prefers Tuesday morning", "Only employees in Room 118", "Staff who missed the January audit"], answer: 0, explanation: "Online attendance available only for employees working remotely on the day。" },
        { prompt: "What should be sent by Friday afternoon?", choices: ["Attendance lists", "Customer record files", "Room reservation forms", "Online meeting passwords"], answer: 0, explanation: "Coordinators should send attendance lists by Friday afternoon。", difficulty: "600" },
        { prompt: "What should be done for employees who completed the refresher in January?", choices: ["Include their names with a note", "Require them to attend online", "Remove them from all compliance records", "Assign them to the Wednesday session"], answer: 0, explanation: "Memo 說這些人不用再參加，但名單仍應列出並註記 completed in January。" }
      ],
      tags: ["part7", "double-passage", "schedule", "exception"]
    },
    {
      groupId: "P7-R66",
      category: "三篇閱讀",
      passage: `Notice

The Harbor Museum will begin timed-entry reservations for weekend visitors on June 1. Visitors may enter within thirty minutes of their reserved time. Members may reserve tickets two weeks earlier than nonmembers.

E-mail

To: Visitor Services Team
From: Elena Park
Subject: School Groups

Several teachers have asked whether school groups must use timed-entry reservations on Saturdays. Please explain that groups of fifteen or more should use the group request form instead. The education office will assign arrival times after reviewing bus schedules.

Form Instructions

Group request forms must be submitted at least ten business days before the visit. Requests should include the school name, grade level, number of students, number of adults, and whether the group plans to attend a workshop.`,
      items: [
        { prompt: "What change begins on June 1?", choices: ["Timed-entry reservations for weekend visitors", "A new bus schedule for all schools", "Free admission for nonmembers", "A weekday-only museum policy"], answer: 0, explanation: "Notice 第一行說 begin timed-entry reservations for weekend visitors on June 1。", difficulty: "600" },
        { prompt: "How are school groups of fifteen or more handled?", choices: ["They should submit a group request form", "They must reserve tickets as nonmembers", "They may enter any time after noon", "They are not allowed on Saturdays"], answer: 0, explanation: "E-mail 說 groups of fifteen or more should use the group request form。" },
        { prompt: "Who assigns arrival times for school groups?", choices: ["The education office", "The teachers", "The membership office", "Weekend visitors"], answer: 0, explanation: "E-mail 說 education office will assign arrival times。" },
        { prompt: "What must be included on the group request form?", choices: ["Whether the group plans to attend a workshop", "The names of every museum member", "The exact thirty-minute entry window", "A list of nonmember visitors"], answer: 0, explanation: "Form Instructions 列出是否參加 workshop 為必填資訊之一。" }
      ],
      tags: ["part7", "triple-passage", "museum", "cross-document"]
    },
    {
      groupId: "P7-R67",
      category: "三篇閱讀",
      passage: `Product Page

The NomaDesk Flex Chair includes adjustable armrests, a breathable back panel, and a five-year frame warranty. Assembly usually takes twenty minutes and requires no tools. Bulk orders of ten or more chairs qualify for free delivery.

Customer Review

The chair is comfortable, and assembly was easy. However, our office ordered twelve chairs in gray, and two arrived in blue. Customer service responded quickly and said replacements would ship after they verified the original order.

Return Policy

Color errors must be reported within seven days of delivery. Customers should provide the order number and a photograph of the item received. Replacement items are shipped without additional delivery charges once the error is confirmed.`,
      items: [
        { prompt: "Which feature is mentioned on the product page?", choices: ["Adjustable armrests", "A ten-year fabric warranty", "Built-in charging ports", "Required professional assembly"], answer: 0, explanation: "Product Page 列出 adjustable armrests。", difficulty: "600" },
        { prompt: "Why did the reviewer contact customer service?", choices: ["Two chairs arrived in the wrong color", "The chairs required tools to assemble", "The order did not qualify for free delivery", "The frame warranty had expired"], answer: 0, explanation: "Review 說 ordered gray, two arrived in blue。" },
        { prompt: "What information is required for a color-error report?", choices: ["The order number and a photograph", "A repair invoice and warranty card", "The name of the delivery driver", "A list of office employees"], answer: 0, explanation: "Return Policy 說 provide order number and photograph of item received。" },
        { prompt: "What can be inferred about the office's delivery charge for replacements?", choices: ["It should not pay an additional delivery charge after confirmation", "It must pay because the order had twelve chairs", "It will pay only if assembly took over twenty minutes", "It must buy ten more chairs first"], answer: 0, explanation: "Policy 說 replacement items shipped without additional delivery charges once error confirmed。" }
      ],
      tags: ["part7", "triple-passage", "product", "policy"]
    },
    {
      groupId: "P7-R68",
      category: "三篇閱讀",
      passage: `Internal Post

The office cafeteria will test a pre-order lunch system from August 5 to August 16. Employees may order meals through the company app before 10 A.M. and pick them up between noon and 1 P.M. The test is intended to reduce lines during the busiest lunch period.

Survey Result

In last month's facilities survey, 62 percent of employees said cafeteria lines were too long on Tuesdays and Thursdays. Only 18 percent said menu variety was the main issue.

Manager Message

Please encourage your teams to use the pre-order feature, especially on Tuesdays and Thursdays. We need enough participation to decide whether to continue the system after the trial. Employees who forget to pre-order may still buy lunch in person, but regular lines may remain long.`,
      items: [
        { prompt: "Why is the pre-order system being tested?", choices: ["To reduce lunch lines", "To expand menu variety first", "To close the cafeteria at noon", "To replace the company app"], answer: 0, explanation: "Internal Post 說 intended to reduce lines during busiest lunch period。", difficulty: "600" },
        { prompt: "When must employees place pre-orders?", choices: ["Before 10 A.M.", "Between noon and 1 P.M.", "After August 16", "Only on Mondays"], answer: 0, explanation: "Post 說 order meals through app before 10 A.M.。", difficulty: "600" },
        { prompt: "Which days most need participation?", choices: ["Tuesdays and Thursdays", "Mondays and Fridays", "Weekends", "Every day after August 16"], answer: 0, explanation: "Survey 說 lines too long on Tuesdays and Thursdays；Manager Message 也強調 especially those days。" },
        { prompt: "What is suggested about employees who forget to pre-order?", choices: ["They may still buy lunch in person", "They cannot enter the cafeteria", "They must wait until August 16", "They will receive a survey form"], answer: 0, explanation: "Manager Message 說 forget to pre-order may still buy lunch in person。" }
      ],
      tags: ["part7", "triple-passage", "survey", "inference"]
    },
    {
      groupId: "P7-R69",
      category: "三篇閱讀",
      passage: `Press Release

Lumen Transit will add real-time crowding information to its train app next month. The feature will estimate how full each train car is using weight sensors and recent boarding data.

FAQ

Does the app identify individual passengers?
No. The system estimates crowding levels and does not collect names, ticket numbers, or phone locations.

Customer E-mail

To: Lumen Transit Support
From: Jordan Wells
Subject: Accessibility Question

I use a wheelchair and usually board the first car because it has a wider space near the door. Will the new crowding feature show information for each car separately, or only for the whole train? If it only shows the whole train, it may not help passengers like me choose the most accessible car.`,
      items: [
        { prompt: "What new feature is Lumen Transit adding?", choices: ["Real-time crowding information", "Mobile ticket refunds", "Passenger name lookup", "Wheelchair repair reservations"], answer: 0, explanation: "Press Release 第一行說 add real-time crowding information to its train app。", difficulty: "600" },
        { prompt: "What does the FAQ emphasize?", choices: ["The system does not identify individual passengers", "The app collects phone locations", "Ticket numbers will be displayed", "Only wheelchair users can use the feature"], answer: 0, explanation: "FAQ 答覆說 does not collect names, ticket numbers, or phone locations。" },
        { prompt: "Why does Jordan ask about information for each car?", choices: ["Jordan needs to choose an accessible car", "Jordan wants to repair a weight sensor", "Jordan lost a ticket number", "Jordan works for Lumen Transit Support"], answer: 0, explanation: "Jordan 說 first car has wider space，若只顯示 whole train 可能無法幫助選擇 accessible car。" },
        { prompt: "What information is NOT used to estimate crowding?", choices: ["Passenger phone locations", "Weight sensors", "Recent boarding data", "Train car fullness estimates"], answer: 0, explanation: "FAQ 說不收集 phone locations；Press Release 說使用 weight sensors and boarding data。" }
      ],
      tags: ["part7", "triple-passage", "accessibility", "privacy"]
    },
    {
      groupId: "P7-R70",
      category: "三篇閱讀",
      passage: `Newsletter

The Riverfront Business District will sponsor a Saturday clean-up event on September 14. Volunteers will remove litter from sidewalks, plant flowers near storefronts, and report damaged street signs. Businesses that send at least three volunteers will be listed on the district website.

Volunteer Sign-up Note

Tools and gloves will be provided, but volunteers should bring refillable water bottles. Check-in begins at 8:30 A.M. behind the public library. The planting team will leave first because flowers must be placed before temperatures rise.

E-mail

To: District Office
From: May Chen, Owner of Chen Books

I have two employees available for the clean-up event, and I can join after opening the store at 9 A.M. If we arrive after the planting team leaves, can we still help with sidewalk litter or sign reports? We would still like Chen Books to be included on the website if our three volunteers are accepted.`,
      items: [
        { prompt: "What is one activity planned for the event?", choices: ["Reporting damaged street signs", "Repairing library computers", "Delivering books to schools", "Painting all storefronts"], answer: 0, explanation: "Newsletter 列出 report damaged street signs。", difficulty: "600" },
        { prompt: "What should volunteers bring?", choices: ["Refillable water bottles", "Gloves and tools", "Street sign repair kits", "Printed website listings"], answer: 0, explanation: "Sign-up Note 說 tools/gloves provided，但 volunteers should bring refillable water bottles。" },
        { prompt: "Why might May's group miss the planting activity?", choices: ["May cannot arrive until after opening her store", "The flowers will be delivered late", "The library will open at noon", "Only district staff may plant flowers"], answer: 0, explanation: "May 說 she can join after opening the store at 9 A.M.，而 planting team leaves first。" },
        { prompt: "What does May hope will happen?", choices: ["Chen Books will be listed on the district website", "The check-in location will move to her store", "Her employees will repair all signs", "The event will be postponed until noon"], answer: 0, explanation: "May 最後說希望三名志工 accepted 並讓 Chen Books included on website。" }
      ],
      tags: ["part7", "triple-passage", "event", "cross-document"]
    }
  ].forEach(set => pushSet({ ...set, part: "7" }));

  const p5Items = [
    ["P5-245", "800", "句意與副詞", "The pilot program was designed to collect customer feedback _____ before the company invested in a full launch.", ["gradually", "gradual", "graduate", "graduation"], 0, "空格修飾 collect feedback，應用副詞 gradually，表示逐步收集後再決定是否全面推出。"],
    ["P5-246", "800", "讓步邏輯", "_____ the updated instructions were longer, users completed the setup process with fewer errors.", ["Although", "Because", "Until", "Unless"], 0, "前後句意是「說明更長」但「錯誤更少」，需要讓步連接詞 Although。"],
    ["P5-247", "600", "名詞搭配", "The committee requested a clearer _____ of how visitor data would be stored.", ["explanation", "explain", "explained", "explanatory"], 0, "a clearer 後面需要名詞 explanation，表示更清楚的說明。"],
    ["P5-248", "800", "分詞構句", "_____ on feedback from test users, the design team replaced the swipe gesture with a button.", ["Based", "Basing", "Base", "To base"], 0, "Based on... 是固定分詞片語，表示根據使用者回饋。"],
    ["P5-249", "600", "條件句", "The repair request will not be processed _____ the customer provides the product serial number.", ["unless", "despite", "whereas", "afterwards"], 0, "unless 表示「除非」，符合沒有序號就不處理的條件。"],
    ["P5-250", "800", "語意精準", "The report separates indoor and outdoor test results to make the findings more _____.", ["meaningful", "meaningless", "mean", "meaningfully"], 0, "make + object + adjective，用 meaningful 表示讓發現更有意義。"],
    ["P5-251", "600", "代名詞指涉", "The library extended _____ hours so students could prepare for certification exams.", ["its", "it", "itself", "they"], 0, "hours 前需要所有格 its，指 library 的開放時間。"],
    ["P5-252", "800", "關係子句", "Employees _____ completed the January refresher do not need to attend the session again.", ["who", "which", "whose", "whom"], 0, "先行詞 Employees 是人，且關係子句缺主詞，因此用 who。"],
    ["P5-253", "600", "目的連接", "Please submit the attendance list by Friday _____ the compliance office can update its records.", ["so that", "even though", "as if", "rather than"], 0, "so that 表示目的：提交名單，以便更新紀錄。"],
    ["P5-254", "800", "比較與推論", "The east driveway is slightly _____ from the elevators than the regular shuttle pickup area.", ["farther", "farthest", "far", "farthermost"], 0, "than 表示比較，slightly 修飾比較級 farther。"],
    ["P5-255", "600", "動詞型態", "The app allows residents _____ damaged sidewalks by uploading a photograph and location marker.", ["to report", "reporting", "reported", "report"], 0, "allow + object + to V，表示允許居民回報。"],
    ["P5-256", "800", "被動語態", "Requests missing a project code will be returned _____ correction.", ["for", "by", "with", "onto"], 0, "returned for correction 表示退回以便修正。"],
    ["P5-257", "600", "副詞位置", "The association reviews privacy notices _____ to ensure that stores describe their sensors accurately.", ["periodically", "periodic", "period", "periods"], 0, "修飾 reviews 需用副詞 periodically。"],
    ["P5-258", "800", "名詞子句", "The manager asked _____ the online training sessions had to be reserved in advance.", ["whether", "during", "despite", "unless"], 0, "asked 後接 whether 引導的名詞子句，表示是否需要預約。"],
    ["P5-259", "600", "形容詞語意", "A clearly _____ button replaced the swipe gesture in the final version of the app.", ["labeled", "labeling", "label", "labels"], 0, "button 需要形容詞修飾，clearly labeled button 表示標示清楚的按鈕。"],
    ["P5-260", "800", "例外條件", "The online session is available only to employees _____ remotely on the day of training.", ["working", "worked", "work", "to work"], 0, "employees working remotely 是現在分詞片語修飾 employees，表示當天遠端工作的員工。"]
  ];

  window.BUILTIN_BANK.push(...p5Items.map(([id, difficulty, category, prompt, choices, answer, explanation]) => ({
    id,
    part: "5",
    difficulty,
    category,
    prompt,
    choices,
    answer,
    explanation,
    translation: "請依句意與文法選出最適合填入空格的答案。",
    passage: "",
    audioText: "",
    tags: ["part5", "reading-core", "literacy-grammar"],
    sourceNote
  })));
})();
