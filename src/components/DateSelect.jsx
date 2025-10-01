import React, { useState } from "react";
import { ChevronLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, movieId }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  if (!dateTime || Object.keys(dateTime).length === 0) {
    return (
      <p className="text-white text-center mt-6">
        No dates available for this movie.
      </p>
    );
  }

  const onBookHandler = () => {
    if (!selected) return toast.error("Please select a date");
    navigate(`/movie/${movieId}/${selected}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center mt-16 px-6">
      <div
        className="relative w-full max-w-5xl p-6 md:p-8 rounded-3xl bg-black/30 border border-red-500 
                   backdrop-blur-lg flex flex-col md:flex-row items-center justify-between gap-6
                   shadow-[0_0_20px_rgba(255,0,0,0.4)]"
      >
        <div className="flex-1">
          <p className="text-lg font-semibold text-white mb-4">Choose Date</p>
          <div className="flex items-center gap-4 md:gap-6">
            <ChevronLeftIcon width={28} className="text-red-400" />
            <div className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-16 w-16 md:h-14 md:w-14 aspect-square rounded-xl 
                              transition-transform duration-300
                              ${
                                selected === date
                                  ? "bg-red-500 text-white shadow-[0_0_15px_rgba(255,0,0,0.7)] scale-105"
                                  : "bg-white/10 text-white border border-red-400 hover:bg-red-600 hover:scale-105"
                              }`}
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
          <button
            onClick={onBookHandler}
            className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
