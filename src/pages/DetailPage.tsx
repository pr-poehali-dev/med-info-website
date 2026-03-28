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

async function fetchWikiSections(query: string): Promise<WikiSection[] | null> {
  const searchUrl = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=1`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const pages = searchData?.query?.search;
  if (!pages || pages.length === 0) return null;

  const pageTitle = pages[0].title;

  const sectionsUrl = `https://ru.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=sections|text&format=json&origin=*`;
  const sectionsRes = await fetch(sectionsUrl);
  const sectionsData = await sectionsRes.json();
  const parsedSections = sectionsData?.parse?.sections;

  if (!parsedSections || parsedSections.length === 0) {
    const textUrl = `https://ru.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts&exintro=true&explaintext=true&format=json&origin=*`;
    const textRes = await fetch(textUrl);
    const textData = await textRes.json();
    const pagesObj = textData?.query?.pages;
    const page = pagesObj ? Object.values(pagesObj)[0] as { extract?: string } : null;
    const extract = page?.extract?.trim();
    if (!extract) return null;
    return [{ icon: '📋', title: 'Определение', content: extract.slice(0, 1200) }];
  }

  const relevantSections = parsedSections
    .filter((s: { toclevel: number; line: string }) => s.toclevel === 1)
    .slice(0, 6);

  if (relevantSections.length === 0) return null;

  const results: WikiSection[] = [];

  const introUrl = `https://ru.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts&exintro=true&explaintext=true&format=json&origin=*`;
  const introRes = await fetch(introUrl);
  const introData = await introRes.json();
  const pagesObj = introData?.query?.pages;
  const introPage = pagesObj ? Object.values(pagesObj)[0] as { extract?: string } : null;
  const intro = introPage?.extract?.trim();
  if (intro) {
    results.push({ icon: '📋', title: 'Определение', content: intro.slice(0, 800) });
  }

  for (const section of relevantSections) {
    const secUrl = `https://ru.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&section=${section.index}&prop=wikitext&format=json&origin=*`;
    const secRes = await fetch(secUrl);
    const secData = await secRes.json();
    let wikitext: string = secData?.parse?.wikitext?.['*'] ?? '';

    wikitext = wikitext
      .replace(/\[\[([^\]|]+\|)?([^\]]+)\]\]/g, '$2')
      .replace(/{{[^}]+}}/g, '')
      .replace(/'''([^']+)'''/g, '$1')
      .replace(/''([^']+)''/g, '$1')
      .replace(/==+[^=]+=+/g, '')
      .replace(/\[\[Файл:[^\]]+\]\]/g, '')
      .replace(/\[\[File:[^\]]+\]\]/g, '')
      .replace(/\[\[Изображение:[^\]]+\]\]/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (wikitext.length > 100) {
      results.push({
        icon: getIcon(section.line),
        title: section.line,
        content: wikitext.slice(0, 800),
      });
    }
  }

  return results.length > 0 ? results : null;
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

  const staticSections = found?.sections ?? null;
  const displayTitle = found?.title ?? title;

  const [sections, setSections] = useState<WikiSection[]>(
    staticSections ?? defaultSections(displayTitle, type)
  );
  const [loading, setLoading] = useState(!staticSections);
  const [wikiFound, setWikiFound] = useState(false);

  useEffect(() => {
    if (staticSections) return;
    setLoading(true);
    fetchWikiSections(displayTitle)
      .then((wikiSections) => {
        if (wikiSections && wikiSections.length > 0) {
          setSections(wikiSections);
          setWikiFound(true);
        } else {
          setSections(defaultSections(displayTitle, type));
        }
      })
      .catch(() => {
        setSections(defaultSections(displayTitle, type));
      })
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
            {wikiFound && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-golos font-medium"
                style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
                Источник: Википедия
              </span>
            )}
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
