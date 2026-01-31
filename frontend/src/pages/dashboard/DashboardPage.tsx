import { siderberStore } from "@/stores/siderbarStore"

const Dashboard = () => {
    const { toggle } = siderberStore();
    return (
        <>
            <main className="">
                <header className="flex flex-wrap justify-between items-end gap-6 mb-10">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">Chào buổi sáng, Duy
                        </h2>
                        <p className="text-slate-500 dark:text-[#9dabb9] text-lg">Hôm nay là Thứ Ba, ngày 24 tháng 10. Bạn có
                            <span className="text-primary font-bold">4 công việc đang chờ</span>.</p>
                    </div>
                    <button onClick={() => toggle()} className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Nhiệm vụ mới</span>
                    </button>
                </header>
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-primary via-primary/50 to-transparent">
                            <div className="bg-white dark:bg-[#1c2127] rounded-[14px] overflow-hidden">
                                <div className="flex flex-col @container">
                                    <div className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBatMsfwOCunsdQ88srVYvCLVscU2IDhc4xeAKQvT082dkTfrEHpW_N6_julzuUNW6aLEURQi5DliDckPeruvSBk61ClRPIf375mEpTQCxVGDuj7NEvGtaGNG539eQWCkvAf8THE52SZ09O-vc783qkWBrLrFORk7TEX6A9sboFV5FnzpTiBG1pI3jwz7ll35AwM_pwpMPTozm3_9ggmA3p-6P5xT1FNMQEW2G74xTdEIc8-uxqfBSPCdALvkM9G2FIXtak2P0s4JVX")' }}>
                                    </div>
                                    <div className="flex flex-col p-6 gap-4">
                                        <div>
                                            <p className="text-primary text-xs font-extrabold tracking-widest uppercase mb-1">
                                                Tập trung hiện tại</p>
                                            <h3 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                                                Hoàn thành Đề xuất Dự án</h3>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-slate-600 dark:text-[#9dabb9] text-base">Ưu tiên cao • Hạn chót:
                                                14:00</p>
                                            <p className="text-slate-500 dark:text-[#9dabb9] text-sm leading-relaxed">Đây là
                                                tiêu điểm chính của bạn trong 2 giờ tới. Đảm bảo tất cả số liệu ngân sách đã
                                                được cập nhật và nhóm marketing đã xem qua bản thảo cuối cùng.</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex -space-x-2">
                                                <div className="size-8 rounded-full border-2 border-white dark:border-[#1c2127] bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaBbFXDDunQxNYMjhi-WMLU8Vt1Fi8zDZ4k-2O5gfVUdMV4olWbH7jaRr5LBeHU0qgeVLLNGKTzN4sGA5Kbyiq5KAtbnPYF_zcbF5Jt1L7pafIiVPe--yEIChMlv5p2h2B_8B33QFLzxInmP0ihDDCcUSbjuyQ8IepfZEQz8o5ghjtAcx8AhO3bLk_wQqyyNpAxH4ivTOK_qAOISH6YQxbNEuhCd9IpGNFvZI1XLsxuflcD_h_a4VuPOgpTtZVH8NcErvqKs1KW5F8")' }}>
                                                </div>
                                                <div className="size-8 rounded-full border-2 border-white dark:border-[#1c2127] bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASFfQEKVKzYNxCz4gElJh-IICIsBRc9utPjmiwk0Drp7oIdtGaya9GUfb50uLBpdG4XBKt1f3z7mjtPkSuVntRjBjtKdsevcLBXBdJxr7oqa8nbbI81g9ks4HwlpT-TI0EciEZsGUzZDFPwsXe7X3QNmdZp_yJYSKgcYlnLmoC8bK_lZF1vm-ao_hSSV00G9m_sBdEofYqaMvRbQfE5bNdBA6eIS7EJaM8zyXg-fhKZ5udGjxYvLSi7x6NUMmWIGQvxrrTKZPGXNgc")' }}>
                                                </div>
                                                <div className="size-8 rounded-full border-2 border-white dark:border-[#1c2127] bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                                                    +2</div>
                                            </div>
                                            <button className="px-8 h-10 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors">Bắt
                                                đầu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-slate-900 dark:text-white text-lg font-bold">Sắp tới trong hôm nay</h4>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-background-dark/30 border border-slate-200 dark:border-[#3b4754] hover:border-primary/50 transition-colors cursor-pointer group">
                                    <div className="size-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary transition-colors">
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold dark:text-white">Email cho nhóm thiết kế</p>
                                        <p className="text-xs text-slate-500">Lên lịch lúc 15:30</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-sm">more_vert</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-background-dark/30 border border-slate-200 dark:border-[#3b4754] hover:border-primary/50 transition-colors cursor-pointer group">
                                    <div className="size-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-primary transition-colors">
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold dark:text-white">Cập nhật Jira Tickets</p>
                                        <p className="text-xs text-slate-500">Lên lịch lúc 16:45</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-sm">more_vert</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="p-6 rounded-2xl bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-[#3b4754]">
                            <div className="flex flex-col gap-1 mb-8">
                                <p className="text-slate-500 dark:text-[#9dabb9] text-sm font-medium">Tiến độ tuần này</p>
                                <p className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">64 nhiệm vụ</p>
                                <div className="flex gap-2 items-center">
                                    <span className="text-green-500 text-sm font-bold bg-green-500/10 px-2 py-0.5 rounded-md">+12%</span>
                                    <p className="text-slate-400 text-xs font-medium">so với 7 ngày trước</p>
                                </div>
                            </div>
                            <div className="grid grid-flow-col gap-4 items-end justify-items-center h-48 px-2">
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="bg-slate-200 dark:bg-[#283039] w-full rounded-t-md hover:bg-primary transition-colors" style={{ height: '50%' }} />
                                    <p className="text-slate-400 dark:text-[#9dabb9] text-[11px] font-bold uppercase tracking-wider">
                                        T2</p>
                                </div>
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="bg-slate-200 dark:bg-[#283039] w-full rounded-t-md hover:bg-primary transition-colors" style={{ height: '35%' }} />
                                    <p className="text-slate-400 dark:text-[#9dabb9] text-[11px] font-bold uppercase tracking-wider">
                                        T3</p>
                                </div>
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="bg-slate-200 dark:bg-[#283039] w-full rounded-t-md hover:bg-primary transition-colors" style={{ height: '60%' }} />
                                    <p className="text-slate-400 dark:text-[#9dabb9] text-[11px] font-bold uppercase tracking-wider">
                                        T4</p>
                                </div>
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="bg-primary w-full rounded-t-md" style={{ height: '85%' }} />
                                    <p className="text-primary text-[11px] font-bold uppercase tracking-wider">T5</p>
                                </div>
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="bg-slate-200 dark:bg-[#283039] w-full rounded-t-md hover:bg-primary transition-colors" style={{ height: '40%' }} />
                                    <p className="text-slate-400 dark:text-[#9dabb9] text-[11px] font-bold uppercase tracking-wider">
                                        T6</p>
                                </div>
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="bg-slate-200 dark:bg-[#283039] w-full rounded-t-md hover:bg-primary transition-colors" style={{ height: '20%' }} />
                                    <p className="text-slate-400 dark:text-[#9dabb9] text-[11px] font-bold uppercase tracking-wider">
                                        T7</p>
                                </div>
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="bg-slate-200 dark:bg-[#283039] w-full rounded-t-md hover:bg-primary transition-colors" style={{ height: '15%' }} />
                                    <p className="text-slate-400 dark:text-[#9dabb9] text-[11px] font-bold uppercase tracking-wider">
                                        CN</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-[#3b4754]">
                            <h4 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Phân bổ dự án</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-600 dark:text-slate-400 uppercase tracking-widest">Thiết kế
                                            lại Web</span>
                                        <span className="text-primary">75%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full" style={{ width: '75%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-600 dark:text-slate-400 uppercase tracking-widest">Ứng dụng
                                            di động</span>
                                        <span className="text-green-500">40%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: '40%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-600 dark:text-slate-400 uppercase tracking-widest">Tiếp
                                            thị</span>
                                        <span className="text-amber-500">20%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-amber-500 h-full" style={{ width: '20%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard
