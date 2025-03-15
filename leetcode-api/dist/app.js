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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const leetcode = __importStar(require("./leetCode"));
const axios_1 = __importDefault(require("axios"));
const newQueries_1 = require("./GQLQueries/newQueries");
const app = (0, express_1.default)();
const API_URL = process.env.LEETCODE_API_URL || 'https://leetcode.com/graphql';
app.use((0, cors_1.default)());
app.use((req, _res, next) => {
    console.log('Requested URL:', req.originalUrl);
    next();
});
app.use(express_1.default.json());
async function queryLeetCodeAPI(query, variables) {
    try {
        const response = await axios_1.default.post(API_URL, { query, variables });
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        return response.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(`Error from LeetCode API: ${error.response.data}`);
        }
        else if (error.request) {
            throw new Error('No response received from LeetCode API');
        }
        else {
            throw new Error(`Error in setting up the request: ${error.message}`);
        }
    }
}
app.get('/', (_req, res) => {
    res.json({
        routes: {
            userDetails: {
                '/:username': 'get your leetcodevis profile Details',
                '/:username/badges': 'get your badges',
                '/:username/solved': 'get total number of question you solved',
                '/:username/contest': 'get your contest details',
                '/:username/contest/history': 'get all contest history',
                '/:username/submission': 'get your last 20 submission',
                '/:username/acSubmission': 'get your last 20 accepted submission',
                '/:username/calendar': 'get your submission calendar',
                '/userProfile/:username': 'get full profile details in one call',
                '/userProfileCalendar?username=yourname&year=2024': 'get your calendar details with year',
                '/languageStats?username=yourname': 'get the language stats of a user',
                '/userProfileUserQuestionProgressV2/:userSlug': 'get your question progress',
                '/skillStats/:username': 'get your skill stats',
            },
            contest: {
                '/userContestRankingInfo/:username': 'get user contest ranking info',
            },
            discussion: {
                '/trendingDiscuss?first=20': 'get top 20 trending discussions',
                '/discussTopic/:topicId': 'get discussion topic',
                '/discussComments/:topicId': 'get discussion comments',
            },
            problems: {
                singleProblem: {
                    '/select?titleSlug=two-sum': 'get selected Problem',
                    '/daily': 'get daily Problem',
                    '/dailyQuestion': 'get raw daily question',
                },
                problemList: {
                    '/problems': 'get list of 20 problems',
                    '/problems?limit=50': 'get list of some problems',
                    '/problems?tags=array+math': 'get list problems on selected topics',
                    '/problems?tags=array+math+string&limit=5': 'get list some problems on selected topics',
                    '/officialSolution?titleSlug=two-sum': 'get official solution of selected problem',
                },
            },
        },
    });
});
app.get('/officialSolution', async (req, res) => {
    const { titleSlug } = req.query;
    if (!titleSlug) {
        return res.status(400).json({ error: 'Missing titleSlug query parameter' });
    }
    try {
        const data = await queryLeetCodeAPI(newQueries_1.officialSolutionQuery, { titleSlug });
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
app.get('/userProfileCalendar', async (req, res) => {
    const { username, year } = req.query;
    if (!username || !year || typeof year !== 'string') {
        return res
            .status(400)
            .json({ error: 'Missing or invalid username or year query parameter' });
    }
    try {
        const data = await queryLeetCodeAPI(newQueries_1.userProfileCalendarQuery, {
            username,
            year: parseInt(year),
        });
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
const formatData = (data) => {
    return {
        totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
        totalSubmissions: data.matchedUser.submitStats.totalSubmissionNum,
        totalQuestions: data.allQuestionsCount[0].count,
        easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
        totalEasy: data.allQuestionsCount[1].count,
        mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
        totalMedium: data.allQuestionsCount[2].count,
        hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
        totalHard: data.allQuestionsCount[3].count,
        ranking: data.matchedUser.profile.ranking,
        contributionPoint: data.matchedUser.contributions.points,
        reputation: data.matchedUser.profile.reputation,
        submissionCalendar: JSON.parse(data.matchedUser.submissionCalendar),
        recentSubmissions: data.recentSubmissionList,
        matchedUserStats: data.matchedUser.submitStats,
    };
};
app.post('/submit/:id', leetcode.checkSubmit);
app.post('/submitques/:slug', leetcode.submitCode);
app.post('/run/:slug', leetcode.run);
app.post('/runcheck/:id', leetcode.runCheck);
app.get('/userProfile/:id', async (req, res) => {
    const user = req.params.id;
    try {
        const data = await queryLeetCodeAPI(newQueries_1.getUserProfileQuery, {
            username: user,
        });
        if (data.errors) {
            res.send(data);
        }
        else {
            res.send(formatData(data.data));
        }
    }
    catch (error) {
        res.send(error);
    }
});
const handleRequest = async (res, query, params) => {
    try {
        const data = await queryLeetCodeAPI(query, params);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
app.get('/dailyQuestion', (_, res) => {
    handleRequest(res, newQueries_1.dailyQeustion, {});
});
app.get('/skillStats/:username', (req, res) => {
    const { username } = req.params;
    handleRequest(res, newQueries_1.skillStatsQuery, { username });
});
app.get('/userProfileUserQuestionProgressV2/:userSlug', (req, res) => {
    const { userSlug } = req.params;
    handleRequest(res, newQueries_1.userProfileUserQuestionProgressV2Query, { userSlug });
});
app.get('/discussTopic/:topicId', (req, res) => {
    const topicId = parseInt(req.params.topicId);
    handleRequest(res, newQueries_1.discussTopicQuery, { topicId });
});
app.get('/discussComments/:topicId', (req, res) => {
    const topicId = parseInt(req.params.topicId);
    const { orderBy = 'newest_to_oldest', pageNo = 1, numPerPage = 10, } = req.query;
    handleRequest(res, newQueries_1.discussCommentsQuery, {
        topicId,
        orderBy,
        pageNo,
        numPerPage,
    });
});
app.get('/userContestRankingInfo/:username', (req, res) => {
    const { username } = req.params;
    handleRequest(res, newQueries_1.userContestRankingInfoQuery, { username });
});
app.get('/daily', leetcode.dailyProblem);
app.get('/select', leetcode.selectProblem);
app.get('/problems', leetcode.problems);
app.get('/trendingDiscuss', leetcode.trendingCategoryTopics);
app.get('/languageStats', leetcode.languageStats);
app.use('/:username*', (req, _res, next) => {
    req.body = {
        username: req.params.username,
        limit: req.query.limit,
    };
    next();
});
app.get('/:username', leetcode.userData);
app.get('/:username/badges', leetcode.userBadges);
app.get('/:username/solved', leetcode.solvedProblem);
app.get('/:username/contest', leetcode.userContest);
app.get('/:username/contest/history', leetcode.userContestHistory);
app.get('/:username/submission', leetcode.submission);
app.get('/:username/acSubmission', leetcode.acSubmission);
app.get('/:username/calendar', leetcode.calendar);
exports.default = app;
//# sourceMappingURL=app.js.map