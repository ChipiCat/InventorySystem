import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/ui/button";
import { useFormValidation } from "../../../shared/hooks/useFormValidation";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  AlertCircle,
  Loader2
} from "lucide-react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isSubmitting: boolean;
  generalError: string;
}

const VALIDATION_RULES = {
  email: { required: true, email: true },
  password: { required: true, minLength: 6 }
};

export const LoginForm = ({ onSubmit, isSubmitting, generalError }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    values,
    errors,
    updateField,
    validateAll
  } = useFormValidation(
    { email: "", password: "" },
    VALIDATION_RULES
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) return;
    
    await onSubmit(values.email, values.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {generalError && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{generalError}</span>
        </div>
      )}
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground block">
          Usuario
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base ${
              errors.email ? "border-destructive" : "border-border"
            }`}
            placeholder="ejemplo@correo.com"
            disabled={isSubmitting}
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
          />
        </div>
        {errors.email && (
          <p className="text-destructive text-sm leading-relaxed">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground block">
            Contraseña
          </label>
          <Link 
            to="/forgot-password"
            className="text-sm text-primary hover:underline focus:outline-none focus:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={(e) => updateField("password", e.target.value)}
            className={`w-full pl-10 pr-12 py-3 sm:py-3.5 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base ${
              errors.password ? "border-destructive" : "border-border"
            }`}
            placeholder="••••••••"
            disabled={isSubmitting}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground transition-colors p-1"
            disabled={isSubmitting}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-destructive text-sm leading-relaxed">{errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-3 sm:py-3.5 font-medium text-white font-bold text-base"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          "Iniciar sesión"
        )}
      </Button>
    </form>
  );
};
