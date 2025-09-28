import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import DateSelect from "../components/DateSelect";

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
    <div className="relative px-6 md:px-16 lg:px-40 pt-20 pb-20 overflow-hidden min-h-screen">
      {/* Movie Info */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto relative z-10">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="max-md:mx-auto rounded-xl h-104 max-w-[70rem] object-cover"
        />
        <div className="flex flex-col gap-3 relative">
          <p className="text-white font-semibold relative z-20">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance relative z-20">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-white relative z-20">
            <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-white/70 mt-2 text-sm leading-tight max-w-xl relative z-20">
            {show.movie.overview}
          </p>
          <p className="text-white/60 relative z-20">
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
              className="px-10 py-3 text-sm bg-red-500 hover:bg-red-600 transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-20 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 relative inline-block">
          Your Favorite Cast
          <span className="block w-24 h-1 bg-red-500 rounded mt-2"></span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="rounded-full h-28 w-28 object-cover shadow-lg"
              />
              <p className="font-medium text-sm mt-2 text-white">{cast.name}</p>
              <p className="text-xs text-white/60">{cast.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DateSelect Section */}
      <div id="dateSelect" className="mt-12">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MovieDetails;
