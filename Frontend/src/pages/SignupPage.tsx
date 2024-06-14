import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Input } from "@nextui-org/react"

export default function SignupPage() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(!name ||!email ||!password){
            window.alert("Please fill all the fields")
            return
        }
        try {
            console.log(name,email,password)
            const {data} = await axios.post("/user/signup",{name,email,password})
            console.log(data)
            localStorage.setItem("token",JSON.stringify(data.token))
        } catch (error) {
            window.alert("Signup failed")
        }
    }

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <form className="w-11/12 max-w-[400px] py-28 mx-auto text-center  flex flex-col" 
            onSubmit={handleSubmit}>
            <h1 className="font-bold text-3xl pb-3 pt-6">Sign Up</h1>
            
            <Input 
                placeholder="Name" 
                type="text" 
                className="w-11/12  mx-auto my-4 "
                value={name} onChange={handleNameChange}/>

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
                Sign Up
            </Button>
            <Link to="/" className="underline pb-3">Login</Link>
        </form>
    )
}