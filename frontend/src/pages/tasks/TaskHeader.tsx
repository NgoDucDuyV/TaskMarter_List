import { useTaskForm } from '@/contexts/task-form-context';
import { Funnel, Plus } from 'lucide-react';
import React, { useState } from 'react'
import GroupCreateModal from '@/components/GroupCreateModal'

const TaskHeader = () => {
    const { togglefromadd } = useTaskForm();
    const [openGroup, setOpenGroup] = useState(false);

    return (
        <>
            <GroupCreateModal open={openGroup} onClose={() => setOpenGroup(false)} />

            <header className="flex flex-wrap justify-between items-center gap-6 mb-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Danh sách công việc
                        chi tiết</h2>
                    <div className="flex items-center gap-4 text-slate-500 dark:text-[#9dabb9] text-sm">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">folder</span> Dự án: Thiết kế Web</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> 4 Thành viên</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-card-dark text-slate-700 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-lg"><Funnel /></span>
                        <span>Lọc</span>
                    </button>
                    <button onClick={() => setOpenGroup(true)} className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 hover:scale-[1.02] transition-transform">
                        <span className="material-symbols-outlined">
                            <Plus />
                        </span>
                        <span>Nhóm mới</span>
                    </button>
                    <button onClick={() => togglefromadd()} className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                        <span className="material-symbols-outlined">
                            <Plus />
                        </span>
                        <span>Nhiệm vụ mới</span>
                    </button>
                </div>
            </header>
        </>
    )
}

export default TaskHeader
