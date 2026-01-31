import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { siderberStore } from '@/stores/siderbarStore'


const TaskAddPage = () => {
    const { toggle } = siderberStore();
    return (
        <Dialog open>
            <DialogContent className="p-0 sm:max-w-[720px] overflow-hidden border-white/10 bg-zinc-950/70 text-white backdrop-blur-xl shadow-2xl shadow-black/60 ">
                {/* Top glow */}
                <div  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent "  />

                <DialogHeader className="relative px-7 pt-7 pb-5">
                    <div className="flex items-start justify-between gap-6">
                        <div className="space-y-2">
                            <DialogTitle className="text-2xl font-semibold tracking-tight">
                                Thêm công việc mới
                            </DialogTitle>
                            <DialogDescription className="text-zinc-300">
                                Điền thông tin bên dưới để bắt đầu theo dõi nhiệm vụ của bạn.
                            </DialogDescription>
                        </div>

                        <div onClick={() => toggle()} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300" >
                            Task • v1
                        </div>
                    </div>
                </DialogHeader>

                <Separator className="bg-white/10"/>

                {/* Body */}
                <div className="px-7 py-6 space-y-7 max-h-[72vh] overflow-y-auto">
                    {/* Title */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-200">
                                Tiêu đề công việc <span className="text-rose-400">*</span>
                            </label>
                            <span className="text-xs text-zinc-400">Bắt buộc</span>
                        </div>

                        <Input
                            placeholder="Ví dụ: Thiết kế giao diện Dashboard…"
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-primary/40"
                        />
                        <p className="text-xs text-zinc-400">
                            Hãy viết ngắn gọn, rõ ràng để dễ theo dõi.
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-200">Mô tả</label>
                        <Textarea
                            placeholder="Thêm chi tiết về công việc này…"
                            className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-primary/40"
                        />
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-200">
                                Hạn hoàn thành
                            </label>
                            <Input
                                type="date"
                                className="h-12 bg-white/5 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-primary/40"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-200">
                                Mức độ ưu tiên
                            </label>

                            <Select defaultValue="medium">
                                <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-primary/40">
                                    <SelectValue placeholder="Chọn mức độ…" />
                                </SelectTrigger>
                                <SelectContent className="border-white/10 bg-zinc-950 text-white">
                                    <SelectItem value="low">Thấp</SelectItem>
                                    <SelectItem value="medium">Trung bình</SelectItem>
                                    <SelectItem value="high">Cao</SelectItem>
                                    <SelectItem value="urgent">Khẩn cấp</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Labels */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-200">Gán nhãn</label>
                            <span className="text-xs text-zinc-400">Tối đa 8</span>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <div className="flex flex-wrap gap-2">
                                <Badge className="bg-primary/15 text-primary border border-primary/25 hover:bg-primary/15">
                                    Công việc <span className="ml-2 opacity-70">×</span>
                                </Badge>
                                <Badge className="bg-violet-500/15 text-violet-300 border border-violet-500/25 hover:bg-violet-500/15">
                                    Thiết kế <span className="ml-2 opacity-70">×</span>
                                </Badge>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="h-8 px-3 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10"
                                >
                                    + Thêm nhãn
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Footer */}
                <DialogFooter className="px-7 py-6 bg-black/20">
                    <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs text-zinc-400">
                            ⌘ Enter để tạo • Esc để đóng
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => toggle()}
                                type="button"
                                variant="outline"
                                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                            >
                                Hủy
                            </Button>
                            <Button type="button" className="font-semibold">
                                + Tạo nhiệm vụ
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default TaskAddPage
