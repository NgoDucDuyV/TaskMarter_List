import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as teamController from "../Controllers/team.controller.js";
import {
  teamCreateSchema,
  teamUpdateSchema,
  addMemberSchema,
  updateMemberSchema,
} from "../validations/validationTeam.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

// list teams for user
router.get("/", authMiddleware, teamController.getTeams);
router.get("/:id", authMiddleware, teamController.getTeamById);

// Member management routes
router.get(
  "/:teamId/members",
  authMiddleware,
  teamController.getTeamMembersWithPagination
);
router.post(
  "/:teamId/members",
  authMiddleware,
  validateRequest(addMemberSchema),
  teamController.addMember
);
router.patch(
  "/:teamId/members/:memberId",
  authMiddleware,
  validateRequest(updateMemberSchema),
  teamController.updateMemberRole
);
router.delete(
  "/:teamId/members/:memberId",
  authMiddleware,
  teamController.removeMember
);
router.post("/:teamId/leave", authMiddleware, teamController.leaveTeam);

// Team CRUD
router.post(
  "/",
  authMiddleware,
  validateRequest(teamCreateSchema),
  teamController.createTeam,
);
router.put(
  "/:id",
  authMiddleware,
  validateRequest(teamUpdateSchema),
  teamController.updateTeam,
);
router.delete("/:id", authMiddleware, teamController.deleteTeam);

export default router;
