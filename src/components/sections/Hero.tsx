'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const fullText = 'Turning ideas into products.';
  const fullTextP1 = 'From concept to code.';
  const [displayedTextP1, setDisplayedTextP1] = useState('');
  const [isH1Done, setIsH1Done] = useState(false);
  const [isP1Done, setIsP1Done] = useState(false);

  useEffect(() => {
    const totalDelay = (fullText.split(' ').length - 1) * 150 + 600; // Total time for H1 animation
    const timer = setTimeout(() => {
      setIsH1Done(true);
    }, totalDelay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isH1Done) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullTextP1.length) {
        setDisplayedTextP1(fullTextP1.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsP1Done(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isH1Done]);

  return (
    <section className='min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 '>
      <span className='font-mono text-xs md:text-sm tracking-widest uppercase text-accent mb-4'>
        Fullstack Developer
      </span>

      <div className='w-16 md:w-24 h-px bg-accent mb-8' />

      <h1 className='font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
        {fullText.split(' ').map((word, i) => (
          <span
            key={i}
            className='inline-block animate-fadeUp mr-3'
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {word}
          </span>
        ))}
      </h1>

      <p className='font-mono text-sm md:text-base tracking-widest uppercase opacity-50 mb-12'>
        {displayedTextP1}
      </p>

      {isP1Done && (
        <a
          href='#projects'
          className='mt-4 flex flex-col items-center gap-2 font-mono text-xs tracking-widest uppercase hover:text-accent transition-all'
        >
          <span>Scroll</span>
          <span className='animate-bounce'>↓</span>
        </a>
      )}
    </section>
  );
}
