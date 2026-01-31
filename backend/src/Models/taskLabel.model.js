import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const taskLabelSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    labelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Label",
      required: true,
    },
  },
  { timestamps: false },
);

taskLabelSchema.index({ taskId: 1, labelId: 1 }, { unique: true });

applyBase(taskLabelSchema);

export const TaskLabel =
  mongoose.models.TaskLabel || mongoose.model("TaskLabel", taskLabelSchema);
