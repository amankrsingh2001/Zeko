"use client";
import { useRouter } from "next/navigation";


export default function Interview() {
    const router = useRouter()
    
  return (
    <div className="bg-[#151D29] h-screen overflow-hidden flex justify-center items-center text-white ">
      <div className=" flex flex-col justify-center w-[50%] items-center space-y-6">
        <h1 className="text-xl text-center font-bold ">
          Interview Instructions
        </h1>
        <p className="text-sm text-center">
             You&apos;re in a proctored test environment. If caught in any suspicious
             behaviour, you will be marked{" "}
          <span className="text-red-500">FAIL.</span>{" "}
        </p>

        <div className="flex flex-wrap gap-7 justify-center">
          <div className=" w-[200px]">
            <img src="/Instruction1.png" width={200} height={200} />
            <p className="text-xs text-center">
              <span>1. </span>
              Do not look off <span className="font-bold">Screen</span> &
              maintain eye contact with the camera.
            </p>
          </div>
          <div className=" w-[200px]">
            <img src="/Instruction2.png" width={200} height={200} />
            <p className="text-xs text-center">
              <span>1. </span>
              Do not look off <span className="font-bold">Screen</span> &
              maintain eye contact with the camera.
            </p>
          </div>
          <div className=" w-[200px]">
            <img src="/Instruction3.png" width={200} height={200} />
            <p className="text-xs text-center">
              <span>1. </span>
              Do not look off <span className="font-bold">Screen</span> &
              maintain eye contact with the camera.
            </p>
          </div>

          <div className=" w-[200px]">
            <img src="/Instruction1.png" width={200} height={200} />
            <p className="text-xs text-center">
              <span>1. </span>
              Do not look off <span className="font-bold">Screen</span> &
              maintain eye contact with the camera.
            </p>
          </div>
          <div className=" w-[200px]">
            <img src="/Instruction2.png" width={200} height={200} />
            <p className="text-xs text-center">
              <span>1. </span>
              Do not look off <span className="font-bold">Screen</span> &
              maintain eye contact with the camera.
            </p>
          </div>
        </div>

        <div>
          <p className="text-green-500 text-sm">
            Stay Focused and do your best
          </p>
        </div>

        <div>
          <button className="bg-[#6C60F3] py-3 mt-6 w-full rounded-md font-bold p-4" onClick={()=>{
            router.push('/interview')
          }}>
            I understand start the Interview
          </button>
        </div>
      </div>
    </div>
  );
}
