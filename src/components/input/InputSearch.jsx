import React from "react";
import { CiSearch } from "react-icons/ci";

function InputSearch({ placeholder = "Search", ...rest }) {
  return (
    <div className="relative flex items-center">
      <CiSearch size={18} className="absolute mx-3" />
      <input
        type="text"
        className="pl-9 pr-3 py-2 text-sm border rounded-md outline-none"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}

export default InputSearch;
