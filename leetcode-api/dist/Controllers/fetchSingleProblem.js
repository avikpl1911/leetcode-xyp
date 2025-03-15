"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchSingleProblem = async (res, formatData, query, titleSlug) => {
    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Referer: 'https://leetcode.com',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    titleSlug,
                },
            }),
        });
        console.log(response.headers.getSetCookie());
        const cookies_raw = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Referer: 'https://leetcode.com',
            },
            body: JSON.stringify({
                operationName: "submissionDetails",
                query: `query submissionDetails($submissionId: Int!) {
  submissionDetails(submissionId: $submissionId) {
    runtime
    runtimeDisplay
    runtimePercentile
    runtimeDistribution
    memory
    memoryDisplay
    memoryPercentile
    memoryDistribution
    code
    timestamp
    statusCode
    user {
      username
      profile {
        realName
        userAvatar
      }
    }
    lang {
      name
      verboseName
    }
    question {
      questionId
      titleSlug
      hasFrontendPreview
    }
    notes
    flagType
    topicTags {
      tagId
      slug
      name
    }
    runtimeError
    compileError
    lastTestcase
    codeOutput
    expectedOutput
    totalCorrect
    totalTestcases
    fullCodeOutput
    testDescriptions
    testBodies
    testInfo
    stdOutput
  }
}`,
                variables: {
                    submissionId: 1571720113
                },
            }),
        });
        console.log(await cookies_raw.json());
        const result = await response.json();
        if (result.errors) {
            return res.send(result);
        }
        return res.json(formatData(result.data));
    }
    catch (err) {
        console.error('Error: ', err);
        return res.send(err);
    }
};
exports.default = fetchSingleProblem;
//# sourceMappingURL=fetchSingleProblem.js.map