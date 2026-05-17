export interface reportType {
  jobDesc: string;
  resumeText: string;
  selfDesc: string;

  technicalQuestions: [object];
  behavioralQuestions: [object];
  skillGaps: [object];
  preparationPlan: [object];
  matchScore: number;
  user: unknown;
}

export interface generateReportType {
  resume: unknown;
  jobDescription: string;
  selfDescription: string;
}

export interface ReportContextType {
  report: object | null;
  setReport: (report: object | null) => void;
}

export interface GenerateReportResponse {
  report: object;
}
