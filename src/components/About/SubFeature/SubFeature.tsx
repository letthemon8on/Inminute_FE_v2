import { useEffect, useState } from 'react';
import AOS from 'aos';
import zoom from '@/assets/webps/About/zoom.webp';
import webex from '@/assets/webps/About/webex.webp';
import googleMeet from '@/assets/webps/About/googleMeet.webp';
import microsoftTeams from '@/assets/webps/About/microsoftTeams.webp';
import calendar from '@/assets/webps/About/calendar.webp';
import link from '@/assets/svgs/About/link.svg';
import plane from '@/assets/webps/About/plane.webp';
import folder from '@/assets/webps/About/folder.webp';
import helix from '@/assets/webps/About/helix.webp';
import spheres from '@/assets/webps/About/spheres.webp';
import 'aos/dist/aos.css';

const platforms = [
  {
    logo: zoom,
    name: 'ZOOM',
    color: 'text-[#0B5CFF]',
    className: 'w-[285px] h-[74px] mt-[110px] mx-auto mb-[98px]',
  },
  {
    logo: webex,
    name: 'WEBEX',
    color: 'text-[#22CDE4]',
    className: 'w-[364px] h-[138px] mt-[77px] ml-1 mb-[67px]',
  },
  {
    logo: googleMeet,
    name: 'MEET',
    color: 'text-[#4CBA6E]',
    className: 'w-[360px] h-[70px] mt-[114px] mx-auto mb-[98px]',
  },
  {
    logo: microsoftTeams,
    name: 'TEAMS',
    color: 'text-[#6B73DE]',
    className: 'w-[366px] h-[89px] mt-[104px] ml-[10px] mb-[89px]',
  },
];

export const SubFeature = () => {
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [textFadeClass, setTextFadeClass] = useState('text-fade-in');
  const changePlatform = () => {
    setFadeClass('fade-out'); // 페이드 아웃 시작
    setTextFadeClass('text-fade-out'); // 텍스트 페이드 아웃 시작

    setTimeout(() => {
      setCurrentPlatformIndex((prevIndex) => (prevIndex + 1) % platforms.length);
      setFadeClass('fade-in'); // 페이드 인 시작
      setTextFadeClass('text-fade-in'); // 텍스트 페이드 인 시작
    }, 300); // 페이드 아웃 시간이 지난 후에 실행
  };

  // 플랫폼 변경
  useEffect(() => {
    const interval = setInterval(changePlatform, 3000); // 3초마다 변경
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  return (
    <article className="bg-bg leading-[170%] relative">
      <div className="flex justify-center mt-[262px] text-mainBlack text-[52px] font-[800] leading-[170%]">
        <div className="flex flex-col w-[1292px]">
          <p>인미닛에서는,</p>
          <p>이런 것도 할 수 있어요!</p>
        </div>
      </div>
      <img
        src={helix}
        alt="helix"
        className="w-[424px] h-[424px] top-[167px] right-[74px] absolute z-0"
      />
      <img
        src={spheres}
        alt="spheres"
        className="w-[380px] h-[380px] top-[1769px] left-[19px] absolute z-0"
      />
      <section className="flex justify-center mt-[72px] mb-[384px]">
        <div className="flex flex-col gap-9">
          <div className="flex gap-9">
            <div
              data-aos="fade-up"
              className="flex col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature z-10"
            >
              <div className="ml-[42px] mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">Q&A</p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>회의록에 대해 궁금한 점이 있다면</p>
                  <p>질문해보세요.</p>
                </div>
              </div>
              <div className="ml-[69px] mr-12 mt-12 mb-11 w-[465px] h-[348px] relative font-pretendard text-[24px] font-[500] leading-[170%]">
                <div className="absolute right-0 w-[167px] h-[72px] bg-[#E1FF4D] rounded-t-[30px] rounded-bl-[30px] pt-4 pl-6">
                  <span>OO에 대해서</span>
                </div>
                <div className="absolute top-[88px] right-0 w-[294px] h-[72px] bg-[#E1FF4D] rounded-t-[30px] rounded-bl-[30px] pt-4 pl-6">
                  <span>어떤 이야기들을 나눴었지?</span>
                </div>
                <div className="absolute top-[188px] left-0 w-[309px] h-[72px] bg-[#9DFF4D] rounded-b-[30px] rounded-tr-[30px] pt-4 pl-6">
                  <span>OO에 대해서 알려드릴게요!</span>
                </div>
                <div className="absolute bottom-0 left-0 w-[90px] h-[72px] bg-[#9DFF4D] rounded-b-[30px] rounded-tr-[30px] pt-[33px] pl-[30px]">
                  <div className="flex gap-[6px]">
                    <div className="rounded-full w-[6px] h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full w-[6px] h-[6px] bg-[#2B2B2B]" />
                    <div className="rounded-full w-[6px] h-[6px] bg-[#2B2B2B]" />
                  </div>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature z-10"
            >
              <div className={`transition-opacity duration-300 ${fadeClass}`}>
                <img
                  src={platforms[currentPlatformIndex].logo}
                  alt={`${platforms[currentPlatformIndex].name} logo`}
                  className={`${platforms[currentPlatformIndex].className}`}
                />
              </div>
              <div className="ml-[42px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">
                  with{' '}
                  <span className={`${platforms[currentPlatformIndex].color} ${textFadeClass}`}>
                    {platforms[currentPlatformIndex].name}
                  </span>
                </p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>회의 서비스와 함께 더욱 편하게</p>
                  <p>비대면 회의를 진행하세요.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-9">
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature z-10"
            >
              <img src={calendar} alt="calendar" className="w-[238px] mt-[28px] mx-auto" />
              <div className="ml-[42px] mt-[27.7px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">캘린더</p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>정기적인 회의 일정을 등록하고</p>
                  <p>편리하게 관리하세요.</p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature relative z-10"
            >
              <div className="ml-[42px] mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">회의록 공유</p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>링크를 공유해서 사용자를 초대하고 회의를 진행하세요!</p>
                  <p>하나의 회의록을 함께 공유할 수 있어요.</p>
                </div>
              </div>
              <div className="bg-[#ECECEC] w-[444px] h-[162px] rounded-tl-[20px] rounded-br-[20px] absolute bottom-0 right-0">
                <img
                  src={plane}
                  alt="plane"
                  className="w-[88px] h-[86px] absolute top-[-104px] left-[-83px]"
                />
                <div className="w-[175px] h-[60px] px-6 py-3 gap-3 flex items-center bg-mainBlack rounded-[6px] mt-[32px] ml-9">
                  <img src={link} alt="link" className="w-[30px] h-[30px]" />
                  <span className="text-white text-[21px] font-[500] leading-[36px]">
                    링크 복사
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-9">
            <div
              data-aos="fade-up"
              data-aos-delay="800"
              className="col-span-2 w-[856px] h-[440px] bg-white rounded-[20px] shadow-subFeature relative z-10"
            >
              <div className="ml-[42px] mt-[38px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">
                  회의록 수정 기능
                </p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>스크립트부터 한 줄 요약, TO DO</p>
                  <p>까지 원하는대로 수정 가능해요!</p>
                </div>
              </div>
              <div>
                <div className="w-[346px] h-[70px] bg-[#FFF2B5] rounded-[40px] py-4 flex absolute top-[58px] right-[42px]">
                  <span className="mx-auto text-[#AB942C] font-pretendard text-[19px] font-[600] leading-[200%]">
                    다음 회의까지 해야 할 일이 변경되었어!
                  </span>
                </div>
                <div className="absolute top-[126px] right-[82px] w-0 h-0 border border-t-[14px] border-t-[#FFF2B5] border-r-[16px] border-r-[#FFF2B5] border-l-[16px] border-l-transparent border-b-[14px] border-b-transparent" />
              </div>
              <div className="absolute top-[194px] right-[171px]">
                <ul className="list-inside list-disc text-[#666666] font-pretendard font-[700] text-[33px] leading-[200%]">
                  <li>
                    <span className="ml-[-16px]">회의 장소 예약</span>
                  </li>
                  <li>
                    <span className="ml-[-16px]">카드뉴스 제작</span>
                  </li>
                  <li>
                    <span className="ml-[-16px]">레퍼런</span>
                  </li>
                </ul>
              </div>
              <div className="absolute top-[225px] right-[165px] w-[197px] h-[3px] bg-[#666666] rounded-lg" />
              <div className="absolute top-[343px] right-[266px] w-[3px] h-[32px] bg-[#666666] rounded-lg" />
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="1000"
              className="w-[400px] h-[440px] bg-white rounded-[20px] shadow-subFeature z-10"
            >
              <img src={folder} alt="folder" className="w-[221px] h-[202px] mt-[44px] mx-auto" />
              <div className="ml-[42px] mt-[36px]">
                <p className="text-mainBlack font-[800] leading-[170%] text-[32px]">폴더로 정리</p>
                <div className="text-gray05 text-[16px] font-[400] leading-[170%] mt-3">
                  <p>수많은 회의록을</p>
                  <p>폴더로 보기 좋게 정리해요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
