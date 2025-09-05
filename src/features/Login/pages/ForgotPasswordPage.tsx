import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui/button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ArrowLeft, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    setIsSubmitting(true);

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
        setMessage(`Correo enviado a ${email}`);
      })
      .catch((error: unknown) => {
        console.error("Error:", error);

        if (error instanceof Error && 'code' in error) {
          const firebaseError = error as { code: string; message: string };
          
          switch (firebaseError.code) {
            case "auth/user-not-found":
              setError("No existe una cuenta con este correo");
              break;
            case "auth/invalid-email":
              setError("Correo electrónico inválido");
              break;
            case "auth/too-many-requests":
              setError("Demasiados intentos. Espera un momento");
              break;
            default:
              setError("Error al enviar el correo");
          }
        } else {
          setError("Error al enviar el correo");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">¡Correo Enviado!</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <p className="text-sm text-muted-foreground mb-6">
              Revisa tu bandeja de entrada y carpeta de spam
            </p>
            <Link to="/login">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border p-8">
          <div className="text-center mb-8">
            <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Recuperar Contraseña</h1>
            <p className="text-muted-foreground">
              Ingresa tu email para recibir el enlace de recuperación
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@email.com"
                disabled={isSubmitting}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-white"
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
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-primary hover:underline">
              ← Volver al login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
