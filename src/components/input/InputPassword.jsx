"use client";

import { forwardRef, useState } from "react";
import InputLabel from "./InputLabel";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const InputPassword = forwardRef(function InputPassword(
  { id, label, required = false, ...rest },
  ref
) {
  const [show, setShow] = useState(false);

  return (
    <div className="">
      {!!label && <InputLabel id={id} label={label} required={required} />}
      <div className="relative flex justify-end items-center text-primary">
        <button
          type="button"
          className="absolute px-3"
          onClick={() => setShow(!show)}
        >
          {show ? <IoMdEye /> : <IoMdEyeOff />}
        </button>
        <input
          ref={ref}
          id={id}
          type={show ? "text" : "password"}
          className="w-full text-xs outline-none border rounded-md px-3 py-2"
          {...rest}
        />
      </div>
    </div>
  );
});

export default InputPassword;
