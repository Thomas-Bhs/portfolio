'use client';

import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`px-6 py-4 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <nav className='grid grid-cols-3 items-center'>
        <div className='flex justify-start'>
          <a href='/' className='font-playfair text-xl'>
            Thomas Bourchis
          </a>
        </div>
        <div className='flex justify-center gap-6 font-sans'>
          <a href='#projects'>Projects</a>
          <a href='#about'>About</a>
          <a href='#contact'>Contact</a>
        </div>
        <div className='flex justify-end'>
          <button onClick={() => toggleTheme()}> {theme} </button>
        </div>
      </nav>
    </header>
  );
}
