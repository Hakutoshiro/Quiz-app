import { TestPaper } from '../models/TestPaper';

const CreateTestPapers =  async (req : any , res : any ) => {
    const {name , questions , answers , options} = req.body;
    try {
        const testPaper = new TestPaper({
            name,
            questions,
            answers,
            options
        });
        await testPaper.save();
        res.json('Test Paper Created');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { CreateTestPapers }