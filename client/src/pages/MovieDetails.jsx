import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, PlayCircle, Star } from "lucide-react";
import { useUser } from "@clerk/react";
import toast from "react-hot-toast";
import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import { api } from "../lib/api";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dateRef = useRef(null);
  const { user } = useUser();

  const [movie, setMovie] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);

  useEffect(() => {
    api.getMovieDetails(id).then(setMovie).catch(() => setMovie(null));
    api.getMovies().then(setAllMovies).catch(() => setAllMovies([]));
  }, [id]);

  const scheduleEntries = useMemo(() => {
    if (!movie?.schedule) return [];
    return Object.entries(movie.schedule);
  }, [movie]);

  const handleFavorite = async () => {
    if (!user) return toast.error("Please login first");
    try {
      await api.toggleFavorite({ userId: user.id, movieId: id });
      toast.success("Favorites updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!movie) return <div className="h-[60vh] flex items-center justify-center">Movie not found</div>;

  const selectedSlot = scheduleEntries[selectedDate];

  return (
    <div className="w-full px-5 md:px-16 lg:px-24 xl:px-44 py-28 relative overflow-x-hidden">
      <BlurCircle top="0" right="0" />
      <BlurCircle bottom="0" left="0" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 max-w-5xl mx-auto">
        <img src={movie.poster_path} className="w-[200px] sm:w-[240px] md:w-[260px] rounded-xl shadow-lg shrink-0" />

        <div className="flex flex-col gap-4 text-center md:text-left w-full">
          <p className="text-primary text-xs uppercase">{movie.original_language}</p>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">{movie.title}</h1>

          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
            <Star className="w-4 h-4 text-primary fill-primary" />
            {movie.vote_average} IMDb Rating
          </div>

          <p className="text-gray-400 text-sm max-w-md mx-auto md:mx-0">{movie.overview}</p>

          <p className="text-gray-300 text-xs sm:text-sm">
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m • {movie.genres.map((g) => g.name).join(" | ")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
            <button className="flex items-center justify-center gap-2 px-5 py-2 bg-gray-800 rounded-md text-sm w-full sm:w-auto">
              <PlayCircle className="w-4 h-4" />
              Watch Trailer
            </button>

            <button onClick={() => dateRef.current?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-2 bg-primary rounded-full text-white text-sm font-semibold w-full sm:w-auto shrink-0">
              Buy Tickets
            </button>

            <button onClick={handleFavorite} className="px-6 py-2 border border-primary/40 rounded-full text-sm flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              Favorite
            </button>
          </div>
        </div>
      </div>

      <div ref={dateRef} className="mt-24 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-[#2a0f12] via-[#3a1419] to-[#2a0f12] rounded-2xl p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full text-center md:text-left">
            <p className="text-gray-300 mb-4 text-sm">Choose Date</p>
            <div className="w-full overflow-hidden">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {scheduleEntries.map(([date], index) => (
                  <div
                    key={date}
                    onClick={() => setSelectedDate(index)}
                    className={`px-3 py-1.5 rounded-md text-xs cursor-pointer shrink-0 ${selectedDate === index ? "bg-primary text-white" : "border border-gray-600 text-gray-300"}`}
                  >
                    {new Date(date).toDateString().slice(0, 10)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => navigate(`/movies/${movie._id}/${selectedSlot?.[0] || ""}`)} className="px-6 py-2 bg-primary rounded-full text-white text-sm font-semibold shrink-0">
            Book Now
          </button>
        </div>
      </div>

      <div className="mt-24 max-w-6xl mx-auto">
        <p className="text-gray-300 text-base md:text-lg mb-8 text-center md:text-left">You May Also Like</p>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-fit">
            {allMovies.filter((m) => m._id !== movie._id).slice(0, 4).map((m) => (
              <MovieCard key={m._id} movie={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;


