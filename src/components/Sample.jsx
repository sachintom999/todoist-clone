import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const WeekCalendar = () => {
  const [date, setDate] = useState(new Date());

  // Calculate the start and end dates of the week (from Monday to Sunday)
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Monday of the current week
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6); // Sunday of the current week

  // Function to check if a date is within the current week
  const isDateInCurrentWeek = (dateToCheck) => {
    return dateToCheck >= startDate && dateToCheck <= endDate;
  };

  // Render custom content for day tiles
  const tileContent = ({ date, view }) => {
    if (view === 'month' && isDateInCurrentWeek(date)) {
      return <div className="day-tile">{date.getDate()}</div>;
    }
    return null;
  };

  return (
    <div>
      <div className="week-header">
        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
      </div>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        calendarType="US" // Set calendar type to US for Sunday as the first day of the week
      />
    </div>
  );
};

export default WeekCalendar;
