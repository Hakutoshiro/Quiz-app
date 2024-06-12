import { useState } from "react"

export default function LoginPage() {
    const [mail,setMail] = useState("")
    const [password,setPassword] = useState("")

    return (
        <form className="w-[400px] mx-auto text-center my-28 md:border md:border-black md:rounded-md flex flex-col">
            <h1 className="font-bold text-3xl pb-3 pt-6">Login Page</h1>
            <input 
                type="text" 
                placeholder="Email" 
                className="w-11/12 px-3 py-3 mx-auto my-4 border border-gray-200 rounded-md" 
                value={mail} onChange={(e) => { setMail(e.target.value) }} />
            <input 
                type="password" 
                placeholder="Password" 
                className="w-11/12 px-3 py-3 mx-auto my-4 border border-gray-200 rounded-md" 
                value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <button 
                className="w-11/12 px-3 py-3 mx-auto my-4 border border-gray-200 rounded-md">
                    Login
            </button>
        </form>
    )
}