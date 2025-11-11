import React from "react";
import { Event } from "@/store/event-store";
import Link from "next/link";

interface Props {
  event: Event;
  onDelete?: (id: number) => void;
}

const EventCard: React.FC<Props> = ({ event, onDelete }) => (
  <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 shadow-md hover:shadow-lg transition">
    <h2 className="text-xl font-semibold text-yellow-800">{event.title}</h2>
    <p className="text-yellow-700 text-sm">{event.description}</p>
    <p className="text-xs mt-2 text-yellow-600">{event.date} - {event.location}</p>
    <div className="flex gap-2 mt-3">
      <Link
        href={`/events/${event.id}`}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
      >
        Edit
      </Link>
      <button
        onClick={() => onDelete && onDelete(event.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  </div>
);

export default EventCard;
