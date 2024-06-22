import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../sharedContext/UserContext"
import { Button, CircularProgress, Input } from "@nextui-org/react"

export default function LoginPage() {
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [navigate,setNavigate] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const user = useContext(UserContext)
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(true)
        if(!email ||!password){
            window.alert("Please fill all the fields")
            setIsLoading(false)
            return
        }
        try {
            const {data} = await axios.post("/user/login",{email,password})
            localStorage.setItem("token",JSON.stringify(data.token))
            user?.setUser(data.userDoc)
            
            setNavigate(true)
        } catch (error) {
            setIsLoading(false)
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
                    {isLoading && <CircularProgress  size="sm" aria-label="Loading..."/>}
                    {!isLoading && <>Login</>  }
            </Button>
            <Link to="/signup" className="underline pb-3">Signup</Link>
        </form>
    )
}