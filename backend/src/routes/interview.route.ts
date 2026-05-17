import { Router } from "express";
import { verifyToken, blacklistToken } from "../middlewares/auth.middleware.js";
import { generateReport } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";

const router = Router();

router.post(
    '/generate',
    blacklistToken,
    verifyToken,
    upload.single("resume"),
    generateReport
)

export default router;