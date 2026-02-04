import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { Team } from "../Models/team.model.js";
import { TeamMember } from "../Models/teamMember.model.js";
import { User } from "../Models/user.model.js";

function makeSlug(name) {
  let slug = String(name || "")
    .toLowerCase()
    .trim();
  slug = slug.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  if (!slug) slug = `team-${Math.floor(Math.random() * 10000)}`;
  return slug;
}

export const createTeam = asyncHandler(async (req, res, next) => {
  const userId = String(req.user?._id);
  const { name, visibility } = req.body;

  if (!name) return next(new ErrorResponse("Name is required", 400));

  let slug = makeSlug(name);
  // ensure unique
  let counter = 0;
  while (await Team.exists({ slug })) {
    counter += 1;
    slug = `${slug}-${counter}`;
    if (counter > 10000) break;
  }

  const team = await Team.create({ name, slug, ownerId: userId, visibility });

  // add owner as team member with role owner
  await TeamMember.create({ teamId: team._id, userId, role: "owner" });

  return res.status(201).json({ success: true, data: team });
});

export const getTeams = asyncHandler(async (req, res) => {
  const userId = String(req.user?._id);
  const mine = req.query.mine === "true";

  // find teams where user is owner or member
  const membershipTeamIds = await TeamMember.find({ userId }).distinct(
    "teamId",
  );

  const query =
    mine ?
      { $or: [{ ownerId: userId }, { _id: { $in: membershipTeamIds } }] }
    : { $or: [{ ownerId: userId }, { _id: { $in: membershipTeamIds } }] };

  const teams = await Team.find(query).sort({ createdAt: -1 });

  res.json({ success: true, data: teams });
});

export const getTeamById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const team = await Team.findById(id);
  if (!team) return next(new ErrorResponse("Team not found", 404));
  return res.json({ success: true, data: team });
});

export const getTeamMembers = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const team = await Team.findById(id);
  if (!team) return next(new ErrorResponse("Team not found", 404));

  const members = await TeamMember.find({ teamId: id }).populate(
    "userId",
    "name email",
  );
  return res.json({ success: true, data: members });
});

export const updateTeam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = String(req.user?._id);

  const team = await Team.findById(id);
  if (!team) return next(new ErrorResponse("Team not found", 404));
  if (String(team.ownerId) !== userId)
    return next(new ErrorResponse("Not authorized", 403));

  const { name, visibility } = req.body;
  if (name) team.name = name;
  if (visibility) team.visibility = visibility;

  await team.save();
  res.json({ success: true, data: team });
});

export const deleteTeam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = String(req.user?._id);

  const team = await Team.findById(id);
  if (!team) return next(new ErrorResponse("Team not found", 404));
  if (String(team.ownerId) !== userId)
    return next(new ErrorResponse("Not authorized", 403));

  // remove team + related team members and invites
  await TeamMember.deleteMany({ teamId: team._id });
  await team.remove();

  res.json({ success: true, data: {} });
});

/**
 * B.2. Cập nhật Role Thành viên
 * PATCH /api/teams/:teamId/members/:memberId
 */
export const updateMemberRole = asyncHandler(async (req, res, next) => {
  const { teamId, memberId } = req.params;
  const { role } = req.body;
  const userId = String(req.user?._id);

  // Check team exists
  const team = await Team.findById(teamId);
  if (!team) return next(new ErrorResponse("Team không tìm thấy", 404, "TEAM_NOT_FOUND"));

  // Check user is owner/admin
  const userMembership = await TeamMember.findOne({ teamId, userId });
  if (!userMembership || (userMembership.role !== "owner" && userMembership.role !== "admin")) {
    return next(new ErrorResponse("Bạn không có quyền thay đổi role", 403, "NOT_AUTHORIZED"));
  }

  // Check member exists
  const member = await TeamMember.findById(memberId);
  if (!member) return next(new ErrorResponse("Thành viên không tìm thấy", 404, "MEMBER_NOT_FOUND"));
  if (String(member.teamId) !== teamId) {
    return next(new ErrorResponse("Thành viên không thuộc team này", 404, "MEMBER_NOT_FOUND"));
  }

  // Cannot change owner role
  if (member.role === "owner") {
    return next(new ErrorResponse("Không thể thay đổi role của owner", 400, "CANNOT_CHANGE_OWNER"));
  }

  // Update role
  member.role = role;
  await member.save();

  return res.status(200).json({
    success: true,
    data: {
      id: member._id,
      teamId: member.teamId,
      userId: member.userId,
      role: member.role,
      updatedAt: new Date(),
    },
  });
});

/**
 * B.3. Xóa Thành viên khỏi Team
 * DELETE /api/teams/:teamId/members/:memberId
 */
export const removeMember = asyncHandler(async (req, res, next) => {
  const { teamId, memberId } = req.params;
  const userId = String(req.user?._id);

  // Check team exists
  const team = await Team.findById(teamId);
  if (!team) return next(new ErrorResponse("Team không tìm thấy", 404, "TEAM_NOT_FOUND"));

  // Check member exists
  const member = await TeamMember.findById(memberId);
  if (!member) return next(new ErrorResponse("Thành viên không tìm thấy", 404, "MEMBER_NOT_FOUND"));
  if (String(member.teamId) !== teamId) {
    return next(new ErrorResponse("Thành viên không thuộc team này", 404, "MEMBER_NOT_FOUND"));
  }

  // Check permission (user is owner/admin or is self)
  const userMembership = await TeamMember.findOne({ teamId, userId });
  if (
    String(member._id) !== memberId &&
    (!userMembership || (userMembership.role !== "owner" && userMembership.role !== "admin"))
  ) {
    return next(new ErrorResponse("Bạn không có quyền xóa member", 403, "NOT_AUTHORIZED"));
  }

  // Cannot remove owner
  if (member.role === "owner") {
    return next(new ErrorResponse("Không thể xóa owner khỏi team", 400, "CANNOT_REMOVE_OWNER"));
  }

  // Check admin count if removing admin
  if (member.role === "admin") {
    const adminCount = await TeamMember.countDocuments({ teamId, role: "admin" });
    if (adminCount <= 1) {
      return next(
        new ErrorResponse(
          "Không thể xóa admin cuối cùng (team cần >= 1 admin)",
          400,
          "LAST_ADMIN"
        )
      );
    }
  }

  // Delete member
  await TeamMember.deleteOne({ _id: memberId });

  return res.status(200).json({
    success: true,
    message: "Thành viên đã bị xóa khỏi team",
    data: {
      id: member._id,
      teamId: member.teamId,
      userId: member.userId,
      removedAt: new Date(),
    },
  });
});

/**
 * B.4. Rời khỏi Team (Self-removal)
 * POST /api/teams/:teamId/leave
 */
export const leaveTeam = asyncHandler(async (req, res, next) => {
  const { teamId } = req.params;
  const userId = String(req.user?._id);

  // Check team exists
  const team = await Team.findById(teamId);
  if (!team) return next(new ErrorResponse("Team không tìm thấy", 404, "TEAM_NOT_FOUND"));

  // Check user is member
  const member = await TeamMember.findOne({ teamId, userId });
  if (!member) {
    return next(new ErrorResponse("Bạn không phải là member của team", 403, "NOT_MEMBER"));
  }

  // Cannot leave as owner
  if (member.role === "owner") {
    return next(new ErrorResponse("Owner không thể rời team", 400, "CANNOT_LEAVE_AS_OWNER"));
  }

  // Check admin count if is admin
  if (member.role === "admin") {
    const adminCount = await TeamMember.countDocuments({ teamId, role: "admin" });
    if (adminCount <= 1) {
      return next(
        new ErrorResponse(
          "Bạn là admin cuối cùng, không thể rời team",
          400,
          "LAST_ADMIN"
        )
      );
    }
  }

  // Delete membership
  await TeamMember.deleteOne({ _id: member._id });

  return res.status(200).json({
    success: true,
    message: "Bạn đã rời khỏi team",
    data: {
      teamId,
      leftAt: new Date(),
    },
  });
});

/**
 * B.2+ Add Member directly
 * POST /api/teams/:teamId/members
 */
export const addMember = asyncHandler(async (req, res, next) => {
  const { teamId } = req.params;
  const { userId, role = "member" } = req.body;
  const currentUserId = String(req.user?._id);

  // Check team exists
  const team = await Team.findById(teamId);
  if (!team) return next(new ErrorResponse("Team không tìm thấy", 404, "TEAM_NOT_FOUND"));

  // Check current user is owner/admin
  const userMembership = await TeamMember.findOne({ teamId, userId: currentUserId });
  if (!userMembership || (userMembership.role !== "owner" && userMembership.role !== "admin")) {
    return next(new ErrorResponse("Bạn không có quyền thêm thành viên", 403, "NOT_AUTHORIZED"));
  }

  // Check target user exists
  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return next(new ErrorResponse("User không tìm thấy", 404, "USER_NOT_FOUND"));
  }

  // Check not already member
  const existingMember = await TeamMember.findOne({ teamId, userId });
  if (existingMember) {
    return next(new ErrorResponse("User đã là member của team", 400, "USER_ALREADY_MEMBER"));
  }

  // Create member
  const member = await TeamMember.create({ teamId, userId, role, joinedAt: new Date() });

  return res.status(201).json({
    success: true,
    data: {
      id: member._id,
      teamId: member.teamId,
      userId: member.userId,
      role: member.role,
      joinedAt: member.joinedAt,
    },
  });
});

/**
 * B.1+ Get Members with pagination
 * GET /api/teams/:teamId/members
 */
export const getTeamMembersWithPagination = asyncHandler(async (req, res, next) => {
  const { teamId } = req.params;
  const { role, search, page = 1, limit = 20 } = req.query;
  const userId = String(req.user?._id);

  // Check team exists
  const team = await Team.findById(teamId);
  if (!team) return next(new ErrorResponse("Team không tìm thấy", 404, "TEAM_NOT_FOUND"));

  // Check user is member
  const userMembership = await TeamMember.findOne({ teamId, userId });
  if (!userMembership) {
    return next(new ErrorResponse("Bạn không phải là member của team", 403, "NOT_AUTHORIZED"));
  }

  // Build query
  const query = { teamId };
  if (role) query.role = role;

  // Pagination
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(parseInt(limit, 10) || 20, 100);
  const skip = (pageNum - 1) * limitNum;

  // Fetch members
  let membersQuery = TeamMember.find(query)
    .populate("userId", "username email displayName avatarUrl status")
    .sort({ role: -1, joinedAt: 1 })
    .skip(skip)
    .limit(limitNum);

  let members = await membersQuery;

  // Filter by search if provided
  if (search) {
    const searchLower = search.toLowerCase();
    members = members.filter((m) => {
      const user = m.userId;
      return (
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.displayName.toLowerCase().includes(searchLower)
      );
    });
  }

  // Count total
  const total = await TeamMember.countDocuments(query);

  return res.status(200).json({
    success: true,
    data: {
      members,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
  });
});
