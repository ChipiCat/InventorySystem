import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui/button";
import { useAuth } from "../../../shared/components/use-auth";
import { 
  Book, 
  Mail, 
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

const ForgotPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("El email es requerido");
      return;
    }

    if (!validateEmail(email)) {
      setError("Ingresa un email válido");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      await resetPassword(email);
      setMessage("Se ha enviado un enlace de recuperación a tu email. Revisa tu bandeja de entrada y spam.");
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      const errorMessage = error instanceof Error ? error.message : "Error al enviar el correo de recuperación";
      
      // Personalizar mensajes de error de Firebase
      if (errorMessage.includes("user-not-found")) {
        setError("No existe una cuenta con este email");
      } else if (errorMessage.includes("invalid-email")) {
        setError("El email no es válido");
      } else if (errorMessage.includes("too-many-requests")) {
        setError("Demasiados intentos. Intenta de nuevo más tarde");
      } else {
        setError("Error al enviar el correo de recuperación. Intenta de nuevo");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Book className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Recuperar Contraseña</h1>
            <p className="text-muted-foreground">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          {message ? (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
                    Correo enviado
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {message}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/login">
                  <Button className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al login
                  </Button>
                </Link>
                
                <button
                  onClick={() => {
                    setMessage("");
                    setEmail("");
                  }}
                  className="w-full text-sm text-primary hover:underline"
                >
                  Enviar a otro email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                      error ? "border-destructive" : "border-border"
                    }`}
                    placeholder="Ingresa tu email"
                    disabled={isSubmitting}
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full py-3 font-medium text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar enlace de recuperación"
                  )}
                </Button>

                <Link to="/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al login
                  </Button>
                </Link>
              </div>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center text-sm text-muted-foreground">
              <p>¿Necesitas ayuda?</p>
              <button className="text-primary hover:underline">
                Contactar soporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
