import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarFooterProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export const SidebarFooter = ({ collapsed, onToggleCollapsed }: SidebarFooterProps) => {
  if (collapsed) {
    return (
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <button
          onClick={onToggleCollapsed}
          className="p-1.5 bg-accent border border-border rounded-md hover:bg-muted transition-colors shadow-sm"
          title="Expandir sidebar"
        >
          <ChevronRight size={14} className="text-muted-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 border-t border-border relative">
      <div className="text-xs text-muted-foreground text-center">
        <p className="font-medium">Sistema de Inventario</p>
        <p className="text-muted-foreground/60">v1.0.0</p>
      </div>
      
      <button
        onClick={onToggleCollapsed}
        className="absolute bottom-2 right-2 p-1.5 bg-accent border border-border rounded-md hover:bg-muted transition-colors shadow-sm"
        title="Contraer sidebar"
      >
        <ChevronLeft size={14} className="text-muted-foreground" />
      </button>
    </div>
  );
};
