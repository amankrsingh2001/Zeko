"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BsBank2 } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";

interface ConstrainValue {
  video: any;
}

export default function AccessCheck({}) {
  const [cameraChecked, setCameraChecked] = useState(false)
  const [voiceChecked, setVoiceChecked] = useState(false)
  const [speakerChecked, setSpeakerChecked] = useState(false)
  const [screenShareCheck, setScreenShareCheck] = useState(false)

  const [cameraInput, setCameraInput] = useState(false)


  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  async function getMedia(constraints: ConstrainValue) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(videoRef.current)
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraChecked(true)
        setCameraInput(true)
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMedia({video: { width: 1280, height: 720 },});
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
        checked={cameraInput} // Bind the checkbox state to cameraInput
        onChange={(e) => setCameraInput(e.target.checked)} // Update cameraInput when checkbox is toggled
      />
        </div>
      </div>
    </div>
  );
}
