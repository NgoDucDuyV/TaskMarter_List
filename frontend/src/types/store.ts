import {type User } from "@/types/user"
export interface AuthState {
    accessToken: string | null,
    user: User | null,
    clearState: () => void,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    authError?: string | null,
    isSign: boolean,
    setAccessToken: (accessToken: string) => void,
    signUp: (username: string, email: string, lastName: string, firstName: string, dateOfBirth: string, password: string) => Promise<void>,
    SignIn: (email: string, password: string) => Promise<void>,
    SignOut: () => Promise<void>,
    Refresh: () => Promise<void>
}