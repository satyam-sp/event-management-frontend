"use client";
import { useEffect } from "react";
import { useEvents } from "@/store/event-store";
import { fetchEvents, deleteEvent } from "@/actions/event-actions";
import EventCard from "@/components/EventCard";
import Link from "next/link";

export default function EventsPage() {
  const events = useEvents();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-800">Events</h1>
        <Link
          href="/admin/events/create"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Event
        </Link>
      </div>

      <div className="grid gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} onDelete={deleteEvent} />
          ))
        ) : (
          <p className="text-yellow-700">No events found.</p>
        )}
      </div>
    </div>
  );
}
