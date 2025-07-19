"use client";
import { apiService } from "../lib/api";
import { useState, useEffect } from "react";
import LoginPage from "@/components/auth/LoginPage";
// import RegisterPage from "@/components/auth/RegisterPage";
import EmailVerificationPage from "@/components/auth/EmailVerificationPage";
import ForgotPasswordPage from "@/components/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/components/auth/ResetPasswordPage";
import Dashboard from "@/components/dashboard/Dashboard";
import DeveloperMode from "@/components/layout/DeveloperMode";
import { useAuth } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/sonner";
import { useSearchParams } from "next/navigation";
import { authService } from "@/lib/auth";
import { toast } from "sonner";

export default function Home() {
  const [currentView, setCurrentView] = useState<
    "login" | "forgot-password" | "reset-password" | "verify-email"
    //  | "register"
  >("login");
  const [developerView, setDeveloperView] = useState<string | null>(null);
  const [dashboardRefreshTrigger, setDashboardRefreshTrigger] = useState(0);
  const {
    user,
    isAuthenticated,
    isLoading,
    showVerificationPrompt,
    verificationEmail,
    login,
    // register,
    logout,
    clearVerificationPrompt,
  } = useAuth();
  const searchParams = useSearchParams();

  // Check for email verification or password reset tokens in URL
  useEffect(() => {
    const token = searchParams.get("token");
    const action = searchParams.get("action");
    const code = searchParams.get("code");

    if (token && action === "verify-email") {
      setCurrentView("verify-email");
    } else if (token && action === "reset-password") {
      setCurrentView("reset-password");
    } else if (code) {
      // Handle Google OAuth callback
      handleGoogleCallback(code);
    }
  }, [searchParams]);

  const handleGoogleCallback = async (code: string) => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const result = await authService.handleGoogleCallback(code, timezone);

      if (result.success) {
        toast.success("Google authentication successful!");
        setDashboardRefreshTrigger((prev) => prev + 1);
        // The auth service will handle storing the token and user data
        // Trigger a page reload to update the auth state
        window.location.href = "/";
      } else {
        toast.error(result.message || "Google authentication failed");
      }
    } catch (error) {
      toast.error("Google authentication failed");
    }
  };

  const handleLogin = async (
    email: string,
    password: string,
    timezone: string
  ): Promise<boolean> => {
    const success = await login(email, password, timezone);
    if (success) {
      // Clear any cached data and refresh
      apiService.clearCache();
      return true;
    }
    return false;
  };

  // const handleRegister = async (
  //   name: string,
  //   email: string,
  //   password: string
  // ): Promise<boolean> => {
  //   const success = await register(name, email, password);
  //   if (success) {
  //     // Clear any cached data and refresh
  //     apiService.clearCache();
  //     return true;
  //   }
  //   return false;
  // };

  const handleVerificationSuccess = () => {
    clearVerificationPrompt();
    setCurrentView("login");
    setDashboardRefreshTrigger((prev) => prev + 1);
  };

  const handleResetSuccess = () => {
    setCurrentView("login");
    setDashboardRefreshTrigger((prev) => prev + 1);
  };
  // Developer mode view override
  const handleDeveloperViewChange = (view: string) => {
    setDeveloperView(view);

    // Update currentView for auth pages
    if (
      [
        "login",
        // "register",
        "forgot-password",
        "reset-password",
        "verify-email",
      ].includes(view)
    ) {
      setCurrentView(
        view as
          | "login"
          // | "register"
          | "forgot-password"
          | "reset-password"
          | "verify-email"
      );
    }
  };

  // Determine what to render based on developer mode or normal flow
  const shouldShowDeveloperView =
    process.env.NODE_ENV === "development" && developerView;

  const renderContent = () => {
    // In development, allow viewing any page
    if (shouldShowDeveloperView) {
      if (developerView === "login") {
        return (
          <LoginPage
            onLogin={handleLogin}
            // onSwitchToRegister={() => setCurrentView("register")}
            onForgotPassword={() => setCurrentView("forgot-password")}
            isLoading={isLoading}
            showVerificationPrompt={showVerificationPrompt}
            verificationEmail={verificationEmail}
          />
        );
      }
      // if (developerView === "register") {
      //   return (
      //     <RegisterPage
      //       onRegister={handleRegister}
      //       onSwitchToLogin={() => setCurrentView("login")}
      //       isLoading={isLoading}
      //     />
      //   );
      // }
      if (developerView === "forgot-password") {
        return (
          <ForgotPasswordPage onBackToLogin={() => setCurrentView("login")} />
        );
      }
      if (developerView === "reset-password") {
        return (
          <ResetPasswordPage
            onResetSuccess={handleResetSuccess}
            onBackToLogin={() => setCurrentView("login")}
          />
        );
      }
      if (developerView === "verify-email") {
        return (
          <EmailVerificationPage
            onVerificationSuccess={handleVerificationSuccess}
            onBackToLogin={() => setCurrentView("login")}
          />
        );
      }
      // For dashboard views, render dashboard with specific view
      if (user || process.env.NODE_ENV === "development") {
        return (
          <Dashboard
            user={user}
            onLogout={logout}
            initialView={developerView}
            refreshTrigger={dashboardRefreshTrigger}
          />
        );
      }
    }

    // Show authenticated content if user is logged in
    if (isAuthenticated && user) {
      return (
        <>
          <Dashboard
            user={user}
            onLogout={logout}
            refreshTrigger={dashboardRefreshTrigger}
          />
          <Toaster position="top-right" />
        </>
      );
    }

    // Show login/register pages for unauthenticated users
    if (currentView === "verify-email") {
      return (
        <>
          <EmailVerificationPage
            onVerificationSuccess={handleVerificationSuccess}
            onBackToLogin={() => setCurrentView("login")}
          />
          <Toaster position="top-right" />
        </>
      );
    }

    if (currentView === "forgot-password") {
      return (
        <>
          <ForgotPasswordPage onBackToLogin={() => setCurrentView("login")} />
          <Toaster position="top-right" />
        </>
      );
    }

    if (currentView === "reset-password") {
      return (
        <>
          <ResetPasswordPage
            onResetSuccess={handleResetSuccess}
            onBackToLogin={() => setCurrentView("login")}
          />
          <Toaster position="top-right" />
        </>
      );
    }

    if (currentView === "login") {
      return (
        <>
          <LoginPage
            onLogin={handleLogin}
            // onSwitchToRegister={() => setCurrentView("register")}
            onForgotPassword={() => setCurrentView("forgot-password")}
            isLoading={isLoading}
            showVerificationPrompt={showVerificationPrompt}
            verificationEmail={verificationEmail}
          />
          <Toaster position="top-right" />
        </>
      );
    }

    return (
      <>
        {/* <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView("login")}
          isLoading={isLoading}
        /> */}
        <Toaster position="top-right" />
      </>
    );
  };

  return (
    <>
      {renderContent()}

      {/* Developer Mode - Only show in development */}
      {process.env.NODE_ENV === "development" && (
        <DeveloperMode
          currentView={developerView || currentView}
          onViewChange={handleDeveloperViewChange}
          isAuthenticated={isAuthenticated}
        />
      )}
    </>
  );
}
