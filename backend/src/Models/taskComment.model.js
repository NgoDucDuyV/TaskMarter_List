import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const taskCommentSchema = new mongoose.Schema(
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
    content: { type: String, required: true },
  },
  { timestamps: true },
);

taskCommentSchema.index({ taskId: 1 });

applyBase(taskCommentSchema);

export const TaskComment =
  mongoose.models.TaskComment ||
  mongoose.model("TaskComment", taskCommentSchema);
