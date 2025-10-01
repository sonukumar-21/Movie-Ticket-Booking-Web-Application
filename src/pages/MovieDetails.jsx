import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData } from "../assets/assets";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const selectedShow = dummyShowsData.find((s) => s._id === id);
    if (selectedShow) {
      setShow({
        movie: selectedShow,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  const timeFormatter = (min) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  if (!show) return <Loading />;

  const handleBuyTicketClick = () => {
    const section = document.getElementById("dateSelect");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-24 pb-20 overflow-hidden min-h-screen bg-[#0f0f0f]">
      {/* Poster & Details */}
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

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
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
            {show.movie.genres.map((g) => g.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-6">
            <button className="flex items-center gap-2 px-7 py-3 rounded-md font-medium bg-gray-800/80 hover:bg-gray-700 text-sm backdrop-blur-md shadow-lg">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <button
              onClick={handleBuyTicketClick}
              className="px-10 py-3 rounded-md font-medium bg-red-600 hover:bg-red-500 text-sm shadow-lg"
            >
              Buy Tickets
            </button>

            <button className="p-3 rounded-full bg-gray-700/80 hover:bg-gray-600 shadow-md backdrop-blur-md">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* DateSelect & Recommendations */}
      <div id="dateSelect" className="mt-16 max-w-6xl mx-auto">
        <DateSelect dateTime={show.dateTime} id={id} />

        <p className="text-xl font-semibold text-white mt-20 mb-8">
          You May Also Like
        </p>
        <div className="flex flex-wrap gap-8">
          {dummyShowsData.slice(0, 4).map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
