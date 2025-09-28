import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    setShow({
      movie: show,
      dateTime: dummyDateTimeData,
    });
  };

  useEffect(() => {
    getShow();
  }, [id]);

  const timeFormatter = (min) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  return show ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-20 pb-40 overflow-hidden min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto relative z-10">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="max-md:mx-auto rounded-xl h-104 max-w-[70rem] object-cover"
        />
        <div className="flex flex-col gap-3 relative">
          <BlurCircle
            top="-60px"
            left="-60px"
            size="300px"
            opacity="15"
            color="rgba(255, 0, 0, 0.3)"
            className="absolute -z-10"
          />

          <p className="text-white-500 font-semibold relative z-20">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance relative z-20">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-white-500 relative z-20">
            <StarIcon className="w-5 h-5 text-white-500 fill-yellow-500" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl relative z-20">
            {show.movie.overview}
          </p>
          <p className="text-gray-300 relative z-20">
            {timeFormatter(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>
            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-red-500 hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <p>Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4"></div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MovieDetails;
