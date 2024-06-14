import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../sharedContext/UserContext"

export default function LoginPage() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [navigate,setNavigate] = useState(false)
    const user = useContext(UserContext)
    const handleSubmit = async (e:any) =>{
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

    return (
        <form className="w-11/12 max-w-[400px] mx-auto text-center  md:border md:border-black md:rounded-md flex flex-col"
            onSubmit={(e) => handleSubmit(e)}>
            <h1 className="font-bold text-3xl pb-3 pt-6">Login Page</h1>
            <input 
                type="text" 
                placeholder="Email" 
                className="w-11/12 px-3 py-3 mx-auto my-4 border border-gray-200 rounded-md" 
                value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input 
                type="password" 
                placeholder="Password" 
                className="w-11/12 px-3 py-3 mx-auto my-4 border border-gray-200 rounded-md" 
                value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <input
                type="submit"
                value={"Login"} 
                className="w-11/12 px-3 py-3 mx-auto my-4 border border-gray-200 rounded-md"/>
            <Link to="/signup" className="underline pb-3">Signup</Link>
        </form>
    )
}