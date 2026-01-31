import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const taskSchema = new mongoose.Schema(
  {
    // scope
    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, // quick
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    }, // team
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskGroup",
      default: null,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskFolder",
      default: null,
    },

    // hierarchy
    parentTaskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },

    title: { type: String, required: true, trim: true },
    description: { type: String, default: null },

    status: {
      type: String,
      enum: ["todo", "in_progress", "done", "blocked"],
      default: "todo",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
      required: true,
    },

    startDate: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    completedAt: { type: Date, default: null },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isArchived: { type: Boolean, default: false, required: true },
    orderNum: { type: Number, default: 0 },
  },
  {
    // ... other schema options ...
  }
);

// Index theo DBML + thực tế query
taskSchema.index({ teamId: 1 });
taskSchema.index({ groupId: 1 });
taskSchema.index({ folderId: 1 });
taskSchema.index({ parentTaskId: 1 });
taskSchema.index({ ownerUserId: 1 });
taskSchema.index({ dueDate: 1 });

taskSchema.index({ teamId: 1, groupId: 1, folderId: 1, orderNum: 1 });
taskSchema.index({ ownerUserId: 1, createdAt: -1 });

// Validate scope
taskSchema.pre("validate", function (next) {
  const isQuick = !!this.ownerUserId && !this.teamId && !this.groupId;
  const isTeam = !!this.teamId;

  if (!isQuick && !isTeam) {
    return next(
      new ErrorResponse(
        "Task scope invalid: must be a quick task (ownerUserId) or team task (teamId).",
        400,
        "TASK_SCOPE_INVALID"
      )
    );
  }

  if (isQuick && (this.groupId || this.folderId)) {
    return next(new ErrorResponse("Quick task cannot belong to a group/folder.", 400, "QUICK_TASK_INVALID_HIERARCHY"));
  }

  next();
});

applyBase(taskSchema);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
