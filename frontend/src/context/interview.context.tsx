import { createContext, useState, type ReactNode } from "react";
import type { ReportContextType, reportType } from "../types/report.types";

interface InterviewContextProps{
    children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const InterviewContext = createContext<ReportContextType | null>(null);

export const InterviewProvider = ({children}: InterviewContextProps): ReactNode => {

    const [report, setReport] = useState<reportType[] | null>(null);

    return(
        <InterviewContext.Provider value={{ report, setReport }}>
            {children}
        </InterviewContext.Provider>
    );
};
