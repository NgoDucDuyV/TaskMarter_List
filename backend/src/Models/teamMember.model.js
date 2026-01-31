import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const teamMemberSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member", "guest"],
      default: "member",
      required: true,
    },
    joinedAt: { type: Date, default: () => new Date(), required: true },
  },
  { timestamps: true },
);

teamMemberSchema.index({ teamId: 1, userId: 1 }, { unique: true });
teamMemberSchema.index({ teamId: 1 });
teamMemberSchema.index({ userId: 1 });

applyBase(teamMemberSchema);

export const TeamMember =
  mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);
