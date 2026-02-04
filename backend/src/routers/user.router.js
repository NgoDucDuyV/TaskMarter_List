import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  AuthMe,
  GetCurrentUser,
  GetProfile,
} from "../Controllers/user.controller.js";
const router = express.Router();

router.get("/profile", GetProfile);

router.get("/me", AuthMe);

router.get("/current-user", GetCurrentUser);

export default router;
