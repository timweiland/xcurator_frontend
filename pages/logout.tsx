import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@services/AuthService";

export default function Logout() {
  const { isAuthenticated, logout } = useAuth((state) => ({
    isAuthenticated: state.isAuthenticated,
    logout: state.logout,
  }));
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      logout();
    } else {
      router.push("/");
    }
  });

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full">
      <p className="text-center font-bold text-3xl">
        {isAuthenticated ? "Logging out..." : "Redirecting..."}
      </p>
    </div>
  );
}
