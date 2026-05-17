import axios from "axios";
import type {
  GenerateReportResponse,
  generateReportType,
} from "../../types/report.types";

const apiUrl = "http://localhost:5080";

const api = axios.create({
  baseURL: `${apiUrl}/api/ai`,
  withCredentials: true,
});

export const generateReport = async ({
  resume,
  jobDescription,
  selfDescription,
}: generateReportType): Promise<GenerateReportResponse> => {
    
  const response = await api.post<GenerateReportResponse>("/generate", {
    resume,
    jobDescription,
    selfDescription,
  });
  return response.data;
};
