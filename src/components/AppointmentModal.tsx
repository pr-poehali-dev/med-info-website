import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'consultation' | 'question';
}

export default function AppointmentModal({ isOpen, onClose, initialType = 'consultation' }: AppointmentModalProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', question: '', type: initialType });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setForm((f) => ({ ...f, type: initialType }));
    } else {
      document.body.style.overflow = '';
      setTimeout(() => { setSent(false); setError(''); }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, initialType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('https://functions.poehali.dev/738ab5f4-e4a5-4876-9612-59d7c21e4876', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', phone: '', question: '', type: 'consultation' });
      } else {
        setError('Ошибка отправки. Попробуйте позже или позвоните нам.');
      }
    } catch {
      setError('Ошибка сети. Попробуйте позже.');
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scale-in overflow-hidden"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Top gradient bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, var(--sage), var(--mint), var(--terracotta))' }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-light-text hover:bg-gray-100 hover:text-dark-text transition-all"
        >
          <Icon name="X" size={18} />
        </button>

        <div className="p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'linear-gradient(135deg, rgba(129,178,154,0.2), rgba(167,224,224,0.2))' }}>
                <Icon name="CheckCircle" size={42} className="text-sage" />
              </div>
              <h3 className="font-cormorant font-bold text-3xl text-dark-text mb-2">Заявка принята!</h3>
              <p className="text-light-text font-golos text-base mb-6 max-w-xs">
                Мы свяжемся с вами в течение рабочего дня для подтверждения.
              </p>
              <button
                onClick={onClose}
                className="btn-flash px-8 py-3 rounded-xl font-golos font-semibold text-white"
                style={{ backgroundColor: 'var(--sage)' }}
              >
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, var(--sage), var(--mint))' }}>
                    <Icon name="Calendar" size={20} className="text-white" />
                  </div>
                  <h2 className="font-cormorant font-bold text-2xl text-dark-text">Записаться на консультацию</h2>
                </div>
                <p className="text-light-text font-golos text-sm pl-14">
                  Заполните форму — мы перезвоним для уточнения времени
                </p>
              </div>

              {/* Type selector */}
              <div className="flex gap-2 mb-5">
                {[
                  { val: 'consultation', label: 'Консультация' },
                  { val: 'question', label: 'Вопрос врачу' },
                ].map((t) => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() => setForm({ ...form, type: t.val })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-golos font-medium transition-all duration-200 ${
                      form.type === t.val ? 'text-white shadow-md' : 'bg-gray-50 text-light-text hover:bg-gray-100'
                    }`}
                    style={form.type === t.val ? { backgroundColor: 'var(--terracotta)' } : {}}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

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
                <div className="grid grid-cols-2 gap-3">
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
                    <label className="block text-sm font-golos font-medium text-dark-text mb-1.5">Телефон *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-golos font-medium text-dark-text mb-1.5">
                    {form.type === 'question' ? 'Ваш вопрос *' : 'Цель консультации'}
                  </label>
                  <textarea
                    required={form.type === 'question'}
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    placeholder={form.type === 'question' ? 'Опишите ваш вопрос...' : 'Опишите кратко цель визита (необязательно)'}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-golos text-sm text-dark-text placeholder:text-light-text focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-golos"
                    style={{ backgroundColor: 'rgba(224,122,95,0.1)', color: 'var(--terracotta)' }}>
                    <Icon name="AlertCircle" size={16} />
                    {error}
                  </div>
                )}

                <p className="text-xs text-light-text font-golos">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <span className="text-sage cursor-pointer hover:underline">политикой конфиденциальности</span>.
                </p>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-flash w-full py-4 rounded-xl font-golos font-bold text-white text-base shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} className="text-white" />
                      {form.type === 'question' ? 'Задать вопрос' : 'Записаться'}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}