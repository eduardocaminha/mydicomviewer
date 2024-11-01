import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { ExamType } from '../types';

type ExamCardProps = {
  exam: ExamType;
  position: number;
};

export function ExamCard({ exam, position }: ExamCardProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2 group"
      style={{ left: `${position}%`, bottom: '2rem' }}
    >
      <div className="w-0.5 h-4 bg-border absolute left-1/2 -translate-x-1/2 bottom-0" />
      <div className="absolute bottom-6 transform -translate-x-1/2 w-64 bg-card rounded-lg border shadow-sm group-hover:shadow-md transition-shadow cursor-pointer">
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
}