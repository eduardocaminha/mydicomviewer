import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { ExamType } from '../types';
import { DayTimeline } from './DayTimeline';
import { ZoomLevel } from './types';

const ZOOM_LEVELS: ZoomLevel[] = [
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Zoom level: {ZOOM_LEVELS[zoomLevel].name}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoomLevel(prev => Math.max(prev - 1, 0))}
            disabled={zoomLevel === 0}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoomLevel(prev => Math.min(prev + 1, ZOOM_LEVELS.length - 1))}
            disabled={zoomLevel === ZOOM_LEVELS.length - 1}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {Object.entries(groupedByDate).map(([date, dateExams]) => (
        <DayTimeline
          key={date}
          date={date}
          exams={dateExams}
          zoomLevel={ZOOM_LEVELS[zoomLevel]}
        />
      ))}
    </div>
  );
}