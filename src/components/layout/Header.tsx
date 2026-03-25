'use client';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 px-6 py-3 transition-colors duration-300 ${
        isDark ? 'bg-dark' : 'bg-cream'
      }`}
    >
      <nav className='grid grid-cols-3 items-center'>
        <div className='flex justify-start'>
          <a href='#'>
            <Image src='/hanko_T_kiku.svg' alt='Hanko Thomas' width={40} height={40} />
          </a>
        </div>

        {/* Nav links */}
        <div
          className={`flex justify-center gap-6 font-sans text-sm tracking-wide transition-colors duration-300 ${
            isDark ? 'text-light' : 'text-dark'
          }`}
        >
          {['Projects', 'About', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className='relative pb-0.5 transition-colors duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full'
            >
              {link}
            </a>
          ))}
        </div>

        {/* Toggle dark/light */}
        <div className='flex justify-end'>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Light mode' : 'Dark mode'}
            role='switch'
            aria-checked={isDark}
            className={`relative flex items-center rounded-full px-1 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              isDark ? 'bg-accent' : 'bg-dark'
            }`}
            style={{ width: '52px', height: '28px' }}
          >
            <span
              className={`absolute top-1 flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-300 ${
                isDark ? 'translate-x-6 bg-light' : 'translate-x-0.5 bg-cream'
              }`}
            >
              <svg
                width='11'
                height='11'
                viewBox='0 0 24 24'
                fill='currentColor'
                className={`transition-colors duration-300 ${isDark ? 'text-accent' : 'text-dark'}`}
              >
                {/* isDark ? <sun> : <lune>; transcription in svg */}
                {isDark ? (
                  <path d='M12 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm8-6a1 1 0 010 2h-1a1 1 0 010-2h1zm-16 0a1 1 0 010 2H3a1 1 0 010-2h1zm13.66-5.66a1 1 0 010 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 0zM7.05 16.95a1 1 0 010 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 0zM18.36 16.95a1 1 0 01-1.41 1.41l-.71-.71a1 1 0 011.41-1.41l.71.71zM7.05 7.05a1 1 0 01-1.41 0l-.71-.71A1 1 0 016.34 4.93l.71.71a1 1 0 010 1.41zM12 8a4 4 0 100 8 4 4 0 000-8z' />
                ) : (
                  <path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' />
                )}
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
