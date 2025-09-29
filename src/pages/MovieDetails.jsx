import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const show = dummyShowsData.find((s) => s._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  const timeFormatter = (min) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  const handleBuyTicketClick = () => {
    const section = document.getElementById("dateSelect");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!show)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-24 pb-20 overflow-hidden min-h-screen bg-[#0f0f0f]">
      <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="rounded-xl w-full max-w-sm object-cover shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        />

        <div className="flex flex-col justify-center gap-5 text-white">
          <p className="uppercase tracking-widest text-sm font-medium text-red-400">
            {show.movie.original_language || "ENGLISH"}
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
            {show.movie.title}
          </h1>

          <div className="flex items-center gap-3 mt-2">
            <StarIcon className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-semibold text-yellow-300">
              {show.movie.vote_average.toFixed(1)}
            </span>
            <span className="text-base text-gray-400">User Rating</span>
          </div>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
            {show.movie.overview}
          </p>

          <p className="text-sm text-gray-400">
            {timeFormatter(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-6">
            <button
              type="button"
              className="flex items-center gap-2 px-7 py-3 rounded-md font-medium bg-gray-800/80 hover:bg-gray-700 active:scale-95 transition text-sm backdrop-blur-md shadow-lg"
            >
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <button
              onClick={handleBuyTicketClick}
              type="button"
              className="px-10 py-3 rounded-md font-medium bg-red-600 hover:bg-red-500 active:scale-95 transition text-sm shadow-lg"
            >
              Buy Tickets
            </button>

            <button
              type="button"
              className="p-3 rounded-full bg-gray-700/80 hover:bg-gray-600 active:scale-95 transition shadow-md backdrop-blur-md"
            >
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Featured Cast
          <span className="block w-24 h-1 bg-red-500 rounded mt-3"></span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="rounded-full h-28 w-28 object-cover shadow-lg"
              />
              <p className="mt-3 text-sm font-semibold text-white tracking-wide">
                {cast.name}
              </p>
              <p className="text-xs text-gray-400">{cast.character}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="dateSelect" className="mt-16 max-w-6xl mx-auto">
        <DateSelect dateTime={show.dateTime} id={id} />

        <p className="text-xl font-semibold text-white mt-20 mb-8">
          You May Also Like
        </p>
        <div className="flex flex-wrap gap-8">
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <MovieCard key={movie._id ?? index} movie={movie} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button
            onClick={() => {
              navigate("/movies");
              scrollTo(0, 0);
            }}
            className="px-10 py-3 text-sm font-medium rounded-md bg-red-600 hover:bg-red-500 active:scale-95 transition shadow-lg"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
