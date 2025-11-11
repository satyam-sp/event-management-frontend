import { create } from "zustand";

export interface Ticket {
  id: number;
  eventId: number;
  userName: string;
  seatNumber: string;
  status: string;
}

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  setState: (partial: Partial<TicketState>) => void;
  reset: () => void;
}

export const ticketStore = create<TicketState>((set) => ({
  tickets: [],
  loading: false,
  error: null,
  setState: (partial) => set((state) => ({ ...state, ...partial })),
  reset: () => set({ tickets: [], loading: false, error: null }),
}));

export const useTickets = () => ticketStore((state) => state.tickets);
export const useTicketStatus = () =>
  ticketStore((state) => ({ loading: state.loading, error: state.error }));
