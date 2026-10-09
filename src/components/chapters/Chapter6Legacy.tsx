import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cities = [
  { name: 'Калининград', distance: '4 800 км' },
  { name: 'Москва', distance: '3 400 км' },
  { name: 'Казань', distance: '2 800 км' },
  { name: 'Екатеринбург', distance: '2 200 км' },
  { name: 'Новосибирск', distance: '1 400 км' },
  { name: 'Красноярск', distance: '800 км' },
  { name: 'Иркутск', distance: '500 км' },
  { name: 'Владивосток', distance: '4 200 км' },
];

export default function Chapter6Legacy() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 769;

      if (!isMobile && galleryRef.current) {
        // Desktop: horizontal scroll
        const gallery = galleryRef.current;
        const scrollWidth = gallery.scrollWidth;

        gsap.to(gallery, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${scrollWidth}`,
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });
      }

      // Final panel animation
      gsap.fromTo(
        finalRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: finalRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-6"
      ref={sectionRef}
      className="relative bg-[var(--color-void)]"
    >
      {/* Chapter number */}
      <div className="absolute top-12 right-12 font-display text-[var(--color-steel)]/30 text-sm tracking-[0.3em] z-20">
        VI
      </div>

      {/* Desktop: horizontal scroll gallery */}
      <div className="hidden md:block">
        <div ref={galleryRef} className="horizontal-scroll-container h-screen items-center px-[10vw]">
          {/* Intro card */}
          <div className="shrink-0 w-[80vw] flex flex-col justify-center pr-16">
            <div className="mb-4">
              <span className="font-body text-[var(--color-steel)] text-[var(--text-caption)] uppercase tracking-[0.4em]">
                Глава шестая
              </span>
            </div>
            <h2 className="font-display font-light text-[var(--text-display)] text-[var(--color-fog)] mb-6">
              Из Абакана — в путь.
            </h2>
            <p className="font-body text-[var(--color-steel)] max-w-lg leading-relaxed">
              Каждая шторка отправляется из мастерской в Абакане и преодолевает тысячи километров, 
              чтобы найти свой автомобиль — от Калининграда до Владивостока.
            </p>
          </div>

          {/* City cards */}
          {cities.map((city, i) => (
            <div
              key={city.name}
              className="shrink-0 w-[400px] h-[500px] glass rounded-2xl p-8 flex flex-col justify-between hover:border-[var(--color-brass)]/30 transition-all duration-500"
            >
              <div>
                <div className="font-display text-[var(--color-steel)]/30 text-sm mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-[var(--color-abyss)] to-[var(--color-void)] flex items-center justify-center mb-6">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-brass)" strokeWidth="1" opacity="0.6">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--color-fog)] mb-2">{city.name}</h3>
                <p className="font-body text-sm text-[var(--color-steel)]">{city.distance} от Абакана</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical layout */}
      <div className="md:hidden section-spacing px-6">
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="font-body text-[var(--color-steel)] text-[var(--text-caption)] uppercase tracking-[0.4em]">
              Глава шестая
            </span>
          </div>
          <h2 className="font-display font-light text-[var(--text-h1)] text-[var(--color-fog)] mb-6">
            Из Абакана — в путь.
          </h2>
          <p className="font-body text-[var(--color-steel)] leading-relaxed">
            Каждая шторка отправляется из мастерской в Абакане и преодолевает тысячи километров.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {cities.map((city) => (
            <div key={city.name} className="glass rounded-xl p-4 text-center">
              <h3 className="font-display text-sm text-[var(--color-fog)] mb-1">{city.name}</h3>
              <p className="font-body text-xs text-[var(--color-steel)]">{city.distance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final panel */}
      <div
        ref={finalRef}
        className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-brass)]/3 to-transparent" />
        
        <div className="relative z-10">
          <h2 className="font-display font-light text-[var(--text-display)] text-[var(--color-fog)] brass-glow mb-4">
            VELES
          </h2>
          <p className="font-body text-[var(--color-brass)] text-lg tracking-[0.2em] uppercase">
            Свет под контролем
          </p>

          <div className="mt-12 w-px h-20 bg-gradient-to-b from-[var(--color-brass)] to-transparent mx-auto" />

          <p className="mt-8 font-body text-[var(--color-steel)] text-sm">
            Ручная работа. Абакан, Россия.
          </p>
        </div>
      </div>
    </section>
  );
}
