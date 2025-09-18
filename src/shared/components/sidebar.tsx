import { useState } from "react";
import { SidebarUserInfo } from "./layout/SidebarUserInfo";
import { SidebarNavigation } from "./layout/SidebarNavigation";
import { SidebarFooter } from "./layout/SidebarFooter";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const Sidebar = ({ className, collapsed: externalCollapsed, onCollapsedChange }: SidebarProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Usar collapsed externo si se proporciona, sino usar el interno
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  
  const handleToggleCollapsed = () => {
    const newCollapsed = !collapsed;
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
    }
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 relative flex flex-col h-full ${collapsed ? 'w-16' : 'w-64'} ${className}`}>
      <SidebarUserInfo collapsed={collapsed} />
      <SidebarNavigation collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} onToggleCollapsed={handleToggleCollapsed} />
    </div>
  );
};
