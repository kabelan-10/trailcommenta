@@ .. @@
 "use client"; // 👈 required for client-side code
 import Cookies from "js-cookie";
-import { useEffect } from "react";
+import { useEffect, useState } from "react";
 import { useSearchParams, useRouter, redirect } from "next/navigation";
 import { authService, User, AuthResponse } from "@/lib/auth";
+import { useAuth } from "@/hooks/use-auth";
+import { Loader2 } from "lucide-react";
+
 export default function GoogleCallbackPage() {
   const searchParams = useSearchParams();
   const router = useRouter();
+  const { checkAuth } = useAuth();
+  const [isProcessing, setIsProcessing] = useState(true);
+  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     const code = searchParams.get("code");
-    console.log(code);
+    const from = searchParams.get("state") || "/projects"; // Get redirect URL from state
     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
-    // const res = { code: code, timezone: timezone };
-    // console.log(res);
+    
     if (code && timezone) {
-      // Send the code to your FastAPI backend
-      fetch("http://192.168.43.144:8000/auth_callback", {
-        method: "POST",
-        headers: {
-          "Content-Type": "application/json",
-        },
-        credentials: "include",
-
-        body: JSON.stringify({ code: code, timezone: timezone }),
-      })
-        .then((res) => res.json())
-        .then((data) => {
-          console.log("Login success:", data);
-          // Optionally redirect to dashboard or home
-
-          if (data.token) {
-            // Store token in secure cookies
-            const storedUser = authService.loginGoogle(data);
-            // Store user info in cookies
-            router.replace("/projects");
-            // Store token expiration (exp) in cookies
-
-            return {
-              success: true,
-              message: "Login successful",
-              user: {
-                user_id: data.user_id,
-                name: data.name,
-                email: data.email,
-                picture: data.picture,
-              },
-              token: data.token,
-            };
-          }
-          //   router.push("/dashboard");
-        })
-        .catch((err) => {
-          console.error("Login failed", err);
-        });
+      handleGoogleCallback(code, timezone, from);
+    } else {
+      setError("Missing authorization code or timezone");
+      setIsProcessing(false);
     }
-  }, [searchParams, router]);
+  }, [searchParams, router, checkAuth]);
+
+  const handleGoogleCallback = async (code: string, timezone: string, redirectTo: string) => {
+    try {
+      console.log("Processing Google OAuth callback...");
+      
+      // Use the authService method to handle the callback
+      const result = await authService.handleGoogleCallback(code, timezone);
+      
+      console.log("Google callback result:", result);
+      
+      if (result.success && result.user) {
+        console.log("Google authentication successful, checking auth state...");
+        
+        // Force a re-check of authentication state
+        await checkAuth();
+        
+        // Small delay to ensure auth state is updated
+        setTimeout(() => {
+          console.log("Redirecting to:", redirectTo);
+          router.replace(redirectTo);
+        }, 100);
+      } else {
+        console.error("Google authentication failed:", result.message);
+        setError(result.message || "Google authentication failed");
+        
+        // Redirect to login with error
+        setTimeout(() => {
+          router.replace("/login?error=oauth_failed");
+        }, 2000);
+      }
+    } catch (error) {
+      console.error("Error during Google callback:", error);
+      setError("An error occurred during authentication");
+      
+      // Redirect to login with error
+      setTimeout(() => {
+        router.replace("/login?error=oauth_error");
+      }, 2000);
+    } finally {
+      setIsProcessing(false);
+    }
+  };
+
+  if (error) {
+    return (
+      <div className="min-h-screen flex items-center justify-center bg-gray-50">
+        <div className="text-center">
+          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
+            <span className="text-red-600 text-xl">✕</span>
+          </div>
+          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Failed</h2>
+          <p className="text-gray-600 mb-4">{error}</p>
+          <p className="text-sm text-gray-500">Redirecting to login...</p>
+        </div>
+      </div>
+    );
+  }

-  return <p>Authenticating with Google...</p>;
+  return (
+    <div className="min-h-screen flex items-center justify-center bg-gray-50">
+      <div className="text-center">
+        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
+        <h2 className="text-xl font-semibold text-gray-900 mb-2">Authenticating with Google</h2>
+        <p className="text-gray-600">Please wait while we complete your authentication...</p>
+      </div>
+    </div>
+  );
 }