"use client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { updateEvent, fetchEvents } from "@/actions/event-actions";
import { useEffect } from "react";
import { useEvents } from "@/store/event-store";

export default function EditEvent() {
  const { id } = useParams();
  const router = useRouter();
  const events = useEvents();
  const event = events.find((e) => e.id === Number(id));
  const { register, handleSubmit, reset } = useForm({ defaultValues: event });

  useEffect(() => {
    if (!event) fetchEvents();
    else reset(event);
  }, [event]);

  const onSubmit = async (data: any) => {
    await updateEvent(Number(id), data);
    router.push("/events");
  };

  if (!event) return <p className="text-yellow-700 p-6">Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-yellow-50 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-yellow-800 mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("title")} placeholder="Title" className="w-full border rounded p-2" />
        <textarea {...register("description")} placeholder="Description" className="w-full border rounded p-2" />
        <input type="date" {...register("date")} className="w-full border rounded p-2" />
        <input {...register("location")} placeholder="Location" className="w-full border rounded p-2" />
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">
          Update
        </button>
      </form>
    </div>
  );
}
