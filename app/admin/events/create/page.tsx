"use client";
import { useForm } from "react-hook-form";
import { createEvent } from "@/actions/event-actions";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    await createEvent(data);
    reset();
    router.push("/events");
  };

  return (
    <div className="max-w-md mx-auto bg-yellow-50 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-yellow-800 mb-4">Create Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("title")} placeholder="Title" className="w-full border rounded p-2" />
        <textarea {...register("description")} placeholder="Description" className="w-full border rounded p-2" />
        <input type="date" {...register("date")} className="w-full border rounded p-2" />
        <input
      type="time"
      {...register("time")}
      className="w-full border rounded p-2"
    />
        <input {...register("location")} placeholder="Location" className="w-full border rounded p-2" />
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">
          Save
        </button>
      </form>
    </div>
  );
}
