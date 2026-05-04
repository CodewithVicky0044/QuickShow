import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import BlurCircle from "../components/BlurCircle";
import { api } from "../lib/api";

const MyBooking = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;
    api.getBookings(user.id).then(setBookings).catch(() => setBookings([]));
  }, [user]);

  if (!user) {
    return <div className="min-h-[60vh] flex items-center justify-center">Please login to see your bookings.</div>;
  }

  return (
    <div className="w-full min-h-screen px-5 md:px-16 lg:px-24 py-28 relative overflow-x-hidden">
      <BlurCircle top="0" right="0" />
      <BlurCircle bottom="0" left="0" />

      <h2 className="text-xl md:text-2xl font-semibold mb-10">My Bookings</h2>

      <div className="flex flex-col gap-8">
        {bookings.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-gradient-to-r from-[#2a0f12] via-[#3a1419] to-[#2a0f12] rounded-xl p-5 md:p-6 border border-primary/10 shadow-md">
            <img src={item.movie.backdrop_path} alt="" className="w-full md:w-[200px] h-[130px] md:h-[120px] object-cover rounded-lg" />

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{item.movie.title}</h3>
                  <p className="text-sm text-gray-300 mt-3">{item.show.date} • {item.show.time}</p>
                </div>
                <p className="text-xl font-semibold text-primary">Rs. {item.amount}</p>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between mt-4 text-sm text-gray-400">
                <p>Total Tickets: {item.seats.length}</p>
                <p>Seat Number: <span className="text-gray-300">{item.seats.join(", ")}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;


