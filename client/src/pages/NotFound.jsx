import React from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* ðŸ”¥ Background Blur */}
      <BlurCircle top="0" right="0" />
      <BlurCircle bottom="0" left="0" />

      {/* Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
        alt="not found"
        className="w-40 md:w-56 mb-6 opacity-90"
      />

      {/* 404 Text */}
      <h1 className="text-5xl md:text-7xl font-bold text-primary">
        404
      </h1>

      <p className="text-gray-300 mt-4 text-lg">
        Page Not Found
      </p>

      <p className="text-gray-500 text-sm mt-2 max-w-md">
        The page you are looking for doesnâ€™t exist or has been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-8 py-3 bg-primary hover:bg-primary-dull rounded-full text-white font-medium transition"
      >
        Go Back Home
      </button>

    </div>
  );
};

export default NotFound;

