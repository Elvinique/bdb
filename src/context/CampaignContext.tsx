import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  CampaignConfig,
  LegislativePriority,
  NewsArticle,
  CampaignEvent,
  DonationRecord,
  VolunteerRecord,
  CommunityFeedbackRecord,
  TransparencyData
} from '../types';
import {
  PLACEHOLDER_CONFIG,
  SAMPLE_CANDIDATE_CONFIG,
  INITIAL_DONATIONS,
  INITIAL_VOLUNTEERS,
  INITIAL_FEEDBACK,
  INITIAL_TRANSPARENCY_DATA,
  CAMPAIGN_EVENTS
} from '../config/campaignConfig';

export type AppView =
  | 'home'
  | 'about'
  | 'vision'
  | 'constituency'
  | 'news'
  | 'events'
  | 'get-involved'
  | 'donate'
  | 'contact'
  | 'admin';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CampaignContextType {
  config: CampaignConfig;
  isSampleMode: boolean;
  setIsSampleMode: (val: boolean) => void;
  updateConfigField: (field: keyof CampaignConfig, val: any) => void;
  
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  navigateTo: (view: AppView, elementId?: string) => void;

  // Modals
  selectedPriority: LegislativePriority | null;
  setSelectedPriority: (p: LegislativePriority | null) => void;
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (a: NewsArticle | null) => void;
  selectedEventForRsvp: CampaignEvent | null;
  setSelectedEventForRsvp: (e: CampaignEvent | null) => void;
  isVolunteerModalOpen: boolean;
  setIsVolunteerModalOpen: (open: boolean) => void;
  isDonationModalOpen: boolean;
  setIsDonationModalOpen: (open: boolean) => void;
  donationPresetAmount: number | null;
  setDonationPresetAmount: (amt: number | null) => void;
  isLegalModalOpen: boolean;
  setIsLegalModalOpen: (open: boolean) => void;
  legalModalTab: 'finance' | 'terms' | 'privacy';
  setLegalModalTab: (tab: 'finance' | 'terms' | 'privacy') => void;

  // Interactive Live Data
  donations: DonationRecord[];
  addDonation: (donation: Omit<DonationRecord, 'id' | 'date' | 'reference' | 'status'>) => DonationRecord;
  volunteers: VolunteerRecord[];
  addVolunteer: (vol: Omit<VolunteerRecord, 'id' | 'dateJoined' | 'status'>) => VolunteerRecord;
  feedbackList: CommunityFeedbackRecord[];
  addFeedback: (item: Omit<CommunityFeedbackRecord, 'id' | 'dateSubmitted' | 'status'>) => CommunityFeedbackRecord;
  events: CampaignEvent[];
  registerForEvent: (eventId: string, registrant: { name: string; email: string; phone: string; seats: number }) => boolean;
  transparencyData: TransparencyData;

  // Feedback Notifications
  notifications: ToastNotification[];
  dismissNotification: (id: string) => void;
  notify: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSampleMode, setIsSampleMode] = useState<boolean>(true); // Start with realistic presentation sample so it looks stunning immediately, with one-click toggle to raw placeholders
  const [customConfig, setCustomConfig] = useState<CampaignConfig>(SAMPLE_CANDIDATE_CONFIG);
  const [activeView, setActiveView] = useState<AppView>('home');

  // Modals
  const [selectedPriority, setSelectedPriority] = useState<LegislativePriority | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<CampaignEvent | null>(null);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState<boolean>(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [donationPresetAmount, setDonationPresetAmount] = useState<number | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<'finance' | 'terms' | 'privacy'>('finance');

  // Interactive records
  const [donations, setDonations] = useState<DonationRecord[]>(INITIAL_DONATIONS);
  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>(INITIAL_VOLUNTEERS);
  const [feedbackList, setFeedbackList] = useState<CommunityFeedbackRecord[]>(INITIAL_FEEDBACK);
  const [events, setEvents] = useState<CampaignEvent[]>(CAMPAIGN_EVENTS);
  const [transparencyData, setTransparencyData] = useState<TransparencyData>(INITIAL_TRANSPARENCY_DATA);

  // Notifications
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const notify = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'notif-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const newNotif: ToastNotification = { id, title, message, type };
    setNotifications((prev) => [...prev, newNotif]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4500);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const currentConfig = isSampleMode ? customConfig : PLACEHOLDER_CONFIG;

  const updateConfigField = (field: keyof CampaignConfig, val: any) => {
    setCustomConfig((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const navigateTo = (view: AppView, elementId?: string) => {
    setActiveView(view);
    if (view === 'home' && elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addDonation = (donationData: Omit<DonationRecord, 'id' | 'date' | 'reference' | 'status'>): DonationRecord => {
    const newRecord: DonationRecord = {
      ...donationData,
      id: 'DON-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      reference: 'TX-REF-' + Math.floor(100000 + Math.random() * 900000),
      status: 'Verified'
    };
    setDonations((prev) => [newRecord, ...prev]);
    setTransparencyData((prev) => ({
      ...prev,
      totalContributionsAmount: prev.totalContributionsAmount + donationData.amount,
      supporterCount: prev.supporterCount + 1
    }));
    notify(
      'Donation Confirmed (Prototype)',
      `Thank you, ${donationData.donorName}! ₦${donationData.amount.toLocaleString()} received for the campaign. Reference: ${newRecord.reference}`,
      'success'
    );
    return newRecord;
  };

  const addVolunteer = (volData: Omit<VolunteerRecord, 'id' | 'dateJoined' | 'status'>): VolunteerRecord => {
    const newVol: VolunteerRecord = {
      ...volData,
      id: 'VOL-' + Math.floor(100 + Math.random() * 900),
      dateJoined: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    setVolunteers((prev) => [newVol, ...prev]);
    setTransparencyData((prev) => ({
      ...prev,
      activeVolunteers: prev.activeVolunteers + 1
    }));
    notify(
      'Welcome to the Movement!',
      `Thank you, ${volData.fullName}! Your volunteer profile has been registered in the campaign system.`,
      'success'
    );
    return newVol;
  };

  const addFeedback = (itemData: Omit<CommunityFeedbackRecord, 'id' | 'dateSubmitted' | 'status'>): CommunityFeedbackRecord => {
    const newFeedback: CommunityFeedbackRecord = {
      ...itemData,
      id: 'CFB-' + Math.floor(100 + Math.random() * 900),
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'Logged for Manifesto'
    };
    setFeedbackList((prev) => [newFeedback, ...prev]);
    notify(
      'Community Concern Logged',
      `Thank you for speaking up! Your feedback on "${itemData.topic}" has been transmitted to our policy team.`,
      'success'
    );
    return newFeedback;
  };

  const registerForEvent = (eventId: string, registrant: { name: string; email: string; phone: string; seats: number }): boolean => {
    let found = false;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          found = true;
          return {
            ...e,
            registeredCount: Math.min(e.capacity, e.registeredCount + registrant.seats)
          };
        }
        return e;
      })
    );
    if (found) {
      notify(
        'RSVP Confirmed',
        `You have reserved ${registrant.seats} seat(s). We look forward to welcoming you!`,
        'success'
      );
    }
    return found;
  };

  return (
    <CampaignContext.Provider
      value={{
        config: currentConfig,
        isSampleMode,
        setIsSampleMode,
        updateConfigField,
        activeView,
        setActiveView,
        navigateTo,
        selectedPriority,
        setSelectedPriority,
        selectedArticle,
        setSelectedArticle,
        selectedEventForRsvp,
        setSelectedEventForRsvp,
        isVolunteerModalOpen,
        setIsVolunteerModalOpen,
        isDonationModalOpen,
        setIsDonationModalOpen,
        donationPresetAmount,
        setDonationPresetAmount,
        isLegalModalOpen,
        setIsLegalModalOpen,
        legalModalTab,
        setLegalModalTab,
        donations,
        addDonation,
        volunteers,
        addVolunteer,
        feedbackList,
        addFeedback,
        events,
        registerForEvent,
        transparencyData,
        notifications,
        dismissNotification,
        notify
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
