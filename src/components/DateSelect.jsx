import React from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon } from "lucide-react";

const DateSelect = () => {
  return (
    <div id="date-select" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <BlurCircle
          top="-100px"
          left="-100px"
          size="300px"
          opacity="15"
          color="rgba(255, 0, 0, 0.3)"
          className="absolute -z-10"
        />
        <BlurCircle
          top="-100px"
          right="0px"
          size="300px"
          opacity="15"
          color="rgba(0, 0, 255, 0.3)"
          className="absolute -z-10"
        />
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  className="flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer"
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronLeftIcon width={28} />
          </div>
        </div>
        <button
          className="bg-primary text-white px-8 py-2 mt-6 rounded
        hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
