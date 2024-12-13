import { Navigate } from "react-router-dom";
import { useUserContext } from "../sharedContext/UserContext";
import axios from "axios";
import { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, useDisclosure } from "@nextui-org/react";
import QuestionCard from "../components/QuestionCard";



export default function TestPaperForm() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const UserContext = useUserContext();
    if (UserContext?.ready && !UserContext?.user) {
        window.alert("Please login first");
        return <Navigate to="/" />
    }
    else if (UserContext?.ready && UserContext?.user?.role !== "admin") {
        window.alert("User is not admin");
        return <Navigate to="/user" />
    }
    interface Option {
        a: string,
        b: string,
        c: string,
        d: string
    }

    interface TestQuestion {
        questions: string,
        options: Option,
        correctAnswer: string
    }

    const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
    const [name, setName] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [options, setOptions] = useState<Option>({ a: "", b: "", c: "", d: "" });
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [nav, setNav] = useState<boolean>(false);
    const [defaultVal, setDefaultVal] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    }

    const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptions({ ...options, [e.target.name]: e.target.value });
    }

    const handleAddButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !question || !options.a || !options.b || !options.c || !options.d || !correctAnswer) {
            window.alert("Please fill all the fields");
            return;
        }
        setTestQuestions([...testQuestions, { questions: question, options: options, correctAnswer: correctAnswer }])
        setQuestion("");
        setOptions({ a: "", b: "", c: "", d: "" });
    }

    const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCorrectAnswer(e.target.value);
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!name || !testQuestions) {
            window.alert("Please fill all the fields");
            return;
        }
        try {
            await axios.post("/quizpaper", { name, testQuestions,adminId:UserContext.user?._id }, {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            window.alert("Quiz created successfully");
            setNav(true);
            setName("");
            setDefaultVal("");
            setTestQuestions([]);
        } catch (error) {
            window.alert("Quiz creation failed");
        }
    }
    if (nav) {
        return <Navigate to="/user" />
    }
    return (
        <div className="w-full flex flex-col">
            <form className="w-10/12 mx-auto max-w-[600px] h-auto py-5" onSubmit={handleAddButton}>
                <h1 className="font-bold text-3xl pb-3 pt-6 w-full ">Create Quiz</h1>
                <Input
                    type="text"
                    value={name}
                    placeholder="Quiz Name:"
                    onChange={handleNameChange} />

                <QuestionCard testQuestions={testQuestions} />
                <Input
                    type="text"
                    value={question}
                    placeholder="Question"
                    onChange={handleQuestionChange} />
                <ul className="py-4">
                    <li className="py-1">
                        <Input
                            type="text"
                            name="a"
                            value={options?.a}
                            placeholder="Option A"
                            onChange={handleOptionsChange} />
                    </li>
                    <li className="py-1">
                        <Input
                            name="b"
                            type="text"
                            value={options?.b}
                            placeholder="Option B"
                            onChange={handleOptionsChange} />
                    </li>
                    <li className="py-1">
                        <Input
                            name="c"
                            type="text"
                            value={options?.c}
                            placeholder="Option C"
                            onChange={handleOptionsChange} />
                    </li>
                    <li className="py-1">
                        <Input
                            type="text"
                            name="d"
                            value={options?.d}
                            placeholder="Option D"
                            onChange={handleOptionsChange} />
                    </li>
                </ul>
                <RadioGroup
                    label={"Correct Option:"}
                    orientation="horizontal"
                    defaultValue={defaultVal}
                    className="w-full flex justify-between py-3">
                    <Radio value="a" checked={correctAnswer === "a"} onChange={handleCorrectAnswerChange} className="px-10">A</Radio>
                    <Radio value="b" checked={correctAnswer === "b"} onChange={handleCorrectAnswerChange} className="px-10">B</Radio>
                    <Radio value="c" checked={correctAnswer === "c"} onChange={handleCorrectAnswerChange} className="px-10">C</Radio>
                    <Radio value="d" checked={correctAnswer === "d"} onChange={handleCorrectAnswerChange} className="px-10">D</Radio>
                </RadioGroup>
                <Button
                    color="primary"
                    className="w-full"
                    type="submit">
                    Add Question
                </Button>
            </form>
            <Button className="w-11/12 max-w-[640px] mx-auto " color="primary" onPress={onOpen}>Submit Quiz</Button>
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
                                    onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
