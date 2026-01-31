import mongoose from "mongoose";
import { applyBase } from "./_base.js";

const teamInviteSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    email: { type: String, required: true, trim: true, lowercase: true },
    role: {
      type: String,
      enum: ["admin", "member", "guest"],
      default: "member",
      required: true,
    },
    tokenHash: { type: String, required: true },

    expiresAt: { type: Date, required: true },
    acceptedAt: { type: Date, default: null },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

teamInviteSchema.index({ teamId: 1 });
teamInviteSchema.index({ email: 1 });

// TTL
teamInviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

applyBase(teamInviteSchema, { remove: ["tokenHash"] });

export const TeamInvite =
  mongoose.models.TeamInvite || mongoose.model("TeamInvite", teamInviteSchema);
