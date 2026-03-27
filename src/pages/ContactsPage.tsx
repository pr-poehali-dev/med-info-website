import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen mesh-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-golos font-medium mb-4"
            style={{ backgroundColor: 'rgba(224,122,95,0.1)', color: 'var(--terracotta)' }}>
            Свяжитесь с нами
          </span>
          <h1 className="font-cormorant font-bold text-5xl md:text-6xl text-dark-text mb-4">Контакты</h1>
          <p className="text-light-text font-golos text-lg max-w-xl mx-auto">
            Задайте вопрос редакции или оставьте обратную связь
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-cormorant font-bold text-2xl text-dark-text mb-6">Наши контакты</h2>
              <div className="flex flex-col gap-5">
                {[
                  { icon: 'MapPin', label: 'Адрес', value: 'г. Москва, ул. Медицинская, 12, офис 305', color: 'var(--sage)' },
                  { icon: 'Phone', label: 'Телефон', value: '+7 (495) 123-45-67', color: 'var(--sage)' },
                  { icon: 'Mail', label: 'Email', value: 'info@medinfo.ru', color: 'var(--sage)' },
                  { icon: 'Clock', label: 'Режим работы', value: 'Пн–Пт: 9:00–18:00', color: 'var(--sage)' },
                ].map((c) => (
                  <div key={c.label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(129,178,154,0.12)' }}>
                      <Icon name={c.icon as 'MapPin'} size={18} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-light-text font-golos mb-0.5">{c.label}</p>
                      <p className="text-dark-text font-golos font-medium text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white h-52 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(129,178,154,0.1), rgba(167,224,224,0.1))' }}>
              <div className="text-center">
                <Icon name="MapPin" size={40} className="text-sage mx-auto mb-3" />
                <p className="text-light-text font-golos text-sm">Карта появится здесь</p>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-golos font-semibold text-dark-text mb-4">Мы в социальных сетях</h3>
              <div className="flex gap-3">
                {[
                  { icon: 'MessageCircle', label: 'Telegram', bg: '#2AABEE' },
                  { icon: 'Youtube', label: 'YouTube', bg: '#FF0000' },
                  { icon: 'Share2', label: 'VK', bg: '#0077FF' },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="btn-flash flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-golos font-medium"
                    style={{ backgroundColor: s.bg }}
                    title={s.label}
                  >
                    <Icon name={s.icon as 'MessageCircle'} size={16} className="text-white" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center animate-scale-in">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(129,178,154,0.15)' }}>
                  <Icon name="CheckCircle" size={40} className="text-sage" />
                </div>
                <h3 className="font-cormorant font-bold text-3xl text-dark-text mb-3">Сообщение отправлено!</h3>
                <p className="text-light-text font-golos">Мы свяжемся с вами в течение рабочего дня.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 btn-flash px-6 py-3 rounded-xl font-golos font-semibold text-white"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-cormorant font-bold text-2xl text-dark-text mb-6">Обратная связь</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-golos font-medium text-dark-text mb-1.5">Ваше имя *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-golos font-medium text-dark-text mb-1.5">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ivan@mail.ru"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-golos font-medium text-dark-text mb-1.5">Телефон</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-golos font-medium text-dark-text mb-1.5">Сообщение *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ваш вопрос или предложение..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all resize-none"
                    />
                  </div>
                  <p className="text-xs text-light-text font-golos">
                    Нажимая «Отправить», вы соглашаетесь с <span className="text-sage cursor-pointer hover:underline">политикой конфиденциальности</span>.
                  </p>
                  <button
                    type="submit"
                    className="btn-flash w-full py-4 rounded-xl font-golos font-bold text-white text-base shadow-md flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--terracotta)' }}
                  >
                    <Icon name="Send" size={18} className="text-white" />
                    Отправить сообщение
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
