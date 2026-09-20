import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  CampaignConfig,
  LegislativePriority,
  NewsArticle,
  CampaignEvent,
  DonationRecord,
  VolunteerRecord,
  CommunityFeedbackRecord,
  TransparencyData,
  CampaignFinanceConfig,
  AuditLogRecord,
  AdminRole
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
import { getSupabase } from '../lib/supabase/client';

export type AppView =
  | 'home'
  | 'about'
  | 'vision'
  | 'priorities'
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

export const DEFAULT_FINANCE_CONFIG: CampaignFinanceConfig = {
  office: 'HOUSE_OF_REPRESENTATIVES',
  constituency: 'Khana/Gokana Federal Constituency',
  expenditureLimitNgn: 100000000, // Electoral Act limit for House of Reps
  individualContributionLimitNgn: 50000000,
  effectiveFrom: '2026-01-01',
  legalAuthority: 'Electoral Act 2022, Section 88(4)',
  reviewedAt: '2026-09-19',
  reviewedBy: 'Legal & Compliance Directorate (NNPP Rivers)',
  enabled: false // PRD Section 18 & 52: disabled until verified compliance sign-off
};

export const INITIAL_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'aud-001',
    actor: 'admin@buradumforhouse.ng',
    role: 'SUPER_ADMIN',
    action: 'SYSTEM_INITIALIZATION',
    resource: 'CAMPAIGN_PLATFORM',
    resourceId: 'SYS-2027',
    timestamp: '2026-09-19 12:00:00 WAT',
    status: 'SUCCESS',
    details: 'Campaign digital operations hub initialized with Khana/Gokana 36-ward structure.'
  },
  {
    id: 'aud-002',
    actor: 'legal@buradumforhouse.ng',
    role: 'COMPLIANCE_OFFICER',
    action: 'COMPLIANCE_REVIEW_LOCKED',
    resource: 'FINANCE_CONFIG',
    resourceId: 'ELECTORAL-ACT-2022',
    timestamp: '2026-09-19 14:30:00 WAT',
    status: 'SUCCESS',
    details: 'Fundraising build gate verified. Live processing disabled pending bank merchant validation.'
  }
];

interface CampaignContextType {
  config: CampaignConfig;
  isSampleMode: boolean;
  isSampleProfile: boolean;
  setIsSampleMode: (val: boolean) => void;
  toggleProfileMode: () => void;
  updateConfigField: (field: keyof CampaignConfig, val: any) => void;
  updateCandidateConfig: (partial: Partial<CampaignConfig>) => void;

  activeView: AppView;
  currentPage: AppView;
  setActiveView: (view: AppView) => void;
  setCurrentPage: (view: AppView) => void;
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
  donationPrefillData: { donorName?: string; email?: string; phone?: string } | null;
  setDonationPrefillData: (data: { donorName?: string; email?: string; phone?: string } | null) => void;
  isLegalModalOpen: boolean;
  setIsLegalModalOpen: (open: boolean) => void;
  legalModalTab: 'finance' | 'terms' | 'privacy';
  setLegalModalTab: (tab: 'finance' | 'terms' | 'privacy') => void;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;

  // Interactive Live Data
  donations: DonationRecord[];
  donationRecords: DonationRecord[];
  addDonation: (donation: Omit<DonationRecord, 'id' | 'date' | 'reference' | 'status'> & { reference?: string; paymentProvider?: string }) => DonationRecord;
  updateDonationStatus: (id: string, status: DonationRecord['status']) => void;

  volunteers: VolunteerRecord[];
  volunteersList: VolunteerRecord[];
  addVolunteer: (vol: Omit<VolunteerRecord, 'id' | 'dateJoined' | 'status'>) => VolunteerRecord;
  updateVolunteerStatus: (id: string, status: VolunteerRecord['status']) => void;

  feedbackList: CommunityFeedbackRecord[];
  addFeedback: (item: Omit<CommunityFeedbackRecord, 'id' | 'dateSubmitted' | 'status'>) => CommunityFeedbackRecord;
  updateFeedbackStatus: (id: string, status: CommunityFeedbackRecord['status']) => void;

  events: CampaignEvent[];
  registerForEvent: (eventId: string, registrant: { name: string; email: string; phone: string; seats: number }) => boolean;
  transparencyData: TransparencyData;

  // Compliance & Audit
  campaignFinanceConfig: CampaignFinanceConfig;
  setCampaignFinanceConfig: (config: CampaignFinanceConfig) => void;
  fundraisingEnabled: boolean;
  setFundraisingEnabled: (val: boolean) => void;
  auditLogs: AuditLogRecord[];
  addAuditLog: (log: Omit<AuditLogRecord, 'id' | 'timestamp'>) => void;

  // Feedback Notifications
  notifications: ToastNotification[];
  dismissNotification: (id: string) => void;
  notify: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSampleMode, setIsSampleMode] = useState<boolean>(true);
  const [customConfig, setCustomConfig] = useState<CampaignConfig>(SAMPLE_CANDIDATE_CONFIG);
  const [activeView, setActiveView] = useState<AppView>('home');

  // Modals
  const [selectedPriority, setSelectedPriority] = useState<LegislativePriority | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<CampaignEvent | null>(null);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState<boolean>(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [donationPresetAmount, setDonationPresetAmount] = useState<number | null>(null);
  const [donationPrefillData, setDonationPrefillData] = useState<{ donorName?: string; email?: string; phone?: string } | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<'finance' | 'terms' | 'privacy'>('finance');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  // Records
  const [donations, setDonations] = useState<DonationRecord[]>(INITIAL_DONATIONS);
  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>(INITIAL_VOLUNTEERS);
  const [feedbackList, setFeedbackList] = useState<CommunityFeedbackRecord[]>(INITIAL_FEEDBACK);
  const [events, setEvents] = useState<CampaignEvent[]>(CAMPAIGN_EVENTS);
  const [transparencyData, setTransparencyData] = useState<TransparencyData>(INITIAL_TRANSPARENCY_DATA);

  // Compliance & Audit
  const [campaignFinanceConfig, setCampaignFinanceConfig] = useState<CampaignFinanceConfig>(DEFAULT_FINANCE_CONFIG);
  const [fundraisingEnabled, setFundraisingEnabled] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(INITIAL_AUDIT_LOGS);

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

  const toggleProfileMode = () => {
    setIsSampleMode((prev) => !prev);
  };

  const updateConfigField = (field: keyof CampaignConfig, val: any) => {
    setCustomConfig((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const updateCandidateConfig = (partial: Partial<CampaignConfig>) => {
    setCustomConfig((prev) => ({
      ...prev,
      ...partial
    }));
  };

  const navigateTo = (view: AppView, elementId?: string) => {
    setActiveView(view);
    if ((view === 'home' || view === 'about' || view === 'vision' || view === 'constituency') && elementId) {
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

  const addAuditLog = (log: Omit<AuditLogRecord, 'id' | 'timestamp'>) => {
    const newEntry: AuditLogRecord = {
      ...log,
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' WAT'
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const addDonation = (donationData: Omit<DonationRecord, 'id' | 'date' | 'reference' | 'status'> & { reference?: string; paymentProvider?: string }): DonationRecord => {
    const newRecord: DonationRecord = {
      ...donationData,
      id: 'DON-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      reference: donationData.reference || ('TX-BDB-FLW-' + Date.now().toString(36).toUpperCase()),
      paymentProvider: donationData.paymentProvider || 'flutterwave',
      status: 'Verified'
    };
    setDonations((prev) => [newRecord, ...prev]);
    setTransparencyData((prev) => ({
      ...prev,
      totalContributionsAmount: prev.totalContributionsAmount + donationData.amount,
      supporterCount: prev.supporterCount + 1
    }));
    addAuditLog({
      actor: donationData.donorName,
      role: 'VIEWER',
      action: 'DONATION_RECORDED',
      resource: 'DONATIONS',
      resourceId: newRecord.reference,
      status: 'SUCCESS',
      details: `Donation of ₦${donationData.amount.toLocaleString()} verified via ${donationData.paymentMethod} (${newRecord.paymentProvider === 'flutterwave' ? 'Flutterwave' : newRecord.paymentProvider}).`
    });

    // Sync to Supabase if configured
    const sb = getSupabase();
    if (sb) {
      sb.from('donations')
        .insert({
          reference: newRecord.reference,
          donor_name: newRecord.donorName,
          email: newRecord.email,
          phone: newRecord.phone || null,
          amount: newRecord.amount,
          payment_method: newRecord.paymentMethod,
          payment_provider: newRecord.paymentProvider || 'flutterwave',
          status: 'VERIFIED'
        })
        .then(({ error }) => {
          if (error) console.warn('Supabase donation sync note:', error.message);
        });
    }

    notify(
      'Donation Confirmed',
      `Thank you, ${donationData.donorName}! ₦${donationData.amount.toLocaleString()} received for the campaign. Reference: ${newRecord.reference}`,
      'success'
    );
    return newRecord;
  };

  const updateDonationStatus = (id: string, status: DonationRecord['status']) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
    addAuditLog({
      actor: 'finance_admin',
      role: 'FINANCE_ADMIN',
      action: 'DONATION_STATUS_CHANGE',
      resource: 'DONATIONS',
      resourceId: id,
      status: 'SUCCESS',
      details: `Donation ${id} status updated to ${status}`
    });
    notify('Status Updated', `Donation ${id} updated to ${status}.`, 'info');
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
    addAuditLog({
      actor: volData.fullName,
      role: 'VIEWER',
      action: 'VOLUNTEER_REGISTERED',
      resource: 'VOLUNTEERS',
      resourceId: newVol.id,
      status: 'SUCCESS',
      details: `Volunteer registered in ${volData.lga} (Ward: ${volData.ward}).`
    });

    // Sync to Supabase if configured
    const sb = getSupabase();
    if (sb) {
      sb.from('volunteers')
        .insert({
          volunteer_code: newVol.id,
          full_name: newVol.fullName,
          email: newVol.email,
          phone: newVol.phone,
          lga: newVol.lga,
          ward: newVol.ward,
          community: newVol.community,
          areas: newVol.areas || newVol.interests || [],
          availability: newVol.availability || 'Weekends',
          skills: newVol.skills || '',
          status: 'ACTIVE'
        })
        .then(({ error }) => {
          if (error) console.warn('Supabase volunteer sync note:', error.message);
        });
    }

    notify(
      'Welcome to the Movement!',
      `Thank you, ${volData.fullName}! Your volunteer profile has been registered in the campaign system.`,
      'success'
    );
    return newVol;
  };

  const updateVolunteerStatus = (id: string, status: VolunteerRecord['status']) => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
    notify('Volunteer Updated', `Volunteer status changed to ${status}.`, 'info');
  };

  const addFeedback = (itemData: Omit<CommunityFeedbackRecord, 'id' | 'dateSubmitted' | 'status'>): CommunityFeedbackRecord => {
    const newFeedback: CommunityFeedbackRecord = {
      ...itemData,
      id: 'CFB-' + Math.floor(100 + Math.random() * 900),
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'Logged for Manifesto'
    };
    setFeedbackList((prev) => [newFeedback, ...prev]);
    addAuditLog({
      actor: itemData.fullName,
      role: 'VIEWER',
      action: 'COMMUNITY_FEEDBACK_SUBMITTED',
      resource: 'COMMUNITY_FEEDBACK',
      resourceId: newFeedback.id,
      status: 'SUCCESS',
      details: `Topic: ${itemData.topic} in ${itemData.lga}`
    });

    // Sync to Supabase if configured
    const sb = getSupabase();
    if (sb) {
      sb.from('community_feedback')
        .insert({
          reference_code: newFeedback.id,
          full_name: newFeedback.fullName,
          email: newFeedback.email || null,
          phone: newFeedback.phone || null,
          lga: newFeedback.lga,
          ward: newFeedback.ward,
          community: newFeedback.community,
          topic: newFeedback.topic,
          message: newFeedback.message,
          status: 'NEW'
        })
        .then(({ error }) => {
          if (error) console.warn('Supabase feedback sync note:', error.message);
        });
    }

    notify(
      'Community Concern Logged',
      `Thank you for speaking up! Your feedback on "${itemData.topic}" has been transmitted to our policy team.`,
      'success'
    );
    return newFeedback;
  };

  const updateFeedbackStatus = (id: string, status: CommunityFeedbackRecord['status']) => {
    setFeedbackList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
    notify('Concern Updated', `Status changed to ${status}.`, 'info');
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
      const passCode = 'PASS-' + Math.floor(100000 + Math.random() * 900000);
      addAuditLog({
        actor: registrant.name,
        role: 'VIEWER',
        action: 'EVENT_RSVP_RESERVED',
        resource: 'EVENTS',
        resourceId: eventId,
        status: 'SUCCESS',
        details: `${registrant.seats} seat(s) reserved by ${registrant.name}.`
      });

      // Sync RSVP to Supabase if configured
      const sb = getSupabase();
      if (sb) {
        sb.from('event_registrations')
          .insert({
            pass_code: passCode,
            event_id: eventId,
            attendee_name: registrant.name,
            email: registrant.email,
            phone: registrant.phone,
            seats: registrant.seats || 1
          })
          .then(({ error }) => {
            if (error) console.warn('Supabase event RSVP sync note:', error.message);
          });
      }

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
        isSampleProfile: isSampleMode,
        setIsSampleMode,
        toggleProfileMode,
        updateConfigField,
        updateCandidateConfig,
        activeView,
        currentPage: activeView,
        setActiveView,
        setCurrentPage: setActiveView,
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
        donationPrefillData,
        setDonationPrefillData,
        isLegalModalOpen,
        setIsLegalModalOpen,
        legalModalTab,
        setLegalModalTab,
        isConfigModalOpen,
        setIsConfigModalOpen,
        donations,
        donationRecords: donations,
        addDonation,
        updateDonationStatus,
        volunteers,
        volunteersList: volunteers,
        addVolunteer,
        updateVolunteerStatus,
        feedbackList,
        addFeedback,
        updateFeedbackStatus,
        events,
        registerForEvent,
        transparencyData,
        campaignFinanceConfig,
        setCampaignFinanceConfig,
        fundraisingEnabled,
        setFundraisingEnabled,
        auditLogs,
        addAuditLog,
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
