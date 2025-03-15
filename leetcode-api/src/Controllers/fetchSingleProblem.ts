import { Response } from 'express';
import { DailyProblemData, SelectProblemData } from '../types';
import { parseCookie } from '../utils';

const fetchSingleProblem = async (
  res: Response,
  formatData: (data: DailyProblemData & SelectProblemData) => void,
  query: string,
  titleSlug: string | null
) => {
  try {
    //   const graphqlQuery = 
    //   `query submissionDetails($submissionId: Int!) {
    //     submissionDetails(submissionId: $submissionId) {

    //       }
    //     }
    //   }
    // `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({
        query: query,
        variables: {
          titleSlug, //search question using titleSlug
        },
      }),
    });

   console.log(parseCookie(response.headers.getSetCookie().toString()))

    
    var result = await response.json();
    result["csrf"] = response.headers.getSetCookie()

    if (result.errors) {
      return res.send(result);
    }

    return res.json(formatData(result.data));
  } catch (err) {
    console.error('Error: ', err);
    return res.send(err);
  }
};

export default fetchSingleProblem;
