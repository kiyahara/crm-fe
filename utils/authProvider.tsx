"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { refreshToken } from "./refreshFunction";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const refresh = localStorage.getItem("refreshToken");
        if (pathname === "/login") {
          if (token && !isTokenExpired(token)) {
            router.replace("/home");
            return;
          }

          setLoading(false);
          return;
        }

        if (!refresh) {
          router.replace("/login");
          return;
        }

        if (!token || isTokenExpired(token)) {
          const newToken = await refreshToken();

          if (!newToken) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");

            router.replace("/login");
            return;
          }

          localStorage.setItem("token", newToken);
        }

        localStorage.setItem("lastRoute", pathname);

        setLoading(false);
      } catch (error) {
        console.error("AUTH ERROR:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");

        router.replace("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
}
