/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';
import scrollbar from 'tailwind-scrollbar';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      dt: '1025px',
      tab: '768px',
      ph: '329px',
      s10: '1064px',
      s13: '1390px',
    },
    extend: {
      colors: {
        bg: '#F8F8F8',
        main01: '#E2F4F1',
        main02: '#D3F5F1',
        main03: '#BAEEE7',
        main04: '#85EADC',
        main05: '#4CDBC7',
        main06: '#1BD7BE',
        main07: '#16CBB3',
        mainBlack: '#2B2B2B',
        subBlack: '#212121',
        sub2Black: '#141414',
        black01: '#4D4D4D',
        gray01: '#F2F2F2',
        gray02: '#ECECEC',
        gray03: '#D9D9D9',
        gray04: '#BBBBBB',
        gray05: '#A6A6A6',
        gray06: '#666666',
        gray07: '#4D4D4D',
      },
      fontFamily: {
        nanum: ['"NanumSquare Neo"', 'sans-serif'],
        nanumv: ['"NanumSquare Neo variable"', 'sans-serif'],
        pretendard: ['"Pretendard Variable"', 'sans-serif'],
      },
      boxShadow: {
        subFeature:
          '0px 155px 43px 0px rgba(0, 0, 0, 0.00), 0px 99px 40px 0px rgba(0, 0, 0, 0.00), 0px 56px 34px 0px rgba(0, 0, 0, 0.01), 0px 25px 25px 0px rgba(0, 0, 0, 0.02), 0px 6px 14px 0px rgba(0, 0, 0, 0.02)',
      },
      animation: {
        'dot-fade': 'dotFade 1s infinite ease-in-out',
      },
      keyframes: {
        dotFade: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [scrollbarHide, scrollbar],
};
