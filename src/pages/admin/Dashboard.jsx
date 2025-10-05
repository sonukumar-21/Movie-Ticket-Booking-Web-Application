import React, { useEffect, useState } from "react";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { dummyDashboardData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";

// ✅ Safe date formatting
const dateFormat = (date) => {
  if (!date) return "Invalid Date";
  let parsedDate = new Date(date);
  if (isNaN(parsedDate)) parsedDate = new Date(date.replace(/-/g, "/"));
  if (isNaN(parsedDate)) return "Invalid Date";

  return parsedDate.toLocaleString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue || "0"}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <div className="bg-black min-h-screen text-gray-200 p-6">
      <Title text1="Admin" text2="Dashboard" />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="
              p-5 bg-gray-900 rounded-lg shadow-lg flex items-center gap-4
              border border-red-700 hover:border-red-500
              hover:shadow-[0_4px_20px_rgba(255,0,0,0.5)]
              transition transform hover:-translate-y-1
            "
          >
            <card.icon className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-sm text-gray-400">{card.title}</p>
              <p className="text-xl font-bold text-red-500">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Shows */}
      <p className="mt-10 text-2xl font-semibold text-red-500">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-6xl">
        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="
              w-55 rounded-lg overflow-hidden h-full pb-3
              bg-gray-900 border border-red-700
              hover:border-red-500 hover:shadow-[0_4px_20px_rgba(255,0,0,0.5)]
              hover:-translate-y-1 transition duration-300
            "
          >
            <div className="relative">
              <img
                src={show.movie?.poster_path}
                alt={show.movie?.title || "Movie Poster"}
                className="h-60 w-full object-cover"
              />
              {/* Optional gradient overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            <p className="font-medium p-2 truncate text-red-400 hover:text-red-500 transition">
              {show.movie?.title}
            </p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-semibold text-red-500">
                {currency}
                {show.showPrice}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-300 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-red-500 fill-red-500" />
                {show.movie?.vote_average?.toFixed(1) || "N/A"}
              </p>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-400">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
