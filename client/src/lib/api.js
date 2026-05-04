const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || "quickshow-admin";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Something went wrong");
  }

  if (res.status === 204) return null;
  return res.json();
}

const adminRequest = (path, options = {}) =>
  request(path, { ...options, headers: { ...(options.headers || {}), "x-admin-key": ADMIN_KEY } });

export const api = {
  getMovies: () => request("/api/movies"),
  getMovieDetails: (movieId) => request(`/api/movies/${movieId}`),
  getShowSeats: (showId) => request(`/api/shows/${encodeURIComponent(showId)}/seats`),
  createBooking: (payload) => request("/api/bookings", { method: "POST", body: JSON.stringify(payload) }),
  getBookings: (userId) => request(`/api/bookings?userId=${encodeURIComponent(userId)}`),
  getFavorites: (userId) => request(`/api/favorites?userId=${encodeURIComponent(userId)}`),
  toggleFavorite: (payload) => request("/api/favorites/toggle", { method: "POST", body: JSON.stringify(payload) }),

  getAdminDashboard: () => adminRequest("/api/admin/dashboard"),
  getAdminMovies: () => adminRequest("/api/admin/movies"),
  createAdminMovie: (payload) => adminRequest("/api/admin/movies", { method: "POST", body: JSON.stringify(payload) }),
  updateAdminMovie: (movieId, payload) => adminRequest(`/api/admin/movies/${movieId}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteAdminMovie: (movieId) => adminRequest(`/api/admin/movies/${movieId}`, { method: "DELETE" }),

  getAdminShows: () => adminRequest("/api/admin/shows"),
  createAdminShow: (payload) => adminRequest("/api/admin/shows", { method: "POST", body: JSON.stringify(payload) }),
  updateAdminShow: (showId, payload) => adminRequest(`/api/admin/shows/${encodeURIComponent(showId)}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteAdminShow: (showId) => adminRequest(`/api/admin/shows/${encodeURIComponent(showId)}`, { method: "DELETE" }),

  getAdminBookings: () => adminRequest("/api/admin/bookings")
};


