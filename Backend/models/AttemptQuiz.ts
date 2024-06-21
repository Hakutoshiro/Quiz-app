import { Schema,model } from "mongoose";

const attemptQuizSchema = new Schema({
    studentId : {type :Schema.Types.ObjectId,ref:'User'},
    quizId : {type :Schema.Types.ObjectId,ref:'TestPaper'},
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
    }] ,
    optionsChosen : [String],
    correctAnswers : [String],
    score : Number
})

export const AttemptQuiz = model('AttemptQuiz',attemptQuizSchema);
