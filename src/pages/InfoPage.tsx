import DiseaseCarousel from '@/components/DiseaseCarousel';
import Icon from '@/components/ui/icon';
import { diseases, syndromes, diseaseSearchSuggestions, syndromeSearchSuggestions } from '@/data/medicalData';

interface InfoPageProps {
  onNavigate: (page: string) => void;
  onItemClick: (slug: string, title: string, type: 'disease' | 'syndrome') => void;
}

export default function InfoPage({ onNavigate, onItemClick }: InfoPageProps) {
  return (
    <div className="pt-24 pb-16 min-h-screen mesh-bg">
      <div className="container mx-auto px-4">
        {/* Page title */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-golos font-medium mb-4"
            style={{ backgroundColor: 'rgba(129,178,154,0.15)', color: 'var(--sage)' }}>
            Информационный раздел
          </span>
          <h1 className="font-cormorant font-bold text-5xl md:text-6xl text-dark-text mb-4">
            Заболевания и синдромы
          </h1>
          <p className="text-light-text font-golos text-lg max-w-2xl mx-auto">
            Полная информация о распространённых заболеваниях и синдромах, основанная на клинических рекомендациях
          </p>
        </div>

        {/* Diseases carousel */}
        <DiseaseCarousel
          title="Распространённые заболевания"
          subtitle="12 наиболее частых нозологий с подробными описаниями"
          items={diseases}
          searchPlaceholder="Введите заболевание..."
          searchSuggestions={diseaseSearchSuggestions}
          onCardClick={(slug, title) => onItemClick(slug, title, 'disease')}
        />

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-sage" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
        </div>

        {/* Syndromes carousel */}
        <DiseaseCarousel
          title="Синдромы и состояния"
          subtitle="12 синдромов с кратким описанием клинической картины"
          items={syndromes}
          searchPlaceholder="Введите синдром..."
          searchSuggestions={syndromeSearchSuggestions}
          onCardClick={(slug, title) => onItemClick(slug, title, 'syndrome')}
        />

        {/* Articles promo block */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(135deg, #F5F7FA 0%, rgba(167,224,224,0.2) 50%, rgba(129,178,154,0.15) 100%)', border: '1px solid rgba(129,178,154,0.2)' }}>
          <div className="p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-md shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--sage), var(--mint))' }}>
              <Icon name="BookOpen" size={36} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-cormorant font-bold text-3xl text-dark-text mb-2">Научные медицинские статьи</h3>
              <p className="text-light-text font-golos text-base">
                Новейшие данные, обзоры и клинические рекомендации — актуальные исследования от ведущих медицинских изданий
              </p>
            </div>
            <button
              onClick={() => onNavigate('articles')}
              className="btn-flash px-8 py-4 rounded-2xl font-golos font-bold text-white text-base shadow-md flex items-center gap-3 shrink-0 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #3B7DD8, #1E5FB0)' }}
            >
              <Icon name="FileText" size={20} className="text-white" />
              Научные статьи
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
