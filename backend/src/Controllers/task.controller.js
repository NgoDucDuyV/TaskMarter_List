import Task from "../Models/task.model.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { TeamMember } from "../Models/teamMember.model.js";

export const CreateTask = asyncHandler(async (req, res, next) => {
  const { title, description, priority, startDate, dueDate } = req.body;

  console.log(req.user);
  // Thêm createdBy
  const task = await Task.create({
    title,
    description,
    priority,
    startDate,
    dueDate,
    createdBy: req.user.userId, // Lấy từ body
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

export const GetAllTasksUser = asyncHandler(async (req, res, next) => {
  // Support filtering and pagination: status, priority, q (search), page, limit
  const { status, priority, q } = req.query;
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
  const skip = (page - 1) * limit;

  const query = { createdBy: req.user.userId };
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (q) {
    const regex = new RegExp(String(q), "i");
    query.$or = [{ title: regex }, { description: regex }];
  }

  const [items, total] = await Promise.all([
    Task.find(query)
      .populate("ownerUserId", "username email")
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Task.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: { items, total, page, limit },
  });
});

export const GetAllTasks = asyncHandler(async (req, res, next) => {
  const query = {};

  console.log(query);

  if (req.user.role === "user") {
    query.ownerUserId = req.user.id;
  }

  const tasks = await Task.find(query)
    .populate("ownerUserId", "username email")
    .populate("createdBy", "username email")
    .sort({ createdAt: -1 })
    .limit(7);

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

export const GetTaskById = asyncHandler(async (req, res, next) => {
  const userId = String(req.user?.userId || req.user?.id);
  const task = await Task.findById(req.params.id)
    .populate("ownerUserId", "username email")
    .populate("createdBy", "username email");

  if (!task) {
    return next(
      new ErrorResponse(
        `Task not found with id of ${req.params.id}`,
        404,
        "TASK_NOT_FOUND",
      ),
    );
  }

  // Check access permission
  if (task.teamId) {
    // Team task: check if user is member
    const teamMember = await TeamMember.findOne({
      teamId: task.teamId,
      userId,
    });
    if (!teamMember) {
      return next(
        new ErrorResponse(
          "Bạn không có quyền truy cập task này",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  } else if (task.ownerUserId) {
    // Personal task: only owner can view
    if (String(task.ownerUserId) !== userId && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          "Bạn không có quyền truy cập task này",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Cập nhật một task
// @route   PUT /api/tasks/:id
// @access  Private
export const UpdateTask = asyncHandler(async (req, res, next) => {
  const userId = String(req.user?.userId || req.user?.id);
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(
        `Task not found with id of ${req.params.id}`,
        404,
        "TASK_NOT_FOUND",
      ),
    );
  }

  // Check update permission
  if (task.teamId) {
    // Team task: check if user is admin/owner of team
    const teamMember = await TeamMember.findOne({
      teamId: task.teamId,
      userId,
    });
    if (!teamMember || (teamMember.role !== "owner" && teamMember.role !== "admin")) {
      return next(
        new ErrorResponse(
          "Bạn không có quyền cập nhật task này",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  } else if (task.ownerUserId) {
    // Personal task: only owner can update
    if (String(task.ownerUserId) !== userId && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          "Bạn không có quyền cập nhật task này",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Xóa một task
// @route   DELETE /api/tasks/:id
// @access  Private
export const DeleteTask = asyncHandler(async (req, res, next) => {
  const userId = String(req.user?.userId || req.user?.id);
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(
        `Task not found with id of ${req.params.id}`,
        404,
        "TASK_NOT_FOUND",
      ),
    );
  }

  // Check delete permission
  if (task.teamId) {
    // Team task: check if user is admin/owner of team
    const teamMember = await TeamMember.findOne({
      teamId: task.teamId,
      userId,
    });
    if (!teamMember || (teamMember.role !== "owner" && teamMember.role !== "admin")) {
      return next(
        new ErrorResponse(
          "Bạn không có quyền xóa task này",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  } else if (task.ownerUserId) {
    // Personal task: only owner can delete
    if (String(task.ownerUserId) !== userId && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          "Bạn không có quyền xóa task này",
          403,
          "NOT_AUTHORIZED",
        ),
      );
    }
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
