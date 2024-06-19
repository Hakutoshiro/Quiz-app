import express from 'express';
const cors = require('cors'); 
const { mongoConnection } = require( './connection.ts');
require('dotenv').config();
const cookieParser = require('cookie-parser');
import {UserRouter} from './routes/userRoutes';
import { CTPaperRouter } from './routes/createTestPapers';

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({  
    credentials:true,
    origin:process.env.FRONTEND_URL,
}));

mongoConnection(process.env.MONGO_URL);

app.use('/user',UserRouter)
app.use('/quizpaper',  CTPaperRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});