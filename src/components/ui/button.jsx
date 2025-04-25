import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
