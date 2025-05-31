import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm">
      <div
        className="
          w-16 h-16
          border-4 border-blue-500
          border-t-transparent
          rounded-full
          animate-spin
        "
      />
    </div>
  );
};

export default loading;
