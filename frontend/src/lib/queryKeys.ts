export const QUERY_KEYS = {
    TASKS: {
        all: ["TASKS"],
        list: (params: unknown) => ["TASKS", "LIST", params],
        detail: (id: string | number | null) => ["TASKS", "DETAIL", id],
    },

    GROUPS: {
        all: ["GROUPS"],
        list: (params: unknown) => ["GROUPS", "LIST", params],
        detail: (id: string | number | null) => ["GROUPS", "DETAIL", id],
    },

    TEAMS: {
        all: ["TEAMS"],
        list: (params: unknown) => ["TEAMS", "LIST", params],
        detail: (id: string | number | null) => ["TEAMS", "DETAIL", id],
        members: (id: string | number | null) => ["TEAMS", "MEMBERS", id],
    },

    USER: {
        userMe: ["USER_ME"] as const,
        uerFrofile: ["USERS_PROFILE"] as const
    }
};
