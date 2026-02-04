import { http } from "@/lib/http";
export const userService = {
    GetUserProfile: async () => {
        const res = await http.get("/user/profile", { withCredentials: true });
        return res.data;
    },
    FetchMe: async () => {
        const res = await http.get("/user/me", { withCredentials: true });
        return res.data;
    },
    GetCurrentUser: async () => {
        const res = await http.get("/user/current-user", { withCredentials: true });
        return res.data;
    },
}