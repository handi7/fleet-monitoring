"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";

function AuthLayout() {
  const [tab, setTab] = useState(1);

  return (
    <div className="absolute w-72 rounded-md overflow-hidden top-12 right-0">
      <div className="flex justify-end text-slate-800">
        <div className="flex-auto border-b"></div>
        <button
          className={`hover:bg-slate-800 hover:text-white px-5 py-1 border-l border-t border-r rounded-t-md ${
            tab === 2 ? "bg-primary text-white" : "bg-white/20"
          }`}
          onClick={() => setTab(2)}
        >
          Register
        </button>
        <button
          className={`hover:bg-slate-800 hover:text-white px-5 py-1 border-l border-t border-r rounded-t-md ${
            tab === 1 ? "bg-primary text-white" : "bg-white/20"
          }`}
          onClick={() => setTab(1)}
        >
          Login
        </button>
      </div>

      <div className="bg-primary text-white border-l border-b border-r">
        {tab === 1 && <LoginForm />}
      </div>
    </div>
  );
}

export default AuthLayout;
