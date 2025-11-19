import { create } from "zustand";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  time: any;
  video_url: string;
  image_url: string;
  total_seats: any;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  setState: (partial: Partial<EventState>) => void;
  reset: () => void;
}

export const eventStore = create<EventState>((set) => ({
  events: [],
  loading: false,
  error: null,
  setState: (partial) => set((state) => ({ ...state, ...partial })),
  reset: () => set({ events: [], loading: false, error: null }),
}));

export const useEvents = () => eventStore((state) => state.events);
export const useEventStatus = () =>
  eventStore((state) => ({ loading: state.loading, error: state.error }));
