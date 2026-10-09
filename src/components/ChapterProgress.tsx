import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { id: 1, label: 'Генезис', short: 'I' },
  { id: 2, label: 'Сердце', short: 'II' },
  { id: 3, label: 'Тело', short: 'III' },
  { id: 4, label: 'Мастер', short: 'IV' },
  { id: 5, label: 'Ощущение', short: 'V' },
  { id: 6, label: 'Наследие', short: 'VI' },
];

export default function ChapterProgress() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    for (let i = 1; i <= 6; i++) {
      const section = document.getElementById(`chapter-${i}`);
      if (!section) continue;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveChapter(i);
          }
        },
      });
      triggers.push(st);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6 desktop-only"
    >
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="relative group"
          onMouseEnter={() => setHoveredChapter(chapter.id)}
          onMouseLeave={() => setHoveredChapter(null)}
        >
          {/* Tooltip */}
          {hoveredChapter === chapter.id && (
            <div className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap glass px-3 py-1.5 rounded-md text-xs font-body text-[var(--color-fog)]">
              {chapter.label}
            </div>
          )}

          {/* Dot */}
          <button
            onClick={() => {
              const section = document.getElementById(`chapter-${chapter.id}`);
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-3 h-3 rounded-full border transition-all duration-500 ${
              activeChapter === chapter.id
                ? 'bg-[var(--color-brass)] border-[var(--color-brass)] scale-125'
                : 'bg-transparent border-[var(--color-steel)] hover:border-[var(--color-brass)]'
            }`}
            aria-label={`Перейти к главе: ${chapter.label}`}
          />

          {/* Connector line */}
          {chapter.id < 6 && (
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-3 w-px h-6 transition-colors duration-500 ${
                activeChapter >= chapter.id ? 'bg-[var(--color-brass)]' : 'bg-[var(--color-steel)]/30'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
