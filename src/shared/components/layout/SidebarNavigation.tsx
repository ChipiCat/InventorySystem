import { 
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  School,
  BarChart3,
  Settings
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  active?: boolean;
}

interface SidebarNavigationProps {
  collapsed: boolean;
}

const menuItems: MenuItem[] = [
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

interface NavItemProps {
  item: MenuItem;
  collapsed: boolean;
}

const NavItem = ({ item, collapsed }: NavItemProps) => {
  const IconComponent = item.icon;
  const isActive = item.active;

  return (
    <li>
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
};

export const SidebarNavigation = ({ collapsed }: SidebarNavigationProps) => {
  return (
    <nav className="px-4 py-3 flex-1 overflow-y-auto scrollbar-hide">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <NavItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </ul>
    </nav>
  );
};
