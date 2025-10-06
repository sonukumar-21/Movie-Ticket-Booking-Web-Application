import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
    <div className="bg-black min-h-screen text-gray-200 p-6">
      {/* Title */}
      <Title text1="List" text2="Bookings" />

      {/* Table Container */}
      <div className="max-w-5xl mt-10 overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse text-sm rounded-md overflow-hidden">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-900 text-red-500 border-b border-red-700">
              <th className="p-4 font-semibold text-left">User Name</th>
              <th className="p-4 font-semibold text-left">Movie Name</th>
              <th className="p-4 font-semibold text-left">Show Time</th>
              <th className="p-4 font-semibold text-left">Seats</th>
              <th className="p-4 font-semibold text-left">Amount</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="
                  border-b border-red-800/30
                  bg-gray-950
                  even:bg-gray-900
                  hover:bg-gray-800
                  hover:border-red-500
                  hover:shadow-[0_4px_15px_rgba(255,0,0,0.5)]
                  transition duration-300
                "
              >
                <td className="p-4">{item.user.name}</td>
                <td className="p-4">{item.show.movie.title}</td>
                <td className="p-4">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-4">
                  {Object.keys(item.bookedSeats)
                    .map((seat) => item.bookedSeats[seat])
                    .join(", ")}
                </td>
                <td className="p-4 text-red-400 font-semibold">
                  {currency} {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListBookings;
