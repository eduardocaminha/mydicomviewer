import { format } from 'date-fns';

type TimeMarkerProps = {
  position: number;
  time: Date;
  format: string;
};

export function TimeMarker({ position, time, format: timeFormat }: TimeMarkerProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2"
      style={{ left: `${position}%` }}
    >
      <div className="h-2 w-0.5 bg-border" />
      <div className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
        {format(time, timeFormat)}
      </div>
    </div>
  );
}