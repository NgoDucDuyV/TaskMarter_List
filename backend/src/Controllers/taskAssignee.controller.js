import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Task from "../Models/task.model.js";
import { TaskAssignee } from "../Models/taskAssignee.model.js";
import { TeamMember } from "../Models/teamMember.model.js";
import { User } from "../Models/user.model.js";

/**
 * C.1. Giao Việc cho Thành viên
 * POST /api/tasks/:taskId/assign
 */
export const assignMember = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const { userId } = req.body;
  const currentUserId = String(req.user?.userId || req.user?._id);

  // Step 1: Check task exists
  const task = await Task.findById(taskId);
  if (!task) {
    return next(
      new ErrorResponse("Task không tìm thấy", 404, "TASK_NOT_FOUND"),
    );
  }

  // Step 2: Check permission
  if (task.teamId) {
    // Team task: check user is admin/owner or creator
    const userMembership = await TeamMember.findOne({
      teamId: task.teamId,
      userId: currentUserId,
    });
    if (!userMembership) {
      return next(
        new ErrorResponse(
          "Bạn không phải member của team",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
    if (
      userMembership.role !== "owner" &&
      userMembership.role !== "admin" &&
      String(task.createdBy) !== currentUserId
    ) {
      return next(
        new ErrorResponse(
          "Bạn không có quyền giao task",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  } else if (task.ownerUserId) {
    // Personal task: only owner can assign
    if (String(task.ownerUserId) !== currentUserId) {
      return next(
        new ErrorResponse(
          "Bạn không có quyền giao task",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  }

  // Step 3: Check target user exists
  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return next(
      new ErrorResponse("User không tìm thấy", 404, "USER_NOT_FOUND"),
    );
  }

  // Step 4: If team task, check target is team member
  if (task.teamId) {
    const teamMember = await TeamMember.findOne({
      teamId: task.teamId,
      userId,
    });
    if (!teamMember) {
      return next(
        new ErrorResponse(
          "User không phải member của team",
          404,
          "USER_NOT_TEAM_MEMBER",
        ),
      );
    }
  }

  // Step 5: Check not already assigned
  const existingAssignee = await TaskAssignee.findOne({
    taskId,
    userId,
  });
  if (existingAssignee) {
    return next(
      new ErrorResponse("User đã được giao task này", 400, "ALREADY_ASSIGNED"),
    );
  }

  // Step 6: Create assignment
  const assignee = await TaskAssignee.create({
    taskId,
    userId,
    assignedBy: currentUserId,
    assignedAt: new Date(),
  });

  // Step 7: Populate for response
  await assignee.populate("userId", "username email displayName");
  await assignee.populate("assignedBy", "username email");

  return res.status(201).json({
    success: true,
    data: {
      id: assignee._id,
      taskId: assignee.taskId,
      userId: assignee.userId,
      assignedBy: assignee.assignedBy,
      assignedAt: assignee.assignedAt,
    },
  });
});

/**
 * C.2. Bỏ Giao Việc (Unassign)
 * DELETE /api/tasks/:taskId/assign/:assigneeId
 */
export const unassignMember = asyncHandler(async (req, res, next) => {
  const { taskId, assigneeId } = req.params;
  const currentUserId = String(req.user?.userId || req.user?._id);

  // Step 1: Check task exists
  const task = await Task.findById(taskId);
  if (!task) {
    return next(
      new ErrorResponse("Task không tìm thấy", 404, "TASK_NOT_FOUND"),
    );
  }

  // Step 2: Check assignment exists
  const assignment = await TaskAssignee.findById(assigneeId);
  if (!assignment) {
    return next(
      new ErrorResponse(
        "Giao việc không tìm thấy",
        404,
        "ASSIGNMENT_NOT_FOUND",
      ),
    );
  }

  // Step 3: Check assignment belongs to task
  if (String(assignment.taskId) !== taskId) {
    return next(
      new ErrorResponse(
        "Giao việc không thuộc task này",
        404,
        "ASSIGNMENT_NOT_FOUND",
      ),
    );
  }

  // Step 4: Check permission
  if (task.teamId) {
    const userMembership = await TeamMember.findOne({
      teamId: task.teamId,
      userId: currentUserId,
    });
    if (
      !userMembership ||
      (userMembership.role !== "owner" &&
        userMembership.role !== "admin" &&
        String(task.createdBy) !== currentUserId &&
        String(assignment.userId) !== currentUserId)
    ) {
      return next(
        new ErrorResponse(
          "Bạn không có quyền bỏ giao việc",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  } else if (task.ownerUserId) {
    if (
      String(task.ownerUserId) !== currentUserId &&
      String(assignment.userId) !== currentUserId
    ) {
      return next(
        new ErrorResponse(
          "Bạn không có quyền bỏ giao việc",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  }

  // Step 5: Delete assignment
  await TaskAssignee.deleteOne({ _id: assigneeId });

  return res.status(200).json({
    success: true,
    message: "Bỏ giao việc thành công",
    data: {
      id: assignment._id,
      taskId: assignment.taskId,
      userId: assignment.userId,
      removedAt: new Date(),
    },
  });
});

/**
 * C.3. Lấy Danh sách Assignees của Task
 * GET /api/tasks/:taskId/assignees
 */
export const getTaskAssignees = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const { page = 1, limit = 20 } = req.query;
  const currentUserId = String(req.user?.userId || req.user?._id);

  // Step 1: Check task exists
  const task = await Task.findById(taskId);
  if (!task) {
    return next(
      new ErrorResponse("Task không tìm thấy", 404, "TASK_NOT_FOUND"),
    );
  }

  // Step 2: Check permission
  if (task.teamId) {
    const userMembership = await TeamMember.findOne({
      teamId: task.teamId,
      userId: currentUserId,
    });
    if (!userMembership) {
      return next(
        new ErrorResponse("Bạn không có quyền xem", 403, "NOT_AUTHORIZED"),
      );
    }
  } else if (task.ownerUserId) {
    if (String(task.ownerUserId) !== currentUserId) {
      return next(
        new ErrorResponse("Bạn không có quyền xem", 403, "NOT_AUTHORIZED"),
      );
    }
  }

  // Step 3: Pagination
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(parseInt(limit, 10) || 20, 100);
  const skip = (pageNum - 1) * limitNum;

  // Step 4: Fetch assignees
  const assignees = await TaskAssignee.find({ taskId })
    .populate("userId", "username email displayName avatarUrl")
    .populate("assignedBy", "username email")
    .skip(skip)
    .limit(limitNum)
    .sort({ assignedAt: -1 });

  // Step 5: Count total
  const total = await TaskAssignee.countDocuments({ taskId });

  return res.status(200).json({
    success: true,
    data: {
      assignees,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
  });
});

/**
 * C.4. Cập nhật Assignees hàng loạt
 * PUT /api/tasks/:taskId/assignees
 */
export const updateTaskAssignees = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const { userIds } = req.body; // array of userIds
  const currentUserId = String(req.user?.userId || req.user?._id);

  // Step 1: Check task exists
  const task = await Task.findById(taskId);
  if (!task) {
    return next(
      new ErrorResponse("Task không tìm thấy", 404, "TASK_NOT_FOUND"),
    );
  }

  // Step 2: Check permission
  if (task.teamId) {
    const userMembership = await TeamMember.findOne({
      teamId: task.teamId,
      userId: currentUserId,
    });
    if (
      !userMembership ||
      (userMembership.role !== "owner" && userMembership.role !== "admin")
    ) {
      return next(
        new ErrorResponse("Bạn không có quyền cập nhật", 403, "NOT_AUTHORIZED"),
      );
    }
  } else if (task.ownerUserId) {
    if (String(task.ownerUserId) !== currentUserId) {
      return next(
        new ErrorResponse("Bạn không có quyền cập nhật", 403, "NOT_AUTHORIZED"),
      );
    }
  }

  // Step 3: Validate all users exist and are team members
  for (const userId of userIds) {
    const user = await User.findById(userId);
    if (!user) {
      return next(
        new ErrorResponse(
          "Một hoặc nhiều user không tìm thấy",
          400,
          "INVALID_USERIDS",
        ),
      );
    }

    if (task.teamId) {
      const teamMember = await TeamMember.findOne({
        teamId: task.teamId,
        userId,
      });
      if (!teamMember) {
        return next(
          new ErrorResponse(
            "Một hoặc nhiều user không phải member của team",
            400,
            "USER_NOT_TEAM_MEMBER",
          ),
        );
      }
    }
  }

  // Step 4: Get current assignees
  const currentAssignees = await TaskAssignee.find({ taskId }).distinct(
    "userId",
  );
  const currentIds = currentAssignees.map((id) => String(id));
  const newIds = userIds.map((id) => String(id));

  // Step 5: Calculate changes
  const toAdd = newIds.filter((id) => !currentIds.includes(id));
  const toRemove = currentIds.filter((id) => !newIds.includes(id));
  const unchanged = newIds.filter((id) => currentIds.includes(id));

  // Step 6: Execute updates
  const addedAssignees = [];
  const removedAssignees = [];

  // Add new assignees
  for (const userId of toAdd) {
    const newAssignee = await TaskAssignee.create({
      taskId,
      userId,
      assignedBy: currentUserId,
      assignedAt: new Date(),
    });
    addedAssignees.push(newAssignee);
  }

  // Remove unassigned
  for (const userId of toRemove) {
    const removed = await TaskAssignee.findOne({ taskId, userId });
    if (removed) {
      removedAssignees.push(removed);
      await TaskAssignee.deleteOne({ _id: removed._id });
    }
  }

  return res.status(200).json({
    success: true,
    data: {
      taskId,
      added: addedAssignees.map((a) => ({
        id: a._id,
        userId: a.userId,
        assignedAt: a.assignedAt,
      })),
      removed: removedAssignees.map((a) => ({
        id: a._id,
        userId: a.userId,
      })),
      unchanged: unchanged.map((id) => ({ userId: id })),
    },
  });
});
