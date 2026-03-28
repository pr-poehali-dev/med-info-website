import Icon from '@/components/ui/icon';
import BowlWithSnake from '@/components/ui/bowl-with-snake';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-dark-text text-white mt-20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage to-mint flex items-center justify-center">
                <BowlWithSnake size={22} className="text-white" />
              </div>
              <div>
                <div className="font-cormorant font-bold text-xl leading-none">МедИнфо</div>
                <div className="text-xs text-white/50 font-golos">Медицинская информация</div>
              </div>
            </div>
            <p className="text-white/60 text-sm font-golos leading-relaxed">
              Достоверная медицинская информация, основанная на доказательной медицине и актуальных клинических рекомендациях.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-cormorant font-semibold text-lg mb-4 text-white">Разделы</h4>
            <ul className="flex flex-col gap-2">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'diseases', label: 'Заболевания' },
                { id: 'articles', label: 'Статьи' },
                { id: 'about', label: 'О нас' },
                { id: 'contacts', label: 'Контакты' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-white/60 hover:text-sage text-sm font-golos transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-cormorant font-semibold text-lg mb-4 text-white">Контакты</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <Icon name="MapPin" size={16} className="text-sage mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm font-golos">г. Москва, ул. Медицинская, 12, офис 305</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Phone" size={16} className="text-sage shrink-0" />
                <a href="tel:+74951234567" className="text-white/60 hover:text-sage text-sm font-golos transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Mail" size={16} className="text-sage shrink-0" />
                <a href="mailto:info@medinfo.ru" className="text-white/60 hover:text-sage text-sm font-golos transition-colors">
                  info@medinfo.ru
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Clock" size={16} className="text-sage shrink-0" />
                <span className="text-white/60 text-sm font-golos">Пн–Пт: 9:00–18:00</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-cormorant font-semibold text-lg mb-4 text-white">Мы в социальных сетях</h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: 'MessageCircle', label: 'Telegram' },
                { icon: 'Youtube', label: 'YouTube' },
                { icon: 'Instagram', label: 'VK' },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-sage/30 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  title={s.label}
                >
                  <Icon name={s.icon} fallback="Link" size={18} className="text-white" />
                </button>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs font-golos leading-relaxed">
                ⚠️ Информация на сайте носит ознакомительный характер и не заменяет консультацию врача.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-golos">© 2024 МедИнфо. Все права защищены.</p>
          <div className="flex gap-6">
            <button className="text-white/40 hover:text-white/70 text-sm font-golos transition-colors">
              Политика конфиденциальности
            </button>
            <button className="text-white/40 hover:text-white/70 text-sm font-golos transition-colors">
              Пользовательское соглашение
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}