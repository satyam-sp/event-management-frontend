"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosInstance";
import { useParams, useRouter } from "next/navigation";

export default function TicketDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const res = await axiosInstance.get(`/tickets/${id}`);
      setTicket(res.data);
    } catch (err) {
      alert("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!ticket) return <p className="text-center py-20">Ticket not found</p>;


  const gst = (ticket.gst)
  const total = Number(ticket.total_price);

  const downloadPDF = async (id: any) => {
    try {
      const res = await axiosInstance.get(`/tickets/${id}/download`, {
        responseType: "blob", // ensure PDF blob
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = `ticket-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("PDF download error", err);
      alert("Failed to download ticket");
    }
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-yellow-600 mb-3">
        Ticket Details
      </h1>

      {/* Event Card */}
      <div className="border rounded-xl p-4 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-yellow-700 mb-2">
          {ticket.event?.title}
        </h2>

        <img
          src={ticket.event?.image_url}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />

        <p className="text-gray-700">{ticket.event?.description}</p>
        <p className="text-gray-700">
          Date:-
          {new Date(ticket.event?.date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="text-gray-700">Time: -{ticket.event?.time}</p>
      </div>

      {/* Ticket Info */}
      <div className="border rounded-xl p-4 shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-3">Booking Information</h3>

        <p>
          <strong>Ticket ID:</strong> {ticket.id}
        </p>
        <p>
          <strong>User:</strong> {ticket.user?.name} ({ticket.user?.email})
        </p>
        <p>
          <strong>Seats:</strong> {ticket.seats.join(", ")}
        </p>
      </div>
      {ticket.event?.video_url && (
        <div className="mt-4">
          <iframe
            width="100%"
            height="250"
            src={ticket.event.video_url.replace("watch?v=", "embed/")}
            className="rounded-lg shadow"
            allowFullScreen
          />
        </div>
      )}

      {/* Price Section */}
      <div className="border rounded-xl p-4 shadow-sm bg-yellow-50">
        <h3 className="text-lg font-semibold mb-3">Price Summary</h3>

        <div className="flex justify-between mb-2">
          <span>Base Price:</span>
          <span>₹{ticket.base_price}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>GST (18%):</span>
          <span>₹{gst}</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-lg font-bold text-yellow-700">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>
      <button
        onClick={() => downloadPDF(ticket.id)}
        className="px-4 py-2 bg-yellow-600 text-white rounded-lg mt-2"
      >
        Download Ticket (PDF)
      </button>



    </div>
  );
}
