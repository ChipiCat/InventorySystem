import { useState } from "react";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  text: string;
  time: string;
  type: "warning" | "success" | "info";
}

interface NotificationsMenuProps {
  notifications?: Notification[];
}

export const NotificationsMenu = ({ notifications = [] }: NotificationsMenuProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const defaultNotifications: Notification[] = [
    { id: 1, text: "Stock bajo en producto ABC", time: "5 min", type: "warning" },
    { id: 2, text: "Nueva venta registrada", time: "10 min", type: "success" },
    { id: 3, text: "Backup completado", time: "1 hora", type: "info" }
  ];

  const notificationsList = notifications.length > 0 ? notifications : defaultNotifications;

  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 hover:bg-muted rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {notificationsList.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
            {notificationsList.length}
          </span>
        )}
      </button>
      
      {showNotifications && (
        <div className="absolute top-12 right-0 z-50 bg-card border border-border rounded-xl shadow-xl p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Notificaciones</h3>
            <button className="text-xs text-primary hover:underline">
              Marcar todas como leídas
            </button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {notificationsList.map((notification) => (
              <div 
                key={notification.id} 
                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
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
  );
};
