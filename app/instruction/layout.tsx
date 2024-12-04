import React from "react";
import Navbar from "../components/instruction/navbar";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
