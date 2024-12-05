"use client"

import { useRouter } from "next/navigation"



export default function Submitpage (){
    const router = useRouter()

    const onClickHandler = () =>{
        router.push('/instruction')
    }


    return <div className="bg-[#151D29] h-screen min-h-[calc(100vh-3.8rem) flex-col  overflow-hidden flex justify-center items-center">
       <p className="text-white text-4xl font-thin">Thanks for the ans. We will be respond back soon</p> 
       <button className="bg-[#6C60F3] mt-6 px-4 py-2 w-fit  rounded-md font-bold" onClick={onClickHandler}>Go to the main page</button>
    </div>
}