import { Router } from "express";
import { register, login, logout, getUserDetails } from "../controllers/auth.controller.js";
import { verifyToken, blacklistToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getme', blacklistToken, verifyToken, getUserDetails);

export default router;