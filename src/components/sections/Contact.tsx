'use client';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useInView';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Thomas-Bhs' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-bourc-his-09b056b4' },
  { label: 'Email', href: 'mailto:bourchisthomas@gmail.com' },
];

export default function Contact() {
  const { theme } = useTheme();
  const { ref, inView } = useInView();
  const isDark = theme === 'dark';

  const fadeUp = () =>
    `transition-all duration-700 ${
      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`;

  return (
    <section
      id='contact'
      ref={ref}
      className={`py-24 transition-colors duration-300 ${isDark ? 'bg-cream' : 'bg-dark'}`}
    >
      <div className='flex flex-col md:flex-row min-h-[300px]'>
        {/* Colonne gauche */}
        <div
          className={`w-full md:w-1/2 px-12 flex flex-col justify-between gap-12 md:gap-0 border-b md:border-b-0 md:border-r pb-12 md:pb-0 ${
            isDark ? 'border-dark/[0.06]' : 'border-light/[0.08]'
          } ${fadeUp()}`}
        >
          <div>
            <p className='font-mono text-[11px] tracking-[.3em] uppercase text-accent mb-4'>
              Contact
            </p>
            <h2
              className={`font-playfair text-4xl md:text-5xl font-bold leading-[1.05] ${
                isDark ? 'text-dark' : 'text-light'
              }`}
            >
              Have a project
              <br />
              in mind<span className='text-accent'> ?</span>
            </h2>
          </div>

          <div className='flex items-end justify-between'>
            <p
              className={`font-mono text-[11px] leading-[1.75] tracking-[.05em] max-w-xs ${
                isDark ? 'text-dark/75' : 'text-light/75'
              }`}
            >
              Available for freelance missions and full-time positions. Let&apos;s talk about what we can
              build together.
            </p>
          </div>
        </div>

        {/* right side */}
        <div
          className={`w-full md:w-1/2 px-12 flex flex-col justify-between gap-12 md:gap-0 pt-12 md:pt-0 ${fadeUp()}`}
          style={{ transitionDelay: '150ms' }}
        >
          {/* Links */}
          <div className='flex flex-col'>
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel='noopener noreferrer'
                className={`group flex items-center justify-between py-5 border-b font-mono text-[11px] tracking-[.18em] uppercase hover:text-accent transition-colors duration-200 ${
                  isDark ? 'border-dark/[0.08] text-dark/75' : 'border-white/[0.06] text-light/75'
                }`}
              >
                {label}
                <span className='relative inline-block h-px w-4 bg-current transition-[width] duration-200 group-hover:w-6 after:absolute after:right-0 after:-top-[3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45' />
              </a>
            ))}
          </div>

          {/* Boutons */}
          <div className='flex gap-3'>
            <a
              href='mailto:bourchisthomas@gmail.com'
              className='flex-1 inline-flex items-center justify-between px-6 py-4 bg-accent font-mono text-[10px] text-white tracking-[.18em] uppercase hover:opacity-90 transition-opacity duration-200'
            >
              Get in touch
              <span className='relative inline-block h-px w-4 bg-current after:absolute after:right-0 after:-top-[3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45' />
            </a>
            <a
              href='/cv.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className={`flex-1 inline-flex items-center justify-between px-6 py-4 border font-mono text-[10px] tracking-[.18em] uppercase hover:text-accent hover:border-accent transition-colors duration-200 ${
                isDark ? 'border-dark/50 text-dark/50' : 'border-light/50 text-light/50'
              }`}
            >
              Download CV
              <span className='relative inline-block h-px w-4 bg-current after:absolute after:right-0 after:-top-[3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
