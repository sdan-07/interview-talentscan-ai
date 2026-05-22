import { useContext, useEffect, useState } from "react"
import { deleteReportById, fetchReport, fetchReportById, generateReport } from "../services/api/ai.service";
import { InterviewContext } from "../context/interview.context";
import type { generateReportType, reportType } from "../types/report.types";
import { useParams } from "react-router-dom";

interface useReportReturn{
    loading: boolean,
    report: reportType[] | null,
    handleGenerateReport: (report: generateReportType) => Promise<reportType | null>,
    handleFetchReport: () => Promise<void>,
    handleFetchReportById: (reportId: string) => Promise<void>,
    handleDeleteReportById: (reportId: string) => Promise<void>
}

export const useReport = (): useReportReturn => {
    const reportContext = useContext(InterviewContext);
    if(!reportContext)
        throw new Error("Interview report variables must be provided within React Context");

    const { reportId } = useParams();
    
    const [loading, setLoading] = useState(false);
    const { report, setReport } = reportContext;

    const handleGenerateReport = async ({ resume, jobDescription, selfDescription }: generateReportType) => {
        setLoading(true);
        try {
            return await generateReport({ resume, jobDescription, selfDescription });
        }catch(err){
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const handleFetchReport = async () => {

        try {
            const data = await fetchReport();
            setReport(data.report);
        }catch(err){
            console.error(err);
        }
    }

    const handleFetchReportById = async (reportId: string) => {

        try {
            const data = await fetchReportById(reportId);
            setReport(data.report);
        }catch(err){
            console.error(err);
        }
    }

    const handleDeleteReportById = async (reportId: string) => {
        try{
            const data = await deleteReportById(reportId);
            setReport(data.report);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        if (reportId)
            handleFetchReportById(reportId);
        else
            handleFetchReport();
    },[reportId]);

    return { loading, report, handleGenerateReport, handleFetchReport, handleFetchReportById, handleDeleteReportById };

}
