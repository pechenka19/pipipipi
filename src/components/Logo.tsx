import { useEffect, useRef } from 'react';

export default function Logo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      } else {
        el.style.opacity = '0.6';
        el.style.transform = 'translateY(0)';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={logoRef}
      className="fixed top-6 left-6 z-50 transition-all duration-500"
    >
      <div className="font-display font-semibold text-[var(--color-fog)] text-lg tracking-[0.3em]">
        VELES
      </div>
      <div className="font-body text-[var(--color-steel)] text-[10px] tracking-[0.15em] uppercase mt-0.5">
        Свет под контролем
      </div>
    </div>
  );
}
