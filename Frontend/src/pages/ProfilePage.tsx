import { Navigate } from "react-router-dom"
import { useUserContext } from "../sharedContext/UserContext"
import { useState } from "react";
import { Button, Card } from "@nextui-org/react";



export default function ProfilePage() {
    const [logOut, setLogOut] = useState<boolean>(false);
    const UserContext = useUserContext()


    if ((!UserContext?.user && UserContext?.ready) || logOut) {
        return <Navigate to={"/"} />
    }

    const handleLogout = (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        UserContext?.setUser(null)
        localStorage.removeItem("token")
        setLogOut(true)
    }

    return (
        <>
            <Card className="w-11/12 max-w-[400px] mx-auto my-32 text-center flex flex-col items-start">
                <h1 className="font-bold text-3xl pb-3 pt-6 w-full ">Profile Page</h1>
                <h1><span className="font-bold text-primary-400 px-3 text-lg">Name:</span> {UserContext?.user?.name} </h1>
                <h1><span className="font-bold text-primary-400 px-3 text-lg">Email:</span> {UserContext?.user?.email} </h1>
                <Button
                    color={"danger"}
                    className="w-10/12 my-5 mx-auto"
                    onClick={handleLogout}
                    size="md"
                >
                    Logout
                </Button>
            </Card>
        </>
    )
}