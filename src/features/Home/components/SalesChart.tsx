interface SalesChartProps {
  data: number[];
}

export const SalesChart = ({ data }: SalesChartProps) => {
  const maxValue = 70;
  const yLabels = [maxValue, 50, 30, 10, 0];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Ventas Últimos 30 Días
      </h3>
      <div className="relative h-64">
        {/* Líneas de grid */}
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-muted-foreground">
          {yLabels.slice(0, -1).map((_, index) => (
            <div key={index} className="border-t border-border"></div>
          ))}
        </div>
        
        {/* Barras del gráfico */}
        <div className="relative h-full flex items-end justify-between space-x-1 pt-4">
          {data.map((value, index) => (
            <div 
              key={index}
              className="bg-gradient-to-t from-primary to-primary/80 rounded-t-sm flex-1 hover:from-primary/80 hover:to-primary/60 transition-all duration-200 cursor-pointer"
              style={{ height: `${(value / maxValue) * 100}%` }}
              title={`Día ${index + 1}: ${value} ventas`}
            ></div>
          ))}
        </div>
        
        {/* Labels del eje Y */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground -ml-8">
          {yLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
