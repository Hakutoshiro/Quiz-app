import { ReactNode, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { Card, CardBody, RadioGroup, Radio, Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"

export default function () {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    const [length, setLength] = useState<number>(0)
    const [correctAnswers, setCorrectAnswers] = useState<String[]>([])
    const [navigate, setNavigate] = useState<boolean>(false)
    const getQuiz = async () => {
        const { data } = await axios.get('/quizpaper/quiz/' + id, {
            headers:
            {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setQuestions(data?.testQuestions)
        setQuizName(data?.name)
        setLength(data?.testQuestions.length)
    }

    const handleUpdateChosenAnswer = (index: number, e: React.ChangeEvent<HTMLInputElement>, correctAnswer: String) => {
        
        chosenAnswer[index] = e.target.value
        correctAnswers[index] = correctAnswer
        setChosenAnswer([...chosenAnswer])
        localStorage.setItem("" + id, JSON.stringify(chosenAnswer))
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        localStorage.removeItem("" + id)
        await initialCorrectAnswers()
        
    }

    const handleConfirmSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const { data } = await axios.post('/quizpaper/attemptquiz', {
            quizId: id,
            optionsChosen: chosenAnswer,
            correctAnswers: correctAnswers,
            name: quizName,
            testQuestions: questions
        }, {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        }
        )
        if (data) {
            setNavigate(true)
        }


    }

    

    const initialChosenAnswer = () => {
        const x = localStorage.getItem("" + id)
        if (x) {
            setChosenAnswer(JSON.parse(x))
        } else {
            const ChosenAnswer: string[] = new Array<string>(length).fill("")
            setChosenAnswer(ChosenAnswer)
        }
    }

    const initialCorrectAnswers = async () => {

        const CorrectAnswers: String[] = new Array<String>(length).fill("")
        await questions?.map((que, index) => {
            CorrectAnswers[index] = que.correctAnswer
        })
        setCorrectAnswers([...CorrectAnswers])
    }

    useEffect(() => {
        getQuiz()
        initialChosenAnswer()
    }, [])

    if (navigate) {
        return <Navigate to="/user" />
    }

    return (
        <div className="w-full max-w-[720px] text-center mx-auto h-auto py-10">
            <h1 className="text-5xl font-bold py-10">{quizName}</h1>
            {
                questions.map((question, index) => {

                    return (
                        <div className="w-11/12 mx-auto h-auto py-8" key={index}>
                            <Card className="mb-2">
                                <CardBody className=" inline-block"><span className="text-primary text-md px-1">Q{index + 1}. </span> {question.questions} </CardBody>
                            </Card>
                            <RadioGroup defaultValue={chosenAnswer[index]}>
                                <Radio value={"a"} className="w-full my-1  justify-start "
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateChosenAnswer(index, e, question.correctAnswer)}>
                                    <span className="text-primary text-md ">A: </span>{question.options.a}
                                </Radio>
                                <Radio value={"b"} className="w-full my-1  justify-start "
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateChosenAnswer(index, e, question.correctAnswer)}>
                                    <span className="text-primary text-md ">B: </span>{question.options.b}
                                </Radio>
                                <Radio value={"c"} className="w-full my-1  justify-start "
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateChosenAnswer(index, e, question.correctAnswer)}>
                                    <span className="text-primary text-md ">C: </span>{question.options.c}
                                </Radio>
                                <Radio value={"d"} className="w-full my-1  justify-start "
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateChosenAnswer(index, e, question.correctAnswer)}>
                                    <span className="text-primary text-md ">D: </span>{question.options.d}
                                </Radio>
                            </RadioGroup>
                        </div>
                    )
                })
            }
            <Button
                className=" w-full max-w-[720px] bg-gradient-to-r from-primary-200 to-primary-500"
                onClick={handleSubmit}
                onPress={onOpen}> Submit Quiz</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-bkgrd text-white ">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirmation</ModalHeader>
                            <ModalBody>
                                <p className=" opacity-90">
                                    Are you sure you want to submit the quiz?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary"
                                    onPress={onClose}
                                    onClick={handleConfirmSubmit}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}