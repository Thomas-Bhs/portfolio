import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';

export default function Home() {
  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Thomas Bourchis',
            jobTitle: 'Fullstack Developer',
            url: 'https://portfolio-thomas-bourchis.vercel.app',
            sameAs: [
              'https://github.com/Thomas-Bhs',
              'https://www.linkedin.com/in/thomas-bourc-his-09b056b4',
            ],
          }),
        }}
      />

      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
