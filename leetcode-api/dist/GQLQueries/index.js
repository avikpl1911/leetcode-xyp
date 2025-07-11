"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubDetails = exports.languageStatsQuery = exports.trendingDiscussQuery = exports.submissionQuery = exports.selectProblemQuery = exports.userProfileQuery = exports.problemListQuery = exports.dailyProblemQuery = exports.contestQuery = exports.AcSubmissionQuery = void 0;
var recentAcSubmit_1 = require("./recentAcSubmit");
Object.defineProperty(exports, "AcSubmissionQuery", { enumerable: true, get: function () { return __importDefault(recentAcSubmit_1).default; } });
var contest_1 = require("./contest");
Object.defineProperty(exports, "contestQuery", { enumerable: true, get: function () { return __importDefault(contest_1).default; } });
var dailyProblem_1 = require("./dailyProblem");
Object.defineProperty(exports, "dailyProblemQuery", { enumerable: true, get: function () { return __importDefault(dailyProblem_1).default; } });
var problemList_1 = require("./problemList");
Object.defineProperty(exports, "problemListQuery", { enumerable: true, get: function () { return __importDefault(problemList_1).default; } });
var userProfile_1 = require("./userProfile");
Object.defineProperty(exports, "userProfileQuery", { enumerable: true, get: function () { return __importDefault(userProfile_1).default; } });
var selectProblem_1 = require("./selectProblem");
Object.defineProperty(exports, "selectProblemQuery", { enumerable: true, get: function () { return __importDefault(selectProblem_1).default; } });
var recentSubmit_1 = require("./recentSubmit");
Object.defineProperty(exports, "submissionQuery", { enumerable: true, get: function () { return __importDefault(recentSubmit_1).default; } });
var trendingDiscuss_1 = require("./trendingDiscuss");
Object.defineProperty(exports, "trendingDiscussQuery", { enumerable: true, get: function () { return __importDefault(trendingDiscuss_1).default; } });
var languageStats_1 = require("./languageStats");
Object.defineProperty(exports, "languageStatsQuery", { enumerable: true, get: function () { return __importDefault(languageStats_1).default; } });
var SubDetails_1 = require("./SubDetails");
Object.defineProperty(exports, "SubDetails", { enumerable: true, get: function () { return __importDefault(SubDetails_1).default; } });
//# sourceMappingURL=index.js.map