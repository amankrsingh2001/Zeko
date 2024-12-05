'use strict'

import { QuestionsSection } from "@/utils/data";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ConstrainValue {
    video: any;
  }

export default function Main(){
    const [currentQuestion, setCurrentQuestion ] = useState(0)
    const [textContent, setTextContent] = useState(QuestionsSection[currentQuestion].question1)
    const [secondTime, setSecondTime] = useState(60)


    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter()

    const nextClickHandler = () =>{
        if (currentQuestion < QuestionsSection.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTextContent(QuestionsSection[currentQuestion+1].question1)
          }
    }

    const submitHandler = () =>{
      router.push('/submit')
    }
let timer:any;

  useEffect(()=>{
    timer = setInterval(()=>{
      setSecondTime((prevSecondTime) => Math.max(prevSecondTime - 1, 0)); 
    },1000)

    return () =>{
      clearInterval(timer)
    }
  },[textContent])
 


  
    async function getMedia(constraints: ConstrainValue) {
      let stream = null;
  
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        console.log(err);
      }
    }

    const speekClick = () =>{
        const value = new SpeechSynthesisUtterance(textContent);
        window.speechSynthesis.speak(value)
        }

        useEffect(()=>{
            speekClick()
            setSecondTime(60)
            
        },[textContent])
  
    useEffect(() => {
    if (typeof window !== "undefined") {
        getMedia({
          video: { width: 1280, height: 720 },
        });
    }}, []);



    return <div className="w-full h-full flex justify-center items-center flex-col text-white gap-8">
            <div>
                <p className="text-md">{currentQuestion+1}/{QuestionsSection.length}</p>
            </div>
        <div>
            <p className="text-white text-md">{QuestionsSection[currentQuestion].question1}</p>
        </div>

        <div className="flex gap-4">
          <p className="font-bold">Timer :</p>
         <p>
         {"00 : " + (secondTime<10? "0"+ secondTime: secondTime)}
          </p> 
        </div>
          <div className="flex flex-col ">
            <video
              ref={videoRef}
              autoPlay
              width="600"
              height="600"
              className="shadow-xl rounded-md"
            ></video>
        </div>
        {

          currentQuestion+1 !==  QuestionsSection.length && <button className="bg-[#6C60F3] text-white font-bold py-2 px-4 rounded-md" onClick={nextClickHandler}>Save & Next</button>

        }
            {
              
              currentQuestion+1 === QuestionsSection.length && <button className="bg-[#6C60F3] text-white font-bold py-2 px-4 rounded-md" onClick={submitHandler}>Submit your answer</button>
            }
    </div>
}