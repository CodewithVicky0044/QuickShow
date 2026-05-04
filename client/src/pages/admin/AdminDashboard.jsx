import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getAdminDashboard().then(setData).catch(() => setData(null));
  }, []);

  if (!data) return <div>Loading dashboard...</div>;

  const cards = [
    { label: "Total Bookings", value: data.totalBookings },
    { label: "Revenue", value: `Rs. ${data.totalRevenue}` },
    { label: "Users", value: data.totalUsers },
    { label: "Movies", value: data.totalMovies },
    { label: "Shows", value: data.totalShows }
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-gray-400 text-sm">{c.label}</p>
            <p className="text-xl font-semibold mt-2">{c.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-3">Active Shows</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {data.activeShows.map((show) => (
          <div key={show.showId} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="font-medium">{show.movie?.title}</p>
            <p className="text-sm text-gray-400 mt-1">{show.date} • {show.time}</p>
            <p className="text-sm text-primary mt-1">Rs. {show.showPrice}</p>
            <p className="text-sm text-gray-300 mt-1">Occupied: {show.occupiedCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;


