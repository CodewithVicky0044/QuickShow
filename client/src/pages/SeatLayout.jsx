import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import BlurCircle from "../components/BlurCircle";
import { api } from "../lib/api";

const SeatLayout = () => {
  const { id: movieId, date } = useParams();
  const { user } = useUser();

  const [movie, setMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [showPrice, setShowPrice] = useState(0);

  useEffect(() => {
    api.getMovieDetails(movieId).then((data) => {
      setMovie(data);
      const firstTime = data.schedule?.[date]?.[0];
      if (firstTime) setSelectedTime(firstTime.showId);
    });
  }, [movieId, date]);

  useEffect(() => {
    if (!selectedTime) return;
    api.getShowSeats(selectedTime).then((data) => {
      setOccupiedSeats(data.occupiedSeats);
      setShowPrice(data.showPrice);
      setSelectedSeats([]);
    });
  }, [selectedTime]);

  const timings = useMemo(() => movie?.schedule?.[date] || [], [movie, date]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]));
  };

  const handleBooking = async () => {
    if (!user) return toast.error("Please login first");
    if (!selectedSeats.length) return toast.error("Select at least one seat");

    try {
      await api.createBooking({ userId: user.id, showId: selectedTime, seats: selectedSeats });
      toast.success("Booking successful");
      const latest = await api.getShowSeats(selectedTime);
      setOccupiedSeats(latest.occupiedSeats);
      setSelectedSeats([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Seat = ({ id }) => {
    const isBooked = occupiedSeats.includes(id);
    const isSelected = selectedSeats.includes(id);

    return (
      <div
        onClick={() => !isBooked && handleSeatClick(id)}
        className={`w-6 h-6 rounded-sm border transition-all duration-200 ${
          isBooked
            ? "bg-gray-700 border-gray-700 cursor-not-allowed"
            : isSelected
            ? "bg-primary border-primary scale-110"
            : "border-primary/40 hover:bg-primary/30 cursor-pointer"
        }`}
      />
    );
  };

  const rowsTop = ["A", "B"];
  const rowsMid = ["C", "D"];
  const rowsBottom = ["E", "F", "G"];

  return (
    <div className="w-full min-h-screen px-5 md:px-16 py-28 relative overflow-x-hidden">
      <BlurCircle top="0" right="0" />
      <BlurCircle bottom="0" left="0" />

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="bg-gradient-to-b from-[#2a0f12] to-[#1a0a0d] p-6 rounded-xl w-full lg:w-[240px] shadow-xl">
          <p className="text-gray-300 mb-5 font-medium">Available Timings</p>
          <div className="flex flex-col gap-3">
            {timings.map((slot) => (
              <button
                key={slot.showId}
                onClick={() => setSelectedTime(slot.showId)}
                className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 transition ${selectedTime === slot.showId ? "bg-primary text-white shadow-md" : "bg-black/40 text-gray-300 hover:bg-primary/20"}`}
              >
                {slot.time} � Rs. {slot.showPrice}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6">Select Your Seat</h2>

          <div className="relative w-full max-w-2xl h-16 mb-10">
            <div className="absolute inset-0 rounded-[100%] border-t-4 border-primary/50"></div>
            <p className="absolute w-full text-center top-6 text-xs text-gray-400">SCREEN SIDE</p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            {rowsTop.map((row) => (
              <div key={row} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-4">{row}</span>
                <div className="flex gap-2">{Array.from({ length: 10 }).map((_, i) => <Seat key={i} id={`${row}${i + 1}`} />)}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-10 mb-10">
            {rowsMid.map((row) => (
              <div key={row} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-4">{row}</span>
                <div className="flex gap-2">{Array.from({ length: 8 }).map((_, i) => <Seat key={i} id={`${row}L${i + 1}`} />)}</div>
                <div className="w-6"></div>
                <div className="flex gap-2">{Array.from({ length: 8 }).map((_, i) => <Seat key={i} id={`${row}R${i + 1}`} />)}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {rowsBottom.map((row) => (
              <div key={row} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-4">{row}</span>
                <div className="flex gap-2">{Array.from({ length: 9 }).map((_, i) => <Seat key={i} id={`${row}L${i + 1}`} />)}</div>
                <div className="w-8"></div>
                <div className="flex gap-2">{Array.from({ length: 9 }).map((_, i) => <Seat key={i} id={`${row}R${i + 1}`} />)}</div>
              </div>
            ))}
          </div>

          <button onClick={handleBooking} className="mt-12 px-10 py-3 bg-primary rounded-full flex items-center gap-2 hover:bg-primary-dull transition shadow-lg">
            Proceed to checkout (Rs. {selectedSeats.length * showPrice})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;

