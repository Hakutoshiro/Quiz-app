import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../sharedContext/UserContext"
import { Button, Input } from "@nextui-org/react"

export default function LoginPage() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [navigate,setNavigate] = useState(false)
    const user = useContext(UserContext)
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(!email ||!password){
            window.alert("Please fill all the fields")
            return
        }
        try {
            const {data} = await axios.post("/user/login",{email,password})
            console.log(data)
            localStorage.setItem("token",JSON.stringify(data.token))
            user?.setUser(data.userDoc)
            window.alert("Login successful")
            setNavigate(true)
        } catch (error) {
            window.alert("Login failed")
        }
    }

    if(navigate || user?.user ){
        return <Navigate to={"/user"} />
    }

    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <form className="w-11/12 max-w-[400px] mx-auto py-32 text-center flex flex-col"
            onSubmit={handleSubmit}>
            <h1 className="font-bold text-3xl pb-3 pt-6">Login</h1>
            <Input 
                type="text" 
                placeholder="Email" 
                className="w-11/12  mx-auto my-4 " 
                value={email} onChange={handleEmailChange} />
            <Input 
                type="password" 
                placeholder="Password" 
                className="w-11/12  mx-auto my-4 " 
                value={password} onChange={handlePasswordChange} />
            <Button 
                type="submit" 
                color="primary"
                className="w-11/12  mx-auto my-4 "  >
                Login
            </Button>
            <Link to="/signup" className="underline pb-3">Signup</Link>
        </form>
    )
}