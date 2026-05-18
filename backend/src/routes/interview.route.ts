import { Router } from "express";
import { verifyToken, blacklistToken } from "../middlewares/auth.middleware.js";
import { fetchReport, generateReport } from "../controllers/interview.controller.js";
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

export default router;