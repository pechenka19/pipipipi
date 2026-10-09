import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

declare global {
  interface Window {
    audioSounds: {
      magneticClick: Howl | null;
      workshopAmbient: Howl | null;
      orchestralTheme: Howl | null;
    };
  }
}

export default function AudioControl() {
  const [isMuted, setIsMuted] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const soundsRef = useRef<{
    magneticClick: Howl | null;
    workshopAmbient: Howl | null;
    orchestralTheme: Howl | null;
  }>({
    magneticClick: null,
    workshopAmbient: null,
    orchestralTheme: null,
  });

  useEffect(() => {
    if (!isInitialized) return;

    const sounds = soundsRef.current;
    if (isMuted) {
      Howler.mute(true);
    } else {
      Howler.mute(false);
    }
  }, [isMuted, isInitialized]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!isInitialized) {
          soundsRef.current.magneticClick = new Howl({
            src: ['/audio/magnetic-click.mp3'],
            volume: 0.6,
            preload: false,
          });
          soundsRef.current.workshopAmbient = new Howl({
            src: ['/audio/workshop-ambient.mp3'],
            volume: 0.3,
            loop: true,
            preload: false,
          });
          soundsRef.current.orchestralTheme = new Howl({
            src: ['/audio/orchestral-theme.mp3'],
            volume: 0.4,
            loop: true,
            preload: false,
          });
          window.audioSounds = soundsRef.current;
          setIsInitialized(true);
          setIsMuted(false);
        } else {
          setIsMuted(!isMuted);
        }
      }}
      className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-[var(--color-brass)] transition-all duration-300 group"
      aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
    >
      {isMuted ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-steel)] group-hover:text-[var(--color-brass)] transition-colors">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-brass)] transition-colors">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
