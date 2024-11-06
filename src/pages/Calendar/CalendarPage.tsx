import { useState } from 'react';
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  subDays,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { NavBar } from '@/components/NavBar/NavBar';
import leftBlack from '@/assets/webps/Calendar/leftBlack.webp';
import rightBlack from '@/assets/webps/Calendar/rightBlack.webp';
import xGray from '@/assets/svgs/Calendar/xGray.svg';

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 모달에 보여줄 선택된 날짜
  const [selectedDatePosition, setSelectedDatePosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const specialDate = new Date(2024, 10, 15);

  const toggleModal = (date: Date, event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSameMonth(date, currentMonth)) return; // 이번 달이 아닌 날짜 클릭 시 함수 종료
    setSelectedDate(new Date(date));
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    setSelectedDatePosition({
      top: rect.top + window.scrollY + 40,
      left: rect.left + window.scrollX - 42,
    });
  };

  const closeModal = () => {
    setSelectedDate(null);
    setSelectedDatePosition(null);
  };

  // < yyyy.MM >
  const renderHeader = () => {
    return (
      <div className="w-[270px] flex justify-between items-center mb-9">
        <img
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="w-[22px] h-[22px] cursor-pointer"
          src={leftBlack}
          alt="prev month"
        />
        <h2 className="text-mainBlack text-[32px] font-[750] leading-[35px]">
          {format(currentMonth, 'yyyy.MM')}
        </h2>
        <img
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="w-[22px] h-[22px] cursor-pointer"
          src={rightBlack}
          alt="next month"
        />
      </div>
    );
  };

  // 요일 (일 ~ 토)
  const renderDays = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <div className="w-full flex mb-5">
        {days.map((day) => (
          <div
            key={day}
            className="w-[14.3%] text-left ml-[9px] text-mainBlack text-[17px] font-[500]"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  // 날짜
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    let rowIndex = 0;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const isLastRow = day > subDays(endDate, 7); // 마지막 주를 감지하기 위한 조건
        const dateWidth = formattedDate.length === 1 ? '11px' : '19px';

        const clickedDate = new Date(day);
        days.push(
          <div
            className={`w-[14.3%] h-[130px] border-[0.3px] border-gray03 flex flex-col bg-white
              ${rowIndex === 0 && i === 0 ? 'rounded-tl-[10px]' : ''} 
              ${rowIndex === 0 && i === 6 ? 'rounded-tr-[10px]' : ''} 
              ${isLastRow && i === 0 ? 'rounded-bl-[10px]' : ''} 
              ${isLastRow && i === 6 ? 'rounded-br-[10px]' : ''} 
              hover:bg-gray01 cursor-pointer`}
            onClick={(e) => toggleModal(clickedDate, e)}
          >
            <span
              className={`ml-4 mt-[12px] ${!isSameMonth(day, monthStart) ? 'text-transparent' : 'text-mainBlack'} 
                        ${isSameDay(day, new Date()) ? 'font-[900]' : 'font-[500]'}`}
              key={day.toString()}
              style={{
                width: `${formattedDate.length === 1 ? '11px' : '19px'}`,
              }}
            >
              {formattedDate}
            </span>
            {isSameDay(day, new Date()) && (
              <div className="h-[1.4px] bg-black ml-4 mt-[-1px]" style={{ width: dateWidth }} />
            )}

            {isSameDay(day, specialDate) && (
              <div className="flex flex-col items-start p-1">
                <p className="text-xs text-gray-500">~~</p>
                <p className="text-xs text-gray-500">~~~</p>
              </div>
            )}
          </div>
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

  return (
    <section className="flex flex-col w-full h-full overflow-y-auto scrollbar-hide">
      <NavBar />
      <div className="mt-[96px] mx-[4.2%] flex flex-col items-center font-nanum leading-[22px]">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      {/* 선택한 날짜 상세 회의 일정 모달 */}
      {selectedDate && (
        <div
          style={{
            position: 'absolute',
            top: selectedDatePosition?.top || 0,
            left: selectedDatePosition?.left || 0,
            boxShadow: '0px 0px 6px 0px rgba(96, 96, 96, 0.16)',
          }}
          className="bg-white rounded-[10px] w-[276px] pb-[26px] z-10"
        >
          <div className="flex justify-between">
            <h2 className="text-[18px] font-[500] ml-6 mt-[26px] mb-[18px]">
              {format(selectedDate, 'MM')}월 {format(selectedDate, 'dd')}일 (
              {format(selectedDate, 'E', { locale: ko })})
            </h2>
            <img
              src={xGray}
              alt="x button"
              onClick={closeModal}
              className="w-[10px] h-[10px] mt-5 mr-5 cursor-pointer"
            />
          </div>
          {/* 회의 일정 1 */}
          <div className="ml-6 mr-[22px] flex mt-[18px]">
            <span className="text-[11px] font-[700] leading-[20px] text-mainBlack mr-[11px] mt-[12px]">
              20:00
            </span>
            <div className="w-full h-8 bg-[#FCF2EB] rounded-[4px] px-[10px] py-[5px] flex justify-between items-center">
              <span className="text-[#DB7A08] text-[13px] leading-[22px] font-[500]">
                해커톤 정기회의
              </span>
              <div className="w-[2px] h-[11px] flex flex-col justify-between cursor-pointer">
                <div className="bg-[#DB7A08] w-[2px] h-[2px] rounded-[2px]" />
                <div className="bg-[#DB7A08] w-[2px] h-[2px] rounded-[2px]" />
                <div className="bg-[#DB7A08] w-[2px] h-[2px] rounded-[2px]" />
              </div>
            </div>
          </div>
          {/* 회의 일정 2 */}
          <div className="ml-6 mr-[22px] flex mt-[18px]">
            <span className="text-[11px] font-[700] leading-[20px] text-mainBlack mr-[11px] mt-[12px]">
              22:00
            </span>
            <div className="w-full h-8 bg-[#F3E9FF] rounded-[4px] px-[10px] py-[5px] flex justify-between items-center">
              <span className="text-[#BE5BFF] text-[13px] leading-[22px] font-[500]">
                운영진 회의
              </span>
              <div className="w-[2px] h-[11px] flex flex-col justify-between cursor-pointer">
                <div className="bg-[#BE5BFF] w-[2px] h-[2px] rounded-[2px]" />
                <div className="bg-[#BE5BFF] w-[2px] h-[2px] rounded-[2px]" />
                <div className="bg-[#BE5BFF] w-[2px] h-[2px] rounded-[2px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
