import { SidebarHeader } from '@/components/ui/sidebar'
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { SkeletonAvatar } from '@/components/LoadingPage';
import { useUserProfile } from '@/hooks/user.hooks';
import { toast } from 'sonner';
import type { User } from '@/types/user';
const HeaderSiderbar = () => {
    const { isLoading, error, data } = useUserProfile();
    if (error) {
        toast(error.message)
    }
    const user : User = data.data
    console.log(user);

    return (
        <SidebarHeader className='mt-2'>
            {isLoading ? <SkeletonAvatar /> : (
                <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={`${user?.avatarUrl}`} alt="@shadcn" />
                    <AvatarFallback>Avt</AvatarFallback>
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
                <div className="flex flex-col">
                    <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">{user?.displayName}
                    </h1>
                    <p className="text-slate-500 dark:text-[#9dabb9] text-xs font-medium">{user?.username}</p>
                </div>
            </div>
            )}
        </SidebarHeader>
    )
}

export default HeaderSiderbar
