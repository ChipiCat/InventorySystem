import { Button } from "../../../shared/components/ui/button";
import { useAuth } from "../../../shared/hooks/useAuth";
import { UserRole } from "../../../shared/types";
import { Package, BarChart3, Settings } from "lucide-react";

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
  onClick?: () => void;
}

const QuickActionCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  buttonVariant = "default",
  onClick 
}: QuickActionCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button variant={buttonVariant} className="w-full" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export const QuickActions = () => {
  const { user } = useAuth();

  const handleProductsClick = () => {
    // Navegar a productos
    console.log("Navegando a productos...");
  };

  const handleReportsClick = () => {
    // Navegar a reportes
    console.log("Navegando a reportes...");
  };

  const handleAdminClick = () => {
    // Navegar a panel admin
    console.log("Navegando a panel admin...");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <QuickActionCard
        icon={
          <div className="w-full h-full bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center">
            <Package size={28} className="text-white" />
          </div>
        }
        title="Productos"
        description="Gestiona tu inventario"
        buttonText="Ver Productos"
        onClick={handleProductsClick}
      />
      
      <QuickActionCard
        icon={
          <div className="w-full h-full bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
            <BarChart3 size={28} className="text-white" />
          </div>
        }
        title="Reportes"
        description="Analiza tus datos"
        buttonText="Ver Reportes"
        buttonVariant="outline"
        onClick={handleReportsClick}
      />

      {user?.role === UserRole.ADMIN && (
        <QuickActionCard
          icon={
            <div className="w-full h-full bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl flex items-center justify-center">
              <Settings size={28} className="text-white" />
            </div>
          }
          title="Admin"
          description="Configurar sistema"
          buttonText="Panel Admin"
          buttonVariant="secondary"
          onClick={handleAdminClick}
        />
      )}
    </div>
  );
};
