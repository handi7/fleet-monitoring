"use client";

import { forwardRef } from "react";
import InputLabel from "./InputLabel";

const InputText = forwardRef(function InputText(
  { id, label, required = false, error, ...rest },
  ref
) {
  return (
    <div className="flex flex-col space-y-1">
      {!!label && <InputLabel id={id} label={label} required={required} />}
      <input
        ref={ref}
        id={id}
        type="text"
        className="text-xs text-primary border rounded-md outline-none px-3 py-2"
        {...rest}
      />
      <span className="text-xs text-red-700">{error}</span>
    </div>
  );
});

export default InputText;
