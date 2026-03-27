import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import InfoPage from '@/pages/InfoPage';
import ArticlesPage from '@/pages/ArticlesPage';
import AboutPage from '@/pages/AboutPage';
import ContactsPage from '@/pages/ContactsPage';
import DetailPage from '@/pages/DetailPage';
import AppointmentModal from '@/components/AppointmentModal';

type Page = 'home' | 'info' | 'diseases' | 'syndromes' | 'articles' | 'about' | 'contacts' | 'detail';

interface DetailState {
  slug: string;
  title: string;
  type: 'disease' | 'syndrome';
  prevPage: Page;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [detail, setDetail] = useState<DetailState | null>(null);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState<'consultation' | 'question'>('consultation');

  const openAppointment = (type: 'consultation' | 'question' = 'consultation') => {
    setAppointmentType(type);
    setAppointmentOpen(true);
  };

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    setDetail(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemClick = (slug: string, title: string, type: 'disease' | 'syndrome') => {
    setDetail({ slug, title, type, prevPage: currentPage });
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (detail) {
      setCurrentPage(detail.prevPage);
      setDetail(null);
    } else {
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} onOpenAppointment={openAppointment} />;
      case 'info':
        return <InfoPage onNavigate={navigate} onItemClick={handleItemClick} scrollTo={null} />;
      case 'diseases':
        return <InfoPage onNavigate={navigate} onItemClick={handleItemClick} scrollTo="diseases" />;
      case 'syndromes':
        return <InfoPage onNavigate={navigate} onItemClick={handleItemClick} scrollTo="syndromes" />;
      case 'articles':
        return <ArticlesPage />;
      case 'about':
        return <AboutPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'detail':
        return detail ? (
          <DetailPage
            slug={detail.slug}
            title={detail.title}
            type={detail.type}
            onBack={handleBack}
          />
        ) : <HomePage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const headerPage = currentPage === 'detail' ? (detail?.prevPage || 'home') : currentPage;

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
        <Header currentPage={headerPage} onNavigate={navigate} onOpenAppointment={openAppointment} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer onNavigate={navigate} />
      </div>
      <AppointmentModal
        isOpen={appointmentOpen}
        initialType={appointmentType}
        onClose={() => setAppointmentOpen(false)}
      />
    </TooltipProvider>
  );
}