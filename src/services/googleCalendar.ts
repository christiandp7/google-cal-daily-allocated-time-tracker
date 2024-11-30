import axios from "axios";
import { CalendarEvent } from "../types/calendar";

const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";

export const fetchCalendarEvents = async (
  accessToken: string,
  timeMin: string,
  timeMax: string
): Promise<CalendarEvent[]> => {
  try {
    const response = await axios.get(
      `${CALENDAR_API_BASE}/calendars/primary/events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          timeMin,
          timeMax,
          singleEvents: true,
          orderBy: "startTime",
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    throw error;
  }
};
