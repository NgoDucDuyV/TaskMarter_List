import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createInviteSchema,
  acceptInviteSchema,
  declineInviteSchema,
} from "../validations/validationTeamInvite.js";
import * as teamInviteController from "../Controllers/teamInvite.controller.js";

const router = express.Router();

// Public endpoint - get invite info without token
router.get("/:inviteId", teamInviteController.getInviteInfo);

// Protected endpoints
router.post(
  "/:teamId/create",
  authMiddleware,
  validateRequest(createInviteSchema),
  teamInviteController.createInvite,
);

router.post(
  "/accept",
  authMiddleware,
  validateRequest(acceptInviteSchema),
  teamInviteController.acceptInvite,
);

router.post(
  "/:inviteId/decline",
  validateRequest(declineInviteSchema),
  teamInviteController.revokeInvite,
);

router.delete(
  "/:teamId/:inviteId",
  authMiddleware,
  teamInviteController.revokeInvite,
);

router.post(
  "/:teamId/:inviteId/resend",
  authMiddleware,
  teamInviteController.resendInvite,
);

export default router;
