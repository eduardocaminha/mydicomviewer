import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, LayoutList, ListOrdered, User } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Extended mock data with hours
const exams = [
  {
    id: '1',
    patientName: 'John Doe',
    patientId: 'PT001',
    modality: 'CT',
    studyDate: '2024-03-20',
    studyTime: '14:30',
    description: 'Chest CT With Contrast',
    status: 'completed',
    imageCount: 247,
    referringPhysician: 'Dr. Sarah Wilson',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    patientId: 'PT002',
    modality: 'MRI',
    studyDate: '2024-03-20',
    studyTime: '09:15',
    description: 'Brain MRI Without Contrast',
    status: 'in-progress',
    imageCount: 183,
    referringPhysician: 'Dr. Michael Chen',
  },
  {
    id: '3',
    patientName: 'Robert Johnson',
    patientId: 'PT003',
    modality: 'XR',
    studyDate: '2024-03-19',
    studyTime: '16:45',
    description: 'Chest X-Ray PA and Lateral',
    status: 'completed',
    imageCount: 2,
    referringPhysician: 'Dr. Emily Brown',
  },
];

function ExamRow({ exam }: { exam: typeof exams[0] }) {
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

function TimelineView({ exams }: { exams: typeof exams }) {
  const groupedByDate = exams.reduce((acc, exam) => {
    const date = exam.studyDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exam);
    return acc;
  }, {} as Record<string, typeof exams>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedByDate).map(([date, dateExams]) => (
        <div key={date} className="relative">
          <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 py-2">
            <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
          </div>
          <div className="space-y-4 mt-4">
            {dateExams
              .sort((a, b) => a.studyTime.localeCompare(b.studyTime))
              .map((exam) => (
                <div
                  key={exam.id}
                  className="relative pl-6 border-l-2 border-muted pb-4 last:pb-0"
                >
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <div className="bg-card rounded-lg border p-4 hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="px-3 py-1">
                          {exam.modality}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {exam.studyTime}
                        </span>
                      </div>
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
                      <p className="text-sm text-muted-foreground">
                        {exam.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExamList() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortField, setSortField] = useState<SortField>('date');

  const sortedExams = [...exams].sort((a, b) => {
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