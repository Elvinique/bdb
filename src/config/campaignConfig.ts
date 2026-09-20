import {
  CampaignConfig,
  CampaignPrinciple,
  LegislativePriority,
  MilestoneItem,
  CampaignEvent,
  NewsArticle,
  GalleryItem,
  DonationRecord,
  VolunteerRecord,
  CommunityFeedbackRecord,
  TransparencyData
} from '../types';

// Editable Placeholder Default Config (Matches requirements for presentation)
export const PLACEHOLDER_CONFIG: CampaignConfig = {
  candidateName: '[CANDIDATE NAME]',
  candidateTitle: 'Candidate for Federal House of Representatives',
  constituencyName: '[FEDERAL CONSTITUENCY]',
  stateName: '[STATE]',
  partyName: '[PARTY NAME]',
  campaignSlogan: 'A Stronger Voice for [FEDERAL CONSTITUENCY]',
  subSlogan: 'Service • Progress • Accountability',
  electionYear: '2027',
  campaignEmail: '[CAMPAIGN EMAIL]',
  campaignPhone: '[CAMPAIGN PHONE]',
  headquartersAddress: 'Plot [NUMBER], Campaign HQ Road, [COMMUNITY], [LGA], [STATE]',
  candidatePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  candidateSecondaryPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  heroPhotoUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1400&q=80',
  communityPhotoUrl: '/assets/images/bori-youth-empowerment-workshop.jpg',
  socialLinks: {
    facebook: 'https://facebook.com/campaign',
    twitter: 'https://x.com/campaign',
    instagram: 'https://instagram.com/campaign',
    youtube: 'https://youtube.com/campaign',
    tiktok: 'https://tiktok.com/@campaign'
  },
  lgas: [
    {
      name: '[PRIMARY LGA]',
      wardsCount: 10,
      headquarters: '[COMMUNITY CENTRAL]',
      description: 'Commercial and administrative hub with diverse residential settlements and trade markets.',
      populationEst: '~280,000',
      keyNeeds: ['Drainage & Flood Management', 'Vocational Skill Centres', 'Primary Health Centre Upgrade'],
      priorityFocus: 'Youth employment hubs and urban market infrastructure'
    },
    {
      name: '[SECONDARY LGA]',
      wardsCount: 11,
      headquarters: '[COMMUNITY NORTH]',
      description: 'Dynamic mix of agrarian communities, artisan clusters, and growing residential zones.',
      populationEst: '~215,000',
      keyNeeds: ['Feeder Roads', 'Rural Electrification', 'Agricultural Storage & Micro-credit'],
      priorityFocus: 'Smallholder farmer support and clean water projects'
    }
  ]
};

// Realistic Sample Config for presentation toggle
export const SAMPLE_CANDIDATE_CONFIG: CampaignConfig = {
  candidateName: 'Engr. Buradum Baribefe Daniel',
  candidateTitle: 'Candidate for Federal House of Representatives',
  constituencyName: 'Khana/Gokana Federal Constituency',
  stateName: 'Rivers State',
  partyName: 'New Nigeria Peoples Party (NNPP)',
  partyAbbr: 'NNPP',
  partyLogoUrl: '/assets/images/party-logo.png',
  campaignPosterUrl: '/assets/images/official-poster.png',
  campaignSlogan: "Let's Build As One",
  subSlogan: 'The Beacon of Hope 2027 • Service • Competence • Grassroots Development',
  electionYear: '2027',
  campaignEmail: 'contact@buradumforhouse.ng',
  campaignPhone: '+234 (0) 803 890 2027',
  headquartersAddress: 'Constituency Campaign Secretariat, Bori-Ogoni, Khana LGA, Rivers State, Nigeria',
  candidatePhotoUrl: '/assets/images/official-poster.png',
  candidateSecondaryPhotoUrl: '/assets/images/official-poster.png',
  heroPhotoUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1400&q=80',
  communityPhotoUrl: '/assets/images/bori-youth-empowerment-workshop.jpg',
  socialLinks: {
    facebook: 'https://facebook.com/buradumdaniel',
    twitter: 'https://x.com/engr_buradum',
    instagram: 'https://instagram.com/engr_buradum',
    youtube: 'https://youtube.com/@engr_buradum',
    tiktok: 'https://tiktok.com/@engr_buradum'
  },
  lgas: [
    {
      name: 'Khana Local Government Area',
      wardsCount: 19,
      headquarters: 'Bori (Ogoni Educational & Commercial Capital)',
      description: 'The historic commercial, educational, and cultural heartbeat of the Ogoni people, home to Ken Saro-Wiwa Polytechnic, bustling agricultural markets, and vibrant youth communities.',
      populationEst: '410,000',
      keyNeeds: ['UNEP Ecological Water Remediation', 'Modern Agricultural Cold Storage in Bori', 'Tertiary Student Bursaries & Tech Hub'],
      priorityFocus: 'Agro-processing corridors, clean water infrastructure, youth vocational engineering, and market development'
    },
    {
      name: 'Gokana Local Government Area',
      wardsCount: 17,
      headquarters: 'Kpor',
      description: 'A resourceful and dynamic agrarian and coastal LGA spanning historic communities including Kpor, Bodo, Bomu, Mogho, and Dere, renowned for rich agricultural enterprise and artisanal craftsmanship.',
      populationEst: '345,000',
      keyNeeds: ['Coastal Fishery & Artisan Tool Grants', 'Upgraded Primary Healthcare with 24/7 Solar', 'Youth Vocational Skills & Drainage Works'],
      priorityFocus: 'Fisheries revitalization, maternal healthcare solarization, and smallholder farmer empowerment'
    }
  ]
};

export const CAMPAIGN_PRINCIPLES: CampaignPrinciple[] = [
  {
    id: 'listen',
    title: 'LISTEN',
    tagline: 'Grassroots Engagement',
    description: 'Understanding the genuine daily needs of our communities through continuous listening tours and ward townhalls.',
    iconName: 'Ear'
  },
  {
    id: 'represent',
    title: 'REPRESENT',
    tagline: 'Uncompromising Advocacy',
    description: 'Giving every constituent a courageous, coherent, and respected voice on the floor of the National Assembly.',
    iconName: 'Megaphone'
  },
  {
    id: 'deliver',
    title: 'DELIVER',
    tagline: 'Measurable Development',
    description: 'Translating legislative mandates and constituency interventions into tangible projects that lift community well-being.',
    iconName: 'CheckCircle2'
  },
  {
    id: 'accountability',
    title: 'ACCOUNTABILITY',
    tagline: 'Transparent Stewardship',
    description: 'Keeping citizens continuously informed through bi-annual open scorecards, town meetings, and open-book stewardship.',
    iconName: 'ShieldCheck'
  }
];

export const LEGISLATIVE_PRIORITIES: LegislativePriority[] = [
  {
    id: 'education',
    title: 'Education & Skills Development',
    shortDescription: 'Modernizing primary & secondary learning environments, teacher incentives, and digital literacy labs.',
    detailedDescription: 'Every child in our federal constituency deserves access to inspiring schools, well-equipped science and tech classrooms, and committed teachers. We will advocate for targeted federal intervention funds and public-private partnerships.',
    iconName: 'GraduationCap',
    challenge: 'Public schools across our wards struggle with overstretched classrooms, limited digital tools, and insufficient learning aids for teachers.',
    approach: 'Sponsor motions for targeted Universal Basic Education (UBEC) special interventions while launching a Constituency Digital Skills Hub.',
    impact: 'Equipping 8,000+ public school students with modern STEM curriculum and refurbished classroom environments across all wards.',
    keyInitiatives: [
      'Constituency Digital Literacy and Coding Centers',
      'Annual Teacher Excellence Awards & Training Subsidies',
      'Tertiary Scholarship Fund for vulnerable and gifted students',
      'School Renovation and Solar Lighting Partnership'
    ],
    legislativeFocus: 'Co-sponsoring the National Education Infrastructure Modernization Bill and UBEC direct-grant oversight.'
  },
  {
    id: 'youth-employment',
    title: 'Youth & Sustainable Employment',
    shortDescription: 'Fostering tech pathways, entrepreneurship micro-funds, and vocational apprenticeship programs.',
    detailedDescription: 'Our young people are our greatest strength. We will build practical pipelines that connect talented youths with vocational certifications, tech remote jobs, creative enterprise funding, and trade incubators.',
    iconName: 'Briefcase',
    challenge: 'High youth underemployment persists despite great natural talent, due to lack of seed capital, formal apprenticeships, and digital infrastructure.',
    approach: 'Establish an active Constituency Enterprise Desk connecting youths to Bank of Industry loans, SMEDAN schemes, and tech work incubators.',
    impact: 'Directly catalyzing 2,500+ viable youth micro-enterprises and technical apprenticeships over the 4-year legislative term.',
    keyInitiatives: [
      'Constituency Innovation & Tech Workspace (Free High-Speed Access)',
      'Artisan Tools & Equipment Grant Program',
      'Annual Youth Job & Apprenticeship Expo with Rivers State & Niger Delta industry leaders',
      'Creative Arts & Digital Media Mentorship Series'
    ],
    legislativeFocus: 'Legislative advocacy for startup tax incentives and credit access for first-time young business founders.'
  },
  {
    id: 'healthcare',
    title: 'Accessible Primary Healthcare',
    shortDescription: 'Upgrading Primary Health Centres, 24/7 solar backup, maternal health kits, and emergency readiness.',
    detailedDescription: 'Healthcare must be reachable within walking distance of every neighborhood. We will fight for federal matching funds to rehabilitate primary healthcare centres (PHCs) so mothers, infants, and seniors get dignified care.',
    iconName: 'HeartPulse',
    challenge: 'Many local clinics lack uninterrupted electricity, essential generic drugs, and regular maternal healthcare screening apparatus.',
    approach: 'Leverage constituency intervention funding to install solar power in PHCs and sponsor quarterly free medical outreaches.',
    impact: 'Continuous 24-hour operation for at least 6 key Primary Health Centres and subsidized medicines for 15,000+ vulnerable residents.',
    keyInitiatives: [
      'Solar-for-Clinics Emergency Power Initiative',
      'Free Quarterly Maternal & Elderly Comprehensive Health Outreach',
      'Community Health Insurance Enrollment Subsidies',
      'First-Aid and Community EMT Volunteer Training'
    ],
    legislativeFocus: 'Advocacy on the implementation of the National Health Act (1% Consolidated Revenue Fund for Basic Healthcare).'
  },
  {
    id: 'infrastructure',
    title: 'Essential Infrastructure & Drainage',
    shortDescription: 'Advocating for critical road repairs, flood control drainages, streetlights, and potable water stations.',
    detailedDescription: 'Flooding and broken arterial connections cripple commerce and endanger lives. Our legislative team will interface directly with the Federal Ministry of Works, FERMA, and Ecological Fund Office to prioritize our constituency.',
    iconName: 'Building2',
    challenge: 'Key interconnecting feeder roads suffer erosion, and inadequate drainage networks cause perennial seasonal flash floods in commercial zones.',
    approach: 'Rigorous budgetary lobbying during annual federal appropriation to ensure FERMA and Ecological Fund allocations target constituency hotspots.',
    impact: 'Systematic unclogging and lining of major drainage corridors, installation of solar street lighting along trade avenues.',
    keyInitiatives: [
      'Priority Feeder Road Rehabilitation Advocacy',
      'Solar Street Lighting for Market Centers & Dark Alleys',
      'Community Borehole & Clean Water Resiliency Project',
      'Flooding & Ecological Disaster Rapid Advocacy Cell'
    ],
    legislativeFocus: 'Proactive participation in House Committee on Works, Environment, and Public Petitions.'
  },
  {
    id: 'economy',
    title: 'Agriculture, Commerce & Local Markets',
    shortDescription: 'Providing credit linkages, modern market storage, trade associations advocacy, and cooperative development.',
    detailedDescription: 'Traders, market women, artisans, and peri-urban farmers are the economic backbone of our constituency. We will facilitate low-interest cooperative loan linkages and protect small businesses from arbitrary multiple taxation.',
    iconName: 'TrendingUp',
    challenge: 'Market traders face exorbitant uncoordinated fees, lack of cold-chain or secure dry storage, and high micro-finance interest rates.',
    approach: 'Partner with registered trade associations to establish a zero-interest Revolving Cooperative Fund and advocate against multi-taxation.',
    impact: 'Empowering 3,000+ market men, women, and cooperative members with financial inclusion and market shelter upgrades.',
    keyInitiatives: [
      'Market Women Cooperative Seed Capital Grants',
      'Advocacy Against Multiple Regulatory Levies on MSMEs',
      'Sanitary Facilities & Waste Disposal Upgrades in Markets',
      'Digital Bookkeeping and Tax Advisory Clinics for Traders'
    ],
    legislativeFocus: 'Motions calling for streamlined federal regulatory enforcement by SMEDAN, NAFDAC, and SON for micro-producers.'
  },
  {
    id: 'women',
    title: 'Women & Inclusive Development',
    shortDescription: 'Expanding women economic leadership, legal defense for survivors of gender violence, and childcare options.',
    detailedDescription: 'When women thrive, families and communities flourish. We will champion policies and community projects that protect women rights, grant access to credit, and support mothers who balance enterprise and caregiving.',
    iconName: 'Users',
    challenge: 'Female entrepreneurs face greater obstacles in collateral requirements, and community safety networks for vulnerable women are underfunded.',
    approach: 'Establish a dedicated Women Development & Enterprise Bureau within our Constituency Office.',
    impact: 'Support 1,200 women-led households with vocational training, seed equipment (sewing, catering, craft), and legal counsel aid.',
    keyInitiatives: [
      'The SheLeads Constituency Micro-Enterprise Grants',
      'Free Legal Support Clinic for Domestic Vulnerabilities',
      'Maternal Nutrition & Early Childhood Care Kits',
      'Widows Support & Sustainable Livelihood Program'
    ],
    legislativeFocus: 'Passage and enforcement of inclusive economic empowerment frameworks and gender equity legislation.'
  },
  {
    id: 'security',
    title: 'Community Safety & Civic Resilience',
    shortDescription: 'Strengthening community policing partnerships, youth peace clubs, and emergency response desks.',
    detailedDescription: 'Sustainable development requires a peaceful, orderly environment. We will bridge communication between local vigilante groups, conventional security agencies, traditional rulers, and youth leadership.',
    iconName: 'ShieldAlert',
    challenge: 'Isolated pockets of street cultism, petty crimes, and delayed police response times create neighborhood anxiety.',
    approach: 'Facilitate quarterly Community Peace & Security Roundtables and fund neighborhood solar surveillance/lighting for hotspot alleys.',
    impact: 'Strengthened trust between residents and security agencies, reduced delinquency through constructive sports and trade diversion.',
    keyInitiatives: [
      'Constituency Peace & Community Policing Roundtables',
      'Neighbourhood Watch Equipment & Reflective Gear Support',
      'Anti-Substance Abuse Youth Campaigns in Schools',
      'Constituency Emergency Hotline & Distress Advisory'
    ],
    legislativeFocus: 'Advocacy for the constitutional reform of policing structures and decentralized security funding.'
  },
  {
    id: 'representation',
    title: 'Effective & Transparent Representation',
    shortDescription: 'Bi-annual Town Hall assemblies, open physical constituency offices, and digital feedback pipelines.',
    detailedDescription: 'You will never have to search for your lawmaker after election day. We are establishing an open-door Constituency Headquarters, manned by qualified community caseworkers, with open public account sessions every six months.',
    iconName: 'Landmark',
    challenge: 'Citizens historically feel disconnected from their representatives once elections conclude, with no clear channel to submit petitions.',
    approach: 'Maintain fully operational walk-in constituency offices in each major district with an online constituent tracking portal.',
    impact: 'Guaranteed 72-hour turnaround on constituent inquiries and direct citizen input into federal bills and public petitions.',
    keyInitiatives: [
      'Bi-Annual Public Constituency Report & Open Town Hall',
      'Constituency Caseworkers in Every LGA',
      'Constituent Petition Submission & National Assembly Follow-up',
      'Youth Legislative Fellowship & Policy Internships'
    ],
    legislativeFocus: 'Open legislative calendar, public declaration of constituency project execution, and sponsored public interest petitions.'
  }
];

export const CANDIDATE_MILESTONES: MilestoneItem[] = [
  {
    year: '2010',
    title: 'Academic Engineering Foundations & Leadership',
    role: 'Engineering Graduate & Youth Welfare Advocate',
    description: 'Earned degree in Engineering with high honours. Spearheaded campus technical societies, student welfare advocacy, and community youth literacy outreaches.',
    category: 'education'
  },
  {
    year: '2016',
    title: 'Professional Engineering & Project Leadership',
    role: 'Registered Engineer (COREN) & Managing Executive',
    description: 'Directed critical infrastructure, power, and civil engineering projects across the Niger Delta. Championed indigenous technical capacity and youth trade apprenticeships.',
    category: 'career'
  },
  {
    year: '2020',
    title: 'Khana & Gokana Community Relief & Health Action',
    role: 'Founder, Grassroots Community Support Initiative',
    description: 'Organized clean water relief, educational supplies, and emergency medical kits to over 10,000 households across Khana and Gokana wards.',
    category: 'community'
  },
  {
    year: '2024',
    title: 'Public Policy, Environmental & Infrastructure Advocacy',
    role: 'Technical & Infrastructure Development Advisor',
    description: 'Collaborated with grassroots groups on ecological remediation, rural electrification, and agricultural access road planning across Rivers State.',
    category: 'public_service'
  },
  {
    year: '2026',
    title: 'Nomination for Federal House of Representatives',
    role: 'NNPP Candidate (Khana/Gokana Federal Constituency)',
    description: 'Stepped forward under the banner "Let\'s Build As One" (The Beacon of Hope 2027), uniting traditional leaders, youth organizations, farmers, and artisans.',
    category: 'politics'
  }
];

export const CAMPAIGN_EVENTS: CampaignEvent[] = [
  {
    id: 'evt-1',
    title: 'Constituency Town Hall: Community Listening Session',
    type: 'Town Hall',
    date: 'Saturday, March 28, 2026',
    time: '10:00 AM – 1:00 PM WAT',
    location: 'Community Hall, Central Civic Centre, [LGA]',
    lga: '[PRIMARY LGA]',
    description: 'An open microphone listening session for residents, market leaders, and community elders to directly share neighborhood priorities with the candidate.',
    capacity: 350,
    registeredCount: 284,
    isUpcoming: true
  },
  {
    id: 'evt-2',
    title: 'Youth & Tech Innovators Roundtable',
    type: 'Youth Engagement',
    date: 'Thursday, April 9, 2026',
    time: '3:00 PM – 5:30 PM WAT',
    location: 'Creative Hub & Innovation Centre, [COMMUNITY]',
    lga: '[PRIMARY LGA]',
    description: 'Interactive dialogue focused on digital skills legislation, startup seed funding, remote work opportunities, and vocational modernization.',
    capacity: 200,
    registeredCount: 165,
    isUpcoming: true
  },
  {
    id: 'evt-3',
    title: 'Market Leaders & Artisans Consultative Forum',
    type: 'Community Outreach',
    date: 'Tuesday, April 21, 2026',
    time: '11:00 AM – 2:00 PM WAT',
    location: 'Traders Association Hall, Commercial District',
    lga: '[SECONDARY LGA]',
    description: 'Meeting with market women, artisan guilds, mechanics, and petty traders to discuss cooperative loan access and regulatory protections.',
    capacity: 250,
    registeredCount: 190,
    isUpcoming: true
  },
  {
    id: 'evt-4',
    title: 'Women in Leadership & Grassroots Empowerment Symposium',
    type: 'Women’s Assembly',
    date: 'Saturday, May 2, 2026',
    time: '12:00 PM – 3:30 PM WAT',
    location: 'Constituency Events Pavilion, [HEADQUARTERS]',
    lga: '[PRIMARY LGA]',
    description: 'Focusing on women economic independence, maternal healthcare facilities, education subsidies, and gender-inclusive community leadership.',
    capacity: 300,
    registeredCount: 220,
    isUpcoming: true
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Candidate Concludes Multi-Ward Listening Tour: Pledges Accountable Representation',
    slug: 'candidate-concludes-multi-ward-listening-tour',
    category: 'Campaign',
    date: 'March 2, 2026',
    readTime: '4 min read',
    excerpt: 'Over 10 days of community consultations across all wards revealed widespread calls for improved drainage, youth tech hubs, and healthcare solarization.',
    content: [
      'In continuation of our citizen-first engagement strategy, [CANDIDATE NAME] successfully concluded a comprehensive multi-ward listening tour across [FEDERAL CONSTITUENCY].',
      'Meeting with traditional elders, youth leaders, artisans, and women cooperatives, the candidate emphasized that effective lawmaking must directly reflect the lived daily reality of the people on the streets.',
      '"We are not entering the National Assembly to sit in air-conditioned chambers detached from our people," [CANDIDATE NAME] declared. "Our mandate is to bring the resources, the infrastructure interventions, and the opportunities directly back home to every ward."',
      'The feedback gathered across the sessions has been formally integrated into our detailed Legislative Roadmap document.'
    ],
    imageUrl: '/assets/images/bori-youth-empowerment-workshop.jpg',
    author: 'Directorate of Media & Communications'
  },
  {
    id: 'news-2',
    title: 'Policy Brief: The Strategic Blueprint for Youth Employment & Technical Skills in [FEDERAL CONSTITUENCY]',
    slug: 'policy-brief-youth-employment-technical-skills',
    category: 'Policy',
    date: 'February 24, 2026',
    readTime: '6 min read',
    excerpt: 'Detailed review of our 4-pillar youth empowerment plan targeting 2,500 new technical and digital vocations in the first legislative term.',
    content: [
      'Youth underemployment in our constituency cannot be resolved by seasonal handouts or one-off political giveaways. It requires structural, enduring pathways.',
      'Our newly released policy brief details four specific pillars: Digital Literacy Incubators, Artisan Modernization Kits, Bank of Industry Micro-Credit Linkages, and Public Sector Apprenticeships.',
      'Through partnerships with local tech enterprises and accredited vocational institutes, our office will sponsor accredited certifications in software engineering, solar system installation, modern fashion production, and automotive diagnostic tech.',
      'The blueprint will be presented in detail at the upcoming Youth & Tech Innovators Roundtable.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    author: 'Policy & Research Directorate'
  },
  {
    id: 'news-3',
    title: 'Volunteer Corps Surpasses 1,200 Registered Grassroots Organizers',
    slug: 'volunteer-corps-surpasses-1200-organizers',
    category: 'Updates',
    date: 'February 15, 2026',
    readTime: '3 min read',
    excerpt: 'Enthusiasm continues to surge across communities as university students, professionals, market traders, and retirees register as ward advocates.',
    content: [
      'The campaign headquarters is proud to announce that over 1,200 dedicated citizens have signed up as registered campaign volunteers across all wards in [FEDERAL CONSTITUENCY].',
      'From digital media advocacy to door-to-door community canvassing, these volunteers represent the true heart and engine of our people-driven movement.',
      'Orientation and training workshops for polling unit captains and community liaisons will commence in the coming weeks, adhering to peaceful, respectful, and civic-minded voter engagement principles.',
      'We welcome every citizen who believes in responsible representation to join our growing movement today.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    author: 'Grassroots Mobilization Directorate'
  },
  {
    id: 'news-4',
    title: 'Community Dialogue: Addressing Perennial Drainage & Flooding Challenges',
    slug: 'community-dialogue-drainage-flooding',
    category: 'Community',
    date: 'January 30, 2026',
    readTime: '5 min read',
    excerpt: 'Candidate convenes town meeting with resident associations to formulate actionable legislative advocacy for federal ecological intervention.',
    content: [
      'During an emergency community dialogue with resident association executives and community development committees (CDCs), [CANDIDATE NAME] reviewed critical flood-prone corridors in [LGA].',
      '"Flooding damages small business merchandise, disrupts schooling, and creates recurring health hazards. As your representative, I will sponsor urgent motions and interface directly with FERMA and the Federal Ministry of Environment," [CANDIDATE NAME] stated.',
      'An engineering assessment group composed of volunteer civil engineers from our constituency has been commissioned to map the highest risk channels to support our legislative petitions.'
    ],
    imageUrl: '/assets/images/bori-civic-consultation.jpg',
    author: 'Constituency Relations Office'
  },
  {
    id: 'news-5',
    title: 'Empowering Women Entrepreneurs: Market Cooperative Listening Session',
    slug: 'empowering-women-entrepreneurs-market-cooperative',
    category: 'Community',
    date: 'January 18, 2026',
    readTime: '4 min read',
    excerpt: 'Market women leaders share firsthand perspectives on microcredit bottlenecks, multiple levies, and sanitary infrastructure.',
    content: [
      'At a lively and constructive consultative forum held with leaders of diverse market associations, [CANDIDATE NAME] engaged directly on matters of financial inclusion, cooperative grants, and workplace dignity.',
      'The market leaders pointed to high interest rates charged by informal moneylenders and the lack of clean potable water in major trade stalls as immediate challenges.',
      '[CANDIDATE NAME] committed to prioritizing zero-interest cooperative rotating funds and market facility rehabilitation as central components of the campaign manifesto.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    author: 'Women & Family Mobilization Team'
  },
  {
    id: 'news-6',
    title: 'Campaign Finance & Resource Integrity: Our Commitment to Public Transparency',
    slug: 'campaign-finance-resource-integrity',
    category: 'Policy',
    date: 'January 05, 2026',
    readTime: '5 min read',
    excerpt: 'Setting a new benchmark for Nigerian political campaigns through open reporting of voluntary public contributions and expenditure.',
    content: [
      'In demonstration of our foundational core value of accountability, the campaign has launched the Campaign Transparency Portal.',
      'Citizens can view how every voluntary donation is utilized—from community townhalls and voter education brochures to digital outreach.',
      '"Accountability is not a slogan we save for after elections; it must govern how we conduct our campaign from day one," [CANDIDATE NAME] stated during the press briefing.',
      'The campaign continues to operate strictly within electoral guidelines and ethical standards.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    author: 'Finance & Compliance Committee'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Youth & Stakeholders Empowerment Workshop in Bori',
    category: 'Community',
    location: 'Bori Civic Center, Khana LGA',
    date: 'February 2026',
    imageUrl: '/assets/images/bori-youth-empowerment-workshop.jpg',
    caption: 'Candidate and community youth leaders during an interactive empowerment and legislative planning workshop in Bori.'
  },
  {
    id: 'gal-2',
    title: 'Interactive Dialogue with Young Tech Entrepreneurs & Creators',
    category: 'Youth',
    location: 'Innovation Hub, [LGA]',
    date: 'February 2026',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    caption: 'Discussing digital economy legislation, remote work infrastructure, and seed grants.'
  },
  {
    id: 'gal-3',
    title: 'Meeting with Market Women Executives & Artisans',
    category: 'Women',
    location: 'Central Market Pavilion',
    date: 'January 2026',
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    caption: 'Listening to concerns regarding microcredit bottlenecks and market sanitary facilities.'
  },
  {
    id: 'gal-4',
    title: 'Door-to-Door Civic Mobilization & Voter Education',
    category: 'Outreach',
    location: 'Ward 4 Residential District',
    date: 'January 2026',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    caption: 'Volunteer organizers sharing the campaign legislative manifesto with families.'
  },
  {
    id: 'gal-5',
    title: 'Civic Consultation & Town Hall Meeting in Bori',
    category: 'Meetings',
    location: 'Bori Town Hall, Khana LGA',
    date: 'January 2026',
    imageUrl: '/assets/images/bori-civic-consultation.jpg',
    caption: 'Engaging community elders, leaders, and youth on infrastructure and economic priorities in Bori.'
  },
  {
    id: 'gal-6',
    title: 'Mass Community Town Hall & Open Floor Q&A',
    category: 'Events',
    location: 'Civic Auditorium',
    date: 'December 2025',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    caption: 'An unscripted open microphone session answering tough citizen questions.'
  }
];

export const INITIAL_TRANSPARENCY_DATA: TransparencyData = {
  totalContributionsAmount: 48500000, // ₦48.5M baseline campaign contributions
  supporterCount: 4280,
  eventsCompleted: 24,
  activeVolunteers: 1240,
  resourceAllocation: [
    {
      category: 'Community Town Halls & Field Engagement',
      percentage: 35,
      amount: 16975000,
      description: 'Ward townhalls, public listening sessions, sound & venue logistics, grassroots meetings.',
      color: '#047857' // emerald-700
    },
    {
      category: 'Civic Education & Voter Sensitization',
      percentage: 25,
      amount: 12125000,
      description: 'Community flyers, audio-visual translations, radio public announcements, grassroots policy guides.',
      color: '#0284c7' // sky-600
    },
    {
      category: 'Constituency Ward Office Operations',
      percentage: 20,
      amount: 9700000,
      description: 'Community listening desk rent, staff stipends, communication devices, outreach volunteers support.',
      color: '#d97706' // amber-600
    },
    {
      category: 'Digital Transparency & Media Directorate',
      percentage: 12,
      amount: 5820000,
      description: 'Website maintenance, live streaming equipment, video documentary production, cyber-defense.',
      color: '#7c3aed' // purple-600
    },
    {
      category: 'Statutory Compliance & Independent Auditing',
      percentage: 8,
      amount: 3880000,
      description: 'Certified financial accounting, legal filings with INEC, independent transparency audits.',
      color: '#475569' // slate-600
    }
  ]
};

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'DON-9481',
    donorName: 'Dr. Kelechi Nwankwo',
    email: 'k.nwankwo@example.com',
    phone: '+234 802 334 5566',
    amount: 50000,
    frequency: 'one-time',
    lga: '[PRIMARY LGA]',
    state: '[STATE]',
    paymentMethod: 'Bank Transfer',
    reference: 'REF-TX-883921',
    date: '2026-03-08',
    status: 'Verified'
  },
  {
    id: 'DON-9482',
    donorName: 'Hajia Fatima Garba',
    email: 'fatima.g@example.com',
    phone: '+234 803 111 2233',
    amount: 100000,
    frequency: 'one-time',
    lga: '[SECONDARY LGA]',
    state: '[STATE]',
    paymentMethod: 'Debit Card',
    reference: 'REF-TX-883922',
    date: '2026-03-08',
    status: 'Verified'
  },
  {
    id: 'DON-9483',
    donorName: 'Tunde Bakare',
    email: 'tunde.b@example.com',
    phone: '+234 809 777 8899',
    amount: 10000,
    frequency: 'monthly',
    lga: '[PRIMARY LGA]',
    state: '[STATE]',
    paymentMethod: 'USSD',
    reference: 'REF-TX-883923',
    date: '2026-03-07',
    status: 'Verified'
  },
  {
    id: 'DON-9484',
    donorName: 'Mrs. Chinwe Ebere',
    email: 'chinwe.e@example.com',
    phone: '+234 814 445 5566',
    amount: 25000,
    frequency: 'one-time',
    lga: '[PRIMARY LGA]',
    state: '[STATE]',
    paymentMethod: 'Bank Transfer',
    reference: 'REF-TX-883924',
    date: '2026-03-06',
    status: 'Verified'
  },
  {
    id: 'DON-9485',
    donorName: 'Youth For Good Governance Club',
    email: 'info@youthgov.ng',
    phone: '+234 805 998 8776',
    amount: 50000,
    frequency: 'one-time',
    lga: '[SECONDARY LGA]',
    state: '[STATE]',
    paymentMethod: 'Debit Card',
    reference: 'REF-TX-883925',
    date: '2026-03-05',
    status: 'Verified'
  }
];

export const INITIAL_VOLUNTEERS: VolunteerRecord[] = [
  {
    id: 'VOL-101',
    fullName: 'Emeka Joshua Okafor',
    email: 'emeka.j@example.com',
    phone: '+234 803 123 4567',
    lga: '[PRIMARY LGA]',
    ward: 'Ward 03 (Central)',
    community: 'Oregun Junction',
    areas: ['Community mobilisation', 'Event support'],
    dateJoined: '2026-03-07',
    status: 'Active'
  },
  {
    id: 'VOL-102',
    fullName: 'Aisha Lawal',
    email: 'aisha.lawal@example.com',
    phone: '+234 806 234 5678',
    lga: '[SECONDARY LGA]',
    ward: 'Ward 07',
    community: 'Alade Market Area',
    areas: ['Digital media', 'Social media'],
    dateJoined: '2026-03-06',
    status: 'Active'
  },
  {
    id: 'VOL-103',
    fullName: 'Segun Adebayo',
    email: 's.adebayo@example.com',
    phone: '+234 812 345 6789',
    lga: '[PRIMARY LGA]',
    ward: 'Ward 02',
    community: 'Alausa Phase 2',
    areas: ['Technology', 'Research'],
    dateJoined: '2026-03-05',
    status: 'Active'
  },
  {
    id: 'VOL-104',
    fullName: 'Blessing Udoh',
    email: 'blessing.u@example.com',
    phone: '+234 818 765 4321',
    lga: '[PRIMARY LGA]',
    ward: 'Ward 05',
    community: 'GRA Extension',
    areas: ['Photography / Video', 'Communications'],
    dateJoined: '2026-03-04',
    status: 'Contacted'
  },
  {
    id: 'VOL-105',
    fullName: 'Ibrahim Danjuma',
    email: 'i.danjuma@example.com',
    phone: '+234 802 888 9900',
    lga: '[SECONDARY LGA]',
    ward: 'Ward 09',
    community: 'Artisan Village',
    areas: ['Community mobilisation', 'Fundraising'],
    dateJoined: '2026-03-03',
    status: 'Active'
  }
];

export const INITIAL_FEEDBACK: CommunityFeedbackRecord[] = [
  {
    id: 'CFB-201',
    fullName: 'Barine Dornu',
    email: 'barine.d@example.com',
    phone: '+234 803 765 4321',
    lga: '[PRIMARY LGA]',
    ward: 'Ward 04',
    community: 'Bori Main Town Axis',
    topic: 'Roads & Infrastructure',
    message: 'The collector drainage behind our community road is completely silted. When the rainy season starts in May, over 40 shops get flooded. We need urgent federal ecological intervention.',
    dateSubmitted: '2026-03-08',
    status: 'Logged for Manifesto'
  },
  {
    id: 'CFB-202',
    fullName: 'Grace Chukwuma',
    email: 'grace.c@example.com',
    phone: '+234 813 999 8877',
    lga: '[SECONDARY LGA]',
    ward: 'Ward 01',
    community: 'Model Primary School Zone',
    topic: 'Education',
    message: 'Our public secondary school currently has over 85 students squeezed in a single classroom with only 25 usable desks. Please push for UBEC classroom renovation.',
    dateSubmitted: '2026-03-07',
    status: 'Reviewed'
  },
  {
    id: 'CFB-203',
    fullName: 'Mustapha Bello',
    email: 'm.bello@example.com',
    phone: '+234 809 112 2334',
    lga: '[PRIMARY LGA]',
    ward: 'Ward 06',
    community: 'Commercial Axis',
    topic: 'Small Business',
    message: 'Multiple task forces harass small shop owners with arbitrary sanitation and radio levies daily. We need a bill that harmonizes local business taxation.',
    dateSubmitted: '2026-03-06',
    status: 'Logged for Manifesto'
  },
  {
    id: 'CFB-204',
    fullName: 'Janet Ogundipe',
    email: 'janet.o@example.com',
    phone: '+234 802 555 4433',
    lga: '[PRIMARY LGA]',
    ward: 'Ward 02',
    community: 'General Hospital Road',
    topic: 'Healthcare',
    message: 'The local primary health centre lacks round-the-clock solar power. At night, nurses struggle with phone torches during emergency deliveries.',
    dateSubmitted: '2026-03-05',
    status: 'Reviewed'
  }
];
