/* eslint-disable react-hooks/set-state-in-effect */
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Loader";
export type AuthContextType = {
  accessToken: string | null;
  loading: boolean;
  Refresh: () => Promise<void>;
};

const ProtectedRoute = () => {
  const { accessToken, loading, Refresh } = useAuthStore();
  const [starting, setStarting] = useState(true);
  
  const init = async (): Promise<void> => {
    // có thể xảy ra khi refresh trang
    if (!accessToken) {
      await Refresh();
    }

    setStarting(false)
  };

  useEffect(() => {
    init();
  }, []);

  if (starting || loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (!accessToken) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  return (
    <Outlet />
  );
};

export default ProtectedRoute;
