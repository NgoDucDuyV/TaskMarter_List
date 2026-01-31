import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const taskAssigneeSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedAt: { type: Date, default: () => new Date(), required: true },
  },
  { timestamps: false },
);

taskAssigneeSchema.index({ taskId: 1, userId: 1 }, { unique: true });
taskAssigneeSchema.index({ taskId: 1 });
taskAssigneeSchema.index({ userId: 1 });

applyBase(taskAssigneeSchema);

export const TaskAssignee =
  mongoose.models.TaskAssignee ||
  mongoose.model("TaskAssignee", taskAssigneeSchema);
