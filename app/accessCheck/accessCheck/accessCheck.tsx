"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BsBank2 } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";

interface VideoConstrainValue {
  video: any;
}

interface AudioConstrainValue {
  audio:any
}

export default function AccessCheck({}) {


  const [cameraInput, setCameraInput] = useState(false)
  const [audioInput, setAudioInput] = useState(false)
  const [speakerChecked, setSpeakerChecked] = useState(false)
  const [screenShareCheck, setScreenShareCheck] = useState(false)

 


  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  async function getMediaVideo(constraints: VideoConstrainValue) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(videoRef.current)
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        setCameraInput(true)
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMediaVideo({video: { width: 1280, height: 720 },});
  }, []);



  async function getMediaAudio(constraints: AudioConstrainValue) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({audio: constraints.audio});

      const audioElement = new Audio()
      audioElement.srcObject = stream;
      audioElement.muted = true;
      audioElement.play();
      console.log(audioElement,"This is the audio element")
      if(audioElement){
        setAudioInput(true)
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMediaAudio({audio: true});
  }, []);

  

  return (
    <div className="flex bg-transparent justify-between item-start w-[80%] ">
      <div className="flex flex-col justify-between w-full items-center gap-8">
        <div className=" w-[80%] flex justify-between">
          <h1 className="font-bold text-2xl">Trainee Interview</h1>


          <div className="flex gap-4 ">
            <div className="flex gap-2 items-center border-gray-700 border-[1px] rounded-md py-2 px-3">
              <BsBank2 className="text-orange-500 text-xl font-bold" />
              <p className="text-sm">Zeko</p>
            </div>
            <div className="flex gap-2 items-center border-gray-700 border-[1px] rounded-md py-2 px-3">
              <FaRegClock className="text-pink-400 text-xl font-bold" />
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
        </div>
        <div>
          <label>Camera check</label>
          <input
        type="checkbox"
        checked={cameraInput} 
        onChange={(e) => setCameraInput(e.target.checked)}
      />
        </div>

        <div>
          <label>Audio check</label>
          <input
        type="checkbox"
        checked={audioInput} 
        onChange={(e) => setAudioInput(e.target.checked)}
      />
        </div>
      </div>
    </div>
  );
}
