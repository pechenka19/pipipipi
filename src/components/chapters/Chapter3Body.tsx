import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter3Body() {
  const sectionRef = useRef<HTMLElement>(null);
  const meshLayerRef = useRef<HTMLDivElement>(null);
  const frameLayerRef = useRef<HTMLDivElement>(null);
  const leatherLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax layers at different speeds
      gsap.to(meshLayerRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(frameLayerRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      gsap.to(leatherLayerRef.current, {
        y: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.5,
        },
      });

      // Stats animation
      const statCards = sectionRef.current!.querySelectorAll('.stat-card');
      gsap.fromTo(
        statCards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statCards[0],
            start: 'top 80%',
            end: '+=30%',
            scrub: 1,
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-3"
      ref={sectionRef}
      className="relative min-h-[120vh] section-spacing overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-void)]" />

      {/* Parallax decorative layers */}
      <div
        ref={meshLayerRef}
        className="parallax-layer absolute top-20 right-10 w-64 h-64 opacity-10"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <pattern id="mesh" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="var(--color-brass)" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="var(--color-brass)" strokeWidth="0.3" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="var(--color-brass)" strokeWidth="0.3" />
          </pattern>
          <rect width="200" height="200" fill="url(#mesh)" />
        </svg>
      </div>

      <div
        ref={frameLayerRef}
        className="parallax-layer absolute bottom-40 left-10 w-48 h-48 opacity-10"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect x="20" y="20" width="160" height="160" rx="8" stroke="var(--color-steel)" strokeWidth="4" fill="none" />
          <rect x="35" y="35" width="130" height="130" rx="4" stroke="var(--color-steel)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div
        ref={leatherLayerRef}
        className="parallax-layer absolute top-1/3 left-1/4 w-32 h-32 opacity-5"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--color-brass)] to-transparent" />
      </div>

      {/* Chapter number */}
      <div className="absolute top-12 right-12 font-display text-[var(--color-steel)]/30 text-sm tracking-[0.3em]">
        III
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="font-body text-[var(--color-steel)] text-[var(--text-caption)] uppercase tracking-[0.4em]">
              Глава третья
            </span>
          </div>

          <h2 className="font-display font-light text-[var(--text-h1)] text-[var(--color-fog)] mb-6">
            Вы видите мир. Мир не видит вас.
          </h2>

          <p className="font-quote italic text-[var(--text-body)] text-[var(--color-fog)]/70 max-w-2xl mx-auto leading-relaxed">
            Премиальная сетка с прозрачностью 10% — вы контролируете обзор, оставаясь невидимым снаружи.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="stat-card glass rounded-xl p-8 text-center">
            <div className="font-display text-5xl text-[var(--color-brass)] mb-3">10%</div>
            <div className="font-display text-sm text-[var(--color-fog)] mb-2">Прозрачность</div>
            <p className="font-body text-sm text-[var(--color-steel)]">
              Идеальный баланс: вы видите всё, вас — нет
            </p>
          </div>

          <div className="stat-card glass rounded-xl p-8 text-center">
            <div className="font-display text-5xl text-[var(--color-brass)] mb-3">UV</div>
            <div className="font-display text-sm text-[var(--color-fog)] mb-2">Защита</div>
            <p className="font-body text-sm text-[var(--color-steel)]">
              Полная блокировка ультрафиолета — салон остаётся прохладным
            </p>
          </div>

          <div className="stat-card glass rounded-xl p-8 text-center">
            <div className="font-display text-5xl text-[var(--color-brass)] mb-3">2×</div>
            <div className="font-display text-sm text-[var(--color-fog)] mb-2">Усиление</div>
            <p className="font-body text-sm text-[var(--color-steel)]">
              Двойная армированная строчка — на годы без замены
            </p>
          </div>
        </div>

        {/* Material description */}
        <div className="mt-16 text-center">
          <p className="font-body text-[var(--color-steel)] max-w-2xl mx-auto leading-relaxed">
            Каждый материал подобран с хирургической точностью. Сталь — для формы. Магниты — для фиксации. 
            Кожа — для прикосновения. Сетка — для взгляда.
          </p>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-void-reverse" />
    </section>
  );
}
