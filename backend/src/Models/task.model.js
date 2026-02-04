import mongoose from "mongoose";

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
    timestamps: true,
    versionKey: false,
  },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
