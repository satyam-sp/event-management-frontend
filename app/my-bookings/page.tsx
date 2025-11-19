"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosInstance";
import { useRouter } from "next/navigation";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/tickets/my");
      setBookings(res.data.tickets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (bookings.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
        No bookings found. Book your first event!
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600">
        My Bookings
      </h1>

      <div className="space-y-6">
        {bookings.map((ticket) => (
          <div
            key={ticket.id}
            className="border p-4 rounded-xl shadow-md bg-white"
          >
            <div className="flex">
              <img
                src={ticket.event.image_url}
                className="w-32 h-32 object-cover rounded-lg"
                alt="Event"
              />

              <div className="ml-4 flex-1">
                <h2 className="text-xl font-bold text-yellow-700">
                  {ticket.event.title}
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                  Seats: {ticket.seats.join(", ")}
                </p>

                <p className="text-gray-800 font-semibold mt-2">
                  Base Price: ₹{ticket.base_price}
                </p>

                <p className="text-gray-600">GST (18%): ₹{ticket.gst}</p>

                <p className="text-lg font-bold text-green-700">
                  Total Paid: ₹{ticket.total_price}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Booked on: {new Date(ticket.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => router.push(`/tickets/${ticket.id}`)}
                  className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>



          </div>
        ))}
      </div>
    </div>
  );
}
