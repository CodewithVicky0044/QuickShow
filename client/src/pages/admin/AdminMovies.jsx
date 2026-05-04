import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../lib/api";

const initialForm = { title: "", poster_path: "", backdrop_path: "", release_date: "", runtime: 120, vote_average: 7, original_language: "en" };

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState(initialForm);

  const load = () => api.getAdminMovies().then(setMovies).catch(() => setMovies([]));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.createAdminMovie({ ...form, genres: [{ id: 1, name: "Drama" }], casts: [] });
      setForm(initialForm);
      load();
      toast.success("Movie added");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeMovie = async (id) => {
    try { await api.deleteAdminMovie(id); load(); toast.success("Movie deleted"); }
    catch (err) { toast.error(err.message); }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="font-semibold mb-3">Add Movie</p>
        <div className="grid gap-3">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="bg-black/40 p-2 rounded" required />
          <input value={form.poster_path} onChange={(e) => setForm({ ...form, poster_path: e.target.value })} placeholder="Poster URL" className="bg-black/40 p-2 rounded" required />
          <input value={form.backdrop_path} onChange={(e) => setForm({ ...form, backdrop_path: e.target.value })} placeholder="Backdrop URL" className="bg-black/40 p-2 rounded" />
          <input value={form.release_date} onChange={(e) => setForm({ ...form, release_date: e.target.value })} type="date" className="bg-black/40 p-2 rounded" />
          <input value={form.runtime} onChange={(e) => setForm({ ...form, runtime: Number(e.target.value) })} type="number" className="bg-black/40 p-2 rounded" />
          <textarea value={form.overview || ""} onChange={(e) => setForm({ ...form, overview: e.target.value })} placeholder="Overview" className="bg-black/40 p-2 rounded" rows={3} />
          <button className="bg-primary rounded p-2">Add Movie</button>
        </div>
      </form>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="font-semibold mb-3">All Movies</p>
        <div className="space-y-3 max-h-[560px] overflow-auto pr-1">
          {movies.map((movie) => (
            <div key={movie._id} className="flex items-center justify-between bg-black/30 p-2 rounded">
              <p className="text-sm">{movie.title}</p>
              <button onClick={() => removeMovie(movie._id)} className="text-xs bg-red-500/80 px-2 py-1 rounded">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMovies;


