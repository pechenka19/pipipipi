import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter1Genesis() {
  const sectionRef = useRef<HTMLElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Letter-by-letter reveal
      const letters = lettersRef.current.filter(Boolean);
      
      gsap.set(letters, { opacity: 0, y: 60, rotateX: -40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: '+=80%',
          scrub: 1.5,
        },
      });

      tl.to(letters, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });

      // Quote fade in
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      // Background parallax
      gsap.fromTo(
        '.ch1-bg',
        { y: 0 },
        {
          y: -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const word = 'СВЕТ';

  return (
    <section
      id="chapter-1"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="ch1-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80&auto=format&fit=crop')`,        }}
      />
      {/* Dark overlay */}
      <div className="ch1-bg absolute inset-0 bg-gradient-to-b from-[var(--color-void)]/70 via-[var(--color-void)]/50 to-[var(--color-void)]" />
      
      {/* Sun glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-brass)]/5 blur-[120px]" />

      {/* Chapter number */}
      <div className="absolute top-12 right-12 font-display text-[var(--color-steel)]/30 text-sm tracking-[0.3em]">
        I
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Chapter title */}
        <div className="mb-4">
          <span className="font-body text-[var(--color-steel)] text-[var(--text-caption)] uppercase tracking-[0.4em]">
            Глава первая
          </span>
        </div>

        {/* Letter reveal - СВЕТ */}
        <h1
          className="font-display font-light text-[var(--text-chapter)] text-[var(--color-fog)] brass-glow mb-8"
          aria-label="СВЕТ"
        >
          {word.split('').map((letter, i) => (
            <span
              key={i}
              ref={(el) => { if (el) lettersRef.current[i] = el; }}
              className="letter inline-block"
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Quote */}
        <p
          ref={quoteRef}
          className="font-quote italic text-[var(--text-h2)] text-[var(--color-fog)]/80 max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ opacity: 0 }}
        >
          «Свет — это то, что мы видим. Тень — это то, что мы чувствуем.»
        </p>

        {/* Subtitle */}
        <div ref={subtitleRef} style={{ opacity: 0 }}>
          <p className="font-body text-[var(--color-steel)] text-[var(--text-body)] max-w-xl mx-auto">
            Свет. Тень. Контроль.
          </p>
          <div className="mt-8 w-px h-16 bg-gradient-to-b from-[var(--color-brass)] to-transparent mx-auto" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-void-reverse" />
    </section>
  );
}
