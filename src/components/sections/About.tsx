'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useInView';
import TimelineItem from '@/components/ui/TimeLineItem';
import { stats, timeline, nowStack } from '@/data/about';

export default function About() {
  const { theme } = useTheme();
  const { ref, inView } = useInView();
  const isDark = theme === 'dark';

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    stats.forEach(({ num }, i) => {
      if (num === null) return;
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / 800, 1);
        setCounts((prev) => {
          const next = [...prev];
          next[i] = Math.floor(progress * num);
          return next;
        });
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, [inView]);

  return (
    <section
      id='about'
      ref={ref}
      className={`py-24 px-6 md:px-12 transition-colors duration-300 ${
        isDark ? 'bg-dark' : 'bg-cream'
      }`}
    >
      {/* Stats + title */}
      <div
        className={`flex items-start justify-between gap-8 flex-wrap mb-16 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <p className='font-mono text-[11px] text-accent tracking-[.3em] uppercase mb-4'>About</p>
          <h2
            className={`font-playfair text-4xl md:text-5xl font-bold leading-[1.05] mb-4 ${
              isDark ? 'text-light' : 'text-dark'
            }`}
          >
            From supply chain,
            <br />
            to source code.
          </h2>
          <p
            className={`font-playfair text-base italic ${
              isDark ? 'text-light/50' : 'text-dark/50'
            }`}
          >
            Master's in engineering, years in supply chain and ERP consulting <br />
            now building the tools I used to spec out for others.
          </p>
        </div>

        <div
          className={`flex flex-col gap-5 border-l pl-8 ${
            isDark ? 'border-white/[0.08]' : 'border-dark/[0.08]'
          }`}
        >
          {stats.map(({ suffix, symbol, label }, i) => (
            <div
              key={label}
              className={`flex flex-col gap-0.5 transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span
                className={`font-playfair text-3xl font-bold ${
                  isDark ? 'text-light' : 'text-dark'
                }`}
              >
                {symbol ?? `${counts[i]}${suffix ?? ''}`}
              </span>
              <span
                className={`font-mono text-[9px] tracking-[.14em] uppercase ${
                  isDark ? 'text-light/30' : 'text-dark/30'
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`w-full h-px mb-16 transition-all duration-700 ${
          inView ? 'opacity-100' : 'opacity-0'
        } ${isDark ? 'bg-white/[0.07]' : 'bg-dark/[0.07]'}`}
        style={{ transitionDelay: '200ms' }}
      />

      {/* Timeline */}
      <div className='flex flex-col'>
        {timeline.map((entry, i) => (
          <TimelineItem key={i} entry={entry} index={i} isDark={isDark} inView={inView} />
        ))}

        {/* Now */}
        <div
          className={`flex gap-4 md:gap-6 transition-all duration-500 ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
          style={{ transitionDelay: `${300 + timeline.length * 120}ms` }}
        >
          <div className='w-14 md:w-16 shrink-0 font-mono text-[9px] text-accent tracking-[.1em] pt-1 text-right'>
            2026
          </div>
          <div className='flex flex-col items-center w-4 shrink-0'>
            <div
              className={`w-[9px] h-[9px] rounded-full bg-accent shrink-0 mt-1 z-10 transition-transform duration-300 ${
                inView ? 'scale-100' : 'scale-0'
              }`}
              style={{
                transitionDelay: `${400 + timeline.length * 120}ms`,
                boxShadow: '0 0 0 3px rgba(192,57,58,0.2)',
              }}
            />
          </div>
          <div className='flex-1 pb-4'>
            <span className='inline-block font-mono text-[8px] tracking-[.16em] uppercase bg-accent text-white px-2 py-0.5 mb-3'>
              Now
            </span>
            <h3
              className={`font-playfair text-lg font-bold mb-2 ${
                isDark ? 'text-light' : 'text-dark'
              }`}
            >
              Open to opportunities.
            </h3>
            <p
              className={`font-mono text-[11px] leading-[1.75] tracking-[.04em] mb-4 ${
                isDark ? 'text-light/70' : 'text-dark/80'
              }`}
            >
              Fullstack developer with an engineering and ERP consulting background — I understand
              both the technical stack and the business problems it's meant to solve.
            </p>
            <div className='flex flex-wrap gap-1.5 mb-4'>
              {nowStack.map((s: string, i: number) => (
                <span
                  key={s}
                  className={`font-mono text-[8px] text-accent border border-accent/30 px-2 py-0.5 tracking-[.1em] uppercase transition-all duration-300 hover:bg-accent/10 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: `${600 + timeline.length * 120 + i * 60}ms` }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div
              className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[.12em] uppercase ${
                isDark ? 'text-light/70' : 'text-dark/70'
              }`}
            >
              <span className='w-[5px] h-[5px] rounded-full bg-[#0F6E56] shrink-0' />
              Available for freelance &amp; full-time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
