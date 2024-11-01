import { useState } from 'react';
import { LayoutList, ListOrdered } from 'lucide-react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ExamRow } from './ExamRow';
import { TimelineView } from './TimelineView';
import { mockExams } from './mockData';
import { ExamType } from './types';

type ViewMode = 'list' | 'timeline';
type SortField = 'date' | 'patientName' | 'modality' | 'status';

function ExamList() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortField, setSortField] = useState<SortField>('date');

  const sortedExams = [...mockExams].sort((a, b) => {
    switch (sortField) {
      case 'date':
        return `${b.studyDate} ${b.studyTime}`.localeCompare(
          `${a.studyDate} ${a.studyTime}`
        );
      case 'patientName':
        return a.patientName.localeCompare(b.patientName);
      case 'modality':
        return a.modality.localeCompare(b.modality);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('list')}
            className={cn(viewMode === 'list' && 'bg-muted')}
          >
            <LayoutList className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('timeline')}
            className={cn(viewMode === 'timeline' && 'bg-muted')}
          >
            <ListOrdered className="h-4 w-4 mr-2" />
            Timeline
          </Button>
        </div>
        <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="patientName">Sort by Patient Name</SelectItem>
            <SelectItem value="modality">Sort by Modality</SelectItem>
            <SelectItem value="status">Sort by Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {viewMode === 'list' ? (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] py-4">Patient</TableHead>
                <TableHead className="py-4">Description</TableHead>
                <TableHead className="py-4">Modality</TableHead>
                <TableHead className="py-4">Date</TableHead>
                <TableHead className="py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedExams.map((exam) => (
                <ExamRow key={exam.id} exam={exam} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <TimelineView exams={sortedExams} />
      )}
    </div>
  );
}

export default ExamList;