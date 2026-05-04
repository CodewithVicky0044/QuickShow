import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { api } from "../lib/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.getMovies().then(setMovies).catch(() => setMovies([]));
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 relative overflow-hidden">
      <BlurCircle top="-100px" left="-120px" />
      <BlurCircle bottom="-100px" right="-120px" />

      <p className="text-gray-300 text-lg font-medium mb-8 relative z-10 text-center sm:text-left">Now Showing</p>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;


