import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user1",
            B1: "user2",
            C1: "user3",
          },
        },
      ]);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <div className="bg-black min-h-screen text-gray-200 p-6">
      <Title text1="List" text2="Shows" />

      <div className="max-w-4xl mt-8 overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse rounded-md overflow-hidden">
          <thead>
            <tr
              className="
                bg-gray-900 text-red-500
                border-b border-red-700
              "
            >
              <th className="p-3 font-semibold text-left">Movie Name</th>
              <th className="p-3 font-semibold text-left">Show Time</th>
              <th className="p-3 font-semibold text-left">Total Bookings</th>
              <th className="p-3 font-semibold text-left">Earnings</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {shows.map((show, index) => (
              <tr
                key={index}
                className="
                  border-b border-red-800/40
                  bg-gray-950 hover:bg-gray-900
                  hover:border-red-500
                  hover:shadow-[0_4px_15px_rgba(255,0,0,0.5)]
                  transition duration-300
                "
              >
                <td className="p-3">{show.movie.title}</td>
                <td className="p-3">{dateFormat(show.showDateTime)}</td>
                <td className="p-3">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="p-3 text-red-400 font-semibold">
                  {currency}{" "}
                  {Object.keys(show.occupiedSeats).length * show.showPrice}
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

export default ListShows;
