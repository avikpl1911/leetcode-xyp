"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitCode = exports.checkSubmit = exports.languageStats = exports.trendingCategoryTopics = exports.problems = exports.selectProblem = exports.dailyProblem = exports.calendar = exports.acSubmission = exports.submission = exports.solvedProblem = exports.userContestHistory = exports.userContest = exports.userBadges = exports.userData = void 0;
const gqlQueries = __importStar(require("./GQLQueries"));
const formatUtils = __importStar(require("./FormatUtils"));
const controllers = __importStar(require("./Controllers"));
const userData = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatUserData, gqlQueries.userProfileQuery);
};
exports.userData = userData;
const userBadges = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatBadgesData, gqlQueries.userProfileQuery);
};
exports.userBadges = userBadges;
const userContest = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatContestData, gqlQueries.contestQuery);
};
exports.userContest = userContest;
const userContestHistory = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatContestHistoryData, gqlQueries.contestQuery);
};
exports.userContestHistory = userContestHistory;
const solvedProblem = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatSolvedProblemsData, gqlQueries.userProfileQuery);
};
exports.solvedProblem = solvedProblem;
const submission = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatSubmissionData, gqlQueries.submissionQuery);
};
exports.submission = submission;
const acSubmission = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatAcSubmissionData, gqlQueries.AcSubmissionQuery);
};
exports.acSubmission = acSubmission;
const calendar = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatSubmissionCalendarData, gqlQueries.userProfileQuery);
};
exports.calendar = calendar;
const dailyProblem = (_req, res) => {
    controllers.fetchSingleProblem(res, formatUtils.formatDailyData, gqlQueries.dailyProblemQuery, null);
};
exports.dailyProblem = dailyProblem;
const selectProblem = (req, res) => {
    const title = req.query.titleSlug;
    if (title !== undefined) {
        controllers.fetchSingleProblem(res, formatUtils.formatQuestionData, gqlQueries.selectProblemQuery, title);
    }
    else {
        res.status(400).json({
            error: 'Missing or invalid query parameter: titleSlug',
            solution: 'put query after select',
            example: 'localhost:3000/select?titleSlug=two-sum',
        });
    }
};
exports.selectProblem = selectProblem;
const problems = (req, res) => {
    const limit = req.query.limit;
    const tags = req.query.tags;
    controllers.fetchProblems({ limit, tags }, res, formatUtils.formatProblemsData, gqlQueries.problemListQuery);
};
exports.problems = problems;
const trendingCategoryTopics = (_req, res) => {
    const first = parseInt(_req.query.first);
    if (!isNaN(first)) {
        controllers.fetchTrendingTopics({ first }, res, formatUtils.formatTrendingCategoryTopicData, gqlQueries.trendingDiscussQuery);
    }
    else {
        res.status(400).json({
            error: 'Missing or invalid query parameter: limit',
            solution: 'put query after discussion',
            example: 'localhost:3000/trendingDiscuss?first=20',
        });
    }
};
exports.trendingCategoryTopics = trendingCategoryTopics;
const languageStats = (_req, res) => {
    const username = _req.query.username;
    if (username) {
        controllers.fetchDataRawFormat({ username }, res, gqlQueries.languageStatsQuery);
    }
    else {
        res.status(400).json({
            error: 'Missing or invalid query parameter: username',
            solution: 'put query after discussion',
            example: 'localhost:3000/languageStats?username=uwi',
        });
    }
};
exports.languageStats = languageStats;
const checkSubmit = async (_req, res) => {
    console.log(_req.body);
    const id = _req.params.id;
    const csrf = _req.body.csrf;
    const session = _req.body.session;
    if (id && csrf && session) {
        const resp = await controllers.sendHttpGetJson(`https://leetcode.com/submissions/detail/${id}/check/`, { Referer: "https://leetcode.com/", Cookie: `csrftoken=${csrf}; LEETCODE_SESSION=${session}` });
        res.json(resp);
    }
    else {
        res.status(400).json({
            error: 'Missing or invalid query parameters',
            solution: 'put csrf, loginsession & submisson id',
        });
    }
};
exports.checkSubmit = checkSubmit;
const submitCode = async (_req, res) => {
    const slug = _req.params.slug;
    const question_id = _req.body.question_id;
    const csrf = _req.body.csrf;
    const session = _req.body.session;
    const typed_code = _req.body.typed_code;
    const lang = _req.body.lang;
    if (question_id && csrf && session && typed_code && lang) {
        const resp = await controllers.SendPostHttp(`https://leetcode.com/problems/${slug}/submit/`, { lang, question_id, typed_code }, { "x-csrftoken": csrf, Referer: `https://leetcode.com/problems/${slug}/description/`, Cookie: `csrftoken=${csrf}; LEETCODE_SESSION=${session}` });
        res.json(resp);
    }
    else {
        res.status(400).json({
            error: 'Missing or invalid query parameters',
            solution: 'put csrf, loginsession & submisson id',
        });
    }
};
exports.submitCode = submitCode;
//# sourceMappingURL=leetCode.js.map