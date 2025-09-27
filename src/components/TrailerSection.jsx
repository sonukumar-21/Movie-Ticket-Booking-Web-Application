import React, { useState, useEffect } from "react";
import { dummyTrailers } from "../assets/assets";

const Trailers = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(dummyTrailers[0]);
  const [particles, setParticles] = useState([]);

  // Generate particles
  useEffect(() => {
    const particleCount = 50;
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        id: i,
        x: (i / particleCount) * 100 + Math.random() * 2,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
      });
    }
    setParticles(temp);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full text-white py-12 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #1a0000, #000000)", // red-black gradient
      }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-red-400 opacity-20 rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-400 drop-shadow-lg">
          Trailers
        </h2>

        {/* Main trailer player */}
        <div className="w-full max-w-5xl mx-auto aspect-video mb-10">
          <iframe
            width="100%"
            height="100%"
            src={`${selectedTrailer.videoUrl}?autoplay=0`}
            title="YouTube trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow-2xl"
          ></iframe>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-5 justify-center flex-wrap">
          {dummyTrailers.map((trailer, index) => (
            <div
              key={index}
              onClick={() => setSelectedTrailer(trailer)}
              className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-300 transform
                ${
                  selectedTrailer.videoUrl === trailer.videoUrl
                    ? "border-red-500 scale-105 shadow-lg shadow-red-500"
                    : "border-gray-600 hover:border-red-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
                }`}
            >
              <img
                src={trailer.image}
                alt={`Trailer ${index + 1}`}
                className="w-40 h-24 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trailers;
