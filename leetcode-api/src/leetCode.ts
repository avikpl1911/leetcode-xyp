import { Request, Response } from 'express';
import * as gqlQueries from './GQLQueries';
import * as formatUtils from './FormatUtils';
import * as controllers from './Controllers';
import { TransformedUserDataRequest } from './types';

export const userData = (req: TransformedUserDataRequest, res: Response) => {
  controllers.fetchUserDetails(
    req.body,
    res,
    formatUtils.formatUserData,
    gqlQueries.userProfileQuery
  );
};

export const userBadges = (req: TransformedUserDataRequest, res: Response) => {
  controllers.fetchUserDetails(
    req.body,
    res,
    formatUtils.formatBadgesData,
    gqlQueries.userProfileQuery
  );
};

export const userContest = (req: TransformedUserDataRequest, res: Response) => {
  controllers.fetchUserDetails(
    req.body,
    res,
    formatUtils.formatContestData,
    gqlQueries.contestQuery
  );
};

export const userContestHistory = (
  req: TransformedUserDataRequest,
  res: Response
) => {
  controllers.fetchUserDetails(
    req.body,
    res,
    formatUtils.formatContestHistoryData,
    gqlQueries.contestQuery
  );
};

export const solvedProblem = (
  req: TransformedUserDataRequest,
  res: Response
) => {
  controllers.fetchUserDetails(
    req.body,
    res,
    formatUtils.formatSolvedProblemsData,
    gqlQueries.userProfileQuery
  );
};

export const submission = (req: TransformedUserDataRequest, res: Response) => {
  controllers.fetchUserDetails(
    req.body,
    res,
    formatUtils.formatSubmissionData,
    gqlQueries.submissionQuery
  );
};

export const acSubmission = (
  req: TransformedUserDataRequest,
  res: Response
) => {
  controllers.fetchUserDetails(
    req.body,
    res,
    formatUtils.formatAcSubmissionData,
    gqlQueries.AcSubmissionQuery
  );
};

export const calendar = (req: TransformedUserDataRequest, res: Response) => {
  controllers.fetchUserDetails(
    req.body,
    res,
    formatUtils.formatSubmissionCalendarData,
    gqlQueries.userProfileQuery
  );
};

//Problems Details
export const dailyProblem = (_req: Request, res: Response) => {
  controllers.fetchSingleProblem(
    res,
    formatUtils.formatDailyData,
    gqlQueries.dailyProblemQuery,
    null
  );
};

export const selectProblem = (req: Request, res: Response) => {
  const title = req.query.titleSlug as string;
  if (title !== undefined) {
    controllers.fetchSingleProblem(
      res,
      formatUtils.formatQuestionData,
      gqlQueries.selectProblemQuery,
      title
    );
  } else {
    res.status(400).json({
      error: 'Missing or invalid query parameter: titleSlug',
      solution: 'put query after select',
      example: 'localhost:3000/select?titleSlug=two-sum',
    });
  }
};

export const problems = (
  req: Request<{}, {}, {}, { limit: number; tags: string }>,
  res: Response
) => {
  const limit = req.query.limit;
  const tags = req.query.tags;

  controllers.fetchProblems(
    { limit, tags },
    res,
    formatUtils.formatProblemsData,
    gqlQueries.problemListQuery
  );
};


export const trendingCategoryTopics = (_req: Request, res: Response) => {
  const first = parseInt(_req.query.first as string);
  if (!isNaN(first)) {
    controllers.fetchTrendingTopics(
      { first },
      res,
      formatUtils.formatTrendingCategoryTopicData,
      gqlQueries.trendingDiscussQuery
    );
  }
  else {
    res.status(400).json({
      error: 'Missing or invalid query parameter: limit',
      solution: 'put query after discussion',
      example: 'localhost:3000/trendingDiscuss?first=20',
    });
  }
 
};

export const languageStats = (_req: Request, res: Response) => {
  const username = _req.query.username as string;
  if (username) {
    controllers.fetchDataRawFormat(
      { username },
      res,
      gqlQueries.languageStatsQuery
    );
  }
  else {
    res.status(400).json({
      error: 'Missing or invalid query parameter: username',
      solution: 'put query after discussion',
      example: 'localhost:3000/languageStats?username=uwi',
    });
  }
 
};


export const checkSubmit = async (_req : Request , res : Response)=>{
  console.log(_req.body)
   const id = _req.params.id;
   const csrf = _req.body.csrf;
   const session = _req.body.session
   if(id && csrf && session){
    const resp = await controllers.sendHttpGetJson(`https://leetcode.com/submissions/detail/${id}/check/`,{ Referer:"https://leetcode.com/",Cookie:`csrftoken=${csrf}; LEETCODE_SESSION=${session}`})
    res.json(resp)
   }else {
    res.status(400).json({
      error: 'Missing or invalid query parameters',
      solution: 'put csrf, loginsession & submisson id',
    });
  }
}

export const submitCode = async (_req: Request , res: Response)=>{
  const slug = _req.params.slug
  const question_id =  _req.body.question_id;
  const csrf = _req.body.csrf;
  const session = _req.body.session;
  const typed_code = _req.body.typed_code;
  const lang = _req.body.lang;
  if(question_id && csrf && session && typed_code && lang){
    const resp = await controllers.SendPostHttp(`https://leetcode.com/problems/${slug}/submit/`,{lang,question_id,typed_code},{ "x-csrftoken":csrf,Referer:`https://leetcode.com/problems/${slug}/description/`,Cookie:`csrftoken=${csrf}; LEETCODE_SESSION=${session}`})
    res.json(resp)
  }else{
    res.status(400).json({
      error: 'Missing or invalid query parameters',
      solution: 'put csrf, loginsession & submisson id',
    });
  }

}