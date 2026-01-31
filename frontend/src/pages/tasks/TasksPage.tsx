import React from 'react'

const TasksPage = () => {
    return (
        <>
            <div>
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
                            <span className="material-symbols-outlined text-lg">filter_list</span>
                            <span>Lọc</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                            <span className="material-symbols-outlined">add</span>
                            <span>Nhiệm vụ mới</span>
                        </button>
                    </div>
                </header>
                <div className="flex gap-1 mb-8 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-fit">
                    <button className="px-6 py-2 bg-white dark:bg-card-dark text-primary dark:text-white rounded-lg shadow-sm font-bold text-sm">Tất
                        cả</button>
                    <button className="px-6 py-2 text-slate-500 dark:text-[#9dabb9] hover:text-slate-700 dark:hover:text-white font-semibold text-sm">Cần
                        làm</button>
                    <button className="px-6 py-2 text-slate-500 dark:text-[#9dabb9] hover:text-slate-700 dark:hover:text-white font-semibold text-sm">Đang
                        thực hiện</button>
                    <button className="px-6 py-2 text-slate-500 dark:text-[#9dabb9] hover:text-slate-700 dark:hover:text-white font-semibold text-sm">Đã
                        xong</button>
                </div>
                <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                                    Nhiệm vụ</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                                    Trạng thái</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                                    Ưu tiên</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                                    Hạn chót</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#9dabb9]">
                                    Người thực hiện</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="size-5 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Hoàn thiện giao diện
                                                UI/UX</p>
                                            <p className="text-xs text-slate-500 dark:text-[#9dabb9]">Dự án Website Portfolio
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                                        Đang thực hiện
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                        Cao
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold dark:text-white">25 Tháng 10</span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500">14:00 PM</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex -space-x-2">
                                        <div className="size-8 rounded-full border-2 border-white dark:border-card-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaBbFXDDunQxNYMjhi-WMLU8Vt1Fi8zDZ4k-2O5gfVUdMV4olWbH7jaRr5LBeHU0qgeVLLNGKTzN4sGA5Kbyiq5KAtbnPYF_zcbF5Jt1L7pafIiVPe--yEIChMlv5p2h2B_8B33QFLzxInmP0ihDDCcUSbjuyQ8IepfZEQz8o5ghjtAcx8AhO3bLk_wQqyyNpAxH4ivTOK_qAOISH6YQxbNEuhCd9IpGNFvZI1XLsxuflcD_h_a4VuPOgpTtZVH8NcErvqKs1KW5F8")' }}>
                                        </div>
                                        <div className="size-8 rounded-full border-2 border-white dark:border-card-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASFfQEKVKzYNxCz4gElJh-IICIsBRc9utPjmiwk0Drp7oIdtGaya9GUfb50uLBpdG4XBKt1f3z7mjtPkSuVntRjBjtKdsevcLBXBdJxr7oqa8nbbI81g9ks4HwlpT-TI0EciEZsGUzZDFPwsXe7X3QNmdZp_yJYSKgcYlnLmoC8bK_lZF1vm-ao_hSSV00G9m_sBdEofYqaMvRbQfE5bNdBA6eIS7EJaM8zyXg-fhKZ5udGjxYvLSi7x6NUMmWIGQvxrrTKZPGXNgc")' }}>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="size-5 rounded border-2 border-primary bg-primary flex items-center justify-center text-white">
                                            <span className="material-symbols-outlined text-xs font-bold">check</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 line-through">Họp
                                                khởi động dự án</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-600">Đã hoàn thành lúc 09:00
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                        Đã xong
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                        Trung bình
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">24 Tháng
                                            10</span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-600">Xong lúc 10:15</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="size-8 rounded-full border-2 border-white dark:border-card-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASIfLrKkU-FdEi3AA0iv19fzTONimvo_Oxp5iQzfUrUkzn_eaOe8qTE7noj3C4ES7v7-67EBTCyV9yEvqLfUMhTNrdQ2TYwpfWYWHOQTSw9m2DZPJF9swqvY2Gg6zVbSqlUPX_fllSsWQAD4yFRk3PuLygd8Yrdai8C91LTThRqsx-GKGz8oAgXjiE4QYwjzxJe7tNaZ26HyNagsLMn_u7GrB9Z4YfmKYADcxNB7YU_lRnWSyc92Pw3eJSVTP8S0qyUiKXb1mtCoX8")' }}>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="size-5 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Kiểm tra bảo mật API
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-[#9dabb9]">Đang chờ phê duyệt ngân
                                                sách</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                        Cần làm
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        Thấp
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold dark:text-white">27 Tháng 10</span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Toàn thời gian</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="size-8 rounded-full border-2 border-white dark:border-card-dark bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                        JD</div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
            </div>

        </>
    )
}

export default TasksPage
