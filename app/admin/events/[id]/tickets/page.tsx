"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchTicketsByEvent } from "@/actions/tickets-action";
import { useTickets } from "@/store/tickets-store";
import TicketCard from "@/components/TicketCard";

export default function TicketsPage() {
  const { id } = useParams();
  const router = useRouter();
  const tickets = useTickets();

  useEffect(() => {
    if (id) fetchTicketsByEvent(Number(id));
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-800">
          Tickets for Event #{id}
        </h1>
        <button
          onClick={() => router.push(`/events`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
        >
          Back to Events
        </button>
      </div>

      <div className="grid gap-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
        ) : (
          <p className="text-yellow-700 text-sm">No tickets found for this event.</p>
        )}
      </div>
    </div>
  );
}
