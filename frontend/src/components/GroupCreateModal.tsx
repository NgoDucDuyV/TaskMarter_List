import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useCreateGroup } from "@/hooks/group.hooks";
import { useTeams } from "@/hooks/team.hooks";
import { useState } from "react";
import { toast } from "sonner";
import TeamCreateModal from "./TeamCreateModal";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function GroupCreateModal({ open, onClose }: Props) {
    const [teamId, setTeamId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showTeamModal, setShowTeamModal] = useState(false);

    const create = useCreateGroup();
    const teamsQuery = useTeams(true);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!localStorage.getItem("accessToken")) return toast.error("Bạn cần đăng nhập để tạo nhóm");
        if (!teamId || !name) return toast.error("Vui lòng chọn team và nhập tên nhóm");

        create.mutate(
            { teamId, name, description },
            {
                onSuccess: () => {
                    setTeamId("");
                    setName("");
                    setDescription("");
                    onClose();
                },
                onError: (error) => {
                    console.error("Create group error:", error);
                    const msg = error instanceof Error ? error.message : "Tạo nhóm thất bại";
                    toast.error(msg);
                },
            },
        );
    };

    if (!open) return null;

    const teams: any[] = (teamsQuery.data as any) || [];

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Tạo nhóm mới</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Team</Label>
                            {teams.length === 0 ? (
                                <div className="flex flex-col gap-2">
                                    <div className="text-sm text-slate-500">Bạn chưa có team nào</div>
                                    <div className="flex gap-2">
                                        <Button type="button" onClick={() => setShowTeamModal(true)}>Tạo team</Button>
                                    </div>
                                </div>
                            ) : (
                                <select value={teamId} onChange={(e) => setTeamId(e.target.value)} className="w-full mt-2 rounded-md border p-2">
                                    <option value="">Chọn team</option>
                                    {teams.map((t: any) => (
                                        <option key={t._id} value={t._id}>{t.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tên nhóm</Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên nhóm" />
                        </div>

                        <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Mô tả</Label>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả (tùy chọn)" />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={onClose}>Hủy</Button>
                            <Button type="submit" disabled={create.isPending}>Tạo nhóm</Button>
                        </div>
                    </form>
                </div>
            </div>

            <TeamCreateModal open={showTeamModal} onClose={() => setShowTeamModal(false)} />
        </>
    );
}
