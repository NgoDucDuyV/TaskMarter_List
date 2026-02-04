export interface User {
    _id: string;                 // MongoDB ObjectId → string
    username: string;
    email: string;
    displayName: string;

    avatarUrl?: string | null;
    phone?: string | null;

    dateOfBirth?: string;        // ISO string
    role: "user" | "admin";      // có thể mở rộng sau
    status: "active" | "blocked" | "inactive";

    isOnline: boolean;
    isVerified: boolean;

    lastActiveAt?: string | null;
    lastLoginAt?: string | null;

    createdAt: string;
    updatedAt: string;
}
