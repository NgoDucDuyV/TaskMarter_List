import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { Team } from "../Models/team.model.js";
import { TeamMember } from "../Models/teamMember.model.js";
import { TeamInvite } from "../Models/teamInvite.model.js";
import { User } from "../Models/user.model.js";
import { generateToken, hashToken, verifyToken } from "../utils/tokenUtils.js";

/**
 * A.1. Gửi lời mời đến Email
 * POST /api/teams/:teamId/invites
 */
export const createInvite = asyncHandler(async (req, res, next) => {
  const { teamId } = req.params;
  const { email, role = "member", expiresInDays = 7 } = req.body;
  const userId = String(req.user?.userId || req.user?._id);

  // Step 1: Check team exists
  const team = await Team.findById(teamId);
  if (!team) {
    return next(
      new ErrorResponse("Team không tìm thấy", 404, "TEAM_NOT_FOUND"),
    );
  }

  // Step 2: Check permission (user is owner or admin)
  const userMembership = await TeamMember.findOne({ teamId, userId });
  if (!userMembership) {
    return next(
      new ErrorResponse(
        "Bạn không phải thành viên của team",
        403,
        "NOT_AUTHORIZED",
      ),
    );
  }
  if (userMembership.role !== "owner" && userMembership.role !== "admin") {
    return next(
      new ErrorResponse(
        "Bạn không có quyền mời thành viên",
        403,
        "NOT_AUTHORIZED",
      ),
    );
  }

  // Step 3: Check no duplicate invite
  const existingInvite = await TeamInvite.findOne({
    teamId,
    email,
    status: "pending",
  });
  if (existingInvite) {
    return next(
      new ErrorResponse("Email đã được mời", 400, "DUPLICATE_INVITE"),
    );
  }

  // Step 4: Check user not already member
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const existingMember = await TeamMember.findOne({
      teamId,
      userId: existingUser._id,
    });
    if (existingMember) {
      return next(
        new ErrorResponse(
          "Email là thành viên của team",
          400,
          "USER_ALREADY_MEMBER",
        ),
      );
    }
  }

  // Step 5: Generate token and hash
  const rawToken = generateToken();
  const tokenHash = await hashToken(rawToken);

  // Step 6: Calculate expiration
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

  // Step 7: Create invitation
  const invite = await TeamInvite.create({
    teamId,
    email,
    role,
    tokenHash,
    expiresAt,
    invitedBy: userId,
    status: "pending",
  });

  // Step 8: Populate invitedBy
  await invite.populate("invitedBy", "username email");

  // TODO: Step 9: Send email with invite link
  // const inviteLink = `${process.env.FRONTEND_URL}/invite?token=${rawToken}&teamId=${teamId}`;
  // await sendInviteEmail(email, inviteLink, team.name, invite.invitedBy);

  return res.status(201).json({
    success: true,
    data: {
      id: invite._id,
      teamId: invite.teamId,
      email: invite.email,
      role: invite.role,
      expiresAt: invite.expiresAt,
      acceptedAt: invite.acceptedAt,
      invitedBy: invite.invitedBy,
      createdAt: invite.createdAt,
      // Note: Never return raw token in response; it should only be sent via email
    },
  });
});

/**
 * A.2. Chấp nhận Lời Mời
 * POST /api/teams/invites/accept
 */
export const acceptInvite = asyncHandler(async (req, res, next) => {
  const { token, teamId } = req.body;
  const userId = String(req.user?.userId || req.user?._id);

  // Step 1: Find invitation by token hash and teamId
  const tokenHash = await hashToken(token);
  const invite = await TeamInvite.findOne({
    tokenHash,
    teamId,
    status: "pending",
  });

  if (!invite) {
    return next(
      new ErrorResponse(
        "Lời mời không tìm thấy hoặc không hợp lệ",
        404,
        "INVITE_NOT_FOUND",
      ),
    );
  }

  // Step 2: Check not expired
  if (new Date() > invite.expiresAt) {
    return next(new ErrorResponse("Lời mời đã hết hạn", 400, "INVITE_EXPIRED"));
  }

  // Step 3: Check not already accepted
  if (invite.acceptedAt !== null) {
    return next(
      new ErrorResponse(
        "Lời mời đã được chấp nhận",
        400,
        "INVITE_ALREADY_ACCEPTED",
      ),
    );
  }

  // Step 4: Check email matches
  const user = await User.findById(userId);
  if (!user || user.email !== invite.email) {
    return next(
      new ErrorResponse("Email không khớp với lời mời", 400, "EMAIL_MISMATCH"),
    );
  }

  // Step 5: Check user not already member
  const existingMember = await TeamMember.findOne({
    teamId,
    userId,
  });
  if (existingMember) {
    return next(
      new ErrorResponse("Bạn đã là thành viên của team", 409, "CONFLICT"),
    );
  }

  // Step 6: Create team member
  const teamMember = await TeamMember.create({
    teamId,
    userId,
    role: invite.role,
    joinedAt: new Date(),
  });

  // Step 7: Update invitation status
  invite.acceptedAt = new Date();
  invite.status = "accepted";
  await invite.save();

  // Step 8: Populate for response
  await teamMember.populate("userId", "username email displayName");

  // TODO: Send confirmation email
  // await sendConfirmationEmail(user.email, invite.teamId);

  return res.status(200).json({
    success: true,
    data: {
      id: invite._id,
      teamId: invite.teamId,
      email: invite.email,
      role: invite.role,
      acceptedAt: invite.acceptedAt,
      invitedBy: invite.invitedBy,
      createdAt: invite.createdAt,
    },
  });
});

/**
 * A.3. Từ chối/Hủy Lời Mời
 * DELETE /api/teams/:teamId/invites/:inviteId
 */
export const revokeInvite = asyncHandler(async (req, res, next) => {
  const { teamId, inviteId } = req.params;
  const userId = String(req.user?.userId || req.user?._id);

  // Step 1: Find invitation
  const invite = await TeamInvite.findById(inviteId);
  if (!invite) {
    return next(
      new ErrorResponse("Lời mời không tìm thấy", 404, "INVITE_NOT_FOUND"),
    );
  }

  // Step 2: Check team matches
  if (String(invite.teamId) !== teamId) {
    return next(
      new ErrorResponse(
        "Lời mời không thuộc team này",
        404,
        "INVITE_NOT_FOUND",
      ),
    );
  }

  // Step 3: Check not already accepted
  if (invite.acceptedAt !== null) {
    return next(
      new ErrorResponse(
        "Lời mời đã được chấp nhận, không thể hủy",
        400,
        "INVITE_ALREADY_ACCEPTED",
      ),
    );
  }

  // Step 4: Check permission (invitedBy or admin/owner)
  const userMembership = await TeamMember.findOne({ teamId, userId });
  if (
    String(invite.invitedBy) !== userId &&
    (!userMembership ||
      (userMembership.role !== "admin" && userMembership.role !== "owner"))
  ) {
    return next(
      new ErrorResponse(
        "Bạn không có quyền hủy lời mời",
        403,
        "NOT_AUTHORIZED",
      ),
    );
  }

  // Step 5: Delete invitation
  invite.status = "revoked";
  await invite.save();

  return res.status(200).json({
    success: true,
    message: "Lời mời đã bị hủy",
    data: {
      id: invite._id,
      teamId: invite.teamId,
      email: invite.email,
      deletedAt: new Date(),
    },
  });
});

/**
 * A.4. Gửi lại Lời Mời
 * POST /api/teams/:teamId/invites/:inviteId/resend
 */
export const resendInvite = asyncHandler(async (req, res, next) => {
  const { teamId, inviteId } = req.params;
  const userId = String(req.user?.userId || req.user?._id);

  // Step 1: Find invitation
  const invite = await TeamInvite.findById(inviteId);
  if (!invite) {
    return next(
      new ErrorResponse("Lời mời không tìm thấy", 404, "INVITE_NOT_FOUND"),
    );
  }

  // Step 2: Check team matches
  if (String(invite.teamId) !== teamId) {
    return next(
      new ErrorResponse(
        "Lời mời không thuộc team này",
        404,
        "INVITE_NOT_FOUND",
      ),
    );
  }

  // Step 3: Check permission
  const userMembership = await TeamMember.findOne({ teamId, userId });
  if (
    String(invite.invitedBy) !== userId &&
    (!userMembership ||
      (userMembership.role !== "admin" && userMembership.role !== "owner"))
  ) {
    return next(
      new ErrorResponse(
        "Bạn không có quyền gửi lại lời mời",
        403,
        "NOT_AUTHORIZED",
      ),
    );
  }

  // Step 4: Check not already accepted
  if (invite.acceptedAt !== null) {
    return next(
      new ErrorResponse(
        "Lời mời đã được chấp nhận",
        400,
        "INVITE_ALREADY_ACCEPTED",
      ),
    );
  }

  // Step 5: Generate new token and hash
  const rawToken = generateToken();
  const tokenHash = await hashToken(rawToken);

  // Step 6: Reset expiration
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  // Step 7: Update invitation
  invite.tokenHash = tokenHash;
  invite.expiresAt = expiresAt;
  invite.resendCount = (invite.resendCount || 0) + 1;
  invite.status = "pending";
  await invite.save();

  // TODO: Send email again with new token
  // const inviteLink = `${process.env.FRONTEND_URL}/invite?token=${rawToken}&teamId=${teamId}`;
  // await sendInviteEmail(invite.email, inviteLink, team.name, invite.invitedBy);

  return res.status(200).json({
    success: true,
    message: "Lời mời đã được gửi lại",
    data: {
      id: invite._id,
      teamId: invite.teamId,
      email: invite.email,
      expiresAt: invite.expiresAt,
      resendCount: invite.resendCount,
    },
  });
});

/**
 * GET /api/teams/invites/:inviteId (public - no auth required)
 * Get invite info without revealing token
 */
export const getInviteInfo = asyncHandler(async (req, res, next) => {
  const { inviteId } = req.params;

  const invite = await TeamInvite.findById(inviteId).populate(
    "teamId",
    "name slug",
  );

  if (!invite) {
    return next(
      new ErrorResponse("Lời mời không tìm thấy", 404, "INVITE_NOT_FOUND"),
    );
  }

  if (invite.acceptedAt !== null && invite.status === "accepted") {
    return next(
      new ErrorResponse(
        "Lời mời đã được chấp nhận",
        400,
        "INVITE_ALREADY_ACCEPTED",
      ),
    );
  }

  if (new Date() > invite.expiresAt) {
    return next(new ErrorResponse("Lời mời đã hết hạn", 400, "INVITE_EXPIRED"));
  }

  return res.status(200).json({
    success: true,
    data: {
      id: invite._id,
      teamId: invite.teamId?._id,
      teamName: invite.teamId?.name,
      email: invite.email,
      role: invite.role,
      expiresAt: invite.expiresAt,
      // Never expose tokenHash
    },
  });
});
