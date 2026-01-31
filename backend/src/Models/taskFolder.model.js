import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const taskFolderSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskGroup",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    parentFolderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskFolder",
      default: null,
    },
    orderNum: { type: Number, default: 0 },
  },
  { timestamps: true },
);

taskFolderSchema.index({ groupId: 1 });
taskFolderSchema.index({ groupId: 1, parentFolderId: 1 });

applyBase(taskFolderSchema);

export const TaskFolder =
  mongoose.models.TaskFolder || mongoose.model("TaskFolder", taskFolderSchema);
