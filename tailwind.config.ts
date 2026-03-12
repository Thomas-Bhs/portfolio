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
        light: '#FAFAF8',
        dark: '#111111',
        accent: '#C41E3A',
      },
    },
  },
  plugins: [],
};
export default config;
