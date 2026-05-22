import type { Request, Response } from "express";
import { reportModel } from "../models/report.model.js";
import { PDFParse } from "pdf-parse";
import { BadRequestException, NotFoundException } from "../exceptions/HTTP.exception.js";
import { generateInterviewReport } from "../services/ai.service.js";

export const generateReport = async (
  req: Request,
  res: Response,
): Promise<void> => {

  if (!req.file)
    throw new BadRequestException("File not uploaded");

  const selfDesc = req.body.selfDesc ?? req.body.selfDescription;
  const jobDesc = req.body.jobDesc ?? req.body.jobDescription;
  if (!selfDesc || !jobDesc)
    throw new BadRequestException("Description fields are required");

  const resumeText = (await new PDFParse(new Uint8Array(req.file.buffer)).getText()).text;

  // send to AI
  const reportResultByAI = await generateInterviewReport({
    resume: resumeText,
    selfDescription: selfDesc,
    jobDescription: jobDesc,
  });

  // load to DB
  await reportModel.create({
    user: req.user.id,
    jobDesc,
    selfDesc,
    resumeText,
    ...reportResultByAI,
  });

  res
    .status(201)
    .json({
      status: "success",
      message: "interview report generated successfully",
    });
};

export const fetchReport = async (req: Request, res: Response): Promise<void> => {
  const user = req.user.id;
  const report = await reportModel.find({ user });
  if(!report || report.length === 0)
    throw new NotFoundException("Interview report not found");

  res.status(200).json({status: "success", report});

}

export const fetchReportById = async (req: Request, res: Response): Promise<void> =>{
  const reportId = req.params.id;
  const user = req.user.id;

  const report = await reportModel.findOne({ user, _id: reportId });
  if(!report)
      throw new NotFoundException("Interview report not found");
  
  res.status(200).json({ status: "success", report });

}
