import { 
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  School,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "./use-auth";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
    active: true
  },
  {
    id: 'inventario',
    label: 'Inventario',
    icon: Package,
    path: '/inventario'
  },
  {
    id: 'eventos',
    label: 'Eventos',
    icon: Calendar,
    path: '/eventos'
  },
  {
    id: 'calendario',
    label: 'Calendario',
    icon: Calendar,
    path: '/calendario'
  },
  {
    id: 'profesores',
    label: 'Profesores',
    icon: Users,
    path: '/profesores'
  },
  {
    id: 'unidades',
    label: 'Unidades Educativas',
    icon: School,
    path: '/unidades-educativas'
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: BarChart3,
    path: '/reportes'
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    icon: Settings,
    path: '/configuracion'
  }
];

export const Sidebar = ({ className, collapsed: externalCollapsed, onCollapsedChange }: SidebarProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const { user, userProfile } = useAuth();

  // Usar collapsed externo si se proporciona, sino usar el interno
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  
  const handleToggleCollapsed = () => {
    const newCollapsed = !collapsed;
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
    }
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 relative flex flex-col h-full ${collapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Header with User Info */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-border mt-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              {userProfile?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {userProfile?.name || user?.email?.split('@')[0] || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {userProfile?.role === 'administrador' ? 'Administrador' : 'Vendedor'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="px-4 py-3 flex-1 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.active;
            
            return (
              <li key={item.id}>
                <a
                  href={item.path}
                  className={`
                    group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                    ${collapsed ? 'justify-center' : 'justify-start'}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <IconComponent 
                    size={20} 
                    className={`${collapsed ? '' : 'mr-3'} ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} 
                  />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                  {!collapsed && isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary-foreground/60 rounded-full"></div>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-border relative">
          <div className="text-xs text-muted-foreground text-center">
            <p className="font-medium">Sistema de Inventario</p>
            <p className="text-muted-foreground/60">v1.0.0</p>
          </div>
          
          {/* Collapse Button - Inside footer area */}
          <button
            onClick={handleToggleCollapsed}
            className="absolute bottom-2 right-2 p-1.5 bg-accent border border-border rounded-md hover:bg-muted transition-colors shadow-sm"
            title="Contraer sidebar"
          >
            <ChevronLeft size={14} className="text-muted-foreground" />
          </button>
        </div>
      )}
      
      {/* Collapse Button for collapsed state - Inside sidebar */}
      {collapsed && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleToggleCollapsed}
            className="p-1.5 bg-accent border border-border rounded-md hover:bg-muted transition-colors shadow-sm"
            title="Expandir sidebar"
          >
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};
