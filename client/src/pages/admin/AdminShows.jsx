import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../lib/api";

const init = { movieId: "", date: "", time: "", showPrice: 249 };

const AdminShows = () => {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState(init);

  const load = () => Promise.all([api.getAdminShows(), api.getAdminMovies()]).then(([s, m]) => {
    setShows(s);
    setMovies(m);
    if (!form.movieId && m[0]) setForm((prev) => ({ ...prev, movieId: m[0]._id }));
  });

  useEffect(() => { load().catch(() => {}); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.createAdminShow(form);
      setForm((prev) => ({ ...init, movieId: prev.movieId }));
      load();
      toast.success("Show added");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeShow = async (showId) => {
    try { await api.deleteAdminShow(showId); load(); toast.success("Show deleted"); }
    catch (err) { toast.error(err.message); }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
        <p className="font-semibold">Add Show</p>
        <select className="bg-black/40 p-2 rounded w-full" value={form.movieId} onChange={(e) => setForm({ ...form, movieId: e.target.value })} required>
          {movies.map((m) => <option key={m._id} value={m._id}>{m.title}</option>)}
        </select>
        <input type="date" className="bg-black/40 p-2 rounded w-full" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <input placeholder="Time (HH:mm)" className="bg-black/40 p-2 rounded w-full" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
        <input type="number" className="bg-black/40 p-2 rounded w-full" value={form.showPrice} onChange={(e) => setForm({ ...form, showPrice: Number(e.target.value) })} required />
        <button className="bg-primary rounded p-2 w-full">Add Show</button>
      </form>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="font-semibold mb-3">All Shows</p>
        <div className="space-y-3 max-h-[560px] overflow-auto pr-1">
          {shows.map((show) => (
            <div key={show.showId} className="flex items-center justify-between bg-black/30 p-2 rounded">
              <p className="text-sm">{show.movieId} • {show.date} • {show.time} • Rs.{show.showPrice}</p>
              <button onClick={() => removeShow(show.showId)} className="text-xs bg-red-500/80 px-2 py-1 rounded">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminShows;


