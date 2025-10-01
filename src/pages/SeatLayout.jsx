import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  useEffect(() => {
    const movie = dummyShowsData.find((m) => m._id === id);
    if (!movie) return;

    const timingsForDate = dummyDateTimeData[date] || [];
    setShow({ movie, dateTime: timingsForDate });
  }, [id, date]);

  if (!show) return <Loading />;
  if (!show.dateTime.length)
    return (
      <p className="text-center mt-20 text-gray-400">
        No show timings available for this date.
      </p>
    );

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 gap-8">
      {/* Timings */}
      <div className="w-full md:w-60 bg-primary/10 border border-primary/20 rounded-lg py-6 md:sticky md:top-20">
        <p className="text-lg font-semibold px-6 mb-4">Available Timings</p>
        <div className="flex flex-col gap-2 px-6">
          {show.dateTime.map((item) => (
            <div
              key={item.time}
              className={`flex items-center gap-2 px-4 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
              onClick={() => setSelectedTime(item)}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="flex-1 mt-8 md:mt-0 md:ml-10">
        <h2 className="text-2xl font-bold mb-4 text-white">
          {show.movie.title} - Select Your Seats
        </h2>
        <p className="text-gray-400 mb-6">
          Date: {date} | Selected Time:{" "}
          {selectedTime ? isoTimeFormat(selectedTime.time) : "None"}
        </p>

        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 40 }).map((_, idx) => {
            const seat = `S${idx + 1}`;
            const isSelected = selectedSeats.includes(seat);
            return (
              <div
                key={seat}
                className={`h-10 w-10 rounded flex items-center justify-center cursor-pointer text-white ${
                  isSelected ? "bg-red-600" : "bg-gray-700 hover:bg-red-500"
                }`}
                onClick={() => {
                  if (isSelected)
                    setSelectedSeats(selectedSeats.filter((s) => s !== seat));
                  else setSelectedSeats([...selectedSeats, seat]);
                }}
              >
                {seat}
              </div>
            );
          })}
        </div>

        {selectedSeats.length > 0 && (
          <button
            onClick={() => alert(`Booked seats: ${selectedSeats.join(", ")}`)}
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-md shadow-lg"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default SeatLayout;
