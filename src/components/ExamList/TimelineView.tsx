import { Badge } from '@/components/ui/badge';
import { User, ZoomIn, ZoomOut } from 'lucide-react';
import { ExamType } from './types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { format, parse, addHours, startOfDay, endOfDay } from 'date-fns';

const ZOOM_LEVELS = [
  { name: 'day', format: 'HH:mm', interval: 60 }, // 1 hour intervals
  { name: '6hours', format: 'HH:mm', interval: 30 }, // 30 min intervals
  { name: '1hour', format: 'HH:mm', interval: 5 }, // 5 min intervals
  { name: '30min', format: 'HH:mm:ss', interval: 1 }, // 1 min intervals
  { name: '5min', format: 'HH:mm:ss', interval: 0.5 }, // 30 sec intervals
];

export function TimelineView({ exams }: { exams: ExamType[] }) {
  const [zoomLevel, setZoomLevel] = useState(0);

  const groupedByDate = exams.reduce((acc, exam) => {
    const date = exam.studyDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exam);
    return acc;
  }, {} as Record<string, ExamType[]>);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, ZOOM_LEVELS.length - 1));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 0));
  };

  const getTimelineMarkers = (date: string) => {
    const dayStart = startOfDay(parse(date, 'yyyy-MM-dd', new Date()));
    const dayEnd = endOfDay(dayStart);
    const currentZoom = ZOOM_LEVELS[zoomLevel];
    const markers = [];
    let current = dayStart;

    while (current <= dayEnd) {
      markers.push({
        time: current,
        label: format(current, currentZoom.format),
        position: ((current.getTime() - dayStart.getTime()) / (dayEnd.getTime() - dayStart.getTime())) * 100
      });
      current = addHours(current, currentZoom.interval / 60);
    }

    return markers;
  };

  const getExamPosition = (exam: ExamType, date: string) => {
    const dayStart = startOfDay(parse(date, 'yyyy-MM-dd', new Date()));
    const dayEnd = endOfDay(dayStart);
    const examTime = parse(`${exam.studyDate} ${exam.studyTime}`, 'yyyy-MM-dd HH:mm', new Date());
    return ((examTime.getTime() - dayStart.getTime()) / (dayEnd.getTime() - dayStart.getTime())) * 100;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          disabled={zoomLevel === 0}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          disabled={zoomLevel === ZOOM_LEVELS.length - 1}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {Object.entries(groupedByDate).map(([date, dateExams]) => {
        const timeMarkers = getTimelineMarkers(date);
        
        return (
          <div key={date} className="space-y-4 bg-card rounded-lg border p-6">
            <h3 className="font-medium">{date}</h3>
            
            <div className="relative overflow-x-auto">
              <div className="min-w-full h-[400px] relative">
                {/* Time axis */}
                <div className="absolute bottom-0 left-0 right-0 h-8 border-t">
                  {timeMarkers.map((marker, i) => (
                    <div
                      key={i}
                      className="absolute transform -translate-x-1/2"
                      style={{ left: `${marker.position}%` }}
                    >
                      <div className="h-2 w-0.5 bg-border" />
                      <div className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                        {marker.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline content */}
                <div className="absolute inset-x-0 bottom-8 h-[calc(100%-2rem)]">
                  {dateExams.map((exam) => {
                    const position = getExamPosition(exam, date);
                    return (
                      <div
                        key={exam.id}
                        className="absolute transform -translate-x-1/2"
                        style={{ left: `${position}%`, bottom: '2rem' }}
                      >
                        <div className="w-0.5 h-4 bg-border absolute left-1/2 -translate-x-1/2 bottom-0" />
                        <div 
                          className="absolute bottom-6 transform -translate-x-1/2 w-64 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          style={{ left: '50%' }}
                        >
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" className="px-3 py-1">
                                {exam.modality}
                              </Badge>
                              <Badge
                                variant={exam.status === 'completed' ? 'default' : 'secondary'}
                                className="px-3 py-1"
                              >
                                {exam.status}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{exam.patientName}</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {exam.description}
                              </p>
                              <p className="text-sm font-medium">
                                {exam.studyTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Current time indicator */}
                <div 
                  className="absolute top-0 bottom-8 w-0.5 bg-primary"
                  style={{ 
                    left: `${getExamPosition(
                      { studyDate: date, studyTime: format(new Date(), 'HH:mm') } as ExamType,
                      date
                    )}%` 
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary -translate-x-[3px]" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}