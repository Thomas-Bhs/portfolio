import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        sans: ['var(--font-dm-sans)'],
        mono: ['var(--font-space-mono)'],
      },

      colors: {
        light: '#F2F0EC',
        dark: '#1A1A1A',
        accent: '#C0392A',
        cream: '#EDE8DF',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease both',
      },
    },
  },
  plugins: [],
};
export default config;
