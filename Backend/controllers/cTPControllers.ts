import { TestPaper } from '../models/TestPaper';



const CreateTestPapers =  async (req : any , res : any ) => {
    const { name, testQuestions } = req.body;
    try {
        TestPaper.create({
            name,
            testQuestions
        })
        res.status(201).json({message: "Test Paper Created Successfully"})
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}

const getAllQuizzes = async (req : any , res : any ) => {
    try {
        const quizzes = await TestPaper.find();
        res.status(200).json(quizzes)
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}

export { CreateTestPapers ,getAllQuizzes}