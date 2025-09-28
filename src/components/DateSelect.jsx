import React from "react";
import { ChevronLeftIcon } from "lucide-react";

const DateSelect = ({ dateTime }) => {
  return (
    <div className="flex justify-center mt-10 px-6">
      <div
        className="relative w-full max-w-5xl p-6 md:p-8 rounded-2xl bg-black/40 border border-red-500 
                   backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6
                   animate-[pulse-glow_2s_ease-in-out_infinite]"
      >
        <div className="flex-1">
          <p className="text-lg font-semibold text-white mb-4">Choose Date</p>
          <div className="flex items-center gap-4 md:gap-6">
            <ChevronLeftIcon width={28} className="text-red-400" />
            <div className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  className="flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-lg bg-white/10 text-white hover:bg-red-500 transition"
                >
                  <span className="font-medium">
                    {new Date(date).getDate()}
                  </span>
                  <span className="text-xs">
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </div>
            <ChevronLeftIcon width={28} className="text-red-400 rotate-180" />
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <button className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
