import React from 'react'

const DashboardFilter = () => {
    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-background-dark/50">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 dark:text-[#9dabb9] text-sm font-medium">Tổng số công việc</p>
                        <span className="material-symbols-outlined text-primary">assignment</span>
                    </div>
                    <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">12</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-background-dark/50">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 dark:text-[#9dabb9] text-sm font-medium">Đã hoàn thành</p>
                        <span className="material-symbols-outlined text-green-500">task_alt</span>
                    </div>
                    <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">8</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-background-dark/50">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 dark:text-[#9dabb9] text-sm font-medium">Đang chờ</p>
                        <span className="material-symbols-outlined text-amber-500">pending_actions</span>
                    </div>
                    <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">4</p>
                </div>
            </section>
        </>
    )
}

export default DashboardFilter
