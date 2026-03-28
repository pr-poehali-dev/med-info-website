import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { diseases, syndromes } from '@/data/medicalData';

interface DetailPageProps {
  slug: string;
  title: string;
  type: 'disease' | 'syndrome';
  onBack: () => void;
  onOpenAppointment?: (type?: 'consultation' | 'question') => void;
}

interface WikiSection {
  icon: string;
  title: string;
  content: string;
}

interface WikiResult {
  sections: WikiSection[];
  url: string;
}

const sectionIcons: Record<string, string> = {
  'Симптомы': '🔍',
  'Симптоматика': '🔍',
  'Клиническая картина': '🔍',
  'Признаки': '🔍',
  'Диагностика': '⚗️',
  'Лечение': '💊',
  'Терапия': '💊',
  'Медикаментозное лечение': '💊',
  'Профилактика': '🛡️',
  'Эпидемиология': '📊',
  'Причины': '🧬',
  'Этиология': '🧬',
  'Патогенез': '🔬',
  'Классификация': '📁',
  'Осложнения': '⚠️',
  'Прогноз': '📈',
};

function getIcon(heading: string): string {
  for (const [key, icon] of Object.entries(sectionIcons)) {
    if (heading.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return '📋';
}

async function fetchWikiData(query: string): Promise<WikiResult | null> {
  const searchUrl = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=1`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const hits = searchData?.query?.search;
  if (!hits || hits.length === 0) return null;

  const pageTitle: string = hits[0].title;
  const wikiUrl = `https://ru.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`;

  const extractUrl = `https://ru.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts&explaintext=true&exsectionformat=wiki&format=json&origin=*`;
  const extractRes = await fetch(extractUrl);
  const extractData = await extractRes.json();
  const pagesObj = extractData?.query?.pages;
  if (!pagesObj) return null;
  const page = Object.values(pagesObj)[0] as { extract?: string };
  const fullText = page?.extract?.trim();
  if (!fullText || fullText.length < 100) return null;

  const sectionRegex = /^(={2,3})\s*(.+?)\s*\1$/gm;
  const results: WikiSection[] = [];
  const matches = [...fullText.matchAll(sectionRegex)];

  if (matches.length === 0) {
    return { sections: [{ icon: '📋', title: pageTitle, content: fullText.slice(0, 1500) }], url: wikiUrl };
  }

  const introText = fullText.slice(0, matches[0].index ?? 0).trim();
  if (introText.length > 80) {
    results.push({ icon: '📋', title: 'Определение', content: introText.slice(0, 900) });
  }

  const topMatches = matches.filter((m) => m[1] === '==').slice(0, 6);
  for (let i = 0; i < topMatches.length; i++) {
    const m = topMatches[i];
    const heading = m[2];
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < topMatches.length ? (topMatches[i + 1].index ?? fullText.length) : fullText.length;
    const body = fullText.slice(start, end)
      .replace(/^(={2,3})\s*.+?\s*\1$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    if (body.length > 80) {
      results.push({ icon: getIcon(heading), title: heading, content: body.slice(0, 900) });
    }
  }

  return results.length > 0 ? { sections: results, url: wikiUrl } : null;
}

const defaultSections = (title: string, type: 'disease' | 'syndrome') => [
  { icon: '📋', title: 'Определение', content: `${title} — ${type === 'disease' ? 'заболевание' : 'синдром'}, характеризующееся специфическими клиническими проявлениями, требующее своевременной диагностики и комплексного лечения под наблюдением специалиста.` },
  { icon: '🔍', title: 'Симптомы', content: 'Клиническая картина включает ряд характерных признаков: общая слабость, изменение самочувствия, специфические органные симптомы. Интенсивность проявлений варьирует в зависимости от стадии и индивидуальных особенностей пациента.' },
  { icon: '⚗️', title: 'Диагностика', content: 'Диагностика основана на анализе жалоб, данных анамнеза, физикального обследования и результатах инструментальных и лабораторных исследований согласно актуальным клиническим рекомендациям.' },
  { icon: '💊', title: 'Лечение', content: 'Терапевтическая тактика определяется индивидуально и включает медикаментозное лечение, изменение образа жизни и, при необходимости, хирургическое вмешательство. Самолечение недопустимо.' },
  { icon: '🛡️', title: 'Профилактика', content: 'Первичная профилактика направлена на устранение факторов риска: здоровое питание, регулярная физическая активность, отказ от вредных привычек, регулярные профилактические осмотры.' },
];

export default function DetailPage({ slug, title, type, onBack, onOpenAppointment }: DetailPageProps) {
  const typeLabel = type === 'disease' ? 'Заболевание' : 'Синдром';

  const allItems = [...diseases, ...syndromes] as Array<{
    slug: string;
    title: string;
    description: string;
    sections?: Array<{ icon: string; title: string; content: string }>;
  }>;

  const normalize = (s: string) =>
    s.toLowerCase().replace(/ё/g, 'е').replace(/[-_]/g, ' ').trim();

  const found =
    allItems.find((item) => item.slug === slug) ??
    allItems.find((item) => normalize(item.title).includes(normalize(slug.replace(/-/g, ' ')))) ??
    allItems.find((item) => normalize(item.description).includes(normalize(slug.replace(/-/g, ' '))));

  const displayTitle = found?.title ?? title;

  const [sections, setSections] = useState<WikiSection[]>(
    found?.sections ?? defaultSections(displayTitle, type)
  );
  const [wikiUrl, setWikiUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setSections(found?.sections ?? defaultSections(displayTitle, type));
    setWikiUrl(null);

    fetchWikiData(displayTitle)
      .then((result) => {
        if (result) {
          if (!found?.sections) setSections(result.sections);
          setWikiUrl(result.url);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

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
            {displayTitle}
          </h1>
          <p className="text-light-text font-golos text-base leading-relaxed mb-6">
            Подробная информация о данном {type === 'disease' ? 'заболевании' : 'синдроме'} подготовлена на основе актуальных медицинских источников.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
              <Icon name="AlertTriangle" size={14} className="text-amber-600" />
              <span className="text-amber-700 text-xs font-golos">Только для ознакомления. Обратитесь к врачу.</span>
            </div>
            {wikiUrl && (
              <a
                href={wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                <Icon name="ExternalLink" size={14} className="text-teal-600" />
                <span className="text-teal-700 text-xs font-golos font-medium">Подробнее на Википедии</span>
              </a>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-sage border-t-transparent animate-spin" />
            <p className="text-light-text font-golos text-sm">Загружаем информацию...</p>
          </div>
        )}

        {/* Sections */}
        {!loading && (
          <div className="flex flex-col gap-4">
            {sections.map((section, i) => (
              <div
                key={section.title + i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in-up disease-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h2 className="font-cormorant font-bold text-xl text-dark-text">{section.title}</h2>
                </div>
                <p className="text-dark-text/80 font-golos text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && (
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
        )}
      </div>
    </div>
  );
}