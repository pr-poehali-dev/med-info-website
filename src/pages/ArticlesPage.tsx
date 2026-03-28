import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { articles } from '@/data/medicalData';

const categories = ['Все', 'Кардиология', 'Эндокринология', 'Неврология', 'Пульмонология', 'Гастроэнтерология', 'Иммунология'];
const PAGE_SIZE = 6;

function getYear(date: string): string {
  const match = date.match(/\d{4}/);
  return match ? match[0] : '';
}

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  icon: string;
  url?: string;
  pubmedQuery?: string;
  keyPoints?: string[];
}

function buildPubMedUrl(article: Article): string {
  const query = article.pubmedQuery || article.title;
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}&sort=relevance`;
}

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative animate-scale-in overflow-hidden"
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #3B7DD8, var(--sage), var(--mint))' }} />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-light-text hover:bg-gray-100 hover:text-dark-text transition-all z-10"
        >
          <Icon name="X" size={18} />
        </button>
        <div className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl shrink-0">{article.icon}</div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-golos font-medium mb-2"
                style={{ backgroundColor: 'rgba(129,178,154,0.12)', color: 'var(--sage)' }}>
                {article.category}
              </span>
              <h2 className="font-cormorant font-bold text-2xl text-dark-text leading-snug">{article.title}</h2>
              <div className="flex items-center gap-4 mt-2 text-xs text-light-text font-golos">
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={12} />{article.date}
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />{article.readTime}
                </div>
              </div>
            </div>
          </div>

          <div className="prose font-golos text-dark-text space-y-4">
            <p className="text-base leading-relaxed text-light-text">{article.excerpt}</p>
            {article.keyPoints && article.keyPoints.length > 0 && (
              <div className="p-4 rounded-2xl border-l-4 my-4"
                style={{ backgroundColor: 'rgba(129,178,154,0.07)', borderColor: 'var(--sage)' }}>
                <p className="text-sm font-golos text-dark-text font-medium">Ключевые выводы:</p>
                <ul className="mt-2 space-y-1.5 text-sm text-light-text list-disc list-inside">
                  {article.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-sm text-light-text leading-relaxed">
              Данная статья представляет обзор актуальных исследований в области {article.category.toLowerCase()}.
              Проконсультируйтесь с врачом перед принятием медицинских решений.
            </p>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-golos font-semibold text-dark-text bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
            >
              Закрыть
            </button>
            <a
              href={buildPubMedUrl(article)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-flash py-3 rounded-xl font-golos font-semibold text-white text-sm flex items-center justify-center gap-2"
              style={{ backgroundColor: '#3B7DD8' }}
            >
              <Icon name="ExternalLink" size={15} className="text-white" />
              Открыть полную версию
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [activeYear, setActiveYear] = useState('Все');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setPage(1);
  };

  const getPubMedUrl = () => {
    const q = searchInput.trim();
    if (!q) return '#';
    return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}`;
  };

  const years = ['Все', ...Array.from(new Set(articles.map((a) => getYear(a.date)))).sort((a, b) => Number(b) - Number(a))];

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === 'Все' || a.category === activeCategory;
    const matchYear = activeYear === 'Все' || getYear(a.date) === activeYear;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchYear && matchSearch;
  });

  const shown = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = shown.length < filtered.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleYearChange = (year: string) => {
    setActiveYear(year);
    setPage(1);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen mesh-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-golos font-medium mb-4"
            style={{ backgroundColor: 'rgba(59,125,216,0.1)', color: '#3B7DD8' }}>
            Доказательная медицина
          </span>
          <h1 className="font-cormorant font-bold text-5xl md:text-6xl text-dark-text mb-4">
            Научные статьи
          </h1>
          <p className="text-light-text font-golos text-lg max-w-xl mx-auto">
            Актуальные обзоры, клинические рекомендации и результаты исследований
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8 flex gap-2">
          <div className="relative flex-1">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text pointer-events-none" />
            <input
              value={searchInput}
              onChange={(e) => { setSearchInput(e.target.value); setSearchQuery(e.target.value); setPage(1); }}
              onKeyDown={(e) => { if (e.key === 'Enter' && searchInput.trim()) { window.open(getPubMedUrl(), '_blank', 'noopener,noreferrer'); } }}
              placeholder="Поиск по статьям или в PubMed..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-gray-200 bg-white font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage shadow-sm transition-all"
            />
            {searchInput && (
              <button
                onClick={() => { setSearchInput(''); setSearchQuery(''); setPage(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-light-text hover:text-dark-text hover:bg-gray-100 transition-all"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => { const url = getPubMedUrl(); if (url !== '#') window.open(url, '_blank', 'noopener,noreferrer'); }}
            disabled={!searchInput.trim()}
            className="btn-flash px-5 py-3.5 rounded-2xl font-golos font-semibold text-white text-sm shadow-sm flex items-center gap-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#3B7DD8' }}
          >
            <Icon name="ExternalLink" size={16} className="text-white" />
            Перейти
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-golos font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'text-white shadow-md'
                  : 'bg-white text-light-text border border-gray-200 hover:border-sage/50'
              }`}
              style={activeCategory === cat ? { backgroundColor: 'var(--sage)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Year filter */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          <span className="text-xs font-golos text-light-text mr-1 flex items-center gap-1">
            <Icon name="CalendarDays" size={13} />
            Год:
          </span>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-3 py-1.5 rounded-lg text-xs font-golos font-medium transition-all duration-200 ${
                activeYear === year
                  ? 'text-white shadow-sm'
                  : 'bg-white text-light-text border border-gray-200 hover:border-blue-300'
              }`}
              style={activeYear === year ? { backgroundColor: '#3B7DD8' } : {}}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((article, i) => (
            <article
              key={article.id}
              className="disease-card bg-card-bg rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{article.icon}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-golos font-medium"
                    style={{ backgroundColor: 'rgba(129,178,154,0.12)', color: 'var(--sage)' }}>
                    {article.category}
                  </span>
                </div>
                <h3 className="font-golos font-semibold text-dark-text text-base mb-2 leading-snug">{article.title}</h3>
                <p className="text-light-text text-sm font-golos leading-relaxed flex-1">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-light-text font-golos">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {article.readTime}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="btn-flash px-4 py-1.5 rounded-lg text-xs font-golos font-semibold text-white"
                    style={{ backgroundColor: 'var(--terracotta)' }}
                  >
                    Читать
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-cormorant font-bold text-2xl text-dark-text mb-2">Статьи не найдены</h3>
            <p className="text-light-text font-golos">Попробуйте изменить запрос или выбрать другую категорию</p>
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="btn-flash px-10 py-4 rounded-2xl font-golos font-semibold text-white shadow-md flex items-center gap-2 mx-auto"
              style={{ backgroundColor: 'var(--terracotta)' }}
            >
              <Icon name="RefreshCw" size={16} className="text-white" />
              Загрузить ещё
            </button>
          </div>
        )}

        {!hasMore && filtered.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-light-text font-golos text-sm">Показаны все {filtered.length} статей</p>
          </div>
        )}
      </div>

      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </div>
  );
}