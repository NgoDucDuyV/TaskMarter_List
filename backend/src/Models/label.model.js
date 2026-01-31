import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const labelSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    name: { type: String, required: true, trim: true },
    color: { type: String, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

labelSchema.index({ teamId: 1, name: 1 });

applyBase(labelSchema);

export const Label =
  mongoose.models.Label || mongoose.model("Label", labelSchema);
