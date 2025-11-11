// src/services/user-action.ts
import axiosInstance from "@/services/axiosInstance";
import { userStore } from "@/store/user-store";

export interface UserCredentials {
  email: string;
  password: string;
  name?: string;
}

export const signupUser = async (data: UserCredentials) => {
  const { setState } = userStore.getState();
  try {
    setState({ loading: true, error: null });
    const res = await axiosInstance.post("/signup", data);

    const user = res.data.user;
    const token = res.data.token;

    if (token) localStorage.setItem("token", token);

    setState({ user, loading: false });
  } catch (err: any) {
    setState({
      error: err.response?.data?.message || "Signup failed",
      loading: false,
    });
  }
};

export const loginUser = async (data: UserCredentials) => {
  const { setState } = userStore.getState();
  try {
    setState({ loading: true, error: null });
    const res = await axiosInstance.post("/login", data);

    const user = res.data.user;
    const token = res.data.token;

    if (token) localStorage.setItem("token", token);

    setState({ user, loading: false });
  } catch (err: any) {
    setState({
      error: err.response?.data?.message || "Login failed",
      loading: false,
    });
  }
};

export const fetchUserProfile = async () => {
  const { setState } = userStore.getState();
  try {
    setState({ loading: true, error: null });
    const res = await axiosInstance.get("/profile");
    setState({ user: res.data.user, loading: false });
  } catch (err: any) {
    setState({
      error: err.response?.data?.message || "Failed to fetch profile",
      loading: false,
    });
  }
};

export const logoutUser = () => {
  const { reset } = userStore.getState();
  localStorage.removeItem("token");
  reset();
};
