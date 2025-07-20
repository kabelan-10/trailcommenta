@@ .. @@
   const checkAuth = useCallback(async () => {
     setIsLoading(true);
+    console.log("🔍 Checking authentication state...");
+    
     // First check if we have a stored user
     const storedUser = authService.getStoredUser();
     const token = authService.getToken();
+    
+    console.log("📊 Auth check - Token:", token ? "Present" : "Missing");
+    console.log("📊 Auth check - User:", storedUser ? storedUser.name : "Missing");
+    
     // Check if token is expired before proceeding
     if (token && authService.isTokenExpired()) {
       // Token is expired, clear everything and don't verify with backend
+      console.log("⏰ Token expired, clearing auth state");
       authService.logout();
       setUser(null);
       setIsAuthenticated(false);
@@ -42,6 +49,7 @@ export function useAuth() {
     }

     if (storedUser) {
+      console.log("✅ Setting user from stored data:", storedUser.name);
       setUser(storedUser);
       setIsAuthenticated(true);
     }
@@ -49,6 +57,7 @@ export function useAuth() {
     // Then verify with backend (only if token exists and is not expired)
     if (!token) {
+      console.log("❌ No token found, user not authenticated");
       setUser(null);
       setIsAuthenticated(false);
       setIsLoading(false);
@@ -57,6 +66,7 @@ export function useAuth() {

     const result = await authService.verifyToken();
     if (result.success && result.user) {
+      console.log("✅ Token verification successful");
       console.log("Auth check successful:", result);
       setUser(result.user);
       setIsAuthenticated(true);
@@ -64,6 +74,7 @@ export function useAuth() {
       setVerificationEmail('');
     } else {
+      console.log("❌ Token verification failed");
       setUser(null);
       setIsAuthenticated(false);
       if (storedUser) {
@@ -74,6 +85,7 @@ export function useAuth() {
       }

     }

+    console.log("🏁 Auth check complete - Authenticated:", storedUser && token && !authService.isTokenExpired());
     setIsLoading(false);

   }, []);
@@ -95,6 +107,7 @@ export function useAuth() {
     const result = await authService.login(email, password , timezone);
     console.log("Login response:--::--::", result);
     // console.log("Login response:", result.user_id);
     if (result.success) {
+      console.log("✅ Manual login successful, updating auth state");
       const uservar = { user_id: result.user!.user_id, name: result.user!.name, email: result.user!.email, picture: result.user!.picture };
       console.log("User object:", uservar);
       
@@ -108,6 +121,7 @@ export function useAuth() {
       return true;
     } else if (result.requiresVerification) {
+      console.log("📧 Email verification required");
       setShowVerificationPrompt(true);
       setVerificationEmail(result.email || email);
       toast.error(result.message || 'Please verify your email before logging in');
@@ -115,6 +129,7 @@ export function useAuth() {
       setIsLoading(false);
       return false;
     } else {
+      console.log("❌ Login failed:", result.message);
       toast.error(result.message || 'Login failed');
       setIsLoading(false);
       return false;
@@ -158,6 +173,7 @@ export function useAuth() {

   const logout = useCallback(() => {
+    console.log("🚪 Logging out user");
     authService.logout();
     setUser(null);
     setIsAuthenticated(false);
@@ -172,6 +188,15 @@ export function useAuth() {
   }, []);
   useEffect(() => {
     checkAuth();
+    
+    // Listen for storage events (when auth state changes in another tab)
+    const handleStorageChange = (e: StorageEvent) => {
+      if (e.key === 'auth_token' || e.key === 'user_data') {
+        checkAuth();
+      }
+    };
+    
+    window.addEventListener('storage', handleStorageChange);
+    return () => window.removeEventListener('storage', handleStorageChange);
   }, [checkAuth]);

   // Periodic auth check every 5 minutes