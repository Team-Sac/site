/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    colors: {
      'white' : '#FFFFFF',
      'gray-50': '#EEEEEE',
      'gray-100': '#DBDBDB',
      'gray-200': '#BEBEBE',
      'gray-300': '#ABABAB',
      'gray-400': '#8C8C8C',
      'gray-500': '#6E6E6E',
      'gray-600': '#4F4F4F',
      'gray-700': '#303030',
      'gray-800': '#1F1F1F',
      'gray-900': '#141414',
      'primary-50': '#E9DDFF',
      'primary-100': '#CFBCFF',
      'primary-500': '#381E72',
      'primary-600': '#4F378A',
      'secondary-50': '#FFE259',
      'secondary-100': '#E5C500',
      'secondary-500': '#534600',
      'secondary-600': '#393000',
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
      'heading': ['Poppins ExtraBold', 'sans-serif']
    },
  },
  safelist: [
    'grid-cols-[minmax(0,1fr),3fr,minmax(0,1fr)]',
    'grid-cols-[30px,3fr,minmax(0,1fr)]',
    'grid-cols-[minmax(0,1fr),3fr,60px]',
    'grid-cols-[minmax(0,1fr),3fr,30px]',
    'grid-cols-[30px,3fr,30px]',
    'grid-cols-[30px,3fr,60px]',
  ],
};
