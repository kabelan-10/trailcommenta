@@ .. @@
   async handleGoogleCallback(code: string, timezone: string): Promise<AuthResponse> {
     try {
+      console.log("Sending Google callback to server...");
       const response = await fetch(`${this.baseUrl}/auth_callback`, {
         method: 'POST',
         headers: {
@@ -345,6 +346,7 @@ class AuthService {
       });

       const data = await response.json();
+      console.log("Server response for Google callback:", data);
       
       if (response.ok && data.token) {
+        console.log("Storing Google auth data in cookies...");
         // Store token and user data in secure cookies
         Cookies.set(this.tokenKey, data.token, this.getCookieOptions());
         Cookies.set(this.userKey, JSON.stringify({
@@ -354,6 +356,8 @@ class AuthService {
           picture: data.picture,
         }), this.getCookieOptions());
         Cookies.set("token_expiry", data.exp, this.getCookieOptions());
+        
+        console.log("Google auth cookies set successfully");

         return {
           success: true,
@@ -368,6 +372,7 @@ class AuthService {
         };
       } else {
+        console.error("Google callback failed:", data);
         return {
           success: false,
           message: data.message || 'Google authentication failed'
@@ -375,6 +380,7 @@ class AuthService {
       }
     } catch (error) {
+      console.error("Network error during Google callback:", error);
       return {
         success: false,
         message: 'Network error. Please check your connection.'
@@ -382,6 +388,26 @@ class AuthService {
     }
   }

+  // Method to manually trigger auth state refresh
+  async refreshAuthState(): Promise<AuthResponse> {
+    const token = this.getToken();
+    const user = this.getStoredUser();
+    
+    if (token && user && !this.isTokenExpired()) {
+      return {
+        success: true,
+        message: 'Authentication state refreshed',
+        user: user,
+        token: token
+      };
+    } else {
+      this.logout();
+      return {
+        success: false,
+        message: 'No valid authentication found'
+      };
+    }
+  }