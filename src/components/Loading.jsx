import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
     
      <div className="w-16 h-16 border-4 border-t-transparent border-red-600 rounded-full animate-spin shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>

      <p className="text-white text-lg font-medium tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
