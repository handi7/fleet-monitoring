"use client";

function InputLabel({ id, label, required = false }) {
  return (
    <label htmlFor={id} className="text-sm">
      {label} {required && <span className="text-red-700">*</span>}
    </label>
  );
}

export default InputLabel;
