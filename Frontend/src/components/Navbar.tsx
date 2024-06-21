import {  useState } from "react"
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, NavbarItem, Link } from "@nextui-org/react";
import { useUserContext } from "../sharedContext/UserContext";



export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const UserContext = useUserContext()
    const page = document.URL.split("/")[4]

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarBrand>
                    <Link href={'/user/'} className="font-bold text-inherit text-primary-300 ">QuizApp</Link>
                </NavbarBrand>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>
            <NavbarContent justify="end" className=" hidden lg:flex">
                <NavbarItem >
                    <Link href={"/user/"}>
                        <Button color="primary" variant={!page ? "light" : "flat"} className={!page ? "bg-gradient-to-r from-primary-200 to-primary-500 text-white" : ""}>
                            Home
                        </Button>
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link href={"/user/profile"}>
                        <Button color="primary" variant={page === "profile" ? "light" : "flat"} className={page === "profile" ? "bg-gradient-to-r from-primary-200 to-primary-500 text-white" : ""}>
                            Profile
                        </Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href={UserContext?.ready && UserContext.user ? "/user/result/"+UserContext.user?._id : ""} className={UserContext?.ready && UserContext?.user?.role === "user" ? "" : "hidden"}>
                        <Button color="primary" variant={page === "result" ? "light" : "flat"} className={page === "result" ? "bg-gradient-to-r from-primary-200 to-primary-500 text-white" : ""}>
                            Result
                        </Button>
                    </Link>

                    <Link href={"/user/quizpaper"} className={UserContext?.ready && UserContext?.user?.role === "admin" ? "" : "hidden"}>
                        <Button color="primary" variant={page === "quizpaper" ? "light" : "flat"} className={page === "quizpaper" ? "bg-gradient-to-r from-primary-200 to-primary-500 text-white" : ""}>
                            Create Quiz
                        </Button>
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-bkgrd">
                <NavbarMenuItem >
                    <NavbarMenuItem  >
                        <Link
                            className="w-full"
                            href={"/user/"}
                        >
                            Home
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link
                            className="w-full"
                            href={"/user/profile"}
                        >
                            Profile
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link href={UserContext?.ready && UserContext.user ? "/user/result/"+UserContext.user?._id : ""} className={UserContext?.ready && UserContext?.user?.role === "admin" ? "hidden" : ""}>
                                Result
                        
                        </Link>

                        <Link href={"/user/quizpaper"} className={UserContext?.ready && UserContext?.user?.role === "user" ? "hidden" : ""}>
                                Create Quiz
                        
                        </Link>
                    </NavbarMenuItem>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}