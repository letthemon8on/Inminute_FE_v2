import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import { DateCell } from '@/components/Calendar/DateCell/DateCell';

interface CalendarGridProps {
  currentMonth: Date;
  specialDate: Date;
  onDateClick: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  specialDate,
  onDateClick,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let rowIndex = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const isFirstRow = rowIndex === 0;
      const isLastRow = day > subDays(endDate, 7);
      const isFirstCol = i === 0;
      const isLastCol = i === 6;

      days.push(
        <DateCell
          key={day.toString()}
          day={day}
          currentMonth={currentMonth}
          onClick={onDateClick}
          specialDate={specialDate}
          isFirstRow={isFirstRow}
          isLastRow={isLastRow}
          isFirstCol={isFirstCol}
          isLastCol={isLastCol}
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="flex justify-center" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
    rowIndex++;
  }

  return <div className="mb-[120px] w-full">{rows}</div>;
};
