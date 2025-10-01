import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [alertMsg, setAlertMsg] = useState(""); // for styled alerts
  const navigate = useNavigate();

  const handleSeatClick = (seatId) => {
    if (!selectedTime)
      return setAlertMsg("❌ Please select a show time first!");

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      setAlertMsg("❌ You can only select up to 5 seats!");
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeatRow = (rowLabel, seats) => (
    <div className="flex gap-2 mb-1" key={rowLabel}>
      {Array.from({ length: seats }, (_, i) => {
        const seatId = `${rowLabel}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-10 w-10 rounded border border-red-600 cursor-pointer flex items-center justify-center text-xs font-bold transition-all ${
              selectedSeats.includes(seatId)
                ? "bg-red-600 text-white shadow-lg"
                : "bg-black text-red-500 hover:bg-red-500/40"
            }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  const renderBlockWithAisle = (
    leftRows,
    rightRows,
    seatsPerRow,
    aisleWidth = "1.5rem",
    rightOffset = "0.1rem"
  ) => (
    <div
      className="flex w-full justify-center mb-12"
      style={{ gap: aisleWidth }}
    >
      <div className="flex flex-col">
        {leftRows.map((r) => renderSeatRow(r, seatsPerRow))}
      </div>
      <div style={{ width: aisleWidth }}></div>
      <div className="flex flex-col" style={{ marginTop: rightOffset }}>
        {rightRows.map((r) => renderSeatRow(r, seatsPerRow))}
      </div>
    </div>
  );

  useEffect(() => {
    const movie = dummyShowsData.find((m) => m._id === id);
    if (!movie) return;

    const timingsForDate = dummyDateTimeData[date] || [];
    setShow({ movie, dateTime: timingsForDate });

    if (timingsForDate.length) setSelectedTime(timingsForDate[0]);
  }, [id, date]);

  if (!show) return <Loading />;

  if (!show.dateTime.length)
    return (
      <p className="text-center mt-40 text-gray-400">
        No show timings available for this date.
      </p>
    );

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      setAlertMsg("❌ Please select at least 1 seat!");
      return;
    }

    // Create modal
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 z-50 flex items-center justify-center bg-black/70";
    modal.innerHTML = `
      <div class="bg-black border border-red-600 rounded-xl p-6 w-80 text-center shadow-2xl">
        <h2 class="text-xl font-bold text-red-500 mb-2">Confirm Booking</h2>
        <p class="text-white mb-4 font-semibold">Seats Selected: ${selectedSeats.join(
          ", "
        )}</p>
        <div class="flex justify-between gap-4">
          <button class="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">Cancel</button>
          <button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Confirm</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Add actions
    modal.querySelector("button:first-child").onclick = () => modal.remove();
    modal.querySelector("button:last-child").onclick = () => {
      setAlertMsg(
        `✅ Booking confirmed for seats: ${selectedSeats.join(", ")}`
      );
      modal.remove();
    };
  };

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 md:px-16 lg:px-32 mt-36 gap-6 bg-black relative">
      {/* Styled alert */}
      {alertMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
          {alertMsg}
          <button
            className="ml-4 text-xl font-bold hover:text-gray-300"
            onClick={() => setAlertMsg("")}
          >
            &times;
          </button>
        </div>
      )}

      {/* Available Timings */}
      <div className="w-full md:w-auto bg-black/70 border border-red-600 rounded-xl py-4 px-4 md:sticky md:top-28 self-start mb-6 shadow-lg">
        <p className="text-lg font-bold mb-3 text-white">Available Timings</p>
        <div className="flex flex-col gap-2">
          {show.dateTime.map((item) => (
            <div
              key={item.time}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                selectedTime?.time === item.time
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-black text-white hover:bg-red-500/40"
              }`}
              onClick={() => setSelectedTime(item)}
            >
              <ClockIcon className="w-4 h-4 text-red-400" />
              <p className="text-sm font-bold">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Screen & Seats */}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Select Your Seat</h1>

        <div
          className="mb-6 w-full max-w-3xl"
          style={{
            height: "3.5rem",
            background:
              "radial-gradient(ellipse at center, #1a1a1a 0%, #111 100%)",
            borderRadius: "0 0 50% 50% / 0 0 100% 100%",
            boxShadow:
              "0 0 10px 2px rgba(255,0,0,0.5), 0 0 20px 4px rgba(255,0,0,0.25)",
            border: "2px solid #ff0000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1.5rem",
            textShadow: "0 0 4px rgba(255,0,0,0.4)",
            perspective: "600px",
            transform: "rotateX(2deg)",
          }}
        >
          CINEMA SCREEN
        </div>

        <p className="text-gray-400 text-sm mb-4">SCREEN SIDE</p>

        <div className="flex flex-col w-full items-center">
          {/* Front rows: A & B */}
          <div className="flex flex-col items-center mb-6">
            {["A", "B"].map((row) => renderSeatRow(row, 9))}
          </div>

          <div className="h-4"></div>

          {/* Top block: C D left, E F right */}
          {renderBlockWithAisle(["C", "D"], ["E", "F"], 9)}

          <div className="h-4"></div>

          {/* Lower block: G H left, I J right */}
          {renderBlockWithAisle(["G", "H"], ["I", "J"], 9)}

          <div className="h-4"></div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <p className="text-white mt-4 font-bold">
            Selected Seats: {selectedSeats.join(", ")}
          </p>
        )}

        {/* Checkout Button */}
        <button
          className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 shadow-lg transition-all"
          onClick={handleCheckout}
        >
          Proceed to Checkout →
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-red-600 text-white py-4 text-center mt-auto"></footer>
    </div>
  );
};

export default SeatLayout;
