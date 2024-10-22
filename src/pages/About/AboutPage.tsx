import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { NavBar } from '@/components/NavBar/NavBar';
import aboutTitle from '@/assets/lotties/aboutTitle.json';

export const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // about 페이지 로드 시 애니메이션 트리거
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section
        className={`bg-sub2Black font-nanum flex flex-col w-screen h-screen transition-opacity duration-500 ease-in-out overflow-y-auto scrollbar-hide ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <NavBar />
        <section>
          <div className="s10:mx-[117px] mt-[240px] s10:w-[967px]">
            <Lottie animationData={aboutTitle} />
          </div>
        </section>
      </section>
    </>
  );
};
