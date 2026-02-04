import { http } from "@/lib/http";

export const teamService = {
  // Teams CRUD
  getTeams: async (params?: { mine?: boolean }) => {
    const res = await http.get(`/team`, { params });
    return res.data?.data;
  },
  getTeamById: async (id: string) => {
    const res = await http.get(`/team/${id}`);
    return res.data?.data;
  },
  createTeam: async (body: { name: string; visibility?: string }) => {
    const res = await http.post(`/team`, body);
    return res.data?.data;
  },

  // Member Management
  getTeamMembers: async (teamId: string, params?: { page?: number; limit?: number; role?: string; search?: string }) => {
    const res = await http.get(`/team/${teamId}/members`, { params });
    return res.data?.data;
  },
  addMember: async (teamId: string, userId: string, role: string = "member") => {
    const res = await http.post(`/team/${teamId}/members`, { userId, role });
    return res.data?.data;
  },
  updateMemberRole: async (teamId: string, memberId: string, role: string) => {
    const res = await http.patch(`/team/${teamId}/members/${memberId}`, { role });
    return res.data?.data;
  },
  removeMember: async (teamId: string, memberId: string) => {
    const res = await http.delete(`/team/${teamId}/members/${memberId}`);
    return res.data?.data;
  },
  leaveTeam: async (teamId: string) => {
    const res = await http.post(`/team/${teamId}/leave`);
    return res.data?.data;
  },

  // Invites
  createInvite: async (teamId: string, email: string, role: string = "member", expiresInDays: number = 7) => {
    const res = await http.post(`/invite/${teamId}/create`, { email, role, expiresInDays });
    return res.data?.data;
  },
  getInviteInfo: async (inviteId: string) => {
    const res = await http.get(`/invite/${inviteId}`);
    return res.data?.data;
  },
  acceptInvite: async (inviteId: string, token: string, teamId: string) => {
    const res = await http.post(`/invite/accept`, { token, teamId });
    return res.data?.data;
  },
  revokeInvite: async (teamId: string, inviteId: string) => {
    const res = await http.delete(`/invite/${teamId}/${inviteId}`);
    return res.data?.data;
  },
  resendInvite: async (teamId: string, inviteId: string) => {
    const res = await http.post(`/invite/${teamId}/${inviteId}/resend`);
    return res.data?.data;
  },
};
