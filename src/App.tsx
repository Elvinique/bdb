import React from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Homepage & Section Components
import { HeroSection } from './components/home/HeroSection';
import { TrustPrinciplesStrip } from './components/home/TrustPrinciplesStrip';
import { WhyIAmRunningSection } from './components/home/WhyIAmRunningSection';
import { GreenChamberMandateSection } from './components/home/GreenChamberMandateSection';
import { AboutCandidateSection } from './components/home/AboutCandidateSection';
import { VisionPrioritiesSection } from './components/home/VisionPrioritiesSection';
import { InteractivePlanSection } from './components/home/InteractivePlanSection';
import { ConstituencySection } from './components/home/ConstituencySection';
import { CommunityVoiceSection } from './components/home/CommunityVoiceSection';
import { DonationSection } from './components/home/DonationSection';
import { TransparencySection } from './components/home/TransparencySection';
import { GetInvolvedSection } from './components/home/GetInvolvedSection';
import { EventsSection } from './components/home/EventsSection';
import { NewsSection } from './components/home/NewsSection';
import { SocialMediaFeedSection } from './components/home/SocialMediaFeedSection';
import { GallerySection } from './components/home/GallerySection';
import { ContactSection } from './components/home/ContactSection';
import { FinalCtaSection } from './components/home/FinalCtaSection';

// Campaign Communications Helpdesk
import { CampaignChatbot } from './components/chat/CampaignChatbot';

// Admin Console
import { AdminDashboard } from './components/admin/AdminDashboard';

// Interactive Modals
import { DonationModal } from './components/modals/DonationModal';
import { VolunteerModal } from './components/modals/VolunteerModal';
import { PriorityDeepDiveModal } from './components/modals/PriorityDeepDiveModal';
import { EventRsvpModal } from './components/modals/EventRsvpModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { LegalModal } from './components/modals/LegalModal';
import { CandidateConfigModal } from './components/modals/CandidateConfigModal';
import { AdminLoginModal } from './components/modals/AdminLoginModal';

// Toast Notification View
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { notifications, dismissNotification } = useCampaign();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start justify-between gap-3 text-xs transition animate-in slide-in-from-bottom-2 ${
            n.type === 'success'
              ? 'bg-emerald-900 border-emerald-700 text-white'
              : n.type === 'warning'
              ? 'bg-amber-900 border-amber-700 text-white'
              : 'bg-stone-900 border-stone-700 text-white'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />}
            {n.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />}
            {n.type === 'info' && <Info className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" />}
            <div>
              <p className="font-bold">{n.title}</p>
              <p className="text-stone-300 mt-0.5 leading-relaxed">{n.message}</p>
            </div>
          </div>

          <button
            onClick={() => dismissNotification(n.id)}
            className="text-stone-400 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

const CampaignApp: React.FC = () => {
  const { currentPage, isAdminAuthenticated } = useCampaign();

  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center p-4">
          <AdminLoginModal isOpenDirect={true} />
          <ToastContainer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-stone-900">
        <AdminDashboard />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 selection:bg-emerald-800 selection:text-white">
      {/* Primary Sticky Campaign Navigation */}
      <Navbar />

      {/* Main Content Area Based on Current Route */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection />
            <TrustPrinciplesStrip />
            <WhyIAmRunningSection />
            <GreenChamberMandateSection />
            <AboutCandidateSection />
            <VisionPrioritiesSection />
            <InteractivePlanSection />
            <ConstituencySection />
            <CommunityVoiceSection />
            <DonationSection />
            <TransparencySection />
            <GetInvolvedSection />
            <EventsSection />
            <NewsSection />
            <SocialMediaFeedSection />
            <GallerySection />
            <ContactSection />
            <FinalCtaSection />
          </>
        )}

        {currentPage === 'about' && (
          <>
            <WhyIAmRunningSection />
            <GreenChamberMandateSection />
            <AboutCandidateSection />
            <FinalCtaSection />
          </>
        )}

        {(currentPage === 'vision' || currentPage === 'priorities') && (
          <>
            <GreenChamberMandateSection />
            <VisionPrioritiesSection />
            <InteractivePlanSection />
            <FinalCtaSection />
          </>
        )}

        {currentPage === 'constituency' && (
          <>
            <ConstituencySection />
            <CommunityVoiceSection />
            <FinalCtaSection />
          </>
        )}

        {currentPage === 'events' && (
          <>
            <EventsSection />
            <SocialMediaFeedSection />
            <FinalCtaSection />
          </>
        )}

        {currentPage === 'news' && (
          <>
            <NewsSection />
            <SocialMediaFeedSection />
            <FinalCtaSection />
          </>
        )}

        {currentPage === 'get-involved' && (
          <>
            <GetInvolvedSection />
            <DonationSection />
            <FinalCtaSection />
          </>
        )}

        {currentPage === 'contact' && (
          <>
            <ContactSection />
            <CommunityVoiceSection />
          </>
        )}
      </main>

      {/* Multi-Column Legal & Civic Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <DonationModal />
      <VolunteerModal />
      <PriorityDeepDiveModal />
      <EventRsvpModal />
      <ArticleModal />
      <LegalModal />
      <CandidateConfigModal />
      <AdminLoginModal />

      {/* Global Campaign Communications Helpdesk */}
      <CampaignChatbot />

      {/* Global Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CampaignProvider>
      <CampaignApp />
    </CampaignProvider>
  );
}
