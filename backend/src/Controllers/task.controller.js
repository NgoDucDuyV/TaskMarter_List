import { Task } from "../Models/task.model.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const CreateTask = asyncHandler(async (req, res, next) => {
  const { title, description, status, priority, startDate, dueDate, groupId, folderId, ownerUserId, teamId, parentTaskId } = req.body;

  // Logic kiểm tra scope (quick task, team task) sẽ được xử lý ở model pre-validate hook
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    startDate,
    dueDate,
    groupId,
    folderId,
    ownerUserId: ownerUserId || req.user.id, // Nếu là quick task, ownerUserId là user hiện tại
    teamId,
    parentTaskId,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Lấy tất cả các tasks
// @route   GET /api/tasks
// @access  Private
export const GetAllTasks = asyncHandler(async (req, res, next) => {
  // Logic lọc, phân trang, sắp xếp có thể được thêm vào đây
  // Ví dụ: chỉ lấy tasks của user hiện tại hoặc của team
  const query = {};

  if (req.user.role === 'user') {
    query.ownerUserId = req.user.id; // Chỉ lấy quick tasks của user
    // Hoặc lấy tasks của team mà user là thành viên
    // Cần thêm logic để join với TeamMember model
  }

  const tasks = await Task.find(query).populate('ownerUserId', 'username email').populate('createdBy', 'username email');

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// @desc    Lấy một task theo ID
// @route   GET /api/tasks/:id
// @access  Private
export const GetTaskById = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
    .populate('ownerUserId', 'username email')
    .populate('createdBy', 'username email');
    
  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404, 'TASK_NOT_FOUND'));
  }

  // Kiểm tra quyền truy cập (chỉ owner hoặc thành viên team mới được xem)
  if (task.ownerUserId && task.ownerUserId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this task`, 403, 'NOT_AUTHORIZED'));
  }
  // Thêm logic kiểm tra nếu là task của team

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Cập nhật một task
// @route   PUT /api/tasks/:id
// @access  Private
export const UpdateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404, 'TASK_NOT_FOUND'));
  }

  // Kiểm tra quyền truy cập (chỉ owner hoặc thành viên team mới được cập nhật)
  if (task.ownerUserId && task.ownerUserId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this task`, 403, 'NOT_AUTHORIZED'));
  }
  // Thêm logic kiểm tra nếu là task của team

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
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404, 'TASK_NOT_FOUND'));
  }

  // Kiểm tra quyền truy cập (chỉ owner hoặc thành viên team mới được xóa)
  if (task.ownerUserId && task.ownerUserId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this task`, 403, 'NOT_AUTHORIZED'));
  }
  // Thêm logic kiểm tra nếu là task của team

  await task.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
