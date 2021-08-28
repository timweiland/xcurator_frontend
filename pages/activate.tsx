import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";

const API_PATH =
  process.env.NEXT_PUBLIC_BACKEND_BASE +
  process.env.NEXT_PUBLIC_ACCOUNT_ACTIVATION_PATH;

export default function ActivateAccount() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { uidb64, token } = router.query;

  useEffect(() => {
    setLoading(true);
    console.log(uidb64);
    console.log(token);
    if (!uidb64 || !token) {
      setLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 3000);
      return;
    }
    if (success) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      return;
    }
    const url = `${API_PATH}/${uidb64}/${token}/`;
    axios
      .patch(url)
      .then((response) => {
        console.log(response);
        setSuccess(response.status == 200);
      })
      .catch((error) => {
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      });
  });

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full">
      <p className="text-center font-bold text-3xl">
        {loading
          ? "Activating account..."
          : success
          ? "Success! You can now log in. Redirecting..."
          : "Invalid token. Redirecting..."}
      </p>
    </div>
  );
}
