import React from "react";
import Navbar from "../components/instruction/navbar";

export default function accessLayout({ children }: { children: React.ReactNode }){
    return <div>
            <Navbar/>
            {children}
        </div>
}