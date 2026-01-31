import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
      required: true,
    },
  },
  {
    // ... other schema options ...
  }
);

teamSchema.index({ slug: 1 }, { unique: true });
teamSchema.index({ ownerId: 1 });

applyBase(teamSchema);

export const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
