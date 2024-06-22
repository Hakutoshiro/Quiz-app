import { Navigate } from "react-router-dom"
import { useUserContext } from "../sharedContext/UserContext"
import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { Link, Card, CardBody, CardHeader, Button } from "@nextui-org/react"


export default function HomePage() {
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
    }
    interface Quiz2 {
        _id: ReactNode,
        quizId: ReactNode,
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
    }

    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [attemptedQuizzes, setAttemptedQuizzes] = useState<Quiz2[]>([])

    const getQuizzes = async () => {
        const { data } = await axios.get("/quizpaper/getAllQuizzes", {
            headers:
            {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setAttemptedQuizzes(data?.AttemptedQuizzes)
        setQuizzes(data?.quizzes)

    }

    useEffect(() => {
        getQuizzes()
    }, [])
    const UserContext = useUserContext()

    if (UserContext?.ready && !UserContext?.user) {
        return <Navigate to={"/"} />
    }
    return (
        <div className="w-11/12 max-w-[680px] mx-auto h-auto py-[40px] ">
            {
                quizzes.map((quiz, index) => {
                    if(attemptedQuizzes.findIndex(obj => obj.quizId === quiz._id) === -1){
                        return (
                            <Card className=" w-11/12 max-w-[680px] min-h-[150px] my-2 mx-auto" key={index}>
                                <CardHeader className="text-2xl">{quiz.name.toUpperCase()}</CardHeader>
                                <CardBody className="text-sm ">Number of Questions: {quiz.testQuestions.length}
                                    <div className="w-full h-auto flex justify-end">
                                        {UserContext?.ready && UserContext?.user?.role === "user" && (
                                            <Link
                                                href={"/quiz/" + quiz._id}>
                                                <Button
                                                    color="primary"
                                                    className="  my-2 bg-gradient-to-r from-primary-200 to-primary-500 "
    
                                                >
                                                    {localStorage.getItem(""+quiz._id )===null ? "Start Quiz" : "Resume Quiz"}
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    }
                })
            }
        </div>
    )
}