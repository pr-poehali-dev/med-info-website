import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAppointment: (type?: 'consultation' | 'question') => void;
}

const navItems = [
  { id: 'home', label: 'Главная' },
  {
    id: 'info', label: 'Информация', submenu: [
      { id: 'diseases', label: 'Заболевания' },
      { id: 'syndromes', label: 'Синдромы' },
    ]
  },
  { id: 'articles', label: 'Статьи' },
  { id: 'about', label: 'О нас' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Header({ currentPage, onNavigate, onOpenAppointment }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(false);

  const isInfoActive = currentPage === 'info' || currentPage === 'diseases' || currentPage === 'syndromes';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage to-mint flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Icon name="Heart" size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-cormorant font-bold text-xl text-dark-text leading-none">МедИнфо</div>
              <div className="text-xs text-light-text font-golos">Медицинская информация</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.submenu ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setSubmenuOpen(true)}
                    onMouseLeave={() => setSubmenuOpen(false)}
                  >
                    <button
                      className={`nav-link px-4 py-2 rounded-lg text-sm font-medium font-golos transition-all duration-200 flex items-center gap-1 hover:bg-sage/10 ${
                        isInfoActive ? 'text-sage active' : 'text-dark-text'
                      }`}
                    >
                      {item.label}
                      <Icon name="ChevronDown" size={14} className={`transition-transform ${submenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {submenuOpen && (
                      <div className="absolute top-full left-0 mt-1 w-44 glass rounded-xl shadow-xl border border-white/40 py-2 animate-scale-in">
                        {item.submenu.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => { onNavigate(sub.id); setSubmenuOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-sage/10 hover:text-sage transition-colors font-golos ${
                              currentPage === sub.id ? 'text-sage font-semibold' : 'text-dark-text'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`nav-link px-4 py-2 rounded-lg text-sm font-medium font-golos transition-all duration-200 hover:bg-sage/10 ${
                      currentPage === item.id ? 'text-sage active' : 'text-dark-text hover:text-sage'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenAppointment('consultation')}
              className="btn-flash px-5 py-2 rounded-xl text-sm font-semibold font-golos text-white shadow-md"
              style={{ backgroundColor: 'var(--terracotta)' }}
            >
              Записаться
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-sage/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} className="text-dark-text" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass border-t border-white/30 px-4 py-4 flex flex-col gap-2 animate-fade-in">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setMobileSubmenu(!mobileSubmenu)}
                      className="w-full text-left px-4 py-2 rounded-lg text-dark-text font-golos font-medium flex items-center justify-between hover:bg-sage/10"
                    >
                      {item.label}
                      <Icon name="ChevronDown" size={14} className={`transition-transform ${mobileSubmenu ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileSubmenu && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {item.submenu.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => { onNavigate(sub.id); setMenuOpen(false); }}
                            className={`text-left px-4 py-2 rounded-lg text-sm hover:bg-sage/10 hover:text-sage font-golos ${
                              currentPage === sub.id ? 'text-sage font-semibold' : 'text-light-text'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 rounded-lg font-golos font-medium hover:bg-sage/10 ${currentPage === item.id ? 'text-sage' : 'text-dark-text'}`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => { onOpenAppointment('consultation'); setMenuOpen(false); }}
              className="btn-flash mt-2 px-5 py-2 rounded-xl text-sm font-semibold font-golos text-white text-center"
              style={{ backgroundColor: 'var(--terracotta)' }}
            >
              Записаться на консультацию
            </button>
          </div>
        )}
    </header>
  );
}