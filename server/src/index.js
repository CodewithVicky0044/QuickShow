import express from "express";
import cors from "cors";
import { store } from "./store.js";

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_KEY = process.env.ADMIN_KEY || "quickshow-admin";

app.use(cors());
app.use(express.json());

const adminOnly = (req, res, next) => {
  if (req.headers["x-admin-key"] !== ADMIN_KEY) {
    return res.status(401).json({ message: "Unauthorized admin" });
  }
  return next();
};

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/movies", (_req, res) => res.json(store.movies));

app.get("/api/movies/:movieId", (req, res) => {
  const movie = store.getMovie(req.params.movieId);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  const grouped = store.getShowsByMovie(req.params.movieId).reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = [];
    acc[s.date].push({ showId: s.showId, time: s.time, showPrice: s.showPrice });
    return acc;
  }, {});
  return res.json({ ...movie, schedule: grouped });
});

app.get("/api/shows/:showId/seats", (req, res) => {
  const show = store.getShow(req.params.showId);
  if (!show) return res.status(404).json({ message: "Show not found" });
  return res.json({ showId: show.showId, movieId: show.movieId, date: show.date, time: show.time, showPrice: show.showPrice, occupiedSeats: Object.keys(show.occupiedSeats) });
});

app.post("/api/bookings", (req, res) => {
  const { userId, showId, seats } = req.body;
  if (!userId || !showId || !Array.isArray(seats) || seats.length === 0) return res.status(400).json({ message: "userId, showId and seats are required" });
  const result = store.createBooking({ userId, showId, seats });
  if (result.error) return res.status(400).json({ message: result.error });
  return res.status(201).json(result.booking);
});

app.get("/api/bookings", (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ message: "userId query is required" });
  return res.json(store.getUserBookings(userId));
});

app.get("/api/favorites", (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ message: "userId query is required" });
  return res.json(store.getFavorites(userId));
});

app.post("/api/favorites/toggle", (req, res) => {
  const { userId, movieId } = req.body;
  if (!userId || !movieId) return res.status(400).json({ message: "userId and movieId required" });
  const result = store.toggleFavorite(userId, movieId);
  if (result.error) return res.status(404).json({ message: result.error });
  return res.json(result);
});

app.get("/api/admin/dashboard", adminOnly, (_req, res) => res.json(store.getDashboard()));
app.get("/api/admin/movies", adminOnly, (_req, res) => res.json(store.movies));
app.post("/api/admin/movies", adminOnly, (req, res) => res.status(201).json(store.addMovie(req.body)));
app.put("/api/admin/movies/:movieId", adminOnly, (req, res) => {
  const movie = store.updateMovie(req.params.movieId, req.body);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  return res.json(movie);
});
app.delete("/api/admin/movies/:movieId", adminOnly, (req, res) => {
  const ok = store.deleteMovie(req.params.movieId);
  if (!ok) return res.status(404).json({ message: "Movie not found" });
  return res.status(204).end();
});

app.get("/api/admin/shows", adminOnly, (_req, res) => res.json(store.shows));
app.post("/api/admin/shows", adminOnly, (req, res) => {
  const result = store.addShow(req.body);
  if (result.error) return res.status(400).json({ message: result.error });
  return res.status(201).json(result.show);
});
app.put("/api/admin/shows/:showId", adminOnly, (req, res) => {
  const show = store.updateShow(req.params.showId, req.body);
  if (!show) return res.status(404).json({ message: "Show not found" });
  return res.json(show);
});
app.delete("/api/admin/shows/:showId", adminOnly, (req, res) => {
  const ok = store.deleteShow(req.params.showId);
  if (!ok) return res.status(404).json({ message: "Show not found" });
  return res.status(204).end();
});

app.get("/api/admin/bookings", adminOnly, (_req, res) => res.json(store.getAllBookings()));

app.listen(PORT, () => {
  console.log(`QuickShow server running on http://localhost:${PORT}`);
});


