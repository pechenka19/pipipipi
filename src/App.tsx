import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Logo from './components/Logo';
import AudioControl from './components/AudioControl';
import ChapterProgress from './components/ChapterProgress';
import CookieBanner from './components/CookieBanner';
import PatternSelector from './components/PatternSelector';

import Chapter1Genesis from './components/chapters/Chapter1Genesis';
import Chapter2Heart from './components/chapters/Chapter2Heart';
import Chapter3Body from './components/chapters/Chapter3Body';
import Chapter4Craft from './components/chapters/Chapter4Craft';
import Chapter5Experience from './components/chapters/Chapter5Experience';
import Chapter6Legacy from './components/chapters/Chapter6Legacy';

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);
}

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useLenis();

  return (
    <div ref={appRef} className="relative">
      {/* Fixed UI components */}
      <Logo />
      <AudioControl />
      <ChapterProgress />

      {/* Chapters */}
      <main>
        <Chapter1Genesis />
        <Chapter2Heart />
        <Chapter3Body />
        <Chapter4Craft />
        <Chapter5Experience />
        <Chapter6Legacy />
      </main>

      {/* Pattern Selector / Order Section */}
      <section className="bg-[var(--color-abyss)] border-t border-[var(--color-steel)]/10">
        <PatternSelector />
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-void)] border-t border-[var(--color-steel)]/10 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="font-display font-semibold text-[var(--color-fog)] text-xl tracking-[0.3em] mb-2">
            VELES
          </div>
          <p className="font-body text-sm text-[var(--color-steel)] mb-6">
            Премиальные магнитные шторки ручной работы
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="#" className="font-body text-xs text-[var(--color-steel)] hover:text-[var(--color-brass)] transition-colors uppercase tracking-wider">
              О нас
            </a>
            <a href="#" className="font-body text-xs text-[var(--color-steel)] hover:text-[var(--color-brass)] transition-colors uppercase tracking-wider">
              Доставка
            </a>
            <a href="#" className="font-body text-xs text-[var(--color-steel)] hover:text-[var(--color-brass)] transition-colors uppercase tracking-wider">
              Гарантия
            </a>
            <a href="#" className="font-body text-xs text-[var(--color-steel)] hover:text-[var(--color-brass)] transition-colors uppercase tracking-wider">
              Контакты
            </a>
          </div>
          <p className="font-body text-xs text-[var(--color-steel)]/50">
            © 2024 VELES. Абакан, Россия. Все права защищены.
          </p>
        </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}

export default App;
