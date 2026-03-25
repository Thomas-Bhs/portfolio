'use client';

import Image from 'next/image';
import { Skill } from '@/types/skill';

export default function SkillCard({ skill, theme }: { skill: Skill; theme: string }) {
  return (
    <div
      className='relative flex flex-row items-center justify-between px-5 py-4 w-52 h-20 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer'
      style={{ backgroundColor: skill.color }}
    >
      <span className='font-mono text-xs tracking-widest uppercase font-bold text-white z-10'>
        {skill.name}
      </span>

      <Image
        src={theme === 'light' ? skill.logo.light : skill.logo.dark}
        alt={skill.name}
        width={44}
        height={44}
        className='z-10'
      />
    </div>
  );
}
