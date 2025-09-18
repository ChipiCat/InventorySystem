import { Book } from "lucide-react";

export const LoginHeader = () => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
          <Book className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
        </div>
      </div>
      
      <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
        Gestión de Inventario
      </h1>
      
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Gestión de registros digitales
      </p>
    </div>
  );
};