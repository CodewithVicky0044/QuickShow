import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { api } from "../lib/api";

const Favorite = () => {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user) return;
    api.getFavorites(user.id).then(setMovies).catch(() => setMovies([]));
  }, [user]);

  if (!user) {
    return <div className="min-h-[60vh] flex items-center justify-center">Please login to see favorites.</div>;
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 relative overflow-hidden">
      <BlurCircle top="-100px" left="-120px" />
      <BlurCircle bottom="-100px" right="-120px" />

      <p className="text-gray-300 text-lg font-medium mb-8 relative z-10 text-center sm:text-left">Your Favorite Movies</p>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;


