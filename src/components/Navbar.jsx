import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, XIcon, SearchIcon, TicketPlus } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full px-6 md:px-16 lg:px-36 py-5 flex items-center justify-between"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Logo */}
      <Link to="/" className="flex-1">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>

      {/* Centered links — glassmorphic style */}
      <div
        className="hidden md:flex absolute left-1/2 transform -translate-x-1/2
                   bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl
                   px-12 py-3 gap-8 transition-all duration-300 ease-in-out
                   hover:bg-white/15"
      >
        <Link
          to="/"
          className="text-white font-medium hover:text-red-400 transition transform hover:scale-105"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="text-white font-medium hover:text-red-400 transition transform hover:scale-105"
        >
          Movies
        </Link>
        <Link
          to="/"
          className="text-white font-medium hover:text-red-400 transition transform hover:scale-105"
        >
          Theaters
        </Link>
        <Link
          to="/"
          className="text-white font-medium hover:text-red-400 transition transform hover:scale-105"
        >
          Releases
        </Link>
        <Link
          to="/favorite"
          className="text-white font-medium hover:text-red-400 transition transform hover:scale-105"
        >
          Favorites
        </Link>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 md:gap-8">
        <SearchIcon className="w-6 h-6 cursor-pointer" />
        {!user ? (
          <button
            onClick={openSignIn}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full font-medium text-white transition"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        {/* Hamburger menu for mobile */}
        <MenuIcon
          className="md:hidden w-8 h-8 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Mobile menu — glass style */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-xl border-t border-white/20 flex flex-col items-center py-6 gap-4 md:hidden rounded-b-3xl">
          <XIcon
            className="w-6 h-6 cursor-pointer self-end mr-6"
            onClick={() => setIsOpen(false)}
          />
          <Link
            to="/"
            className="text-white font-medium hover:text-red-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-white font-medium hover:text-red-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="text-white font-medium hover:text-red-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Theaters
          </Link>
          <Link
            to="/"
            className="text-white font-medium hover:text-red-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Releases
          </Link>
          <Link
            to="/favorite"
            className="text-white font-medium hover:text-red-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
