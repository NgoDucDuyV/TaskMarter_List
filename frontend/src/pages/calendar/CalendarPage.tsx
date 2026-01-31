import React from 'react'

const CalendarPage = () => {
    return (
        <>
            <div>
                <header className="flex flex-wrap justify-between items-center gap-6 mb-10">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Lịch lập kế hoạch</h2>
                        <div className="flex items-center gap-4 text-slate-500 dark:text-[#9dabb9]">
                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">Tháng 10, 2023</span>
                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                            <button className="px-4 py-2 text-sm font-bold rounded-lg bg-white dark:bg-slate-700 shadow-sm text-primary">Tháng</button>
                            <button className="px-4 py-2 text-sm font-bold rounded-lg text-slate-500 dark:text-[#9dabb9]">Tuần</button>
                            <button className="px-4 py-2 text-sm font-bold rounded-lg text-slate-500 dark:text-[#9dabb9]">Ngày</button>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                            <span className="material-symbols-outlined">add</span>
                            <span>Nhiệm vụ mới</span>
                        </button>
                    </div>
                </header>
                <div className="bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-[#3b4754] rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-7 border-b border-slate-200 dark:border-[#3b4754]">
                        <div className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Thứ 2</div>
                        <div className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Thứ 3</div>
                        <div className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Thứ 4</div>
                        <div className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest text-primary">
                            Thứ 5</div>
                        <div className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Thứ 6</div>
                        <div className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Thứ 7</div>
                        <div className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Chủ nhật
                        </div>
                    </div>
                    <div className="grid grid-cols-7 auto-rows-[140px]">
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 text-slate-400 opacity-40">
                            25</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 text-slate-400 opacity-40">
                            26</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 text-slate-400 opacity-40">
                            27</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 text-slate-400 opacity-40">
                            28</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 text-slate-400 opacity-40">
                            29</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 text-slate-400 opacity-40">
                            30</div>
                        <div className="border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">1</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            2</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            3</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            4</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium flex flex-col gap-1">
                            <span>5</span>
                            <div className="bg-primary/20 border-l-4 border-primary px-2 py-1 rounded text-[10px] font-bold text-primary truncate">
                                Họp nhóm thiết kế</div>
                        </div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            6</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            7</div>
                        <div className="border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">8</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium flex flex-col gap-1">
                            <span>9</span>
                            <div className="bg-orange-500/20 border-l-4 border-orange-500 px-2 py-1 rounded text-[10px] font-bold text-orange-500 truncate">
                                Hạn chót dự án A</div>
                        </div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            10</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            11</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            12</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium flex flex-col gap-1">
                            <span>13</span>
                            <div className="bg-green-500/20 border-l-4 border-green-500 px-2 py-1 rounded text-[10px] font-bold text-green-500 truncate">
                                Review Marketing</div>
                        </div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            14</div>
                        <div className="border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">15
                        </div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            16</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            17</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            18</div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 bg-primary/5 dark:text-white font-black relative">
                            <span className="z-10 relative">19</span>
                            <div className="absolute inset-0 border-2 border-primary/30 pointer-events-none" />
                            <div className="mt-1 flex flex-col gap-1">
                                <div className="bg-primary px-2 py-1 rounded text-[10px] font-bold text-white truncate shadow-sm">
                                    Hoàn thành Đề xuất</div>
                                <div className="bg-orange-500/20 border-l-4 border-orange-500 px-2 py-1 rounded text-[10px] font-bold text-orange-500 truncate">
                                    Workshop (14:00)</div>
                            </div>
                        </div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium flex flex-col gap-1">
                            <span>20</span>
                            <div className="bg-green-500/20 border-l-4 border-green-500 px-2 py-1 rounded text-[10px] font-bold text-green-500 truncate">
                                Nghỉ lễ</div>
                        </div>
                        <div className="border-r border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">
                            21</div>
                        <div className="border-b border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">22
                        </div>
                        <div className="border-r border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">23
                        </div>
                        <div className="border-r border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">24
                        </div>
                        <div className="border-r border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">25
                        </div>
                        <div className="border-r border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">26
                        </div>
                        <div className="border-r border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">27
                        </div>
                        <div className="border-r border-slate-200 dark:border-[#3b4754] p-2 dark:text-white font-medium">28
                        </div>
                        <div className="p-2 dark:text-white font-medium">29</div>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-[#3b4754]">
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-primary" />
                            Nhiệm vụ ưu tiên
                        </h3>
                        <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                <p className="text-sm font-semibold dark:text-white">Kiểm tra ngân sách quý 4</p>
                                <p className="text-xs text-slate-500 mt-1">Dự án: Tài chính • 09:00 AM</p>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                <p className="text-sm font-semibold dark:text-white">Email đối tác cung ứng</p>
                                <p className="text-xs text-slate-500 mt-1">Dự án: Tiếp thị • 11:30 AM</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-[#3b4754]">
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-green-500" />
                            Hộp thư đến
                        </h3>
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-4xl mb-2">mark_email_read</span>
                            <p className="text-xs text-slate-500">Không có tin nhắn mới nào cần xử lý ngay.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-[#3b4754]">
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-orange-500" />
                            Sự kiện sắp tới
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-lg bg-orange-500/10 flex flex-col items-center justify-center text-orange-500">
                                    <span className="text-xs font-bold leading-none">20</span>
                                    <span className="text-[8px] uppercase font-black">T10</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold dark:text-white">Tiệc sinh nhật Alex</p>
                                    <p className="text-xs text-slate-500">Toàn thời gian</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
                                    <span className="text-xs font-bold leading-none">22</span>
                                    <span className="text-[8px] uppercase font-black">T10</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold dark:text-white">Hợp đồng thuê văn phòng</p>
                                    <p className="text-xs text-slate-500">Hết hạn sau 2 ngày</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CalendarPage
