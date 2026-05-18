import type { Request, Response } from "express";
import { reportModel } from "../models/report.model.js";
import { PDFParse } from "pdf-parse";
import { NotFoundException } from "../exceptions/HTTP.exception.js";
import { generateInterviewReport } from "../services/ai.service.js";
import { userModel } from "../models/user.model.js";

export const generateReport = async (
  req: Request,
  res: Response,
): Promise<void> => {

  if (!req.file) 
    throw new NotFoundException("File not uploaded");

  const { selfDesc, jobDesc } = req.body;
  if (!selfDesc && !jobDesc) 
    throw new NotFoundException("Description fields are required");

  const resumeContentText = new PDFParse(new Uint8Array(req.file.buffer)).getText();

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

export const fetchReport = async (req: Request, res: Response): Promise<void> => {
  const user = req.user.id;
  const report = await reportModel.find({ user });
  if(!report || report.length === 0)
    throw new NotFoundException("Interview report not found");

  res.status(200).json({status: "success", report});

}