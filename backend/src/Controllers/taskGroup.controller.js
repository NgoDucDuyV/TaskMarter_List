import { TaskGroup } from "../Models/taskGroup.model.js";
import { Team } from "../Models/team.model.js";
import { TeamMember } from "../Models/teamMember.model.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const CreateTaskGroup = asyncHandler(async (req, res, next) => {
  const { teamId, name, description } = req.body;

  // check team exists
  const team = await Team.findById(teamId);
  if (!team) {
    return next(
      new ErrorResponse(
        `Team not found with id of ${teamId}`,
        404,
        "TEAM_NOT_FOUND",
      ),
    );
  }

  // check permission: either owner or team member
  const userId = String(req.user.userId);
  if (String(team.ownerId) !== userId) {
    const membership = await TeamMember.findOne({ teamId, userId });
    if (!membership) {
      return next(
        new ErrorResponse(
          `User ${userId} is not a member of team ${teamId}`,
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  }

  const group = await TaskGroup.create({
    teamId,
    name,
    description,
    createdBy: req.user.userId,
  });

  res.status(201).json({ success: true, data: group });
});

export const GetTaskGroups = asyncHandler(async (req, res) => {
  const { teamId } = req.query;
  const query = {};
  if (teamId) query.teamId = teamId;

  const groups = await TaskGroup.find(query).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: groups.length, data: groups });
});

export const GetTaskGroupById = asyncHandler(async (req, res, next) => {
  const group = await TaskGroup.findById(req.params.id);
  if (!group)
    return next(
      new ErrorResponse(
        `TaskGroup not found with id of ${req.params.id}`,
        404,
        "GROUP_NOT_FOUND",
      ),
    );

  res.status(200).json({ success: true, data: group });
});

export const UpdateTaskGroup = asyncHandler(async (req, res, next) => {
  let group = await TaskGroup.findById(req.params.id);
  if (!group)
    return next(
      new ErrorResponse(
        `TaskGroup not found with id of ${req.params.id}`,
        404,
        "GROUP_NOT_FOUND",
      ),
    );

  const userId = String(req.user.userId);
  // allow update if createdBy or team owner or admin
  const team = await Team.findById(group.teamId);
  if (
    String(group.createdBy) !== userId &&
    String(team?.ownerId) !== userId &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${userId} is not authorized to update this group`,
        403,
        "NOT_AUTHORIZED",
      ),
    );
  }

  group = await TaskGroup.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: group });
});

export const DeleteTaskGroup = asyncHandler(async (req, res, next) => {
  const group = await TaskGroup.findById(req.params.id);
  if (!group)
    return next(
      new ErrorResponse(
        `TaskGroup not found with id of ${req.params.id}`,
        404,
        "GROUP_NOT_FOUND",
      ),
    );

  const userId = String(req.user.userId);
  const team = await Team.findById(group.teamId);
  if (
    String(group.createdBy) !== userId &&
    String(team?.ownerId) !== userId &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${userId} is not authorized to delete this group`,
        403,
        "NOT_AUTHORIZED",
      ),
    );
  }

  await group.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
