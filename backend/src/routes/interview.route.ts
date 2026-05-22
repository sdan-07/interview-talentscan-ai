import { Router } from "express";
import { verifyToken, blacklistToken } from "../middlewares/auth.middleware.js";
import { deleteReportById, fetchReport, fetchReportById, generateReport } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";

const router = Router();

router.post(
    '/generate',
    blacklistToken,
    verifyToken,
    upload.single("resume"),
    generateReport
)

router.get(
    '/fetch',
    blacklistToken,
    verifyToken,
    fetchReport
)

router.get(
    '/fetchid/:id',
    blacklistToken,
    verifyToken,
    fetchReportById
)

router.delete(
    '/removeid/:id',
    blacklistToken,
    verifyToken,
    deleteReportById
)

export default router;