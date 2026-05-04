import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.getAdminBookings().then(setBookings).catch(() => setBookings([]));
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 overflow-auto">
      <p className="font-semibold mb-3">All Bookings</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-white/10">
            <th className="py-2">Movie</th>
            <th className="py-2">User</th>
            <th className="py-2">Date</th>
            <th className="py-2">Time</th>
            <th className="py-2">Seats</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-white/5">
              <td className="py-2">{b.movie?.title || "-"}</td>
              <td className="py-2">{b.userId}</td>
              <td className="py-2">{b.show?.date}</td>
              <td className="py-2">{b.show?.time}</td>
              <td className="py-2">{b.seats.join(", ")}</td>
              <td className="py-2">Rs. {b.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;


