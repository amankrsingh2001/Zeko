"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BsBank2 } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { TbUserScreen } from "react-icons/tb";





interface VideoConstrainValue {
  video: MediaTrackConstraints | boolean;
}

interface AudioConstrainValue {
  audio: MediaTrackConstraints | boolean;
}

interface DisplayMediaOptions {
  video: {
    displaySurface: "browser";
  };
  audio: boolean | MediaTrackConstraints | undefined;
  preferCurrentTab?: boolean;
  selfBrowserSurface?: "include" | "exclude";
  systemAudio?: "include" | "exclude";
  surfaceSwitching: "include" | "exclude";
  monitorTypeSurfaces?: "include" | "exclude";
}

export default function AccessCheck() {
  const [cameraInput, setCameraInput] = useState(false);
  const [audioInput, setAudioInput] = useState(false);
  const [speakerChecked, setSpeakerChecked] = useState(false);
  const [screenShareCheck, setScreenShareCheck] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  async function getMediaVideo(constraints: VideoConstrainValue) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraInput(true);
        getMediaAudio({ audio: true });
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  async function getMediaAudio(constraints: AudioConstrainValue) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: constraints.audio,
      });

      const audioElement = new Audio();
      audioElement.srcObject = stream;
      audioElement.muted = true;
      audioElement.play();
      if (audioElement) {
        setAudioInput(true);
        playAudio();
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const displayMediaOptions: DisplayMediaOptions = {
    video: {
      displaySurface: "browser",
    },
    audio: false,
    preferCurrentTab: false,
    selfBrowserSurface: "exclude",
    systemAudio: "include",
    surfaceSwitching: "include",
    monitorTypeSurfaces: "include",
  };

  async function startCapture(displayMediaOptions: DisplayMediaOptions) {
    let captureStream;

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      if (captureStream) {
        setScreenShareCheck(true);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
    return captureStream;
  }
  useEffect(() => {
    if (speakerChecked) {
      startCapture(displayMediaOptions);
    }
  }, [speakerChecked]);

  useEffect(() => {
    getMediaVideo({ video: { width: 1280, height: 720 } });
  }, []);

  return (
    <div className="flex bg-transparent min-h-[calc(100vh-3.8rem)] flex-col justify-center items-center w-full ">
      
        <div className=" flex justify-between w-[80%] mb-8">

          <h1 className="font-bold text-white text-2xl">Trainee Interview</h1>

          <div className="flex gap-2 text-white">
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


        <div className="flex w-[80%]">
          <div className="flex item-start  w-full items-center ">
            <div className="">
              <video
                ref={videoRef}
                autoPlay
                width="600"
                height="800"
                className="shadow-xl rounded-md "
              ></video>
            </div>
          </div>

          <div className=" text-white flex flex-col gap-4 w-[60%]">
            <div className="border-[1px] border-gray-[200] p-4 flex justify-between rounded-md">
              <div className="flex justify-center items-center gap-2">
                <MdOutlineVideoCameraBack />
              <label>Check Camera</label>

              </div>
              <input
                type="checkbox"
                checked={cameraInput}
                onChange={(e) => setCameraInput(e.target.checked)}
              />
            </div>

            <div  className="border-[1px] border-gray-[200] p-4 flex justify-between rounded-md">
              <div className="flex justify-center items-center gap-2">
              <FaMicrophoneAlt/>
              <label>Audio check</label>
                </div>
              <input
                type="checkbox"
                checked={audioInput}
                onChange={(e) => setAudioInput(e.target.checked)}
              />
            </div>

            <div  className="border-[1px] border-gray-[200] p-4 flex justify-between rounded-md">
              <div className ="flex justify-center items-center gap-2">
                <HiOutlineSpeakerWave/>
                <label>Check the speaker</label>
              </div>
          
              <audio ref={audioRef} src="/ElevenLabs.mp3">
                Check the speacke
              </audio>
              <input
                type="checkbox"
                checked={speakerChecked}
                onChange={(e) => setSpeakerChecked(e.target.checked)}
              />
            </div>

            <div  className="border-[1px] border-gray-[200] p-4 flex justify-between rounded-md">
              <div className ="flex justify-center items-center gap-2">
                <TbUserScreen/>
              <label>Check the Screen Share</label>

              </div>
              <input
                type="checkbox"
                checked={screenShareCheck}
                onChange={(e) => setScreenShareCheck(e.target.checked)}
              />
            </div>

            <button   disabled={!screenShareCheck}
             onClick={()=>{
              router.push('/interviewInstructions')
            
            }} className={`bg-[#6C60F3] py-3 mt-6 w-full rounded-md font-bold }`}>
              Start Interview
            </button>
          </div>


      </div>


     
    </div>
  );
}
