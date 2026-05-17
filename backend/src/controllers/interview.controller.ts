import type { Request, Response } from "express";
import { reportModel } from "../models/report.model.js";
import { PDFParse } from "pdf-parse";
import { NotFoundException } from "../exceptions/HTTP.exception.js";
import { generateInterviewReport } from "../services/ai.service.js";

export const generateReport = async (
  req: Request,
  res: Response,
): Promise<void> => {

  if (!req.file) 
    throw new NotFoundException("File not uploaded");

  const resumeContentText = new PDFParse(new Uint8Array(req.file.buffer)).getText();
  const { selfDesc, jobDesc } = req.body;

  // send to AI
  const reportResultByAI = await generateInterviewReport({
    resume: (await resumeContentText).text,
    selfDescription: selfDesc,
    jobDescription: jobDesc,
  });

  // load to DB
  const report = await reportModel.create({
    user: req.user.id,
    jobDesc,
    selfDesc,
    ...reportResultByAI,
  });

  res
    .status(201)
    .json({
      status: "success",
      message: "interview report generated successfully",
      report
    });
};
