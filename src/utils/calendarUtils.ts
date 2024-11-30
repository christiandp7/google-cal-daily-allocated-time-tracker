import { differenceInMinutes, parseISO } from 'date-fns';
import { CalendarEvent, TimeSpentSummary } from '../types/calendar';

export const calculateTimeSpent = (events: CalendarEvent[]): TimeSpentSummary => {
  const totalMinutes = events.reduce((acc, event) => {
    const start = parseISO(event.start.dateTime);
    const end = parseISO(event.end.dateTime);
    return acc + differenceInMinutes(end, start);
  }, 0);

  return {
    totalMinutes,
    events,
  };
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};