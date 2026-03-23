'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useInView';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectList from '@/components/ui/ProjectList';

export default function Projects() {
  const { theme } = useTheme();
  const { ref, inView } = useInView();
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = theme === 'dark';

  return (
    <section ref={ref} id='projects' className='py-24 px-6 md:px-12'>
      {/* Title */}
      <div
        className={`px-6 md:px-12 mb-12 flex items-end justify-between gap-8 flex-wrap transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* left side*/}
        <div>
          <p className='font-mono text-[11px] tracking-[.3em] uppercase text-accent mb-3'>
            Selected work
          </p>
          <h2
            className={`font-playfair text-4xl md:text-5xl font-bold leading-none ${
              isDark ? 'text-[#EDE8DF]' : 'text-[#1A1A1A]'
            }`}
          >
            Projects
          </h2>
        </div>

        {/* Right side */}
        <div
          className={`max-w-[280px] border-l-2 border-accent pl-4 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <p
            className={`font-mono text-[11px] leading-[1.75] tracking-[.06em] ${
              isDark ? 'text-[#EDE8DF]/70' : 'text-[#1A1A1A]/70'
            }`}
          >
            Fullstack web and mobile projects — each one a step forward in craft and
            problem-solving.
          </p>
        </div>
      </div>

      {/* Mobile */}
      <div className='md:hidden'>
        <ProjectList projects={projects} />
      </div>

      <div
        className={`hidden md:flex h-[80vh] transition-all duration-500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            isActive={activeIndex === i}
            onHover={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
