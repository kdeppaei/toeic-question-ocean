const fs = require("fs");
const path = require("path");

const sourcePath = process.argv[2];
if (!sourcePath) {
  throw new Error("Usage: node scripts/build-part5-exercise-guides.cjs <source-json>");
}

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const output = {
  title: "TOEIC Part 5 Exercise 1-10 全題詳解",
  totalExercises: source.metadata.total_exercises,
  totalQuestions: source.metadata.total_questions,
  sourceName: "ESL Lounge Student",
  sourceIndex: "https://www.esl-lounge.com/student/toeic-reading-part-five.php",
  notice: "題目與詳解由使用者提供的整理檔匯入；本站保留來源標示與原始練習連結。",
  exercises: source.exercises.map((exercise, index) => ({
    exercise: exercise.exercise,
    code: `TOEIC${String(45 + index).padStart(3, "0")}`,
    focus: [
      "Word families, verb tenses, pronouns, business collocations.",
      "Adverbs vs. adjectives, passive voice, connectors, phrasal verbs.",
      "Prepositions, comparisons, relative clauses, office vocabulary.",
      "Verb forms, conditionals, quantifiers, formal business usage.",
      "Agreement, infinitives, participles, customer-service vocabulary.",
      "Transitions, modal verbs, passive structures, workplace procedures.",
      "Pronouns, tense control, business verbs, common fixed expressions.",
      "Word choice, causative structures, campaigns, complaints, advice.",
      "Word families, contrast, reflexive pronouns, policy collocations.",
      "Past perfect tense, possessive pronouns, environmental policy terms."
    ][index],
    sourceUrl: `https://www.esl-lounge.com/student/toeic/toeic-${String(45 + index).padStart(3, "0")}-reading-part-five-${exercise.exercise}.php`,
    questions: exercise.questions.map((question) => ({
      number: question.number,
      prompt: question.sentence,
      choices: question.options,
      correctOption: question.correct_option,
      answer: question.answer,
      completedSentence: question.completed_sentence,
      translation: question.translation_zh,
      testPoint: question.test_point,
      explanation: question.explanation_zh,
      distractorAnalysis: question.distractor_analysis_zh
    }))
  }))
};

const targetPath = path.resolve(__dirname, "..", "modules", "part5-exercise-guides.js");
const serialized = `window.TOEIC_PART5_EXERCISE_GUIDES = ${JSON.stringify(output, null, 2)};\n`;
fs.writeFileSync(targetPath, serialized, "utf8");
console.log(`Wrote ${output.totalQuestions} questions to ${targetPath}`);
