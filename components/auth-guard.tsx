"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AUTH_STORAGE_KEY = "mariscope-auth";
const PUBLIC_PATHS = ["/login"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    if (!isAuthenticated && !isPublicPath) {
      router.replace("/login");
      return;
    }
    setChecked(true);
  }, [pathname, isPublicPath, router]);

  if (!isPublicPath && !checked) {
    return null;
  }

  return <>{children}</>;
}
