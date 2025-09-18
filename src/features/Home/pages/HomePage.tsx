import { 
  Package, 
  Clock, 
  CheckCircle, 
  DollarSign
} from "lucide-react";

import { StatsCard } from "../components/StatsCard";
import { WeeklyCalendar } from "../components/WeeklyCalendar";
import { SalesChart } from "../components/SalesChart";
import { QuickActions } from "../components/QuickActions";
import { PendingEvents } from "../components/PendingEvents";
import { SessionStatus } from "../components/SessionStatus";

const HomePage = () => {
  const stats = [
    {
      title: "Total Libros en Stock",
      value: "1,247",
      icon: Package,
      color: "bg-gradient-to-r from-primary to-primary/80",
      change: "+12%",
      changeColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Eventos Pendientes",
      value: "23",
      icon: Clock,
      color: "bg-gradient-to-r from-destructive to-destructive/80",
      change: "+5",
      changeColor: "text-destructive",
    },
    {
      title: "Mis Tareas Hoy",
      value: "8",
      icon: CheckCircle,
      color: "bg-gradient-to-r from-green-500 to-green-600", 
      change: "2 completadas",
      changeColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Ventas del Mes",
      value: "Bs 45,230",
      icon: DollarSign,
      color: "bg-gradient-to-r from-secondary to-secondary/80",
      change: "+18%",
      changeColor: "text-green-600 dark:text-green-400",
    }
  ];

  const chartData = [
    34, 22, 48, 55, 32, 40, 42, 38, 56, 51, 39, 49, 48, 65, 47, 44, 32, 29, 44, 59, 37, 39, 30, 44, 58, 40, 32, 46, 57, 33
  ];

  const recentEvents = [
    { time: "09:00", type: "Entrega", location: "U.E. San Andrés", color: "bg-primary/10 text-primary" },
    { time: "10:30", type: "Entrega", location: "Colegio Bolívar", color: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300" },
    { time: "14:00", type: "Cobra", location: "U.E. La Salle", color: "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300" },
    { time: "15:30", type: "Regalo", location: "Liceo Naval", color: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" },
    { time: "16:00", type: "Préstamo", location: "U.E. Alemán", color: "bg-primary/10 text-primary" },
    { time: "17:30", type: "Entrega", location: "Colegio Calvani", color: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Calendar and Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <WeeklyCalendar />
          <SalesChart data={chartData} />
          <QuickActions />
        </div>

        {/* Right Column - Recent Events */}
        <div className="space-y-6">
          <PendingEvents events={recentEvents} />
          <SessionStatus />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
