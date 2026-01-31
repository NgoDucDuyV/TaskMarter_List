import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const taskGroupSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
      required: true,
    },
  },
  { timestamps: true },
);

taskGroupSchema.index({ teamId: 1 });

applyBase(taskGroupSchema);

export const TaskGroup =
  mongoose.models.TaskGroup || mongoose.model("TaskGroup", taskGroupSchema);
