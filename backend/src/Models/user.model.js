import mongoose from "mongoose";
import { applyBase } from "./_base.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    displayName: {
      type: String,
      require: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    phone: {
      type: String,
      sparse: true,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
      required: true,
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    lastActiveAt: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.index({ email: 1 }, { unique: true });

// applyBase(userSchema, { remove: ["passwordHash"] });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
