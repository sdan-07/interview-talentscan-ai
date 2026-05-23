import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { deleteReportById, fetchReport, fetchReportById, generateReport } from "../services/api/ai.service";
import { InterviewContext } from "../context/interview.context";
import type { generateReportType, reportType } from "../types/report.types";
import { useParams } from "react-router-dom";

interface useReportReturn{
    loading: boolean,
    reportNotFound: boolean,
    report: reportType[] | null,
    handleGenerateReport: (report: generateReportType) => Promise<reportType | null>,
    handleFetchReport: () => Promise<void>,
    handleFetchReportById: (reportId: string) => Promise<boolean>,
    handleDeleteReportById: (reportId: string) => Promise<void>
}

export const useReport = (): useReportReturn => {
    const reportContext = useContext(InterviewContext);
    if(!reportContext)
        throw new Error("Interview report variables must be provided within React Context");

    const { id: reportId } = useParams();
    
    const [loading, setLoading] = useState(false);
    const [reportNotFound, setReportNotFound] = useState(false);
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

        setLoading(true);
        setReportNotFound(false);
        try {
            const data = await fetchReport();
            setReport(data.report);
        }catch(err){
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleFetchReportById = async (reportId: string) => {

        setLoading(true);
        setReportNotFound(false);
        try {
            const data = await fetchReportById(reportId);
            setReport([data.report]);
            return true;
        }catch(err){
            if (axios.isAxiosError(err) && err.response?.status === 404) {
                setReport(null);
                setReportNotFound(true);
            }
            console.error(err);
            return false;
        } finally {
            setLoading(false);
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

    return { loading, reportNotFound, report, handleGenerateReport, handleFetchReport, handleFetchReportById, handleDeleteReportById };

}
