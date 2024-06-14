import axios from "axios";
import { createContext, useEffect, useState ,ReactNode, useContext} from "react";

interface UserContextInterface {
    user: User | null,
    setUser: (user: User | null) => void,
    ready: boolean
}



export const UserContext = createContext<UserContextInterface | null>(null);

export const useUserContext = () =>{
    return useContext(UserContext);
}

interface User {
    id: string,
    name: string,
    email:string,
    role: string
}
export function UserContextProvider({children}: { children: ReactNode }){
     
    const [user,setUser] = useState<User | null>(null);
    const [ready,setReady] =useState<boolean>(false);
    const getUser = async () =>{
        const token = localStorage.getItem('token')
            if(token !== null){
                const {data} =await   axios.get('/user/profile',{headers:{authorization: `Bearer ${token}`}})
                setUser(data);
                setReady(true);
            }
    }
    
    useEffect( ()=>
    {
        if(!user){
            getUser();
        }
    })
    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    )
}