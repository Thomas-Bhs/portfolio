'use client';

import { skills } from '@/data/skills';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useInView';
import SkillCard from '@/components/ui/SkillCard';

export default function Skills() {
  const { theme } = useTheme();
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className='py-24 px-6 md:px-12'>
      <div className='border-4 border-accent bg-accent rounded-3xl p-12 text-white'>
        <div className='text-center mb-16'>
          <h2 className='font-playfair text-4xl md:text-5xl font-bold mb-4'>My Stack</h2>
          <p className='font-mono text-sm tracking-widest uppercase opacity-60'>
            Technologies I work with
          </p>
        </div>

        <div className='flex flex-col gap-4 items-center'>
          <div className='flex flex-wrap justify-center gap-4'>
            {skills.slice(0, 5).map((skill, i) => (
              <div
                key={skill.name}
                className={`transition-all duration-500 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <SkillCard skill={skill} theme={theme} />
              </div>
            ))}
          </div>

          <div className='flex flex-wrap justify-center gap-4'>
            {skills.slice(5).map((skill, i) => (
              <div
                key={skill.name}
                className={`transition-all duration-500 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(i + 5) * 100}ms` }}
              >
                <SkillCard skill={skill} theme={theme} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
