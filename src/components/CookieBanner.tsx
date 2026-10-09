import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('veles-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('veles-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-up">
      <div className="max-w-4xl mx-auto glass rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-4">
        <p className="font-body text-sm text-[var(--color-steel)] flex-1 text-center md:text-left">
          Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с{' '}
          <a href="#" className="text-[var(--color-brass)] underline underline-offset-2 hover:no-underline">
            политикой конфиденциальности
          </a>{' '}
          в соответствии с 152-ФЗ.
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 px-6 py-2.5 bg-[var(--color-brass)] text-[var(--color-void)] font-display font-semibold text-sm tracking-wider rounded-lg hover:bg-[var(--color-fog)] transition-colors duration-300"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
