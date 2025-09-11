import { Book } from "lucide-react";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
        <Book className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-foreground">Gestión de Inventario</h1>
        <p className="text-sm text-muted-foreground">Panel de control</p>
      </div>
    </div>
  );
};
