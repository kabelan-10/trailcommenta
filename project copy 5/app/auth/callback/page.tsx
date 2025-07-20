"use client"; // 👈 required for client-side code
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { authService, User, AuthResponse } from "@/lib/auth";
export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log(code);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const res = { code: code, timezone: timezone };
    // console.log(res);
    if (code && timezone) {
      // Send the code to your FastAPI backend
      fetch("http://192.168.43.144:8000/auth_callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({ code: code, timezone: timezone }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Login success:", data);
          // Optionally redirect to dashboard or home

          if (data.token) {
            // Store token in secure cookies
            const storedUser = authService.loginGoogle(data);
            // Store user info in cookies
            router.replace("/projects");
            // Store token expiration (exp) in cookies

            return {
              success: true,
              message: "Login successful",
              user: {
                user_id: data.user_id,
                name: data.name,
                email: data.email,
                picture: data.picture,
              },
              token: data.token,
            };
          }
          //   router.push("/dashboard");
        })
        .catch((err) => {
          console.error("Login failed", err);
        });
    }
  }, [searchParams, router]);

  return <p>Authenticating with Google...</p>;
}
