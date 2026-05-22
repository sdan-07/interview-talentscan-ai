import axios from "axios";
import type {
  CreateReportResponse,
  GenerateReportResponse,
  generateReportType,
  reportType,
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
}: generateReportType): Promise<reportType> => {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jobDesc", jobDescription);
  formData.append("selfDesc", selfDescription);

  const response = await api.post<CreateReportResponse>("/generate", formData);
  return response.data.report;
};

export const fetchReport = async (): Promise<GenerateReportResponse> => {

  const response = await api.get("/fetch");
  return response.data;
}

export const fetchReportById = async (reportId: string): Promise<GenerateReportResponse> => {

  const response = await api.get(`/fetchid/${reportId}`);
  return response.data;
}

export const deleteReportById = async (reportid: string): Promise<GenerateReportResponse> => {
  const response = await api.delete(`/removeid/${reportid}`)
  return response.data;
}

//ADD api_url env link
