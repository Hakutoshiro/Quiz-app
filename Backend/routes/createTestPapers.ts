import express from 'express';
import { CreateTestPapers, getAllAttemptedQuizzes, getAllQuizzes, getQuiz, handleSubmission } from '../controllers/cTPControllers';
import { checkAuthenticity } from '../middlewares/Authentication';
import { checkAuthority } from '../middlewares/Authorization';
const CTPaperRouter = express.Router();

CTPaperRouter.post('/',checkAuthority("admin"),CreateTestPapers );
CTPaperRouter.get('/getAllQuizzes',checkAuthenticity,getAllQuizzes );
CTPaperRouter.get('/quiz/:id?',checkAuthority("user"),getQuiz)
CTPaperRouter.post('/attemptquiz',handleSubmission)
CTPaperRouter.get('/getAllAttemptedQuizzes/:id?',checkAuthority("user"),getAllAttemptedQuizzes)

export { CTPaperRouter }