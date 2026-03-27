import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenAppointment: (type?: 'consultation' | 'question') => void;
}

const benefits = [
  { icon: '🔬', title: 'Доказательная медицина', text: 'Все материалы основаны на данных рандомизированных исследований и мета-анализов.' },
  { icon: '👩‍⚕️', title: 'Экспертная редакция', text: 'Контент проверяется практикующими врачами и кандидатами медицинских наук.' },
  { icon: '📚', title: 'Актуальные рекомендации', text: 'Регулярное обновление согласно последним клиническим протоколам ВОЗ и ESC.' },
  { icon: '🔒', title: 'Конфиденциальность', text: 'Ваши данные защищены и никогда не передаются третьим лицам.' },
];

export default function HomePage({ onNavigate, onOpenAppointment }: HomePageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/03311103-44e8-460b-9c52-3ce3b0920bdd/files/1b5c9cd9-2c6e-47b4-9016-089192efbf23.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(44,62,58,0.82) 0%, rgba(44,62,58,0.6) 50%, rgba(129,178,154,0.3) 100%)'
        }} />

        {/* Content */}
        <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ backgroundColor: 'rgba(129,178,154,0.25)', border: '1px solid rgba(129,178,154,0.4)' }}>
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span className="text-mint text-sm font-golos font-medium">Медицинский информационный портал</span>
          </div>

          <h1 className="font-cormorant font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.1' }}>
            Медицинская<br />
            <span style={{ color: 'var(--mint)' }}>информация</span>
          </h1>

          <p className="text-white/80 font-golos text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Достоверные сведения о заболеваниях, синдромах и методах лечения — на основе доказательной медицины и актуальных клинических рекомендаций.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('diseases')}
              className="btn-flash px-8 py-4 rounded-2xl font-golos font-semibold text-white text-base shadow-xl flex items-center gap-2 justify-center"
              style={{ backgroundColor: 'var(--terracotta)' }}
            >
              <span>Найти информацию</span>
            </button>
            <button
              onClick={() => onOpenAppointment('question')}
              className="btn-flash px-8 py-4 rounded-2xl font-golos font-semibold text-white text-base flex items-center gap-2 justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}
            >
              <span>Задать вопрос врачу</span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { num: '500+', label: 'Заболеваний' },
              { num: '1200+', label: 'Статей' },
              { num: '24', label: 'Специальности' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-cormorant font-bold text-3xl text-white mb-1">{s.num}</div>
                <div className="text-white/60 text-sm font-golos">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-xs font-golos">Прокрутите вниз</span>
          <Icon name="ChevronDown" size={20} className="text-white/50" />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-cormorant font-bold text-4xl text-dark-text mb-3">Почему доверяют МедИнфо</h2>
            <p className="text-light-text font-golos">Принципы, на которых строится наша работа</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="disease-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-golos font-semibold text-dark-text mb-2">{b.title}</h3>
                <p className="text-light-text text-sm font-golos leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, var(--sage) 0%, var(--mint) 100%)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)' }} />
            <div className="relative z-10">
              <h2 className="font-cormorant font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                Получите ответы на свои вопросы
              </h2>
              <p className="text-white/85 font-golos text-lg mb-8 max-w-xl mx-auto">
                Используйте наш умный поиск для поиска информации о заболеваниях, симптомах и методах лечения
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('diseases')}
                  className="btn-flash px-8 py-4 rounded-2xl font-golos font-bold text-white text-base shadow-xl"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                >
                  Найти информацию
                </button>
                <button
                  onClick={() => onOpenAppointment('question')}
                  className="btn-flash px-8 py-4 rounded-2xl font-golos font-semibold text-white text-base"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)' }}
                >
                  Задать вопрос врачу
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}