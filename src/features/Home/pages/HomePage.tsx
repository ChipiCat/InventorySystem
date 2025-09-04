import { Button, useAuth } from "../../../shared/components";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  BarChart3, 
  Settings
} from "lucide-react";

const HomePage = () => {
  const { user, userProfile } = useAuth()

  // Datos de ejemplo para el dashboard
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

  // Datos para el gráfico de barras simple
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
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${stat.changeColor}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <IconComponent size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Calendar and Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Eventos Esta Semana */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Eventos Esta Semana
            </h3>
            <div className="grid grid-cols-7 gap-4 text-center">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                <div key={day} className="text-sm text-muted-foreground font-medium mb-2">
                  {day}
                </div>
              ))}
              {[15, 16, 17, 18, 19, 20, 21].map((date, index) => (
                <div key={date} className="p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className="text-sm font-medium text-foreground mb-2">
                    {date}
                  </div>
                  <div className="flex justify-center space-x-1">
                    {index === 0 && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                    {index === 1 && <div className="w-2 h-2 bg-destructive rounded-full"></div>}
                    {index === 2 && (
                      <>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <div className="w-2 h-2 bg-destructive rounded-full"></div>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </>
                    )}
                    {index === 4 && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                    {index === 5 && <div className="w-2 h-2 bg-secondary rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico de Ventas */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Ventas Últimos 30 Días
            </h3>
            <div className="relative h-64">
              {/* Líneas de grid */}
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-muted-foreground">
                <div className="border-t border-border"></div>
                <div className="border-t border-border"></div>
                <div className="border-t border-border"></div>
                <div className="border-t border-border"></div>
              </div>
              
              {/* Barras del gráfico */}
              <div className="relative h-full flex items-end justify-between space-x-1 pt-4">
                {chartData.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-t from-primary to-primary/80 rounded-t-sm flex-1 hover:from-primary/80 hover:to-primary/60 transition-all duration-200 cursor-pointer"
                    style={{ height: `${(value / 70) * 100}%` }}
                    title={`Día ${index + 1}: ${value} ventas`}
                  ></div>
                ))}
              </div>
              
              {/* Labels del eje Y */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground -ml-8">
                <span>70</span>
                <span>50</span>
                <span>30</span>
                <span>10</span>
                <span>0</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Package size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Productos</h3>
                <p className="text-sm text-muted-foreground mb-4">Gestiona tu inventario</p>
                <Button className="w-full">Ver Productos</Button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Reportes</h3>
                <p className="text-sm text-muted-foreground mb-4">Analiza tus datos</p>
                <Button variant="outline" className="w-full">Ver Reportes</Button>
              </div>
            </div>

            {userProfile?.role === "administrador" && (
              <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Settings size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Admin</h3>
                  <p className="text-sm text-muted-foreground mb-4">Configurar sistema</p>
                  <Button variant="secondary" className="w-full">Panel Admin</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Recent Events */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Mis Pendientes Hoy
            </h3>
            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-bold text-foreground min-w-[50px]">
                      {event.time}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${event.color}`}>
                      {event.type}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    {event.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Status */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Estado de la Sesión
            </h3>
            <div className="space-y-3 text-sm text-foreground">
              <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                <span className="font-medium">Usuario:</span>
                <span className="font-semibold">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                <span className="font-medium">Rol:</span>
                <span className="capitalize font-semibold">{userProfile?.role}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                <span className="font-medium">Sesión:</span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 dark:text-green-400 font-semibold">Activa</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
