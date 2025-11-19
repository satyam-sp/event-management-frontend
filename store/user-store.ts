// src/store/user-store.ts
import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  token?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setState: (partial: Partial<UserState>) => void;
  reset: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  setState: (partial) => set((state) => ({ ...state, ...partial })),
  reset: () => set({ user: null, loading: false, error: null }),
}));

// ✅ Only expose a custom hook for read-only access
export const useUser = () => useUserStore((state) => state.user || (localStorage.user && JSON.parse(localStorage.user)));

// ✅ Optional: expose other selectors if needed
export const useUserStatus = () =>
  useUserStore((state) => ({
    loading: state.loading,
    error: state.error,
  }));

// ✅ Keep internal state mutation accessible for actions
export const userStore = useUserStore;
