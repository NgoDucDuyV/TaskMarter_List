import {type User } from "@/types/user"
export interface AuthState {
    accessToken: string | null,
    user: User | null,
    loading: boolean,
    signUp: (username: string, email: string, lastName: string, firstName: string, dateOfBirth: string, password: string) => Promise<void>
    SignIn: (email:string, password:string) => Promise<void>
}