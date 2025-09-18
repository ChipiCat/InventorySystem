interface Event {
  time: string;
  type: string;
  location: string;
  color: string;
}

interface PendingEventsProps {
  events: Event[];
}

export const PendingEvents = ({ events }: PendingEventsProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Mis Pendientes Hoy
      </h3>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
          >
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
  );
};