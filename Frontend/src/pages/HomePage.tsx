import { Navigate } from "react-router-dom"
import { useUserContext } from "../sharedContext/UserContext"
import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"


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
    const [quizzes, setQuizzes] = useState<Quiz[] >([])

    const getQuizzes = async () => {
        const {data} = await axios.get("/quizpaper/getAllQuizzes",
            {headers:
                {authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        setQuizzes(data)
    }

    useEffect(() => {
        getQuizzes()
    },[])
    const UserContext = useUserContext()

    if (UserContext?.ready && !UserContext?.user) {
        return <Navigate to={"/"} />
    }
    return (
        <div className="w-11/12 max-w-[680px] mx-auto h-auto py-[40px] ">
            {
                quizzes.map((quiz,index) => {
                    return (
                       <Card className=" w-11/12 max-w-[680px] h-[150px] my-2 mx-auto" key={index}>
                            <CardHeader className="text-2xl">{quiz.name.toUpperCase()}</CardHeader>
                            <CardBody className="text-sm ">Number of Questions: {quiz.testQuestions.length}  </CardBody>
                       </Card>
                    )
                })
            }
        </div>
    )
}