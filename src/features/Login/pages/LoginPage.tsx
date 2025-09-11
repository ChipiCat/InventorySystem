import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { LoginHeader } from "../components/LoginHeader";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  const { user, signIn, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (email: string, password: string) => {
    setIsSubmitting(true);
    setGeneralError("");

    try {
      await signIn(email, password);
    } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Error al iniciar sesión. Verifica tus credenciales.";
      setGeneralError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border p-8">
          <LoginHeader />
          <LoginForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            generalError={generalError}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
