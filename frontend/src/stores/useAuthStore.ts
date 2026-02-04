import { create } from "zustand"
import { toast } from "sonner"
import { authService } from "@/services/authService"
import { type AuthState } from "@/types/store"
export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,
    setLoading: (loading: boolean): void => {
        set({ loading });
    },
    authError: null,
    isSign: false,
    setAccessToken: (accessToken: string): void => {
        set({ accessToken });
    },

    clearState: () => {
        set({ accessToken: null, user: null, loading: false });
    },

    signUp: async (username, email, lastName, firstName, dateOfBirth, password) => {
        try {
            set({ loading: true })
            // api
            toast.loading("Đang tạo tài khoản", {
                position: "top-right"
            })
            await authService.signUp(username, email, lastName, firstName, dateOfBirth, password)
            toast.success('Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập🎉', {
                position: "top-right",
                className:
                    "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-none shadow-xl",
            });
            set({ isSign: false })
        } catch (error: any) {
            set({ isSign: true })
            toast.error(`${error?.response?.data?.message || "Đăng ký thất bại!"}`, {
                position: "top-right",
            });
        } finally {
            set({ loading: false })
        }
    },

    SignIn: async (email, password) => {
        try {
            set({ isSign: false })
            console.log(
                email,
                password
            );
            set({ loading: true })
            toast.loading("Đăng điều hướng Đăng Nhập", {
                position: "top-right"
            })
            const data = await authService.SignIn(email, password);
            localStorage.setItem("accessToken", data.accessToken);
            set({ user: data.data })
            get().setAccessToken(data.accessToken);
            toast.success("chào mừng đã quay lại với MojiD",
                {
                    position: "top-right"
                }
            )
        } catch (error: any) {
            set({ isSign: true })
            toast.error(`${error?.response?.data?.message || "Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập."}`, {
                position: "top-right"
            })

        } finally {
            set({ loading: false })
        }
    },

    SignOut: async () => {
        try {
            if (confirm("bạn có chắc muốn đăng xuất không ?")) {
                get().clearState();
                await authService.SignOut();
                toast.success("Logout thành công!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi xảy ra khi logout. Hãy thử lại!");
        }
    },
    Refresh: async () => {
        try {
            set({ loading: true });
            const accessToken = await authService.Refresh();

            get().setAccessToken(accessToken);
            localStorage.setItem("accessToken", accessToken);
        } catch (error) {
            console.log("Lỗi làm mới token:", error);
        } finally {
            set({ loading: false });
        }
    },
})
)