import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useCreateTeam } from "@/hooks/team.hooks";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TeamCreateModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState("private");

  const create = useCreateTeam();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localStorage.getItem("accessToken")) return toast.error("Bạn cần đăng nhập để tạo team");
    if (!name) return toast.error("Tên team là bắt buộc");

    create.mutate(
      { name, visibility },
      {
        onSuccess: () => {
          setName("");
          setVisibility("private");
          onClose();
        },
        onError: (error) => {
          console.error("Create team error:", error);
          const msg = error instanceof Error ? error.message : "Tạo team thất bại";
          toast.error(msg);
        },
      },
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Tạo team mới</h3>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tên Team</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên team" />
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quyền riêng tư</Label>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="w-full mt-2 rounded-md border p-2">
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={create.isPending}>Tạo team</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
