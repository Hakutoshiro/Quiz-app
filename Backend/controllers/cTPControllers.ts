import { AttemptQuiz } from "../models/AttemptQuiz";
import { TestPaper } from "../models/TestPaper";
import { UserModel } from "../models/UserModel";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET_KEY;

const CreateTestPapers = async (req: any, res: any) => {
    const { name, testQuestions } = req.body;
    try {
        TestPaper.create({
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
        res.status(200).json(quizzes);
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
        res.json(attemptedQuizzes);
    } catch (error: any) { 
        res.json(error)
    }

}

export { CreateTestPapers, getAllQuizzes, getQuiz, handleSubmission , getAllAttemptedQuizzes};
