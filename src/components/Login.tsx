@@ .. @@
 import React, { useState } from 'react';
+import { Navigate, useLocation } from 'react-router-dom';
 import { useAuth } from '../contexts/AuthContext';
@@ .. @@
 const Login: React.FC = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isSignUp, setIsSignUp] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
-  const { signIn, signUp } = useAuth();
+  const { signIn, signUp, user } = useAuth();
+  const location = useLocation();
+  
+  // Get the intended destination from location state, default to /projects
+  const from = location.state?.from?.pathname || '/projects';
+  
+  // If user is already logged in, redirect to intended destination
+  if (user) {
+    return <Navigate to={f
  }
}rom} replace />;
+  }
 
   const handleSubmit = async (e: React.FormEvent) => {