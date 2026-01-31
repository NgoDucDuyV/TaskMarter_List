import { create } from "zustand"
import { toast } from "sonner"
import { authService } from "@/services/authService"
import { type AuthState } from "@/types/store"
export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,
    authError: null,
    setAccessToken: (accessToken : string) => {
        set({ accessToken });
    },

    signUp: async (username, email, lastName, firstName, dateOfBirth, password) => {
        try {
            set({ loading: true })
            // api
            await authService.signUp(username, email, lastName, firstName, dateOfBirth, password)
            toast.success('Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập🎉', {
                position: "top-right",
                className:
                    "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-none shadow-xl",
            });
        } catch ( error: any) {
            console.log(error);
            toast.error(`${error?.response?.data?.message || "Đăng ký thất bại!"}`, {
                position: "top-right",
            });
        } finally {
            set({ loading: false })
        }
    },

    SignIn: async (email, password) => {
        try {
            console.log(
                email,
                password
            );
            set({ loading: true })
            const data = await authService.SignIn(email, password);
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
            set({user: data.data})
            set({accessToken :  data.accessToken})
            toast.success("chào mừng đã quay lại với MojiD", 
                {
                    position: "top-right"
                }
            )
        } catch (error : unknown) {
            console.log(error.response?.data?.message );
            toast.error(`${error.response?.data?.message || "Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập."}`, {
                position:"top-right"
            })
            
        } finally {
            set({ loading: false })
        }
    },
    
    Refresh: async () => {
        try {
            set({ loading: true });
            const data = await authService.Refresh();
            set({ accessToken: data.accessToken });
        } catch (error) {
            console.log("Lỗi làm mới token:", error);
        } finally {
            set({ loading: false });
        }
    },
})
)