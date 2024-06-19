import {Schema, model} from 'mongoose';

const testPaperSchema = new Schema({
    name :{type: String, required: true},
    testQuestions:[{
        questions : String,
        correctAnswer : String,
        options :{
            a:String,
            b:String,
            c:String,
            d:String
        },
    }] 
});

export const TestPaper = model('TestPaper', testPaperSchema);

