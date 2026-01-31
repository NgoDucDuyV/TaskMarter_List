import { http } from "@/lib/http";
import axios from "axios";
export const authService = {
    signUp: async (username: string, email: string, lastName: string, firstName: string, dateOfBirth: string, password: string) => {
        const res = await http.post("/auth/signup",
            { username, email, lastName, firstName, dateOfBirth, password },
            { withCredentials: true }
        )
        return res.data
    },

    SignIn: async (email: string, password: string) => {
        const res = await axios.post("http://localhost:5001/api/auth/signin",
            { email, password },
            { withCredentials: true }
        );
        return res.data
    },


    Refresh: async () => {
        const res = await http.post("/auth/refresh", {}, { withCredentials: true });
        console.log("Refresh response:", res.data);
        return res.data;
    }
}