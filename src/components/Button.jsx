"use client";

function Button({
  disabled = false,
  type = "button",
  color = "primary",
  children,
}) {
  const getClass = () => {
    switch (color) {
      case "white":
        return `text-sm text-primary bg-white font-semibold rounded-md px-3 py-2`;
      default:
        return `text-sm text-white bg-primary font-semibold rounded-md px-3 py-2`;
    }
  };

  return (
    <button disabled={disabled} type={type} className={getClass()}>
      {children}
    </button>
  );
}

export default Button;
