import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden py-10">
      {/* Blur Circle behind the entire section */}
      <BlurCircle top="0" right="-80px" size="250px" color="bg-red-500/30" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pt-4 pb-4">
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>

        {/* Button above blur */}
        <button
          onClick={() => navigate("/movies")}
          className="relative z-20 group flex items-center gap-2 text-sm text-gray-300 hover:text-white transition cursor-pointer"
        >
          View All
          <ArrowRight className="group-hover:translate-x-1 transition w-4 h-5" />
        </button>
      </div>

      {/* Placeholder divs */}
      <div></div>
      <div></div>
    </div>
  );
};

export default FeaturedSection;
