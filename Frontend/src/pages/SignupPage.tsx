import axios from "axios"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { Button, Input ,CircularProgress } from "@nextui-org/react"
import { useUserContext } from "../sharedContext/UserContext"

export default function SignupPage() {
    const [name,setName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [nav,setNav] = useState<boolean>(false)
    const UserContext = useUserContext()
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(true)
        if(!name ||!email ||!password){
            window.alert("Please fill all the fields")
            setIsLoading(false)
            return
        }
        try {
            const {data} = await axios.post("/user/signup",{name,email,password})
            localStorage.setItem("token",JSON.stringify(data.token))
            UserContext?.setUser(data.userDoc)
            setNav(true)
        } catch (error) {
            setIsLoading(false)
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

    if(nav){
        return <Navigate to={"/user"} />
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
                    {isLoading && <CircularProgress   size="sm" aria-label="Loading..."/>}
                    {!isLoading && <>Sign Up</>  }
            </Button>
            <Link to="/" className="underline pb-3">Login</Link>
        </form>
    )
}