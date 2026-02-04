/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useParams } from "react-router-dom";
import { useTeam, useTeamMembers } from "@/hooks/team.detail.hooks";
import { useGroups } from "@/hooks/group.hooks";

export default function TeamDetailPage() {
    const { id } = useParams();
    const teamQ = useTeam(id);
    const membersQ = useTeamMembers(id);
    const groupsQ = useGroups(String(id));

    if (teamQ.isLoading) return <div className="p-6">Loading...</div>;
    if (teamQ.isError) return <div className="p-6">Lỗi khi lấy team</div>;

    const team = teamQ.data;
    const members = membersQ.data || [];
    const groups = groupsQ.data || [];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{team.name}</h2>
            <div className="mb-6">
                <div>Slug: {team.slug}</div>
                <div>Visibility: {team.visibility}</div>
                <div>Owner: {team.ownerId}</div>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-2">Nhóm (Groups)</h3>
                {groups.length === 0 ? <div className="text-sm text-slate-500">Chưa có nhóm</div> : (
                    <ul className="list-disc pl-6">
                        {groups.map((g: any) => (
                            <li key={g._id}>{g.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h3 className="font-semibold mb-2">Thành viên</h3>
                {members.length === 0 ? <div className="text-sm text-slate-500">Chưa có thành viên</div> : (
                    <ul className="list-disc pl-6">
                        {members.map((m: any) => (
                            <li key={m._id}>{m.userId?.name || m.userId?.email} — {m.role}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
