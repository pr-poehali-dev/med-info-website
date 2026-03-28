import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface CarouselItem {
  id: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  slug: string;
}

interface DiseaseCarouselProps {
  title: string;
  subtitle: string;
  items: CarouselItem[];
  searchPlaceholder: string;
  onCardClick: (slug: string, title: string) => void;
  searchSuggestions: string[];
}

export default function DiseaseCarousel({
  title, subtitle, items, searchPlaceholder, onCardClick, searchSuggestions
}: DiseaseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered) startInterval();
    else stopInterval();
    return () => stopInterval();
  }, [isHovered, maxIndex]);

  const goTo = (dir: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (dir === 'prev') return prev <= 0 ? maxIndex : prev - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
    stopInterval();
    if (!isHovered) startInterval();
  };

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    setSearchQuery(val);
    if (val.length > 0) {
      const filtered = searchSuggestions.filter((s) =>
        s.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 6));
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
    setSearchQuery(suggestion);
    setShowDropdown(false);
    const q = suggestion.toLowerCase();
    const match = items.find((item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
    if (match) {
      onCardClick(match.slug, match.title);
    } else {
      onCardClick(q.replace(/\s+/g, '-'), suggestion);
    }
  };

  const handleSearchSubmit = () => {
    const raw = searchQuery.trim();
    if (!raw) return;
    const q = raw.toLowerCase();
    const match = items.find((item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.slug.includes(q.replace(/\s+/g, '-'))
    );
    if (match) {
      onCardClick(match.slug, match.title);
    } else {
      onCardClick(raw.replace(/\s+/g, '-'), raw);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cardWidth = 100 / visibleCount;

  return (
    <div className="mb-16">
      {/* Section header */}
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1 rounded-full text-sm font-golos font-medium mb-3"
          style={{ backgroundColor: 'rgba(129,178,154,0.15)', color: 'var(--sage)' }}>
          Медицинская информация
        </span>
        <h2 className="font-cormorant font-bold text-4xl md:text-5xl text-dark-text mb-3">{title}</h2>
        <p className="text-light-text font-golos text-base max-w-lg mx-auto">{subtitle}</p>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Arrows */}
        <button
          onClick={() => goTo('prev')}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-sage hover:text-white transition-all duration-200 hover:scale-110 text-dark-text"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button
          onClick={() => goTo('next')}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-sage hover:text-white transition-all duration-200 hover:scale-110 text-dark-text"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Cards wrapper */}
        <div className="overflow-hidden px-2">
          <div
            className="flex gap-5 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: `translateX(calc(-${currentIndex * (cardWidth + (20 / items.length))}% - ${currentIndex * 20 / items.length * items.length}px))` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="disease-card flex-shrink-0 bg-card-bg rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
                style={{ width: `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 20 / visibleCount}px)` }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    {item.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-golos font-semibold text-dark-text text-base mb-1 leading-tight">{item.title}</h3>
                  <p className="text-light-text text-sm font-golos leading-relaxed">{item.description}</p>
                </div>
                <button
                  onClick={() => onCardClick(item.slug, item.title)}
                  className="btn-flash w-full py-2.5 rounded-xl text-sm font-semibold font-golos text-white transition-all duration-200"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                >
                  Перейти →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: currentIndex === i ? '24px' : '8px',
                height: '8px',
                backgroundColor: currentIndex === i ? 'var(--sage)' : 'rgba(129,178,154,0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Search block */}
      <div className="mt-10 max-w-2xl mx-auto">
        <div className="p-6 rounded-2xl border border-dashed border-sage/40 bg-sage/5">
          <p className="text-center text-light-text font-golos text-sm mb-4">
            Не нашли нужное? Введите название для поиска подробной информации
          </p>
          <div ref={searchRef} className="relative flex gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text" />
              <input
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
              />
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-scale-in">
                  {filteredSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      className="autocomplete-item w-full text-left px-4 py-2.5 text-sm font-golos text-dark-text border-b border-gray-50 last:border-0 transition-colors"
                    >
                      <span className="text-sage mr-2">🔍</span> {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleSearchSubmit}
              className="btn-flash px-6 py-3 rounded-xl font-golos font-semibold text-sm text-white whitespace-nowrap"
              style={{ backgroundColor: 'var(--terracotta)' }}
            >
              Перейти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}