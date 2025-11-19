"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosInstance";
import { useParams } from "next/navigation";

export default function EventDetails() {
  const params = useParams();
  const eventId = params.id;

  const [event, setEvent] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // price states
  const [basePrice, setBasePrice] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const placeholderUrl = `https://placehold.co/400x200/FACC15/78350F?text=Event+${eventId}`;

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const res = await axiosInstance.get(`/events/${eventId}`);
    setEvent(res.data);
  };

  // calculate total price + GST
  const calculatePrice = (seatIds: number[]) => {
    if (!event?.seats) return;

    const selectedSeatObjects = event.seats.filter((s: any) =>
      seatIds.includes(s.id)
    );

    debugger;
    const base = selectedSeatObjects.reduce(
      (sum: number, seat: any) => sum + Number(seat.price),
      0
    );

    const gstAmount = Math.round(base * 0.18);
    const total = base + gstAmount;

    setBasePrice(base);
    setGst(gstAmount);
    setTotalPrice(total);
  };

  const toggleSeat = (seatId: number) => {
    setSelectedSeats((prev) => {
      let updated;

      if (prev.includes(seatId)) {
        updated = prev.filter((id) => id !== seatId);
      } else {
        updated = [...prev, seatId];
      }

      calculatePrice(updated);
      return updated;
    });
  };

  const bookTicket = async () => {
    if (selectedSeats.length === 0) return alert("Please select a seat");

    try {
      setLoading(true);

      await axiosInstance.post(`/tickets/events/${eventId}/buy`, {
        seats: selectedSeats,
      });

      alert("Booking success!");

      setSelectedSeats([]);
      setBasePrice(0);
      setGst(0);
      setTotalPrice(0);

      fetchEvent();
    } catch (err: any) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-yellow-600">
        {event.title}
      </h1>

      <img
        src={event.image_url}
        alt={event.title}
        className="w-full h-80 object-cover"
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = placeholderUrl;
        }}
      />

      <p className="mb-6 text-gray-700">{event.description}</p>

      {event.video_url && (
        <div className="mb-4">
          <iframe
            width="100%"
            height="315"
            src={event.video_url.replace("watch?v=", "embed/")}
            className="rounded-lg shadow-md"
            allowFullScreen
          />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 text-yellow-700">
        Select Seats
      </h2>

      {/* Seat Grid */}
      <div className="grid grid-cols-5 gap-4">
        {event.seats?.map((seat: any) => (
          <label
            key={seat.id}
            className={`p-3 flex items-center justify-center border rounded-lg cursor-pointer text-sm font-semibold
              ${
                seat.is_booked
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : selectedSeats.includes(seat.id)
                  ? "bg-yellow-500 text-white border-yellow-600"
                  : "bg-white border-gray-400 hover:border-yellow-500"
              }
            `}
          >
            <input
              type="checkbox"
              disabled={seat.is_booked}
              checked={selectedSeats.includes(seat.id)}
              onChange={() => toggleSeat(seat.id)}
              className="hidden"
            />
            {seat.seat_number}
          </label>
        ))}
      </div>

      {/* Price Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-yellow-50">
          <h3 className="font-bold text-lg mb-2">Price Summary</h3>

          <p className="flex justify-between">
            <span>Base Price:</span>
            <span>₹{basePrice}</span>
          </p>

          <p className="flex justify-between text-yellow-700">
            <span>GST (18%):</span>
            <span>₹{gst}</span>
          </p>

          <hr className="my-2" />

          <p className="flex justify-between font-extrabold text-xl">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </p>
        </div>
      )}

      {/* Book Button */}
      <div className="mt-6">
        <button
          disabled={loading || selectedSeats.length === 0}
          onClick={bookTicket}
          className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-lg font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? "Booking..." : "Book Ticket"}
        </button>
      </div>
    </div>
  );
}
