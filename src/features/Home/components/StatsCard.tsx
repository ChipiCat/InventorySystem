import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change: string;
  changeColor: string;
}

export const StatsCard = ({ title, value, icon: Icon, color, change, changeColor }: StatsCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">
            {value}
          </p>
          <p className={`text-sm font-medium ${changeColor}`}>
            {change}
          </p>
        </div>
        <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};
