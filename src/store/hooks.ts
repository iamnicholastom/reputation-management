import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./index";
import { useEffect, useState } from "react";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if access_token cookie exists
    return document.cookie.includes("access_token=");
  });

  useEffect(() => {
    // Update authentication status when cookies change
    const checkAuth = () => {
      setIsAuthenticated(document.cookie.includes("access_token="));
    };

    // Check authentication status periodically
    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated };
};
