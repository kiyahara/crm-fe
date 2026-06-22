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
      if (pathname === "/login") {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      const refresh = localStorage.getItem("refreshToken");

      if (!refresh) {
        router.replace("/login");
        return;
      }

      try {
        let validToken = token;

        // 🔥 refresh ONLY if needed
        if (!token || isTokenExpired(token)) {
          const newToken = await refreshToken();

          if (!newToken) {
            router.replace("/login");
            return;
          }

          localStorage.setItem("token", newToken);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          validToken = newToken;
        }

        // 🔥 SAVE CURRENT ROUTE ONLY (NO AUTO REDIRECT)
        if (pathname && pathname !== "/login") {
          localStorage.setItem("lastRoute", pathname);
        }

        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        router.replace("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading && pathname !== "/login") return null;

  return <>{children}</>;
}
