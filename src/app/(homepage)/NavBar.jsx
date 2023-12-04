"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { IoChevronDown } from "react-icons/io5";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-initial w-full h-14 flex justify-center bg-white text-primary border-b">
      <div className="w-[1200px] h-full flex justify-between items-center">
        <div className="text-xl font-bold">Fleet Monitoring</div>
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-sm bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl duration-500"
            onClick={() => setOpen(!open)}
          >
            <span>Login</span>
            <IoChevronDown
              className={`duration-500 ${open ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          <AuthLayout isOpen={open} close={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
