@@ .. @@
   // Handle OAuth callback
   useEffect(() => {
     const code = searchParams.get("code");
+    const error = searchParams.get("error");
+    
+    if (error) {
+      if (error === "oauth_failed") {
+        toast.error("Google authentication failed. Please try again.");
+      } else if (error === "oauth_error") {
+        toast.error("An error occurred during Google authentication.");
+      }
+    }
+    
     if (code) {
       handleGoogleCallback(code);
     }
@@ .. @@
   const handleGoogleLogin = async () => {
     setIsGoogleLoading(true);
     try {
       const result = await authService.initiateGoogleAuth();
       console.log(result);
       if (result.success && result.url) {
+        // Add the redirect URL as state parameter
+        const redirectUrl = new URL(result.url);
+        redirectUrl.searchParams.set('state', from);
+        window.location.href = redirectUrl.toString();
-        window.location.href = result.url;
       } else {
         toast.error(result.message || "Failed to initiate Google login");
       }