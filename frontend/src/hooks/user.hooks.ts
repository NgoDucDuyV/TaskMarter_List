import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { userService } from "@/services/userService";


export const useUserProfile = () => {
    return useQuery({
        queryKey: QUERY_KEYS.USER.uerFrofile,
        queryFn: () => userService.GetUserProfile(),
        staleTime: 30_000,
        retry: false,
    });
}

export const useMe = () => {
    return useQuery({
        queryKey: QUERY_KEYS.USER.userMe,
        queryFn: () => userService.FetchMe(),
        staleTime: 30_000,
        retry: false,
    })
} 