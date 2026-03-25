'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Project } from '@/types/project';

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className='flex flex-col'>
      {projects.map((project, i) => {
        if (project.title === 'Coming Soon') return null;
        const isOpen = activeIndex === i;

        return (
          <div
            key={project.title}
            role='button'
            tabIndex={0}
            aria-expanded={isOpen}
            aria-label={`Project card ${project.title} - click to view details`}
            className='border-b border-white/[0.06]'
            onClick={() => setActiveIndex(isOpen ? null : i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveIndex(isOpen ? null : i);
              }
            }}
          >
            {/* Image */}
            <div className='relative w-full h-[200px]'>
              {project.image ? (
                <Image src={project.image} alt={project.title} fill className='object-cover' />
              ) : (
                <div className='w-full h-full bg-dark' />
              )}
            </div>

            {/* title */}
            <div className='bg-[#0e0e0e] px-5 py-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <span className='font-mono text-[9px] text-accent tracking-[.18em]'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className='font-playfair text-xl font-bold text-white uppercase leading-none'>
                  {project.title}
                </h3>
              </div>
              <div className='flex items-center gap-3'>
                {project.new && (
                  <span className='font-mono text-[9px] text-accent tracking-[.28em] uppercase'>
                    New
                  </span>
                )}
                <span
                  className='font-mono text-[10px] text-white/70 transition-transform duration-300'
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </div>
            </div>

            {/* Content */}
            <div
              className={`bg-[#0e0e0e] overflow-hidden transition-all duration-500 ${
                isOpen ? 'max-h-[400px] pb-5' : 'max-h-0'
              }`}
            >
              <div className='px-5'>
                <div className='w-full h-px bg-white/10 mb-4' />
                <p className='font-mono text-[11px] text-white/70 leading-relaxed tracking-wide mb-4'>
                  {project.description}
                </p>
                {project.tags?.length > 0 && (
                  <div className='flex flex-wrap gap-1.5 mb-4'>
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className='font-mono text-[9px] text-white/60 border border-accent/70 px-2 py-0.5 tracking-[.14em] uppercase'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className='flex gap-5'>
                  {project.github && (
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => e.stopPropagation()}
                      className='group font-mono text-[10px] text-white/60 tracking-[.18em] uppercase hover:text-accent transition-colors duration-200 flex items-center gap-2'
                    >
                      GitHub
                      <span className='relative inline-block h-px bg-current transition-[width] duration-200 w-4 group-hover:w-6 after:absolute after:right-0 after:-top-[3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45' />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => e.stopPropagation()}
                      className='group font-mono text-[10px] text-white/60 tracking-[.18em] uppercase hover:text-accent transition-colors duration-200 flex items-center gap-2'
                    >
                      Live demo
                      <span className='relative inline-block h-px bg-current transition-[width] duration-200 w-4 group-hover:w-6 after:absolute after:right-0 after:-top-[3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45' />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
