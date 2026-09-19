export interface CampaignConfig {
  candidateName: string;
  candidateTitle: string;
  constituencyName: string;
  stateName: string;
  partyName: string;
  partyAbbr?: string;
  partyLogoUrl?: string;
  campaignPosterUrl?: string;
  campaignSlogan: string;
  subSlogan: string;
  electionYear: string;
  campaignEmail: string;
  campaignPhone: string;
  headquartersAddress: string;
  candidatePhotoUrl: string;
  candidateSecondaryPhotoUrl: string;
  heroPhotoUrl: string;
  communityPhotoUrl: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  lgas: {
    name: string;
    wardsCount: number;
    headquarters: string;
    description: string;
    populationEst: string;
    keyNeeds: string[];
    priorityFocus: string;
  }[];
}

export interface CampaignPrinciple {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface LegislativePriority {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  challenge: string;
  approach: string;
  impact: string;
  keyInitiatives: string[];
  legislativeFocus: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  role: string;
  description: string;
  category: 'education' | 'career' | 'community' | 'public_service' | 'politics';
}

export interface CampaignEvent {
  id: string;
  title: string;
  type: 'Town Hall' | 'Ward Meeting' | 'Youth Engagement' | 'Women’s Assembly' | 'Community Outreach' | 'Policy Discussion';
  date: string;
  time: string;
  location: string;
  lga: string;
  description: string;
  capacity: number;
  registeredCount: number;
  isUpcoming: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Campaign' | 'Community' | 'Policy' | 'Events' | 'Updates';
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Community' | 'Events' | 'Meetings' | 'Youth' | 'Women' | 'Outreach';
  location: string;
  date: string;
  imageUrl: string;
  caption: string;
}

export type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'tiktok';

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  handle: string;
  authorName: string;
  authorAvatarUrl?: string;
  verified: boolean;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  publishedAt: string;
  timeAgo: string;
  location?: string;
  likesCount: number;
  sharesCount: number;
  commentsCount: number;
  postUrl: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  frequency: 'one-time' | 'monthly';
  lga?: string;
  state?: string;
  paymentMethod: string;
  reference: string;
  referenceCode?: string;
  date: string;
  timestamp?: string;
  status: 'Completed' | 'Pending' | 'Verified';
}

export interface VolunteerRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  lga: string;
  ward: string;
  community: string;
  areas?: string[];
  interests?: string[];
  availability?: string;
  skills?: string;
  message?: string;
  dateJoined: string;
  status: 'Active' | 'Under Review' | 'Contacted';
}

export interface CommunityFeedbackRecord {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  lga: string;
  ward: string;
  community: string;
  topic: string;
  message: string;
  dateSubmitted: string;
  status: 'Reviewed' | 'Pending Review' | 'Logged for Manifesto';
}

export interface TransparencyData {
  totalContributionsAmount: number;
  supporterCount: number;
  eventsCompleted: number;
  activeVolunteers: number;
  resourceAllocation: {
    category: string;
    percentage: number;
    amount: number;
    description: string;
    color: string;
  }[];
}

export interface CampaignFinanceConfig {
  office: 'HOUSE_OF_REPRESENTATIVES';
  constituency: string;
  expenditureLimitNgn: number | null;
  individualContributionLimitNgn: number | null;
  effectiveFrom: string | null;
  legalAuthority: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  enabled: boolean;
}

export type AdminRole =
  | 'SUPER_ADMIN'
  | 'CAMPAIGN_ADMIN'
  | 'CONTENT_MANAGER'
  | 'FINANCE_ADMIN'
  | 'COMPLIANCE_OFFICER'
  | 'VOLUNTEER_MANAGER'
  | 'EVENTS_MANAGER'
  | 'COMMUNICATIONS_MANAGER'
  | 'VIEWER';

export interface AuditLogRecord {
  id: string;
  actor: string;
  role: AdminRole;
  action: string;
  resource: string;
  resourceId?: string;
  timestamp: string;
  status: 'SUCCESS' | 'FLAGGED' | 'REVOKED';
  details?: string;
}

