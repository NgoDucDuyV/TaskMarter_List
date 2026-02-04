import express from "express";
import {
  SignIn,
  SignUp,
  SignOut,
  RefreshToken,
} from "../Controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  validationSignin,
  validationSignup,
} from "../validations/validationAuth.js";
const router = express.Router();

router.post("/signup", validateRequest(validationSignup), SignUp);
router.post("/signin", validateRequest(validationSignin), SignIn);
router.post("/refresh", RefreshToken);
router.post("/logout", SignOut);

export default router;
