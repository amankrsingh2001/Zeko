"use client";

import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { InstructionData } from "@/utils/data";
import { useEffect, useRef } from "react";
import { BsBank2 } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { FaRegClock } from "react-icons/fa";


interface ConstrainValue {
  video:  MediaTrackConstraints | boolean;
}

export default function InstructionDetails() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter()





  async function getMedia(constraints: ConstrainValue) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: unknown) {
      console.log(err);
    }
  }

  

  useEffect(() => {
    if(typeof window !=="undefined"){
      getMedia({
        video: { width: 1280, height: 720 },
      });
    }
   
  }, []);

  return (
    <div className="bg-transparent w-full h-full min-h-[calc(100vh-3.8rem)] text-white flex justify-center items-center  ">
      <div className="flex flex-col justify-between w-full items-center gap-8">

        <div className=" w-[80%] flex justify-between">
          <h1 className="font-bold text-2xl">Trainee Interview</h1>

     

        <div className="flex gap-4 ">
          <div className="flex gap-2 items-center border-gray-700 border-[1px] rounded-md py-2 px-3">
          <BsBank2 className="text-orange-500 text-xl font-bold"/>
          <p className="text-sm">Zeko</p>
          </div>
          <div className="flex gap-2 items-center border-gray-700 border-[1px] rounded-md py-2 px-3">
          <FaRegClock className="text-pink-400 text-xl font-bold"/>
          <p className="text-sm">26 minute</p>
          </div>
          
          </div>
          

        </div>

        <div className="flex justify-between item-start  w-[80%] ">
          <div className="flex flex-col ">
            <video
              ref={videoRef}
              autoPlay
              width="600"
              height="600"
              className="shadow-xl rounded-md"
            ></video>
          </div>

          <div className=" w-full max-w-xl flex flex-col  items-start gap-4 px-4">
            <h1 className="font-extrabold font-sans text-xl">Instruction</h1>
            <div className="flex flex-col gap-3 font-serif">
              {InstructionData.map((instruction) => {
                return (
                  <div
                    className="flex gap-4 font-sans text-md"
                    key={instruction.id}
                  >
                    <p>{instruction.id}.</p>
                    <p>{instruction.instruction}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#1E293B] shadow-lg  px-2  rounded-md">
              <p className="font-thin px-4 py-3 ">
                <Link className="text-[#A3A9FE]" href={"/ai-interview"}>
                  {" "}
                  <span className="font-medium">
                  Click here{" "}
                  </span>
                  
                  <FaExternalLinkAlt className="inline mr-1 text-xs" />
                </Link>
                to try a mock interview with Avya, our Ai interviewer, and build
                your confidence before the amin interview!
              </p>
            </div>

            <button className="bg-[#6C60F3] py-3 mt-6 w-full rounded-md font-bold" onClick={()=>{
              router.push('/accessCheck')
            }}>
              Start Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
