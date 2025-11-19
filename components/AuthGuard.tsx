"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(undefined); 
  const router = useRouter();
  const pathname = usePathname();

  // Public pages (allowed without login)
  const publicRoutes = ["/login", "/signup", "/"];

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // If page is public → do nothing
    if (isPublicRoute) {
      setUser(null);
      return;
    }

    // Protected routes:
    if (!storedUser) {
      router.replace("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [pathname]);

  // --- LOADING STATE ---
  if (user === undefined && !isPublicRoute) {
    return null;
  }

  return (
    <>
      {user && <Header user={user} />}
      {children}
    </>
  );
}
