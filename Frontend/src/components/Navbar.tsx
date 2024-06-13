import { useState } from "react"

export default function Navbar() {
    const [hammenu, setHammenu] = useState<boolean>(false)
    return (
        <nav className="fixed bg-white bg-opacity-90 flex justify-between w-full px-4 py-2">
            <span className="">Quizapp</span>
            <div className="visible md:invisible">
                <button className="" onClick={() => { setHammenu(!hammenu) }}>
                    {!hammenu &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    }
                    {hammenu &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    }
                </button>
                {hammenu &&
                    <div className="w-[280px] min-h-screen bg-red-300">
                         
                    </div>
                }
            </div>
        </nav>
    )
}