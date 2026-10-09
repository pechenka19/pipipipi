import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter2Heart() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // SVG blueprint draw animation
      const paths = svgRef.current?.querySelectorAll('.blueprint-path');
      if (paths) {
        paths.forEach((path) => {
          const length = (path as SVGPathElement).getTotalLength();
          (path as SVGPathElement).style.strokeDasharray = `${length}`;
          (path as SVGPathElement).style.strokeDashoffset = `${length}`;

          gsap.to(path, {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: '+=100%',
              scrub: 1.5,
            },
          });
        });
      }

      // Count-up animations
      const numbers = document.querySelectorAll('.stat-number');
      numbers.forEach((num) => {
        const target = parseInt(num.getAttribute('data-target') || '0');
        const counter = { value: 0 };
        
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: num,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            num.textContent = Math.floor(counter.value).toString();
          },
        });
      });

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
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
      id="chapter-2"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-abyss)]" />

      {/* Chapter number */}
      <div className="absolute top-12 right-12 font-display text-[var(--color-steel)]/30 text-sm tracking-[0.3em]">
        II
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: SVG Blueprint */}
        <div className="flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            className="w-full max-w-[350px] h-auto"
            fill="none"
          >
            {/* Window frame outline */}
            <path
              className="blueprint-path"
              d="M80 60 L320 60 L340 80 L340 320 L320 340 L80 340 L60 320 L60 80 Z"
              stroke="var(--color-brass)"
              strokeWidth="1.5"
              opacity="0.8"
            />
            {/* Inner frame */}
            <path
              className="blueprint-path"
              d="M100 80 L300 80 L315 95 L315 305 L300 320 L100 320 L85 305 L85 95 Z"
              stroke="var(--color-steel)"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Magnet positions */}
            <circle className="blueprint-path" cx="90" cy="120" r="6" stroke="var(--color-brass)" strokeWidth="1.5" />
            <circle className="blueprint-path" cx="90" cy="200" r="6" stroke="var(--color-brass)" strokeWidth="1.5" />
            <circle className="blueprint-path" cx="90" cy="280" r="6" stroke="var(--color-brass)" strokeWidth="1.5" />
            <circle className="blueprint-path" cx="310" cy="120" r="6" stroke="var(--color-brass)" strokeWidth="1.5" />
            <circle className="blueprint-path" cx="310" cy="200" r="6" stroke="var(--color-brass)" strokeWidth="1.5" />
            <circle className="blueprint-path" cx="310" cy="280" r="6" stroke="var(--color-brass)" strokeWidth="1.5" />
            {/* Dimension lines */}
            <path
              className="blueprint-path"
              d="M60 40 L340 40"
              stroke="var(--color-steel)"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
            <path
              className="blueprint-path"
              d="M40 60 L40 340"
              stroke="var(--color-steel)"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
            {/* 4mm annotation */}
            <text x="200" y="35" textAnchor="middle" fill="var(--color-brass)" fontSize="11" fontFamily="Manrope">
              4 мм
            </text>
            <text x="30" y="200" textAnchor="middle" fill="var(--color-brass)" fontSize="11" fontFamily="Manrope" transform="rotate(-90, 30, 200)">
              N35
            </text>
            {/* Mesh pattern */}
            <path
              className="blueprint-path"
              d="M120 100 L280 100 M120 130 L280 130 M120 160 L280 160 M120 190 L280 190 M120 220 L280 220 M120 250 L280 250 M120 280 L280 280 M120 310 L280 310"
              stroke="var(--color-steel)"
              strokeWidth="0.3"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Right: Text content */}
        <div ref={textRef} style={{ opacity: 0 }}>
          <div className="mb-4">
            <span className="font-body text-[var(--color-steel)] text-[var(--text-caption)] uppercase tracking-[0.4em]">
              Глава вторая
            </span>
          </div>

          <h2 className="font-display font-light text-[var(--text-h1)] text-[var(--color-fog)] mb-8">
            4 мм. 35 мегаэрстед.
          </h2>

          <p className="font-quote italic text-[var(--text-body)] text-[var(--color-fog)]/70 mb-8 leading-relaxed">
            «Стальной каркас. Ровно 4 миллиметра. Не 3 — потому что гнётся. Не 5 — потому что тяжелит дверь.»
          </p>

          <p className="font-body text-[var(--color-steel)] mb-12 leading-relaxed">
            Один щелчок — и шторка на месте. Магниты N35 удерживают каркас на металлической рамке окна с силой, 
            достаточной для любой дороги — от трассы до бездорожья.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-[var(--color-brass)]">
                <span className="stat-number" data-target="4">0</span>
                <span className="text-lg ml-1">мм</span>
              </div>
              <div className="font-body text-xs text-[var(--color-steel)] mt-2 uppercase tracking-wider">
                Каркас
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-[var(--color-brass)]">
                <span className="stat-number" data-target="35">0</span>
                <span className="text-lg ml-1">МЭ</span>
              </div>
              <div className="font-body text-xs text-[var(--color-steel)] mt-2 uppercase tracking-wider">
                Магниты
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-[var(--color-brass)]">
                <span className="stat-number" data-target="200">0</span>
              </div>
              <div className="font-body text-xs text-[var(--color-steel)] mt-2 uppercase tracking-wider">
                Прототипов
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-void-reverse" />
    </section>
  );
}
