import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { articles } from '@/data/medicalData';

const categories = ['Все', 'Кардиология', 'Эндокринология', 'Неврология', 'Пульмонология', 'Гастроэнтерология', 'Иммунология'];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === 'Все' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

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
        <div className="max-w-xl mx-auto mb-8 relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по статьям..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage shadow-sm transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <article
              key={article.id}
              className="disease-card bg-card-bg rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              style={{ animationDelay: `${i * 0.1}s` }}
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
        <div className="text-center mt-10">
          <button
            className="btn-flash px-10 py-4 rounded-2xl font-golos font-semibold text-white shadow-md flex items-center gap-2 mx-auto"
            style={{ backgroundColor: 'var(--terracotta)' }}
          >
            <Icon name="RefreshCw" size={16} className="text-white" />
            Загрузить ещё
          </button>
        </div>
      </div>
    </div>
  );
}
