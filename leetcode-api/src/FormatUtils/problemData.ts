import {
  DailyProblemData,
  ProblemSetQuestionListData,

} from '../types';

export const formatDailyData = (data: DailyProblemData) => ({
  questionLink:
    `https://leetcode.com` + data.activeDailyCodingChallengeQuestion.link,
  date: data.activeDailyCodingChallengeQuestion.date,
  questionId: data.activeDailyCodingChallengeQuestion.question.questionId,
  questionFrontendId:
    data.activeDailyCodingChallengeQuestion.question.questionFrontendId,
  questionTitle: data.activeDailyCodingChallengeQuestion.question.title,
  titleSlug: data.activeDailyCodingChallengeQuestion.question.titleSlug,
  difficulty: data.activeDailyCodingChallengeQuestion.question.difficulty,
  isPaidOnly: data.activeDailyCodingChallengeQuestion.question.isPaidOnly,
  question: data.activeDailyCodingChallengeQuestion.question.content,
  exampleTestcases:
    data.activeDailyCodingChallengeQuestion.question.exampleTestcases,
  topicTags: data.activeDailyCodingChallengeQuestion.question.topicTags,
  hints: data.activeDailyCodingChallengeQuestion.question.hints,
  solution: data.activeDailyCodingChallengeQuestion.question.solution,
  companyTagStats:
    data.activeDailyCodingChallengeQuestion.question.companyTagStats,
  likes: data.activeDailyCodingChallengeQuestion.question.likes,
  dislikes: data.activeDailyCodingChallengeQuestion.question.dislikes,
  similarQuestions:
    data.activeDailyCodingChallengeQuestion.question.similarQuestions,
});

export const formatQuestionData = (data: any) => ({
  data: data.data
});

export const formatProblemsData = (data: ProblemSetQuestionListData) => ({
  totalQuestions: data.problemsetQuestionList.total,
  count: data.problemsetQuestionList.questions.length,
  problemsetQuestionList: data.problemsetQuestionList.questions,
});

