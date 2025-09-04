import { useState } from "react";
import { useAuth } from "./use-auth";
import { ThemeToggle } from "./theme-toggle";
import { 
  Book, 
  Bell, 
  Search,
  Settings,
  User,
  LogOut,
  Shield,
  ChevronDown
} from "lucide-react";

export const DashboardHeader = () => {
  const { user, userProfile, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, text: "Stock bajo en producto ABC", time: "5 min", type: "warning" },
    { id: 2, text: "Nueva venta registrada", time: "10 min", type: "success" },
    { id: 3, text: "Backup completado", time: "1 hora", type: "info" }
  ];

  const getUserInitials = () => {
    if (userProfile?.name) {
      return userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.charAt(0)?.toUpperCase() || 'U';
  };

  const getUserName = () => {
    return userProfile?.name || user?.email?.split('@')[0] || 'Usuario';
  };

  const getUserRole = () => {
    return userProfile?.role === 'administrador' ? 'Administrador' : 'Vendedor';
  };

  return (
    <div className="flex items-center justify-between w-full bg-background/95 backdrop-blur-sm  px-6 py-4">
      {/* Logo y título */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
            <Book className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Gestión de Inventario</h1>
            <p className="text-sm text-muted-foreground">Panel de control</p>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda central */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar productos, ventas, clientes..."
            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background focus:border-border transition-all"
          />
        </div>
      </div>

      {/* Acciones del usuario */}
      <div className="flex items-center space-x-3">
        {/* Notificaciones */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
                {notifications.length}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute top-12 right-0 z-50 bg-card border border-border rounded-xl shadow-xl p-4 w-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">Notificaciones</h3>
                <button className="text-xs text-primary hover:underline">Marcar todas como leídas</button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <p className="text-sm text-foreground mb-1">{notification.text}</p>
                    <span className="text-xs text-muted-foreground">hace {notification.time}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-3">
                <button className="w-full text-center text-sm text-primary hover:underline">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle de tema */}
        <ThemeToggle />

        {/* Menú de usuario */}
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
      </div>
    </div>
  );
};
