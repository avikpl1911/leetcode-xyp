"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchDataSubDetails = async (SubId, res, query) => {
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
                    submissionId: SubId
                },
            }),
        });
        const result = await response.json();
        console.log(result);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        }
        if (result.errors) {
            return res.send(result);
        }
        return res.json(result.data);
    }
    catch (err) {
        console.error('Error: ', err);
        return res.send(err);
    }
};
exports.default = fetchDataSubDetails;
//# sourceMappingURL=fetchDataSubDetails.js.map