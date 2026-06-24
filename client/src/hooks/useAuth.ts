import { useQuery, useMutation }from "@tanstack/react-query";
import { login, logout, me, register } from "../api/auth.api";
import { QUERY_KEYS }from "../constants/query-keys";
import { queryClient } from "../lib/query-client";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      localStorage.setItem(
        "accessToken",
        response.accessToken
      );
      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );
      navigate("/dashboard");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      localStorage.setItem(
        "accessToken",
        response.accessToken
      );
      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );
      navigate("/dashboard");
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: me,
    retry: false,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
    },
  });
}
