import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter5Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Soft parallax on background
      gsap.to(bgRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: '+=40%',
              scrub: 1,
            },
          }
        );
      }

      // Closing quote
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-brass)" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      title: 'Комфорт',
      description: 'Температура в салоне стабилизируется. Кондиционер работает эффективнее. Жара остаётся за окном.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-brass)" strokeWidth="1.5">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Спокойствие',
      description: 'Дети засыпают в пути. Вещи на заднем сиденье скрыты от посторонних глаз. Вы управляете приватностью.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-brass)" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Чистота',
      description: 'Салон выгорает медленнее. Кожа и пластик сохраняют цвет. Интерьер остаётся новым годами.',
    },
  ];

  return (
    <section
      id="chapter-5"
      ref={sectionRef}
      className="relative min-h-screen section-spacing overflow-hidden"
    >
      {/* Background with soft parallax */}
      <div
        ref={bgRef}
        className="parallax-layer absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)] via-[#0d0d10] to-[var(--color-void)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-brass)]/3 blur-[150px]" />
      </div>

      {/* Chapter number */}
      <div className="absolute top-12 right-12 font-display text-[var(--color-steel)]/30 text-sm tracking-[0.3em]">
        V
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="font-body text-[var(--color-steel)] text-[var(--text-caption)] uppercase tracking-[0.4em]">
              Глава пятая
            </span>
          </div>

          <h2 className="font-display font-light text-[var(--text-h1)] text-[var(--color-fog)] mb-6">
            Тишина стала плотнее.
          </h2>
        </div>

        {/* Benefit cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="benefit-card glass rounded-xl p-8 text-center hover:border-[var(--color-brass)]/30 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[var(--color-brass)]/20 flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="font-display text-lg text-[var(--color-fog)] mb-3">{benefit.title}</h3>
              <p className="font-body text-sm text-[var(--color-steel)] leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Closing quote */}
        <div ref={quoteRef} className="text-center" style={{ opacity: 0 }}>
          <p className="font-quote italic text-[var(--text-h2)] text-[var(--color-fog)]/80 max-w-3xl mx-auto leading-relaxed">
            «Вы не думаете о шторках. Вы думаете о дороге.»
          </p>
          <div className="mt-8 w-px h-16 bg-gradient-to-b from-[var(--color-brass)] to-transparent mx-auto" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-void-reverse" />
    </section>
  );
}
