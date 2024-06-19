import express from 'express';
import { CreateTestPapers, getAllQuizzes } from '../controllers/cTPControllers';
import { checkAuthenticity } from '../middlewares/Authentication';
import { checkAuthority } from '../middlewares/Authorization';
const CTPaperRouter = express.Router();

CTPaperRouter.post('/',checkAuthority("admin"),CreateTestPapers );
CTPaperRouter.get('/getAllQuizzes',checkAuthenticity,getAllQuizzes );

export { CTPaperRouter }