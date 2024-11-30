import React from 'react';
import { BarChart } from 'lucide-react';
import { TimeSpentSummary } from '../types/calendar';
import { formatDuration } from '../utils/calendarUtils';

interface TimeSpentChartProps {
  summary: TimeSpentSummary;
}

export const TimeSpentChart: React.FC<TimeSpentChartProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Time Spent Today</h2>
      </div>
      <div className="text-4xl font-bold text-indigo-600 mb-4">
        {formatDuration(summary.totalMinutes)}
      </div>
      <div className="space-y-2">
        {summary.events.map((event) => (
          <div key={event.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <span className="font-medium">{event.summary}</span>
            <span className="text-gray-600">
              {formatDuration(
                differenceInMinutes(
                  parseISO(event.end.dateTime),
                  parseISO(event.start.dateTime)
                )
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};