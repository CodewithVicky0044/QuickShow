import { movies, makeDates, timeSlots } from "./data.js";

const showPrice = 249;

const createSeatIds = () => {
  const ids = [];
  ["A", "B"].forEach((row) => {
    for (let i = 1; i <= 10; i += 1) ids.push(`${row}${i}`);
  });
  ["C", "D"].forEach((row) => {
    for (let i = 1; i <= 8; i += 1) {
      ids.push(`${row}L${i}`);
      ids.push(`${row}R${i}`);
    }
  });
  ["E", "F", "G"].forEach((row) => {
    for (let i = 1; i <= 9; i += 1) {
      ids.push(`${row}L${i}`);
      ids.push(`${row}R${i}`);
    }
  });
  return ids;
};

const seatIds = createSeatIds();
const bookings = [];
const favoritesByUser = new Map();

const buildShows = () => {
  const shows = [];
  makeDates().forEach((date) => {
    movies.forEach((movie) => {
      timeSlots.forEach((time, idx) => {
        const showId = `${movie._id}-${date}-${time}`;
        shows.push({ showId, movieId: movie._id, date, time, showPrice: showPrice + idx * 20, occupiedSeats: {} });
      });
    });
  });
  return shows;
};

const shows = buildShows();

export const store = {
  movies,
  bookings,
  seatIds,
  shows,
  getMovie(movieId) {
    return movies.find((m) => m._id === movieId);
  },
  getShowsByMovie(movieId) {
    return shows.filter((s) => s.movieId === movieId);
  },
  getShow(showId) {
    return shows.find((s) => s.showId === showId);
  },
  addMovie(payload) {
    const newMovie = {
      _id: payload._id || `mv_${Date.now()}`,
      title: payload.title,
      overview: payload.overview || "",
      poster_path: payload.poster_path || "",
      backdrop_path: payload.backdrop_path || payload.poster_path || "",
      genres: payload.genres || [],
      release_date: payload.release_date || new Date().toISOString().slice(0, 10),
      original_language: payload.original_language || "en",
      vote_average: Number(payload.vote_average || 0),
      runtime: Number(payload.runtime || 120),
      casts: payload.casts || []
    };
    movies.unshift(newMovie);
    return newMovie;
  },
  updateMovie(movieId, payload) {
    const movie = this.getMovie(movieId);
    if (!movie) return null;
    Object.assign(movie, payload);
    return movie;
  },
  deleteMovie(movieId) {
    const idx = movies.findIndex((m) => m._id === movieId);
    if (idx < 0) return false;
    movies.splice(idx, 1);
    for (let i = shows.length - 1; i >= 0; i -= 1) {
      if (shows[i].movieId === movieId) shows.splice(i, 1);
    }
    return true;
  },
  addShow({ movieId, date, time, showPrice }) {
    const showId = `${movieId}-${date}-${time}`;
    if (this.getShow(showId)) return { error: "Show already exists" };
    const show = { showId, movieId, date, time, showPrice: Number(showPrice || 249), occupiedSeats: {} };
    shows.push(show);
    return { show };
  },
  updateShow(showId, payload) {
    const show = this.getShow(showId);
    if (!show) return null;
    Object.assign(show, payload);
    return show;
  },
  deleteShow(showId) {
    const idx = shows.findIndex((s) => s.showId === showId);
    if (idx < 0) return false;
    shows.splice(idx, 1);
    return true;
  },
  createBooking({ userId, showId, seats }) {
    const show = this.getShow(showId);
    if (!show) return { error: "Show not found" };
    const invalidSeat = seats.find((seat) => !seatIds.includes(seat));
    if (invalidSeat) return { error: `Invalid seat ${invalidSeat}` };
    const alreadyTaken = seats.find((seat) => Boolean(show.occupiedSeats[seat]));
    if (alreadyTaken) return { error: `${alreadyTaken} already booked` };
    seats.forEach((seat) => { show.occupiedSeats[seat] = userId; });

    const booking = {
      id: `bk_${Date.now()}`,
      userId,
      showId,
      movieId: show.movieId,
      seats,
      amount: seats.length * show.showPrice,
      status: "paid",
      createdAt: new Date().toISOString()
    };
    bookings.unshift(booking);
    return { booking };
  },
  getUserBookings(userId) {
    return bookings.filter((b) => b.userId === userId).map((booking) => ({ ...booking, show: this.getShow(booking.showId), movie: this.getMovie(booking.movieId) }));
  },
  getAllBookings() {
    return bookings.map((booking) => ({ ...booking, show: this.getShow(booking.showId), movie: this.getMovie(booking.movieId) }));
  },
  getDashboard() {
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
    const totalUsers = new Set(bookings.map((b) => b.userId)).size;
    return {
      totalBookings,
      totalRevenue,
      totalUsers,
      totalMovies: movies.length,
      totalShows: shows.length,
      activeShows: shows.slice(0, 8).map((show) => ({ ...show, movie: this.getMovie(show.movieId), occupiedCount: Object.keys(show.occupiedSeats).length }))
    };
  },
  toggleFavorite(userId, movieId) {
    if (!this.getMovie(movieId)) return { error: "Movie not found" };
    const set = favoritesByUser.get(userId) || new Set();
    if (set.has(movieId)) set.delete(movieId); else set.add(movieId);
    favoritesByUser.set(userId, set);
    return { favorites: [...set] };
  },
  getFavorites(userId) {
    const ids = [...(favoritesByUser.get(userId) || new Set())];
    return movies.filter((m) => ids.includes(m._id));
  }
};
