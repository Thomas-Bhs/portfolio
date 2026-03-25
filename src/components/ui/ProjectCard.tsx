'use client';
import { Project } from '@/types/project';
import Image from 'next/image';

export default function ProjectCard({
  project,
  index,
  isActive,
  onHover,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onHover: () => void;
}) {
  return (
    <div
      role='button'
      tabIndex={0}
      aria-label={`Project card ${project.title} - click to view details`}
      className={`relative overflow-hidden cursor-pointer h-full border-r border-white/[0.06] transition-all duration-700 ease-in-out ${
        isActive ? 'flex-[5]' : 'flex-[1]'
      }`}
      onMouseEnter={onHover}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onHover();
        }
      }}
    >
      {/* Image bg  */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${
            isActive ? 'grayscale-0 scale-[1.04]' : 'grayscale brightness-[0.5]'
          }`}
        />
      ) : (
        <div className='w-full h-full bg-dark' />
      )}

      {/* Number */}
      <span
        className={`absolute top-4 left-4 font-mono text-[14px] tracking-[.18em] z-10 transition-colors duration-500 ${
          isActive ? 'text-accent' : 'text-accent/70'
        }`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* vertical title */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 ${
          isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span
          className='font-mono text-[9px] text-white/90 tracking-[.22em] uppercase select-none drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]'
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {project.title}
        </span>
      </div>

      {/* modal */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 bg-dark transition-all duration-500 ease-out ${
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className='w-full h-[2px] bg-accent' />

        <div className='p-6'>
          {/* Badge new */}
          {project.new && (
            <span className='block font-mono text-[9px] text-accent tracking-[.28em] uppercase mb-3'>
              New
            </span>
          )}

          {/* Title */}
          <h3 className='font-playfair text-2xl md:text-3xl font-bold text-white leading-tight mb-2'>
            {project.title}
          </h3>

          {/* Desc */}
          <p className='font-mono text-[12px] text-white/80 leading-relaxed tracking-wide mb-4 line-clamp-3'>
            {project.description}
          </p>

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className='flex flex-wrap gap-1.5 mb-4'>
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className='font-mono text-[9px] text-white/80 border border-accent/50 px-2 py-0.5 tracking-[.14em] uppercase'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className='w-full h-px bg-white/10 mb-4' />

          {/* Links */}
          <div className='flex gap-5'>
            {project.github && (
              <a
                href={project.github}
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => e.stopPropagation()}
                className='group font-mono text-[10px] text-white/70 tracking-[.18em] uppercase hover:text-accent transition-colors duration-200 flex items-center gap-2'
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
                className='group font-mono text-[10px] text-white/70 tracking-[.18em] uppercase hover:text-accent transition-colors duration-200 flex items-center gap-2'
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
}
