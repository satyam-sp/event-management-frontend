"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/store/user-store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user: any = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    } else if (user?.admin && pathname === "/events") {
      router.push("/admin");
    } else if (!user?.admin && pathname === "/admin") {
      router.push("/events");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
