import { useState } from "react"
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../sharedContext/UserContext";


export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [logOut, setLogOut] = useState<boolean>(false);
    const UserContext = useUserContext()
    const handleLogout = (e : React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        UserContext?.setUser(null)
        localStorage.removeItem("token")
        setLogOut(true)
    }

    if(logOut){
        return <Navigate to={"/"}/>
    }

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarBrand>
                    <p className="font-bold text-inherit text-primary-300">QuizApp</p>
                </NavbarBrand>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />

            </NavbarContent>

            
            <NavbarMenu>
            <NavbarMenuItem >
                        <Button
                            color={"danger"}
                            className="w-full"
                            onClick={handleLogout}
                            size="lg">
                            Logout
                        </Button>
                    </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}