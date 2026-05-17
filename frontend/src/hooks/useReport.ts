import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { generateReport } from "../services/api/ai.service";
import { InterviewContext } from "../context/interview.context";
import type { generateReportType } from "../types/report.types";

interface useReportReturn{
    loading: boolean,
    report: object | null,
    handleGenerateReport: (report: generateReportType) => Promise<void>
}

export const useReport = (): useReportReturn => {
    
    const loadingContext = useContext(AuthContext);
    const reportContext = useContext(InterviewContext);
    if(!loadingContext || !reportContext)
        throw new Error("Auth and interview report variables must be provided within React Context");
    
    const { loading, setLoading } = loadingContext;
    const { report, setReport } = reportContext;

    const handleGenerateReport = async ({ resume, jobDescription, selfDescription }: generateReportType) => {
        setLoading(true);
        try {
            const data = await generateReport({ resume, jobDescription, selfDescription });
            setReport(data.report)
        } finally {
            setLoading(false);
        }
    }

    return { loading, report, handleGenerateReport };

}
