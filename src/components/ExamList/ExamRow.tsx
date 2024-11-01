import { User, Calendar } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ExamType } from './types';

export function ExamRow({ exam }: { exam: ExamType }) {
  return (
    <TooltipProvider>
      <TableRow className="cursor-pointer hover:bg-muted/50">
        <Tooltip>
          <TooltipTrigger asChild>
            <TableCell className="py-4">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{exam.patientName}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ID: {exam.patientId}
                </span>
              </div>
            </TableCell>
          </TooltipTrigger>
          <TooltipContent side="right" className="p-4 space-y-2">
            <p className="font-semibold">{exam.description}</p>
            <div className="text-sm">
              <p>Images: {exam.imageCount}</p>
              <p>Referring: {exam.referringPhysician}</p>
            </div>
          </TooltipContent>
        </Tooltip>
        <TableCell className="py-4">{exam.description}</TableCell>
        <TableCell className="py-4">
          <Badge variant="secondary" className="px-3 py-1">
            {exam.modality}
          </Badge>
        </TableCell>
        <TableCell className="py-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            {exam.studyDate} {exam.studyTime}
          </div>
        </TableCell>
        <TableCell className="py-4">
          <Badge
            variant={exam.status === 'completed' ? 'default' : 'secondary'}
            className="px-3 py-1"
          >
            {exam.status}
          </Badge>
        </TableCell>
      </TableRow>
    </TooltipProvider>
  );
}