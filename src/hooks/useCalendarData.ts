import { useState, useCallback } from "react";
import { startOfDay, endOfDay } from "date-fns";
import { fetchCalendarEvents } from "../services/googleCalendar";
import { calculateTimeSpent } from "../utils/calendarUtils";
import { TimeSpentSummary } from "../types/calendar";

export const useCalendarData = (accessToken: string | null) => {
  const [timeSpentSummary, setTimeSpentSummary] =
    useState<TimeSpentSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (date: Date) => {
      if (!accessToken) return;

      try {
        setLoading(true);
        setError(null);
        const timeMin = startOfDay(date).toISOString();
        const timeMax = endOfDay(date).toISOString();

        const events = await fetchCalendarEvents(accessToken, timeMin, timeMax);
        const summary = calculateTimeSpent(events);
        setTimeSpentSummary(summary);
      } catch (err) {
        setError("Failed to fetch calendar data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [accessToken]
  );

  return {
    timeSpentSummary,
    loading,
    error,
    fetchData,
  };
};
