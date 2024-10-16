import React from 'react';
import { SocialLoginButton } from '@/components/Login/LoginModal/SocialLoginButton/SocialLoginButton';
import note from '@/assets/webps/Login/note.webp';
import logoBlack from '@/assets/webps/Login/logoBlack.webp';
import google from '@/assets/webps/Login/google.webp';
import kakao from '@/assets/webps/Login/kakao.webp';
import naver from '@/assets/webps/Login/naver.webp';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  // 모달 배경을 클릭하면 닫힘
  const handleBackgroundClick = () => {
    onClose();
  };

  // 모달 내부를 클릭하면 이벤트가 전파되지 않도록 함
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 소셜 로그인 처리
  const handleSocialLogin = (provider: string) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-mainBlack bg-opacity-60"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white w-[522px] h-[502px] rounded-[20px] relative flex flex-col items-center"
        onClick={handleModalClick}
      >
        <img src={note} alt="note" className="w-[108.6px] absolute top-[-78px] left-[210px]" />
        <img src={logoBlack} alt="logo" className="w-[240px] h-[45.52px] mt-[72px]" />
        <p className="font-pretendard font-[350] text-[14px] text-[#444444] leading-[24px] flex flex-col items-center mt-[24.5px]">
          <span>나를 위한 AI 회의록 서비스,</span>
          <span>스크립트부터 요약까지 한 번에 !</span>
        </p>

        <div className="mt-9 font-pretendard">
          <SocialLoginButton
            imgSrc={google}
            altText="google login"
            text="구글로 시작하기"
            marginLeft="93px"
            onClick={() => handleSocialLogin('google')}
          />
          <SocialLoginButton
            imgSrc={kakao}
            altText="kakao login"
            text="카카오로 시작하기"
            marginLeft="86px"
            onClick={() => handleSocialLogin('kakao')}
          />
          <SocialLoginButton
            imgSrc={naver}
            altText="naver login"
            text="네이버로 시작하기"
            marginLeft="86px"
            onClick={() => handleSocialLogin('naver')}
          />
        </div>
      </div>
    </div>
  );
};
