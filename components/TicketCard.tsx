import React from "react";
import { Ticket } from "@/store/tickets-store";

interface Props {
  ticket: Ticket;
}

const TicketCard: React.FC<Props> = ({ ticket }) => (
  <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg shadow-sm hover:shadow-md transition">
    <div className="flex justify-between">
      <h3 className="font-semibold text-yellow-800">Seat {ticket.seatNumber}</h3>
      <span
        className={`text-sm font-medium ${
          ticket.status === "Booked"
            ? "text-green-600"
            : "text-yellow-600"
        }`}
      >
        {ticket.status}
      </span>
    </div>
    <p className="text-yellow-700 text-sm mt-2">
      Booked by: <span className="font-medium">{ticket.userName}</span>
    </p>
  </div>
);

export default TicketCard;
