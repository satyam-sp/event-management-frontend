// src/app/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { loginUser } from "@/actions/user-action";
import AuthContainer from "@/components/AuthContainer";
import { useUser } from "@/store/user-store";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const user = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    await loginUser(data);
  };

  if (user) {
    return (
      <AuthContainer title="Welcome">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Hello, {user.name} 👋</h2>
        </div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg shadow-md transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <a href="/signup" className="text-yellow-600 font-medium hover:underline">
          Sign up
        </a>
      </p>
    </AuthContainer>
  );
}
