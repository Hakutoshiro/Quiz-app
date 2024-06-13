import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function SignupPage() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleSubmit = async (e:any) =>{
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
            window.alert("Signup successful")
        } catch (error) {
            window.alert("Signup failed")
        }
    }

    

    return (
        <form className="w-11/12 max-w-[400px] mx-auto text-center my-28 md:border md:border-black md:rounded-md flex flex-col" 
            onSubmit={(e) => handleSubmit(e)}>
            <h1 className="font-bold text-3xl pb-3 pt-6">Sign Up Page</h1>
            <input 
                type="text" 
                placeholder="Name" 
                className="w-11/12 px-3 py-3 mx-auto my-4 border border-gray-200 rounded-md" 
                value={name} onChange={(e) => { setName(e.target.value) }} />
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
                className="w-11/12 px-3 py-3 mx-auto my-4 border border-gray-200 rounded-md" value={"Sign Up"} />
            <Link to="/" className="underline pb-3">Login</Link>
        </form>
    )
}