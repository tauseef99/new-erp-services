import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
