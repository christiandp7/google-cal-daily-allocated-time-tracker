import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Calendar } from "lucide-react";

interface LoginButtonProps {
  onSuccess: (token: string) => void;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ onSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: (response) => onSuccess(response.access_token),
    scope: "https://www.googleapis.com/auth/calendar.readonly",
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center gap-2 bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
    >
      <Calendar className="w-5 h-5" />
      Sign in with Google
    </button>
  );
};
