"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProblemsData = exports.formatQuestionData = exports.formatDailyData = void 0;
const formatDailyData = (data) => ({
    questionLink: `https://leetcode.com` + data.activeDailyCodingChallengeQuestion.link,
    date: data.activeDailyCodingChallengeQuestion.date,
    questionId: data.activeDailyCodingChallengeQuestion.question.questionId,
    questionFrontendId: data.activeDailyCodingChallengeQuestion.question.questionFrontendId,
    questionTitle: data.activeDailyCodingChallengeQuestion.question.title,
    titleSlug: data.activeDailyCodingChallengeQuestion.question.titleSlug,
    difficulty: data.activeDailyCodingChallengeQuestion.question.difficulty,
    isPaidOnly: data.activeDailyCodingChallengeQuestion.question.isPaidOnly,
    question: data.activeDailyCodingChallengeQuestion.question.content,
    exampleTestcases: data.activeDailyCodingChallengeQuestion.question.exampleTestcases,
    topicTags: data.activeDailyCodingChallengeQuestion.question.topicTags,
    hints: data.activeDailyCodingChallengeQuestion.question.hints,
    solution: data.activeDailyCodingChallengeQuestion.question.solution,
    companyTagStats: data.activeDailyCodingChallengeQuestion.question.companyTagStats,
    likes: data.activeDailyCodingChallengeQuestion.question.likes,
    dislikes: data.activeDailyCodingChallengeQuestion.question.dislikes,
    similarQuestions: data.activeDailyCodingChallengeQuestion.question.similarQuestions,
});
exports.formatDailyData = formatDailyData;
const formatQuestionData = (data) => ({
    data: data.data
});
exports.formatQuestionData = formatQuestionData;
const formatProblemsData = (data) => ({
    totalQuestions: data.problemsetQuestionList.total,
    count: data.problemsetQuestionList.questions.length,
    problemsetQuestionList: data.problemsetQuestionList.questions,
});
exports.formatProblemsData = formatProblemsData;
//# sourceMappingURL=problemData.js.map