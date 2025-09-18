import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./index";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Fijo arriba ocupando todo el ancho */}
      <header className="fixed top-0 left-0 right-0 bg-card px-4 z-50 border-b border-border">
        <DashboardHeader />
      </header>

      {/* Container para Sidebar + Main Content con offset del header */}
      <div className="flex pt-[73px] h-screen">
        {/* Sidebar - Fijo a la izquierda */}
        <Sidebar 
          className="flex-shrink-0 h-full" 
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
        
        {/* Main Content - Solo este hace scroll */}
        <main className="flex-1 overflow-y-auto p-4 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};
