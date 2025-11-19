// src/services/user-action.ts
import axiosInstance from "@/services/axiosInstance";
import { userStore } from "@/store/user-store";
import { cookies } from "next/headers";

export interface UserCredentials {
  email: string;
  password: string;
  name?: string;
}

export const signupUser = async (data: UserCredentials) => {
  const { setState } = userStore.getState();
  try {
    setState({ loading: true, error: null });
    const res = await axiosInstance.post("/auth/register", data);

    const user = res.data;
    const token = res.data.accessToken;

    if (token) localStorage.setItem("user", JSON.stringify(res.data));
  

    setState({ user, loading: false });
  } catch (err: any) {
    console.log(err)
    setState({
      error: err.response?.data?.message || "Signup failed",
      loading: false,
    });
  }
};

export const loginUser = async (data: UserCredentials, router: any) => {
  const { setState } = userStore.getState();
  try {
    setState({ loading: true, error: null });
    const res = await axiosInstance.post("/auth/login", data);

    const user = res.data;
    const token = res.data.accessToken;
    if (token) localStorage.setItem("user", JSON.stringify(res.data));
    setState({ user, loading: false });
    document.cookie = `token=${token}; path=/;`;
    document.cookie = `isAdmin=${user.isAdmin}; path=/;`;


    router.push("/admin/dashboard");
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

export const logoutUser = async() => {
  await localStorage.clear();
  document.cookie = "token=; path=/;";
  document.cookie = "isAdmin=; path=/;";
  window.location.href = '/login'
};
