import { http } from "@/lib/http";
export const authService = {
    signUp: async (username: string, email: string, lastName: string, firstName: string, dateOfBirth: string, password: string) => {
        const res = await http.post("/auth/signup",
            { username, email, lastName, firstName, dateOfBirth, password },
            { withCredentials: true }
        )
        return res.data
    },

    SignIn: async (email: string, password: string) => {
        const res = await http.post("/auth/signin",
            { email, password },
            { withCredentials: true }
        );
        return res.data
    },

    SignOut: async () => {
        const res = await http.post("/auth/logout", { withCredentials: true });
        return res.data
    },


    Refresh: async () => {
        const res = await http.post("/auth/refresh", { withCredentials: true });
        return res.data.accessToken;
    },
}