import { Card, CardBody, CircularProgress } from "@nextui-org/react"
import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function ReviewPage() {

    interface TestQuestions {
        length: ReactNode
        questions: String,
        correctAnswer: String,
        options: {
            a: String,
            b: String,
            c: String,
            d: String
        }
    }

    const { id } = useParams()
    const [questions, setQuestions] = useState<TestQuestions[]>([])
    const [quizName, setQuizName] = useState<string>("")
    const [chosenAnswer, setChosenAnswer] = useState<string[]>([])
    const [correctAnswers, setCorrectAnswers] = useState<String[]>([])
    const [length, setLength] = useState<number>(0)
    const [score, setScore] = useState<number>(0)

    const getQuiz = async () => {
        const { data } = await axios.get('/quizpaper/reviewQuiz/' + id, {
            headers:
            {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setQuestions(data?.testQuestions)
        setQuizName(data?.name)
        setChosenAnswer(data?.optionsChosen)
        setCorrectAnswers(data?.correctAnswers)
        setScore(data?.score)
        setLength(data?.testQuestions.length)
    }

    useEffect(() => {
        getQuiz()
    }, [])

    return (
        <div className="w-full max-w-[720px]  mx-auto h-auto py-10">
            <div className="w-11/12 mx-auto sm:flex sm:justify-around sm:items-center text-center">
                <h1 className="text-5xl font-bold py-10 ">{quizName}</h1>
                <CircularProgress
                    label="Score"
                    size="lg"
                    value={score / length * 100}
                    color="primary"
                    strokeWidth={3}
                    formatOptions={{ style: "percent" }}
                    showValueLabel={true}
                    classNames={{
                        svg: "w-28 h-28 drop-shadow-md",
                        indicator: "stroke-primary",
                        track: "stroke-white/15",
                        value: "text-3xl font-semibold text-white",
                    }}
                    className="mx-auto sm:mx-0"
                />
            </div>
            {
                questions.map((question, index) => {

                    return (
                        <div className="w-11/12 mx-auto h-auto py-8" key={index}>
                            <Card className="mb-2">
                                <CardBody className=" flex flex-row items-center justify-between">
                                    <div className="">
                                        <span className="text-primary text-md px-1">Q{index + 1}. </span> {question.questions}
                                    </div>
                                    <div className="">
                                        {
                                            correctAnswers[index] === chosenAnswer[index] &&
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-success w-[20px] h-[20px]  ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        }{
                                            correctAnswers[index] !== chosenAnswer[index] &&
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-danger w-[22px] h-[22px] ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        }
                                    </div>

                                </CardBody>
                            </Card>
                            <ul className="w-full flex flex-col items-start">
                                <li value={"a"} className={correctAnswers[index] === "a" ?
                                    "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start bg-green-600" :
                                    chosenAnswer[index] === "a" ?
                                        "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start bg-red-600" : "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start"}>
                                    <span className="text-primary text-md ">A: </span>{question.options.a}
                                </li>
                                <li value={"b"} className={correctAnswers[index] === "b" ?
                                    "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start bg-green-600" :
                                    chosenAnswer[index] === "b" ?
                                        "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start bg-red-600" : "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start"}>
                                    <span className="text-primary text-md ">B: </span>{question.options.b}
                                </li>
                                <li value={"c"} className={correctAnswers[index] === "c" ?
                                    "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start bg-green-600" :
                                    chosenAnswer[index] === "c" ?
                                        "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start bg-red-600" : "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start"}>
                                    <span className="text-primary text-md ">C: </span>{question.options.c}
                                </li>
                                <li value={"d"} className={correctAnswers[index] === "d" ?
                                    "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start bg-green-600" :
                                    chosenAnswer[index] === "d" ?
                                        "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start bg-red-600" : "w-full my-1 flex gap-2 px-3 py-2 bg-opacity-90 rounded-lg  justify-start"}>
                                    <span className="text-primary text-md ">D: </span>{question.options.d}
                                </li>
                            </ul>
                        </div>
                    )
                })
            }

        </div>
    )
}