import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { startOfDay, endOfDay } from 'date-fns';
import { LoginButton } from './components/LoginButton';
import { TimeSpentChart } from './components/TimeSpentChart';
import { fetchCalendarEvents } from './services/googleCalendar';
import { calculateTimeSpent } from './utils/calendarUtils';
import { TimeSpentSummary } from './types/calendar';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [timeSpentSummary, setTimeSpentSummary] = useState<TimeSpentSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;

      try {
        setLoading(true);
        const timeMin = startOfDay(new Date()).toISOString();
        const timeMax = endOfDay(new Date()).toISOString();
        
        const events = await fetchCalendarEvents(accessToken, timeMin, timeMax);
        const summary = calculateTimeSpent(events);
        setTimeSpentSummary(summary);
      } catch (err) {
        setError('Failed to fetch calendar data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Calendar Time Tracker
            </h1>
            <p className="text-gray-600 mb-8">
              Track your daily time spent in meetings and tasks
            </p>
            
            {!accessToken && (
              <LoginButton onSuccess={setAccessToken} />
            )}
          </div>

          {loading && (
            <div className="text-center text-gray-600">Loading calendar data...</div>
          )}

          {error && (
            <div className="text-center text-red-600 mb-4">{error}</div>
          )}

          {timeSpentSummary && (
            <TimeSpentChart summary={timeSpentSummary} />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;