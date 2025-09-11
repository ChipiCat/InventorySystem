import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
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
  );
};
