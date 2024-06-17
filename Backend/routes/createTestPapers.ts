import express from 'express';
import { CreateTestPapers } from '../controllers/cTPControllers';
const CTPaperRouter = express.Router();

CTPaperRouter.post('/',CreateTestPapers );

export { CTPaperRouter }