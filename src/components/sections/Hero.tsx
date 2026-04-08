'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const EnsoCanvas = dynamic(() => import('../ui/EnsoCanvas'), { ssr: false });

export default function Hero() {
  const [ensoComplete, setEnsoComplete] = useState(false);
  const fullText = 'Turning ideas into products.';
  const fullTextP1 = 'From concept to code.';
  const [displayedTextP1, setDisplayedTextP1] = useState('');
  const [isH1Done, setIsH1Done] = useState(false);
  const [isP1Done, setIsP1Done] = useState(false);

  const handleEnsoComplete = useCallback(() => setEnsoComplete(true), []);

  useEffect(() => {
    if (!ensoComplete) return;
    const timer = setTimeout(() => setIsH1Done(true), fullText.split(' ').length * 120 + 200);
    return () => clearTimeout(timer);
  }, [ensoComplete]);

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
    <section className='relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12'>
      <EnsoCanvas onComplete={handleEnsoComplete} color='#C0392A' />

      <div className='relative z-10 flex flex-col items-center'>
        <span
          className={`font-mono text-xs md:text-sm tracking-widest uppercase text-accent mb-4 transition-opacity duration-700 ${
            ensoComplete ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Fullstack Developer
        </span>

        <div
          className={`h-px bg-accent mb-8 w-20 transition-all duration-700 ${
            ensoComplete ? 'opacity-100' : 'opacity-0 w-0'
          }`}
        />

        <h1 className='font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
          {fullText.split(' ').map((word, i) => (
            <span
              key={i}
              className={`inline-block mr-3 transition-opacity duration-700 ${
                ensoComplete ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className={`font-mono text-sm md:text-base tracking-widest uppercase mb-12 transition-opacity duration-500 ${
            isH1Done ? 'opacity-50' : 'opacity-0'
          }`}
        >
          {displayedTextP1}
        </p>

        <a
          href='#skills'
          className={`mt-4 flex flex-col items-center gap-2 font-mono text-xs tracking-widest uppercase hover:text-accent transition-all duration-700 ${
            isP1Done ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span>Scroll</span>
          <span className='animate-bounce'>↓</span>
        </a>
      </div>
    </section>
  );
}
