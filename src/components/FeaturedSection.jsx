import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { dummyShowsData } from "../assets/assets"; // Make sure this contains 8 movies

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      {/* Section Header */}
      <div className="relative flex items-center justify-between pt-20 pb-10">
        {/* Left Title */}
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>

        {/* Right Button with blur behind */}
        <div className="relative">
          <BlurCircle
            top="-20px"
            right="-30px"
            size="180px"
            color="rgba(255, 0, 0, 0.6)" // glowing red
          />
          <button
            onClick={() => navigate("/movies")}
            className="group flex items-center gap-2 text-sm text-white hover:text-white transition cursor-pointer relative z-10"
          >
            View All
            <ArrowRight className="group-hover:translate-x-1 transition w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyShowsData.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-red-500 hover:bg-red-600 transition rounded-md font-medium cursor-pointer text-white"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
