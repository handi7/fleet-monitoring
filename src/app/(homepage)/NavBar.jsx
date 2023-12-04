"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-initial w-full h-14 flex justify-center bg-slate-800">
      <div className="w-[1200px] h-full flex justify-between items-center">
        <div>LOGO</div>
        <div className="relative">
          <button onClick={() => setOpen(!open)}>Login</button>
          <AuthLayout isOpen={open} close={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
