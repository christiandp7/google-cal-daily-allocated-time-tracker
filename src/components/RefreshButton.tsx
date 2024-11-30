import React from "react";
import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  onRefresh: () => void;
  loading: boolean;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  loading,
}) => {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
      Refresh 🔁
    </button>
  );
};
