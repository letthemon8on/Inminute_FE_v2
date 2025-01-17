import { useEffect, useState } from 'react';
import { NavBar } from '@/components/NavBar/NavBar';
import { Title } from '@/components/About/Title';
import { MainFeature } from '@/components/About/MainFeature/MainFeature';
import { SubFeature } from '@/components/About/SubFeature/SubFeature';
import { Start } from '@/components/About/Start/Start';
import { QnA } from '@/components/About/QnA/QnA';
import { Footer } from '@/components/About/Footer/Footer';

export const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // about 페이지 로드 시 애니메이션 트리거
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <main
        className={`font-nanum flex flex-col transition-opacity duration-500 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <NavBar />
        <Title />
        <MainFeature />
        <SubFeature />
        <Start />
        <QnA />
        <Footer />
      </main>
    </>
  );
};
