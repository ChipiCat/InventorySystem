import { Book } from "lucide-react";

export const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Book className="w-8 h-8 text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Gestión de Inventario
      </h1>
      <p className="text-muted-foreground">
        Gestión de registros digitales
      </p>
    </div>
  );
};