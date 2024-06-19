import { Card, CardHeader } from "@nextui-org/react"

interface Option{
    a: string,
    b: string,
    c: string,
    d: string
}

interface TestQuestion{
    questions: string,
    options : Option,
    correctAnswer: string
    }




export default function QuestionCard({testQuestions}: {testQuestions: TestQuestion[] | null}){
    return (
        <div className="py-10">
        {
            testQuestions?.map((question, index) => {
                return (
                    <Card key={index} className="w-11/12 max-w-[600px] mx-auto  text-start  flex flex-col items-start my-2">
                        <CardHeader className="font-bold text-3xl pl-2 pb-3 pt-3 w-full ">{question.questions}</CardHeader>
                        <h1><span className="font-bold text-primary-400 px-3 text-lg">Option A:</span> {question.options.a} </h1>
                        <h1><span className="font-bold text-primary-400 px-3 text-lg">Option B:</span> {question.options.b} </h1>
                        <h1><span className="font-bold text-primary-400 px-3 text-lg">Option C:</span> {question.options.c} </h1>
                        <h1><span className="font-bold text-primary-400 px-3 text-lg">Option D:</span> {question.options.d} </h1>
                        <h1><span className="font-bold text-primary-400 px-3 text-lg">Correct Answer:</span> {question.correctAnswer} </h1>
                    </Card>
                )
            })
        }
        </div>
    )
}