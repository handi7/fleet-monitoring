"use client";

import { useState, useEffect, useRef } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthLayout({ isOpen }) {
  const ref = useRef();
  const [tab, setTab] = useState(1);

  return (
    <div
      ref={ref}
      className={`absolute w-72 rounded-md overflow-hidden top-12 right-2 duration-500 z-50 ${
        isOpen ? "h-96" : "h-0"
      }`}
    >
      <div className="flex justify-end text-white">
        <div className="flex-auto border-b"></div>
        <button
          className={`hover:bg-slate-800 hover:text-white px-5 py-1 border-l border-t border-r rounded-t-md ${
            tab === 2 ? "bg-primary text-white" : "bg-black/30"
          }`}
          onClick={() => setTab(2)}
        >
          Register
        </button>
        <button
          className={`hover:bg-slate-800 hover:text-white px-5 py-1 border-l border-t border-r rounded-t-md ${
            tab === 1 ? "bg-primary text-white" : "bg-black/30"
          }`}
          onClick={() => setTab(1)}
        >
          Login
        </button>
      </div>

      <div className="bg-primary text-white border-l border-b border-r">
        {tab === 1 && <LoginForm />}
        {tab === 2 && <RegisterForm />}
      </div>
    </div>
  );
}

export default AuthLayout;
