import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../types";

interface SidebarUserInfoProps {
  collapsed: boolean;
}

export const SidebarUserInfo = ({ collapsed }: SidebarUserInfoProps) => {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    return user?.email?.charAt(0)?.toUpperCase() || 'U';
  };

  const getUserRole = () => {
    return user?.role === UserRole.ADMIN ? 'Administrador' : 'Vendedor';
  };

  if (collapsed) return null;

  return (
    <div className="px-4 py-4 border-b border-border mt-2">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
          {getUserInitials()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {user?.name || user?.email?.split('@')[0] || 'Usuario'}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {getUserRole()}
          </p>
        </div>
      </div>
    </div>
  );
};
