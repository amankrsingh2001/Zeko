"use client";

import logo from "../../../utils/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from "./dropdown";
import { useState } from "react";

export default function () {
  const [showDropDown, setShowDropDown] = useState(false);

  const dropDrownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="bg-[#F1F5F9] w-full border-b px-8 py-1 flex justify-between items-center">
      <img src={logo.src} width={150} height={150} />

      <div className="flex flex-col ">
        <button onClick={dropDrownHandler} className="text-3xl">
          <FaRegUserCircle />
        </button>
        <div
          className={`absolute top-20 right-6 ${
            showDropDown ? "block" : "hidden"
          } `}
        >
          <Dropdown />
        </div>
      </div>

      {/* relative top-10 */}
    </div>
  );
}
