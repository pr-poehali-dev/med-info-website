import Icon from '@/components/ui/icon';

const team = [
  { name: 'Андрей Волков', role: 'Главный редактор, к.м.н.', icon: '👨‍⚕️', specialty: 'Кардиология' },
  { name: 'Елена Смирнова', role: 'Медицинский редактор', icon: '👩‍⚕️', specialty: 'Эндокринология' },
  { name: 'Михаил Орлов', role: 'Научный советник, д.м.н.', icon: '👨‍🔬', specialty: 'Неврология' },
  { name: 'Ирина Соколова', role: 'Медицинский редактор', icon: '👩‍🔬', specialty: 'Гастроэнтерология' },
];

const values = [
  { icon: '🔬', title: 'Научность', text: 'Все материалы основаны на рецензируемых исследованиях и международных клинических рекомендациях.' },
  { icon: '✅', title: 'Достоверность', text: 'Регулярная проверка и актуализация данных командой квалифицированных медицинских специалистов.' },
  { icon: '💡', title: 'Доступность', text: 'Сложная медицинская информация представляется простым и понятным языком без потери точности.' },
  { icon: '🤝', title: 'Открытость', text: 'Бесплатный доступ к медицинской информации для широкой аудитории — наш приоритет.' },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen mesh-bg">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-golos font-medium mb-4"
            style={{ backgroundColor: 'rgba(129,178,154,0.15)', color: 'var(--sage)' }}>
            О проекте
          </span>
          <h1 className="font-cormorant font-bold text-5xl md:text-6xl text-dark-text mb-6">
            Наша миссия
          </h1>
          <p className="text-light-text font-golos text-xl max-w-3xl mx-auto leading-relaxed">
            МедИнфо — независимый медицинский информационный портал, созданный с одной целью: 
            предоставить каждому человеку доступ к достоверной, актуальной и понятной информации о здоровье.
          </p>
        </div>

        {/* Mission block */}
        <div className="relative rounded-3xl overflow-hidden mb-16 shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--dark-text) 0%, #3A5450 100%)' }}>
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 0%, transparent 60%)' }} />
          <div className="relative p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-cormorant font-bold text-white text-4xl mb-6">Почему мы создали этот проект?</h2>
                <p className="text-white/75 font-golos leading-relaxed mb-4">
                  Ежегодно миллионы людей ищут информацию о здоровье в интернете, сталкиваясь с противоречивыми, 
                  устаревшими или откровенно опасными данными. МедИнфо стал ответом на эту проблему.
                </p>
                <p className="text-white/75 font-golos leading-relaxed">
                  Мы объединили практикующих врачей, учёных и медицинских журналистов, чтобы создать ресурс, 
                  которому можно доверять так же, как личному врачу.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '2018', label: 'Год основания' },
                  { num: '500+', label: 'Статей и обзоров' },
                  { num: '12', label: 'Врачей в команде' },
                  { num: '2М+', label: 'Читателей в месяц' },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-2xl p-5 text-center">
                    <div className="font-cormorant font-bold text-white text-3xl mb-1">{s.num}</div>
                    <div className="text-white/60 text-sm font-golos">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-cormorant font-bold text-4xl text-dark-text text-center mb-10">Наши принципы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="disease-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-golos font-bold text-dark-text mb-2">{v.title}</h3>
                <p className="text-light-text text-sm font-golos leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="font-cormorant font-bold text-4xl text-dark-text text-center mb-10">Команда редакции</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="disease-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{member.icon}</div>
                <h3 className="font-golos font-semibold text-dark-text mb-1">{member.name}</h3>
                <p className="text-light-text text-sm font-golos mb-2">{member.role}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-golos font-medium"
                  style={{ backgroundColor: 'rgba(129,178,154,0.15)', color: 'var(--sage)' }}>
                  {member.specialty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-14 p-6 rounded-2xl border border-amber-200 bg-amber-50 flex gap-4 items-start">
          <Icon name="AlertTriangle" size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-golos font-semibold text-amber-800 mb-1">Важное уведомление</p>
            <p className="text-amber-700 text-sm font-golos leading-relaxed">
              Информация на портале МедИнфо носит исключительно ознакомительный характер и не является медицинской консультацией. 
              При наличии симптомов или вопросов, касающихся вашего здоровья, обратитесь к квалифицированному врачу.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
