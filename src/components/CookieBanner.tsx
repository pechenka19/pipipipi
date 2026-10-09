import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass p-6">
      <div className="container-fluid flex items-center justify-between gap-6">
        <p className="text-body text-fog/80">
          Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с политикой конфиденциальности.
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-3 bg-brass text-void font-body font-medium rounded-lg hover:bg-brass/90 transition-colors whitespace-nowrap"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
