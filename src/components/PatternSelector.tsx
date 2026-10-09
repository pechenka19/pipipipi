import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface CarModel {
  name: string;
  years: string;
  hasPattern: boolean;
}

interface Brand {
  name: string;
  models: CarModel[];
}

interface PatternData {
  brands: Brand[];
}

export default function PatternSelector() {
  const [data, setData] = useState<PatternData | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [showStandardForm, setShowStandardForm] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/patterns.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model);
    setShowStandardForm(false);
    setShowCustomForm(false);

    setTimeout(() => {
      if (model.hasPattern) {
        setShowStandardForm(true);
      } else {
        setShowCustomForm(true);
      }
    }, 300);
  };

  const currentBrand = data?.brands.find((b) => b.name === selectedBrand);

  return (
    <section ref={sectionRef} className="section-spacing px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-light text-[var(--text-h1)] mb-4 text-center">
          Выберите ваш автомобиль
        </h2>
        <p className="font-body text-[var(--color-steel)] text-center mb-12 max-w-2xl mx-auto">
          Более 500 лекал для точного повторения геометрии каждого окна
        </p>

        {/* Brand Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
          {data?.brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => {
                setSelectedBrand(brand.name);
                setSelectedModel(null);
                setShowStandardForm(false);
                setShowCustomForm(false);
              }}
              className={`py-3 px-4 rounded-lg border text-sm font-body transition-all duration-300 ${
                selectedBrand === brand.name
                  ? 'border-[var(--color-brass)] bg-[var(--color-brass)]/10 text-[var(--color-brass)]'
                  : 'border-[var(--color-steel)]/20 text-[var(--color-steel)] hover:border-[var(--color-brass)]/50'
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Model Selection */}
        {currentBrand && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {currentBrand.models.map((model) => (
              <button
                key={model.name}
                onClick={() => handleModelSelect(model)}
                className={`py-4 px-5 rounded-lg border text-left transition-all duration-300 ${
                  selectedModel?.name === model.name
                    ? 'border-[var(--color-brass)] bg-[var(--color-brass)]/10'
                    : 'border-[var(--color-steel)]/20 hover:border-[var(--color-brass)]/50'
                }`}
              >
                <div className="font-display text-sm text-[var(--color-fog)]">{model.name}</div>
                <div className="font-body text-xs text-[var(--color-steel)] mt-1">{model.years}</div>
                {model.hasPattern && (
                  <div className="text-[10px] text-[var(--color-brass)] mt-2 uppercase tracking-wider">
                    ✓ В наличии
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Standard Order Form */}
        {showStandardForm && selectedModel && (
          <form
            id="order-standard"
            className="glass rounded-xl p-6 md:p-8 max-w-lg mx-auto animate-fade-in-up"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="font-display text-lg text-[var(--color-brass)] mb-6">
              Стандартный заказ — {selectedBrand} {selectedModel.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--color-steel)] mb-2 uppercase tracking-wider">
                  Ваше имя
                </label>
                <input
                  type="text"
                  className="w-full bg-[var(--color-void)] border border-[var(--color-steel)]/20 rounded-lg px-4 py-3 text-[var(--color-fog)] font-body text-sm focus:border-[var(--color-brass)] focus:outline-none transition-colors"
                  placeholder="Иван"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-steel)] mb-2 uppercase tracking-wider">
                  Телефон
                </label>
                <input
                  type="tel"
                  className="w-full bg-[var(--color-void)] border border-[var(--color-steel)]/20 rounded-lg px-4 py-3 text-[var(--color-fog)] font-body text-sm focus:border-[var(--color-brass)] focus:outline-none transition-colors"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-steel)] mb-2 uppercase tracking-wider">
                  Город доставки
                </label>
                <input
                  type="text"
                  className="w-full bg-[var(--color-void)] border border-[var(--color-steel)]/20 rounded-lg px-4 py-3 text-[var(--color-fog)] font-body text-sm focus:border-[var(--color-brass)] focus:outline-none transition-colors"
                  placeholder="Москва"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-[var(--color-brass)] text-[var(--color-void)] font-display font-semibold text-sm tracking-wider rounded-lg hover:bg-[var(--color-fog)] transition-colors duration-300"
              >
                Оформить заказ
              </button>
            </div>
          </form>
        )}

        {/* Custom Request Form */}
        {showCustomForm && selectedModel && (
          <form
            id="order-custom"
            className="glass rounded-xl p-6 md:p-8 max-w-lg mx-auto animate-fade-in-up"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="font-display text-lg text-[var(--color-brass)] mb-4">
              Индивидуальный заказ — {selectedBrand} {selectedModel.name}
            </h3>
            <p className="font-body text-sm text-[var(--color-steel)] mb-6">
              Лекало для вашей модели разрабатывается индивидуально. Срок изготовления — от 5 рабочих дней.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--color-steel)] mb-2 uppercase tracking-wider">
                  Ваше имя
                </label>
                <input
                  type="text"
                  className="w-full bg-[var(--color-void)] border border-[var(--color-steel)]/20 rounded-lg px-4 py-3 text-[var(--color-fog)] font-body text-sm focus:border-[var(--color-brass)] focus:outline-none transition-colors"
                  placeholder="Иван"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-steel)] mb-2 uppercase tracking-wider">
                  Телефон
                </label>
                <input
                  type="tel"
                  className="w-full bg-[var(--color-void)] border border-[var(--color-steel)]/20 rounded-lg px-4 py-3 text-[var(--color-fog)] font-body text-sm focus:border-[var(--color-brass)] focus:outline-none transition-colors"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-steel)] mb-2 uppercase tracking-wider">
                  Точная модель и год
                </label>
                <input
                  type="text"
                  className="w-full bg-[var(--color-void)] border border-[var(--color-steel)]/20 rounded-lg px-4 py-3 text-[var(--color-fog)] font-body text-sm focus:border-[var(--color-brass)] focus:outline-none transition-colors"
                  placeholder={`${selectedBrand} ${selectedModel.name} ${selectedModel.years}`}
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-steel)] mb-2 uppercase tracking-wider">
                  Комментарий
                </label>
                <textarea
                  className="w-full bg-[var(--color-void)] border border-[var(--color-steel)]/20 rounded-lg px-4 py-3 text-[var(--color-fog)] font-body text-sm focus:border-[var(--color-brass)] focus:outline-none transition-colors resize-none h-24"
                  placeholder="Дополнительные пожелания..."
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-[var(--color-brass)] text-[var(--color-void)] font-display font-semibold text-sm tracking-wider rounded-lg hover:bg-[var(--color-fog)] transition-colors duration-300"
              >
                Оставить заявку
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
