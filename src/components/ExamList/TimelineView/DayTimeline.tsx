import { format, parse, startOfDay, endOfDay } from 'date-fns';
import { ExamType } from '../types';
import { TimeMarker } from './TimeMarker';
import { ExamCard } from './ExamCard';
import { CurrentTimeIndicator } from './CurrentTimeIndicator';
import { ZoomLevel } from './types';

type DayTimelineProps = {
  date: string;
  exams: ExamType[];
  zoomLevel: ZoomLevel;
};

export function DayTimeline({ date, exams, zoomLevel }: DayTimelineProps) {
  const dayStart = startOfDay(parse(date, 'yyyy-MM-dd', new Date()));
  const dayEnd = endOfDay(dayStart);

  const getTimelineMarkers = () => {
    const markers = [];
    let current = dayStart;

    while (current <= dayEnd) {
      markers.push({
        time: current,
        label: format(current, zoomLevel.format),
        position: ((current.getTime() - dayStart.getTime()) / (dayEnd.getTime() - dayStart.getTime())) * 100
      });
      current = new Date(current.getTime() + (zoomLevel.interval * 60 * 1000));
    }

    return markers;
  };

  const getPosition = (time: Date) => {
    return ((time.getTime() - dayStart.getTime()) / (dayEnd.getTime() - dayStart.getTime())) * 100;
  };

  const timeMarkers = getTimelineMarkers();
  const currentTime = new Date();
  const currentTimePosition = getPosition(currentTime);

  return (
    <div className="space-y-4 bg-card rounded-lg border p-6">
      <h3 className="font-medium">{date}</h3>
      
      <div className="relative overflow-x-auto">
        <div className="min-w-full h-[400px] relative">
          {/* Time axis */}
          <div className="absolute bottom-0 left-0 right-0 h-8 border-t">
            {timeMarkers.map((marker, i) => (
              <TimeMarker
                key={i}
                position={marker.position}
                time={marker.time}
                format={zoomLevel.format}
              />
            ))}
          </div>

          {/* Timeline content */}
          <div className="absolute inset-x-0 bottom-8 h-[calc(100%-2rem)]">
            {exams.map((exam) => {
              const examTime = parse(`${exam.studyDate} ${exam.studyTime}`, 'yyyy-MM-dd HH:mm', new Date());
              const position = getPosition(examTime);
              return (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  position={position}
                />
              );
            })}
          </div>

          {/* Current time indicator */}
          <CurrentTimeIndicator position={currentTimePosition} />
        </div>
      </div>
    </div>
  );
}