import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";

const Favorite = () => {
  return dummyShowsData.length > 0 ? (
    <div
      className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44
      overflow-hidden min-h-[80vh]"
    >
      <BlurCircle
        top="250px"
        left="-50px"
        size="180px"
        className="z-0 opacity-10 bg-white/25"
      />

      <BlurCircle
        top="100px"
        right="-80px"
        size="350px"
        className="z-0 opacity-15 bg-white/20"
      />

      <h1 className="text-lg font-medium my-4 relative z-10">
        Your Favorite Movies
      </h1>

      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {dummyShowsData.map((movie) => (
          <div key={movie._id} className="w-full sm:w-1/2 md:w-1/4">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Favorite;
