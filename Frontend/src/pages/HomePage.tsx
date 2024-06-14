import { Navigate } from "react-router-dom"
import { useUserContext } from "../sharedContext/UserContext"


export default function HomePage() {
    
    const UserContext = useUserContext()

    if(!UserContext?.user){
        return <Navigate to={"/"} />
    }
    return (
        <div className="py-[40px]">
            <h1>Home Page for {UserContext?.user?.name} </h1>
        </div>
    )
}