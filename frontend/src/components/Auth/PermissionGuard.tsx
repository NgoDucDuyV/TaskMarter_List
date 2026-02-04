import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "@/hooks/user.hooks";
import Loader from "@/components/Loader";

type PermissionGuardProps = {
    roles?: Array<"user" | "admin">;
};

const PermissionGuard = ({ roles }: PermissionGuardProps) => {
    const { data, isLoading } = useMe();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Loader />
            </div>
        );
    }

    // chưa đăng nhập / token lỗi
    if (!data) {
        return <Navigate to="/signin" replace />;
    }

    // có truyền roles nhưng user không có quyền
    if (roles && !roles.includes(data.user.role)) {
        return <Navigate to="/signin" replace />; // hoặc /403
    }

    return <Outlet />;
};

export default PermissionGuard;
