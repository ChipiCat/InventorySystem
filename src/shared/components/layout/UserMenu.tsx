import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../types";
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  ChevronDown 
} from "lucide-react";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    return user?.email?.charAt(0)?.toUpperCase() || 'U';
  };

  const getUserName = () => {
    return user?.name || user?.email?.split('@')[0] || 'Usuario';
  };

  const getUserRole = () => {
    return user?.role === UserRole.ADMIN ? 'Administrador' : 'Vendedor';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
            {getUserInitials()}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-foreground">{getUserName()}</p>
            <p className="text-xs text-muted-foreground">{getUserRole()}</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
      </button>

      {showUserMenu && (
        <div className="absolute top-12 right-0 z-50 bg-card border border-border rounded-xl shadow-xl p-2 w-56">
          <div className="px-3 py-2 border-b border-border mb-2">
            <p className="font-medium text-foreground">{getUserName()}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Shield className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary font-medium">{getUserRole()}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">
              <User className="w-4 h-4" />
              <span>Mi perfil</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
            
            <div className="border-t border-border my-2"></div>
            
            <button 
              onClick={signOut}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
