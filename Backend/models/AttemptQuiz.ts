import { Schema,model } from "mongoose";

const attemptQuizSchema = new Schema({
    studentId : {type :Schema.Types.ObjectId,ref:'User'},
    quizId : {type :Schema.Types.ObjectId,ref:'TestPaper'},
    status :{type: String},
    optionsChosen : [String],
    score : Number
})

export const AttemptQuiz = model('AttemptQuiz',attemptQuizSchema);
