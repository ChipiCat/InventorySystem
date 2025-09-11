export const WeeklyCalendar = () => {
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const dates = [15, 16, 17, 18, 19, 20, 21];

  const renderEventDots = (index: number) => {
    switch (index) {
      case 0:
        return <div className="w-2 h-2 bg-primary rounded-full"></div>;
      case 1:
        return <div className="w-2 h-2 bg-destructive rounded-full"></div>;
      case 2:
        return (
          <>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </>
        );
      case 3:
        return (
          <>
            <div className="w-2 h-2 bg-destructive rounded-full"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </>
        );
      case 4:
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 5:
        return <div className="w-2 h-2 bg-secondary rounded-full"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Eventos Esta Semana
      </h3>
      <div className="grid grid-cols-7 gap-4 text-center">
        {weekDays.map((day) => (
          <div key={day} className="text-sm text-muted-foreground font-medium mb-2">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div key={date} className="p-3 rounded-lg hover:bg-accent transition-colors">
            <div className="text-sm font-medium text-foreground mb-2">
              {date}
            </div>
            <div className="flex justify-center space-x-1">
              {renderEventDots(index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
