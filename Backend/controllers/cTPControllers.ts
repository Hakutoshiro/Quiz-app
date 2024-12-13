import { AttemptQuiz } from "../models/AttemptQuiz";
import { TestPaper } from "../models/TestPaper";
import { UserModel } from "../models/UserModel";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET_KEY;

const CreateTestPapers = async (req: any, res: any) => {
    const { name, testQuestions,adminId } = req.body;
    
    try {
        TestPaper.create({
            adminId,
            name,
            testQuestions,
        });
        res.status(201).json({ message: "Test Paper Created Successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const getAllQuizzes = async (req: any, res: any) => {
    try {
        const quizzes = await TestPaper.find();
        const token = req.headers.authorization.split(" ")[1].replace(/"/g,"");
        if(token){
            jwt.verify(token,jwtSecret,{},async (err:any,user:{email:string,id:string,name:string})=>
            {
                const AttemptedQuizzes = await AttemptQuiz.find({ studentId: user.id });
                res.status(200).json({quizzes,AttemptedQuizzes});
            })
        }
        else {
            res.json(null);
        }
        
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const getQuiz = async (req: any, res: any) => {
    try {
        const quizDoc = await TestPaper.findById(req.params.id);
        res.json({ name: quizDoc?.name, testQuestions: quizDoc?.testQuestions });
    } catch (error: any) { }
};

const handleSubmission = async (req: any, res: any) => {
    const token = req.headers.authorization.split(" ")[1].replace(/"/g, "");
    if (token) {
        jwt.verify(
            token,
            jwtSecret,
            {},
            async (err: any, user: { email: string; id: string; name: string }) => {
                try {
                    const { quizId, optionsChosen, correctAnswers, name, testQuestions } = req.body;
                    let score = 0;
                    for (let i = 0; i < optionsChosen.length; i++) {
                        if (optionsChosen[i] === correctAnswers[i]) {
                            score++;
                        }
                    }
                    const result = await AttemptQuiz.create({
                        studentId: user.id,
                        quizId,
                        name,
                        testQuestions,
                        optionsChosen,
                        correctAnswers,
                        score,
                    });
                    res.json(result);
                } catch (error) { }
            }
        );
    } else {
        res.json(null);
    }
};

const getAllAttemptedQuizzes = async (req: any, res: any) => {
    try {
        const attemptedQuizzes = await AttemptQuiz.find({ studentId: req.params.id });
        res.status(200).json(attemptedQuizzes);
    } catch (error: any) { 
        res.status(400).json(error)
    }

}

const getQuizToReview = async (req: any, res: any) => {
    try {
        const quizDoc = await AttemptQuiz.findById(req.params.id);
        
        res.status(200).json({ name: quizDoc?.name, testQuestions: quizDoc?.testQuestions , optionsChosen: quizDoc?.optionsChosen , correctAnswers: quizDoc?.correctAnswers , score: quizDoc?.score});
    } catch (error: any) { 
        res.status(400).json(error)
    }
}

export { CreateTestPapers, getAllQuizzes, getQuiz, handleSubmission , getAllAttemptedQuizzes ,getQuizToReview}; 
