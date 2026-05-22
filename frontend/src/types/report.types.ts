export interface QuestionType {
  category?: string;
  question: string;
  intention: string;
  answer: string;
}

export interface SkillGapType {
  skill: string;
  severity: "low" | "medium" | "high";
}

export interface PreparationPlanType {
  day: number;
  focus: string;
  tasks: string[];
}

export interface reportType {
  _id: string;
  jobDesc: string;
  resumeText: string;
  selfDesc: string;

  technicalQuestions: QuestionType[];
  behavioralQuestions: QuestionType[];
  skillGaps: SkillGapType[];
  preparationPlan: PreparationPlanType[];
  matchScore: number;
  missingSkills: [string],
  title: string,
  user: unknown;
  createdAt: string
}

export interface generateReportType {
  resume: File;
  jobDescription: string;
  selfDescription: string;
}

export interface ReportContextType {
  report: reportType[] | null;
  setReport: (report: reportType[] | null) => void;
}

export interface GenerateReportResponse {
  report: reportType[];
}

export interface CreateReportResponse {
  report: reportType;
}
