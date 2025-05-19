import React from "react";

export default function Button({ label, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-pinkBrand hover:bg-blueBrand shadow-glow text-white font-medium px-4 py-2 rounded-xl transition duration-200 ${className}`}
    >
      {label}
    </button>
  );
}
