import axiosInstance from "@/services/axiosInstance";
import { ticketStore } from "@/store/tickets-store";

export const fetchTicketsByEvent = async (eventId: number) => {
  const { setState } = ticketStore.getState();
  try {
    setState({ loading: true, error: null });
    const res = await axiosInstance.get(`/events/${eventId}/tickets`);
    setState({ tickets: res.data, loading: false });
  } catch (err: any) {
    setState({
      error: err.response?.data?.message || "Failed to load tickets",
      loading: false,
    });
  }
};
