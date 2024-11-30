import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginButton } from "./components/LoginButton";
import { AllocatedTimeChart } from "./components/AllocatedTimeChart";
import { DateSelector } from "./components/DateSelector";
import { RefreshButton } from "./components/RefreshButton";
import { useCalendarData } from "./hooks/useCalendarData";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { timeSpentSummary, loading, error, fetchData } =
    useCalendarData(accessToken);

  useEffect(() => {
    if (accessToken) {
      fetchData(selectedDate);
    }
  }, [accessToken, selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleRefresh = () => {
    fetchData(selectedDate);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Calendar Allocated Time Tracker 📅
            </h1>
            <p className="text-gray-600 mb-8">
              Track your time spent in meetings and tasks
            </p>

            {!accessToken ? (
              <LoginButton onSuccess={setAccessToken} />
            ) : (
              <div className="flex justify-center items-center gap-4">
                <DateSelector
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
                <RefreshButton onRefresh={handleRefresh} loading={loading} />
              </div>
            )}
          </div>

          {loading && (
            <div className="text-center text-gray-600">
              Loading calendar data...
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 mb-4">{error}</div>
          )}

          {timeSpentSummary && (
            <AllocatedTimeChart
              summary={timeSpentSummary}
              selectedDate={selectedDate}
            />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
