import React from 'react'

const TaskFooter = () => {
    return (
        <>
            <footer className="mt-8 flex items-center justify-between text-sm text-slate-500 dark:text-[#9dabb9]">
                <p>Hiển thị <span className="font-bold text-slate-900 dark:text-white">3</span> trong tổng số <span className="font-bold text-slate-900 dark:text-white">12</span> công việc</p>
                <div className="flex gap-2">
                    <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-base">chevron_left</span>
                    </button>
                    <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                    <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">2</button>
                    <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                </div>
            </footer>
        </>
    )
}

export default TaskFooter
