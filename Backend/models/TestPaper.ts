import {Schema, model} from 'mongoose';

const testPaperSchema = new Schema({
    name :{type: String, required: true},
    questions : [String],
    answers : [String],
    options :[{
        a:String,
        b:String,
        c:String,
        d:String
    }],
});

export const TestPaper = model('TestPaper', testPaperSchema);

