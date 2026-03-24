type Props = {
  entry: {
    year: string;
    tag: string;
    title: string;
    company: string;
    desc: string;
    skills: string[];
  };
  index: number;
  isDark: boolean;
  inView: boolean;
};

export default function TimelineItem({ entry, index, isDark, inView }: Props) {
  return (
    <div
      className={`flex gap-4 md:gap-6 transition-all duration-500 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{ transitionDelay: `${300 + index * 120}ms` }}
    >
      <div className='w-14 md:w-16 shrink-0 font-mono text-[9px] text-accent tracking-[.1em] pt-1 text-right leading-relaxed'>
        {entry.year}
      </div>

      <div className='relative flex flex-col items-center w-4 shrink-0'>
        <div
          className={`w-[7px] h-[7px] rounded-full bg-accent shrink-0 mt-1 z-10 transition-transform duration-300 ${
            inView ? 'scale-100' : 'scale-0'
          }`}
          style={{ transitionDelay: `${400 + index * 120}ms` }}
        />
        <div className='absolute top-[16px] bottom-0 w-px bg-accent/20' />
      </div>

      <div className='flex-1 pb-10'>
        <span className='inline-block font-mono text-[8px] tracking-[.16em] uppercase border px-2 py-0.5 mb-3 text-accent'>
          {entry.tag}
        </span>
        <h3
          className={`font-playfair text-lg font-bold mb-1 leading-tight ${
            isDark ? 'text-light' : 'text-dark'
          }`}
        >
          {entry.title}
        </h3>
        <p
          className={`font-mono text-[9px] tracking-[.07em] mb-3 ${
            isDark ? 'text-light/35' : 'text-dark/35'
          }`}
        >
          {entry.company}
        </p>
        <p
          className={`font-mono text-[11px] leading-[1.75] tracking-[.04em] ${
            isDark ? 'text-light/70' : 'text-dark/70'
          }`}
        >
          {entry.desc}
        </p>
        <div className='flex flex-wrap gap-1.5 mt-3'>
          {entry.skills.map((s, j) => (
            <div
              key={s}
              className={`transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: `${500 + index * 120 + j * 60}ms` }}
            >
              <span
                className={`font-mono text-[8px] border px-2 py-0.5 tracking-[.08em] uppercase transition-colors duration-200 hover:text-accent hover:border-accent/50 cursor-default ${
                  isDark ? 'text-light/60 border-white/[0.07]' : 'text-dark/60 border-dark/[0.07]'
                }`}
              >
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
