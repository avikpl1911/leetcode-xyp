"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchProblems = async (options, res, formatData, query) => {
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
                    categorySlug: '',
                    skip: 0,
                    limit: options.limit || 20,
                    filters: { tags: options.tags ? options.tags.split(' ') : ' ' },
                },
            }),
        });
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
exports.default = fetchProblems;
//# sourceMappingURL=fetchProblems.js.map