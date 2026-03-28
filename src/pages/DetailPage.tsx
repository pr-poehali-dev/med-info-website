import Icon from '@/components/ui/icon';

interface DetailPageProps {
  slug: string;
  title: string;
  type: 'disease' | 'syndrome';
  onBack: () => void;
  onOpenAppointment?: (type?: 'consultation' | 'question') => void;
}

export default function DetailPage({ slug: _slug, title, type, onBack, onOpenAppointment }: DetailPageProps) {
  const typeLabel = type === 'disease' ? 'Заболевание' : 'Синдром';
  const sections = [
    { icon: '📋', title: 'Определение', content: `${title} — ${type === 'disease' ? 'заболевание' : 'синдром'}, характеризующееся специфическими клиническими проявлениями, требующее своевременной диагностики и комплексного лечения под наблюдением специалиста.` },
    { icon: '🔍', title: 'Симптомы', content: 'Клиническая картина включает ряд характерных признаков: общая слабость, изменение самочувствия, специфические органные симптомы. Интенсивность проявлений варьирует в зависимости от стадии и индивидуальных особенностей пациента.' },
    { icon: '⚗️', title: 'Диагностика', content: 'Диагностика основана на анализе жалоб, данных анамнеза, физикального обследования и результатах инструментальных и лабораторных исследований согласно актуальным клиническим рекомендациям.' },
    { icon: '💊', title: 'Лечение', content: 'Терапевтическая тактика определяется индивидуально и включает медикаментозное лечение, изменение образа жизни и, при необходимости, хирургическое вмешательство. Самолечение недопустимо.' },
    { icon: '🛡️', title: 'Профилактика', content: 'Первичная профилактика направлена на устранение факторов риска: здоровое питание, регулярная физическая активность, отказ от вредных привычек, регулярные профилактические осмотры.' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen mesh-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-light-text hover:text-sage font-golos text-sm font-medium mb-8 transition-colors group"
        >
          <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
          Назад к списку
        </button>

        {/* Header */}
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
          <div className="flex items-start gap-4 mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-golos font-medium"
              style={{ backgroundColor: 'rgba(129,178,154,0.15)', color: 'var(--sage)' }}>
              {typeLabel}
            </span>
          </div>
          <h1 className="font-cormorant font-bold text-dark-text mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {title}
          </h1>
          <p className="text-light-text font-golos text-base leading-relaxed mb-6">
            Подробная информация о данном {type === 'disease' ? 'заболевании' : 'синдроме'} подготовлена командой медицинских редакторов на основе актуальных клинических рекомендаций и результатов научных исследований.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
              <Icon name="AlertTriangle" size={14} className="text-amber-600" />
              <span className="text-amber-700 text-xs font-golos">Только для ознакомления. Обратитесь к врачу.</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in-up disease-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="font-cormorant font-bold text-xl text-dark-text">{section.title}</h2>
              </div>
              <p className="text-dark-text/80 font-golos text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, var(--sage), var(--mint))' }}>
          <h3 className="font-cormorant font-bold text-white text-2xl mb-3">Нужна консультация специалиста?</h3>
          <p className="text-white/80 font-golos text-sm mb-6">
            Наши медицинские эксперты готовы ответить на ваши вопросы
          </p>
          <button
            onClick={() => onOpenAppointment?.('question')}
            className="btn-flash px-8 py-3.5 rounded-xl font-golos font-bold text-white shadow-lg"
            style={{ backgroundColor: 'var(--terracotta)' }}
          >
            Связаться с редакцией
          </button>
        </div>
      </div>
    </div>
  );
}