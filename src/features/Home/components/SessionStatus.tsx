import { useAuth } from "../../../shared/hooks/useAuth";
import { UserRole } from "../../../shared/types";

export const SessionStatus = () => {
  const { user } = useAuth();

  const getUserRole = () => {
    return user?.role === UserRole.ADMIN ? 'Administrador' : 'Vendedor';
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Estado de la Sesión
      </h3>
      <div className="space-y-3 text-sm text-foreground">
        <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
          <span className="font-medium">Usuario:</span>
          <span className="font-semibold">{user?.email}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
          <span className="font-medium">Nombre:</span>
          <span className="font-semibold">{user?.name || 'Sin nombre'}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
          <span className="font-medium">Rol:</span>
          <span className="capitalize font-semibold">{getUserRole()}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
          <span className="font-medium">Sesión:</span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 dark:text-green-400 font-semibold">Activa</span>
          </span>
        </div>
      </div>
    </div>
  );
};
