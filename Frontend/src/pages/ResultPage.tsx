import { ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { Navigate, useParams } from "react-router-dom"
import { useUserContext } from "../sharedContext/UserContext";
import { Link, Card, CardBody, CardHeader, Button, Progress } from "@nextui-org/react"

export default function ResultPage() {

    const UserContext = useUserContext();
    if (UserContext?.ready && !UserContext?.user) {
        window.alert("Please login first");
        return <Navigate to="/" />
    }
    else if (UserContext?.ready && UserContext?.user?.role !== "user") {
        window.alert("User is not admin");
        return <Navigate to="/user" />
    }

    interface Quiz {
        _id: ReactNode,
        name: string,
        testQuestions: {
            length: ReactNode
            questions: String,
            correctAnswer: String,
            options: {
                a: String,
                b: String,
                c: String,
                d: String
            }[],
        }
        optionsChosen: [String],
        correctAnswers: [String],
        score: number
    }
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const { id } = useParams()
    const getQuizzes = async () => {
        const { data } = await axios.get("/quizpaper/getAllAttemptedQuizzes/" + id, {
            headers:
            {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setQuizzes(data)
    }
    useEffect(() => {
        getQuizzes()
    }, [])

    return (
        <div className="w-11/12 max-w-[680px] mx-auto h-auto py-[40px] ">
            {
                quizzes.map((quiz, index) => {
                    return (
                        <Card className=" w-11/12 max-w-[680px] min-h-[150px] my-2 mx-auto" key={index}>
                            <CardHeader className="text-2xl">{quiz.name.toUpperCase()}</CardHeader>
                            <CardBody className="text-sm ">Number of Questions: {quiz.testQuestions.length}
                                <div className="w-full h-auto flex justify-between items-center">
                                    {UserContext?.ready && UserContext?.user?.role === "user" && (
                                        <>
                                            <div className="w-2/5 flex items-center ">
                                                <Progress
                                                    maxValue={Number(quiz.testQuestions.length)}
                                                    value={quiz.score}
                                                    className="w-full  px-1 "
                                                />
                                                {quiz.score}/{quiz.testQuestions.length}
                                            </div>
                                            <Link
                                                href={"/user/reviewQuiz/" + quiz._id}>
                                                <Button
                                                    color="primary"
                                                    className="  my-2 bg-gradient-to-r from-primary-200 to-primary-500 "

                                                >
                                                    Review Quiz
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    )
                })
            }
        </div>
    )
}