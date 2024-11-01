export type ExamType = {
  id: string;
  patientName: string;
  patientId: string;
  modality: string;
  studyDate: string;
  studyTime: string;
  description: string;
  status: 'completed' | 'in-progress';
  imageCount: number;
  referringPhysician: string;
};