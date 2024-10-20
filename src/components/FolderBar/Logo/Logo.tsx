import logo from '@/assets/webps/Layout/logo.webp';
import { userNameState } from '@/recoil/atoms/authState';
import { useRecoilValue } from 'recoil';

export const Logo = () => {
  const username = useRecoilValue(userNameState);

  return (
    <section className="flex-none">
      <img className="w-[208px] mt-[47px] ml-[36px]" src={logo} alt="logo" />
      <p className="ml-9 mt-6 font-medium text-[16px] text-white">
        <span className="font-extrabold text-main04">
          {username}<span className="font-normal"> </span>
        </span>
        님의 회의공간
      </p>
      <div className="w-[216px] h-[1px] ml-8 mt-5 bg-gray06" />
    </section>
  );
};
