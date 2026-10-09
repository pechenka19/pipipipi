import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter4Craft() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 769;

      if (!isMobile) {
        // Desktop: sticky scroll with panel swapping
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        // Panel 1 visible initially, then swap
        tl.to(panelRefs.current[0], {
          opacity: 0,
          duration: 1,
        })
        .to(panelRefs.current[1], {
          opacity: 1,
          duration: 1,
        }, '<')
        .to(panelRefs.current[1], {
          opacity: 0,
          duration: 1,
          delay: 1,
        })
        .to(panelRefs.current[2], {
          opacity: 1,
          duration: 1,
        }, '<');
      } else {
        // Mobile: simple fade in for each panel
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          gsap.fromTo(
            panel,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const panels = [
    {
      title: 'Один мастер',
      subtitle: 'Одно окно. Одно лекало.',
      description: 'Каждую шторку создаёт один мастер — от первого разреза стали до последней строчки кожи. Без конвейера. Без спешки.',
      visual: (
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-abyss)] to-[var(--color-void)] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: `url('https://image.qwenlm.ai/generated-images/3c319dc2-14a5-4f8a-bfb9-074b816d3bd7/_result.png')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-transparent to-[var(--color-void)]/50" />
          <div className="text-center z-10">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full border border-[var(--color-brass)]/30 flex items-center justify-center backdrop-blur-sm">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-brass)" strokeWidth="1.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <span className="font-body text-sm text-[var(--color-steel)]">Ручная работа</span>
          </div>
        </div>
      ),
    },
    {
      title: '500+ лекал',
      subtitle: 'Для каждой двери — своё.',
      description: 'Архив из более чем 500 моделей автомобилей. Каждое окно — уникальная геометрия, точное до миллиметра. Никаких универсальных решений.',
      visual: (
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-abyss)] to-[var(--color-void)] flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-5 grid-rows-4 gap-2 p-8 h-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="border border-[var(--color-steel)]/20 rounded" />
              ))}
            </div>
          </div>
          <div className="text-center z-10">
            <div className="font-display text-6xl text-[var(--color-brass)] mb-2">500+</div>
            <span className="font-body text-sm text-[var(--color-steel)]">Моделей в архиве</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Партийный номер',
      subtitle: 'Подпись мастера на стали.',
      description: 'На каждой стальной застёжке — гравировка с номером партии и инициалами мастера. Как подпись художника на картине. Гарантия, которую можно потрогать.',
      visual: (
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-abyss)] to-[var(--color-void)] flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <rect x="100" y="80" width="200" height="140" rx="8" stroke="var(--color-brass)" strokeWidth="1" fill="none" />
              <line x1="120" y1="120" x2="280" y2="120" stroke="var(--color-steel)" strokeWidth="0.5" />
              <line x1="120" y1="150" x2="280" y2="150" stroke="var(--color-steel)" strokeWidth="0.5" />
              <line x1="120" y1="180" x2="280" y2="180" stroke="var(--color-steel)" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="text-center z-10">
            <div className="font-quote italic text-2xl text-[var(--color-brass)] mb-2">VLS-0847</div>
            <span className="font-body text-sm text-[var(--color-steel)]">Персональная гравировка</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="chapter-4"
      ref={sectionRef}
      className="relative bg-[var(--color-void)]"
    >
      {/* Chapter number - fixed during scroll */}
      <div className="absolute top-12 right-12 font-display text-[var(--color-steel)]/30 text-sm tracking-[0.3em] z-20">
        IV
      </div>

      {/* Desktop: sticky panels */}
      <div ref={panelsRef} className="hidden md:block">
        <div className="h-screen flex items-center justify-center px-12">
          <div className="max-w-6xl w-full grid grid-cols-2 gap-16 items-center">
            {/* Text side */}
            <div>
              <div className="mb-4">
                <span className="font-body text-[var(--color-steel)] text-[var(--text-caption)] uppercase tracking-[0.4em]">
                  Глава четвёртая
                </span>
              </div>
              <h2 className="font-display font-light text-[var(--text-h1)] text-[var(--color-fog)] mb-6">
                Одно окно. Одно лекало. Один мастер.
              </h2>
            </div>

            {/* Panel stack */}
            <div className="relative h-[500px]">
              {panels.map((panel, i) => (
                <div
                  key={i}
                  ref={(el) => { panelRefs.current[i] = el; }}
                  className="craft-panel absolute inset-0 flex flex-col justify-center"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {panel.visual}
                  <div className="mt-6">
                    <h3 className="font-display text-lg text-[var(--color-brass)] mb-2">{panel.title}</h3>
                    <p className="font-body text-sm text-[var(--color-steel)] mb-3">{panel.subtitle}</p>
                    <p className="font-body text-[var(--color-fog)]/70 leading-relaxed">{panel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden section-spacing px-6">
        <div className="mb-12 text-center">
          <div className="mb-4">
            <span className="font-body text-[var(--color-steel)] text-[var(--text-caption)] uppercase tracking-[0.4em]">
              Глава четвёртая
            </span>
          </div>
          <h2 className="font-display font-light text-[var(--text-h2)] text-[var(--color-fog)]">
            Одно окно. Одно лекало. Один мастер.
          </h2>
        </div>

        {panels.map((panel, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="craft-panel mb-16"
            style={{ opacity: 1 }}
          >
            {panel.visual}
            <div className="mt-6">
              <h3 className="font-display text-lg text-[var(--color-brass)] mb-2">{panel.title}</h3>
              <p className="font-body text-sm text-[var(--color-steel)] mb-3">{panel.subtitle}</p>
              <p className="font-body text-[var(--color-fog)]/70 leading-relaxed">{panel.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-void-reverse" />
    </section>
  );
}
