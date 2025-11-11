import axiosInstance from "@/services/axiosInstance";
import { eventStore } from "@/store/event-store";

export const fetchEvents = async () => {
  const { setState } = eventStore.getState();
  try {
    setState({ loading: true });
    const res = await axiosInstance.get("/events");
    setState({ events: res.data, loading: false });
  } catch (err: any) {
    setState({ error: "Failed to load events", loading: false });
  }
};

export const createEvent = async (data: any) => {
  const { setState, events } = eventStore.getState();
  try {
    const res = await axiosInstance.post("/events", data);
    setState({ events: [...events, res.data] });
  } catch (err: any) {
    setState({ error: "Failed to create event" });
  }
};

export const updateEvent = async (id: number, data: any) => {
  const { setState, events } = eventStore.getState();
  try {
    const res = await axiosInstance.put(`/events/${id}`, data);
    setState({
      events: events.map((e) => (e.id === id ? res.data : e)),
    });
  } catch (err: any) {
    setState({ error: "Failed to update event" });
  }
};

export const deleteEvent = async (id: number) => {
  const { setState, events } = eventStore.getState();
  try {
    await axiosInstance.delete(`/events/${id}`);
    setState({ events: events.filter((e) => e.id !== id) });
  } catch (err: any) {
    setState({ error: "Failed to delete event" });
  }
};
