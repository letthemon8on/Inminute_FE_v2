import calendarBlack from '@/assets/webps/Note/calendarBlack.webp';
import timeBlack from '@/assets/webps/Note/timeBlack.webp';
import link from '@/assets/svgs/Note/link.svg';
import mic from '@/assets/svgs/Note/mic.svg';
import { useEffect, useState } from 'react';

export const NoteTitle = () => {
  const [isCopied, setIsCopied] = useState(false);

  // 링크 복사 함수
  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl); // ClipBoard API 사용 - 현재 페이지 URL 복사
      setIsCopied(true); // 복사 성공 상태 업데이트
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  };

  // isCopied 상태 변경 감지
  useEffect(() => {
    if (isCopied) {
      alert('링크가 복사되었습니다!');
      setTimeout(() => setIsCopied(false), 2000); // 2초 후 상태 초기화
    }
  }, [isCopied]);

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center mt-[30px]">
        <p className="text-[26px] font-bold ml-12 mr-[120px] leading-[30px]">
          브랜드 아이덴티티 전략 회의
        </p>
        <div className="flex text-white text-[10.5px] leading-[18px]">
          <div
            onClick={handleCopyLink}
            className="flex items-center w-[88px] h-[30px] mr-3 bg-mainBlack rounded-[3.2px] cursor-pointer"
          >
            <img className="w-[15px] h-[15px] ml-3 mr-[6px]" src={link} alt="link" />
            <span className="font-[500]">링크 복사</span>
          </div>
          <div className="flex justify-center items-center w-[58px] h-[30px] mr-3 bg-main06 rounded-[3.2px] cursor-pointer">
            <span className="font-[700]">ZOOM</span>
          </div>
          <div className="flex items-center w-[88px] h-[30px] mr-[27px] bg-mainBlack rounded-[3.2px] cursor-pointer">
            <img className="w-[15px] h-[15px] ml-[12.3px] mr-[6.3px]" src={mic} alt="mic" />
            <span className="font-[500]">회의 시작</span>
          </div>
        </div>
      </div>

      <div className="flex ml-[49px] mt-[13px] items-center mb-2">
        <div className="flex items-center">
          <img src={calendarBlack} alt="calendarBlack" className="w-[14px] h-[14px]" />
          <span className="h-4 ml-[6px] text-[10px] font-medium leading-4">24.05.07</span>
        </div>
        <div className="ml-5 flex items-center">
          <img src={timeBlack} alt="timeBlack" className="w-[14px] h-[14px]" />
          <span className="h-4 ml-[6px] text-[10px] font-medium leading-4">1:19:05</span>
        </div>
      </div>
    </section>
  );
};
