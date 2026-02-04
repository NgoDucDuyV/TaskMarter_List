/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useTeams } from "@/hooks/team.hooks";
import TeamCreateModal from "@/components/TeamCreateModal";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function ProjectsPage() {
    const [open, setOpen] = useState(false);
    const teamsQuery = useTeams(true);
    const teams = teamsQuery.data || [];

    return (
        <>
            <header className="h-16 flex items-center justify-between px-8 bg-white/50 dark:bg-surface-dark/50 backdrop-blur-md border-b border-slate-200 dark:border-border-dark">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative w-full max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                            <Search />
                        </span>
                        <input className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Tìm kiếm dự án..." type="text" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-border-dark rounded-full relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark" />
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:bg-border-dark mx-2" />
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold">Lê Văn Minh</p>
                            <p className="text-[10px] text-slate-500">Quản trị viên</p>
                        </div>
                        <div className="size-10 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAwuXFc3bWA8519Kc6ELom2IrD_u4KUytUjJqSaN0oEXPAnVB4OBUKELTyyKhgWvLxzoTCIA7Rz99dk8QdL3Rb7cmNVaW_6JAc4QoK6w0KrVPdC8w_1KY5bLanJ198Wlx_gHqh0NvKkZq0MKd8UkKiYugjqQfalwc-S1IUwdJC7rS_i1V4GkNclKYy5PzlkjWaOvjRhzEj4WoCEBHri6K49PdfQuoRCQEx0xjovulk2Hs2Pdkrj6-42L7TpQVQ2JW_rNPhG9UH16pc")' }}>
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="flex flex-row sm:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Dự Án (Teams)</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Quản lý và theo dõi tiến độ các dự án hiện
                            tại.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex bg-slate-100 dark:bg-surface-dark p-1 rounded-lg border border-slate-200 dark:border-border-dark">
                            <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-border-dark shadow-sm">Tất
                                cả</button>
                            <button className="px-4 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Đang
                                thực hiện</button>
                            <button className="px-4 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Đã
                                hoàn thành</button>
                            <button className="px-4 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Lưu
                                trữ</button>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                            <span className="material-symbols-outlined text-lg">add</span>
                            <span>Tạo dự án mới</span>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 hover:shadow-xl hover:shadow-black/5 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <span className="material-symbols-outlined text-3xl">brush</span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">Redesign
                            Taskmaster UI</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">Nâng cấp giao diện hệ
                            thống quản lý công việc sang phiên bản Dark Mode hiện đại.</p>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiến
                                        độ</span>
                                    <span className="text-xs font-black text-primary">75%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-border-dark h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full rounded-full w-[75%]" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex -space-x-2">
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAwuXFc3bWA8519Kc6ELom2IrD_u4KUytUjJqSaN0oEXPAnVB4OBUKELTyyKhgWvLxzoTCIA7Rz99dk8QdL3Rb7cmNVaW_6JAc4QoK6w0KrVPdC8w_1KY5bLanJ198Wlx_gHqh0NvKkZq0MKd8UkKiYugjqQfalwc-S1IUwdJC7rS_i1V4GkNclKYy5PzlkjWaOvjRhzEj4WoCEBHri6K49PdfQuoRCQEx0xjovulk2Hs2Pdkrj6-42L7TpQVQ2JW_rNPhG9UH16pc")' }}>
                                    </div>
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWOF_bWIVz7mfi5kgbz0njiQyt3N-FlzLLl0f5RG99VGgteQXPSFLRvfuk0rL1PZ2ALGvaSa6Fj0fqy446cI7KqkWhDjntQ2Q16S6dTEMS2KIax8Iaa5_OcMAhLiPGNKh_sQeIM-SFRbH8pcF8ELbdSV3UAADz2NU5NvrFI_Ea00Z4Du1PaaKFV2OVZEo8t4C-6vFa_01WC-VdO5UJSQIu2fKyFvuhKH_oueIK7yFOfHfhcR6REjd_-nf60F5AXYtbDJ33m9Hw44I")' }}>
                                    </div>
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuABZx-4rt_7zn1I2Gyh_CrZu4jD0qzUGaUffB2xr1DNNtEs1Lclk0WFEQuaslkksXP8cXfmPn9Y4k8t0lOy0x-sLlTWfVMWGJYR3yAcVmeLXnygsmCzqxejUkS_eLBFbZIcA--KJrQpuxFmT0Wck6VkrrErTeyIgP5Tcg4le_Mo84x-arP-9NuNG9T0y92_xWHO-kmcCiwt7FXPkUXB-08r5qLygqKyXqOl_btuZZaFvLKOpxRPLT14E01LtgNCiQCakmCzpT7SroU")' }}>
                                    </div>
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-slate-200 dark:bg-border-dark flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        +4</div>
                                </div>
                                <div className="flex items-center gap-1.5 text-rose-500 font-bold text-[10px] bg-rose-500/10 px-2 py-1 rounded">
                                    <span className="material-symbols-outlined text-[14px]">event</span>
                                    25 Thg 12, 2023
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 hover:shadow-xl hover:shadow-black/5 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <span className="material-symbols-outlined text-3xl">developer_mode_tv</span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">E-commerce API
                            Integration</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">Phát triển và tích hợp
                            các API thanh toán cho dự án sàn thương mại điện tử.</p>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiến
                                        độ</span>
                                    <span className="text-xs font-black text-emerald-500">100%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-border-dark h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full w-full" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex -space-x-2">
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAct30e7fQur3xTYHJ5MPMt21DXQ-p3i9PQEdhUVPEqivC4C4FXuaCHZ_rZP7cMAUoe3lHlc8R5-K-jNS_X-3RW8GCKcvlJmB2wIiHinoKCZqsGiSZUkA24ivIItpMVF3_eVn39xda8cx32N6P7egoDXwzsz1WJldUuvwLTJGf01KWD5ZM798SrvBDsu8jMm54rapjmNy1F3XqUGfNfmVVIl58V_nE4mFbhTJwZh7IB2C_K7_MSjb28gl6AWEt1GVKek_PYcwpiOK0")' }}>
                                    </div>
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCki3WPVOvtZi6mX_C6pdG-v7ErFo9x9ZpcJu7EC9fows5pKr1PfN0yXVEC6r7HepuYLzgsa6GccLBKh0kJrI-5f2bcc9edTk_mgNSS2usz2d7Fn1CV5yjtrVwQks1pKD_CLiE8tl_xnfTu61aC1BhHKFgchTaDacD5yQHSJ6wSa3b6tMNwS5_-nKimoob_AEtjcfg-WfgaPB496WUZDFOXnR-VWdWxoZ2OgdNHRpM9nAJG5QoOYJoGxBv6U7uUYUVN6_Totl1q7sA")' }}>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] bg-emerald-500/10 px-2 py-1 rounded">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Đã hoàn thành
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 hover:shadow-xl hover:shadow-black/5 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <span className="material-symbols-outlined text-3xl">campaign</span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">Marketing Campaign
                            Q1</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">Lên kế hoạch và thực thi
                            chiến dịch Marketing cho quý đầu năm 2024.</p>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiến
                                        độ</span>
                                    <span className="text-xs font-black text-amber-500">30%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-border-dark h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-amber-500 h-full rounded-full w-[30%]" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex -space-x-2">
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvs-g4nnnLT8sVly4v2RVeYTpkT-nGKzMQ9KI2XmYxvQHpK8p_LeU77Y7uPpaPbZuT3GHf8UKL2IHhquzicH_pq1pDfFmb531emO9j68eXKGSmTmcUFHBGxg5gMbZg12FNwItc23oOpVW9_NUUhrIijVoQD8GLFfS1EV5XSqOeQoN_hZ0XzW2OBIAvz6ObNGdkDtEYz4MZCgaJdrtYenaQot6VN_rwGoLZlyMfYezbTwbcg9rV6a6rAeRvIhA3pHQY6NFAye6Utxo")' }}>
                                    </div>
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDn_6Ej7OTzKfLDYvxiWBxy3gu_kprIVVJuPvajrANitQMoQ8aQZPozE2MDaCB0Hpl2JpICJQBBXufZoR5QDsHMOzc1TaZfyQti8mkpB_-R25-zAEDVSaIefp1k4NOAe5Qf83Pby2rA1noxniPg9N3X3-7yn5Kny7JO1Ru7BiVKgJzKRof3q1IvwPDZ3FyzodEPR6IVdt2SJgBiCERUBD1CuiKlyCdopPJN6q3ShwPNwdtjU24TMxOUBNqyii5KifXx2GlbovLCnFs")' }}>
                                    </div>
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQFHHJbU9_Vh1rEbbdOCAqEh89zAsjyatCiWXA-1hikM23G70sr7NV3sNAa-f6NjDmDXh4x30AFu-vtqSJEwo6FBygidH5Ru7F-XLnLmHXFiIfAo6lgD1IqIwJCBOOn1PGzggjljvWdwD7YIKEuo7oY3MoJi0TX6OOws1bMgnIE9newrXqUNMhNT-Pbfxs-qhmWEblRRop1kxrGlPMHRN5XF6QN4baKw_YAuhhQuSG70lAN3bwz5oJLMRckLkMgnJCwlswM5dc8-I")' }}>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] bg-slate-100 dark:bg-border-dark px-2 py-1 rounded">
                                    <span className="material-symbols-outlined text-[14px]">event</span>
                                    15 Thg 03, 2024
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 hover:shadow-xl hover:shadow-black/5 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                <span className="material-symbols-outlined text-3xl">security</span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">Security Audit
                            2024</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">Kiểm tra và vá các lỗ
                            hổng bảo mật cho toàn bộ hạ tầng đám mây của công ty.</p>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiến
                                        độ</span>
                                    <span className="text-xs font-black text-purple-500">10%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-border-dark h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 h-full rounded-full w-[10%]" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex -space-x-2">
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBU5Xn4hCBR5ooq5xu4CvKBXjHBaaNOShQyT4vBNM-WQ7yYMNRC29Wgagmb5GK04oGiP6o12Btetqh3e3aIAqPfO-i0WCqYQlb8zOe94ARrgSoIxTp9WSEAMDReUvfA2cROVX-fIieFWiiSBYyVT0YLbv8G62cAIFRuhPeqsqhbtjOD2Pn7xFn3DfrZXS2c3bW5cCU1pSMNRekAJ5Dlf7BqEPg0yia_4SgWFPufafRH9krLmlzaV9jaVAdomKbgvCykGj267Sb2KQE")' }}>
                                    </div>
                                    <div className="size-8 rounded-full border-2 border-white dark:border-surface-dark bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLGLo0SGejYrXNRrq3MkDvuX_I4hDIx-K38CV-xyZ_3xzanaKxcPEHGu-OMgPbBmzEOxGW3vbBMofbEsxrnHf-CCd_pSjd2D_kenQtg48mY-rQAMtOZVEnd8nlIr65aGl7nspUBI3lyXLucVxZzCr2Djw5L71hCGKrKVlmyvgxy-JcCHR6gwtw1Ar-LvxMJ7sBYZUza-xYXxmGz8JmxD1ZhAwHD-Wp3qn1r8aM6MMtxz5RPxIV8x4D7z00igq7vsrAKnz3Ly4q6n0")' }}>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] bg-slate-100 dark:bg-border-dark px-2 py-1 rounded">
                                    <span className="material-symbols-outlined text-[14px]">event</span>
                                    10 Thg 01, 2024
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="border-2 border-dashed border-slate-200 dark:border-border-dark rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all group">
                        <div className="size-14 rounded-full bg-slate-100 dark:bg-border-dark flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </div>
                        <span className="text-sm font-bold">Thêm dự án mới</span>
                        <p className="text-[10px] mt-1 opacity-60">Tạo không gian làm việc cho nhóm của bạn</p>
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((t: any) => (
                    <Link key={t._id} to={`/projects/${t._id}`} className="block p-4 border rounded-lg hover:shadow">
                        <div className="text-lg font-semibold">{t.name}</div>
                        <div className="text-sm text-slate-500">{t.visibility}</div>
                    </Link>
                ))}
            </div>

            <TeamCreateModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
