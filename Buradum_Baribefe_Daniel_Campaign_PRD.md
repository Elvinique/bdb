# Product Requirements Document (PRD)

## Engr. Buradum Baribefe Daniel Campaign Platform

**Document status:** Build-ready\
**Product status:** Production development\
**Candidate:** Engr. Buradum Baribefe Daniel\
**Office sought:** Federal House of Representatives\
**Constituency:** Khana/Gokana Federal Constituency\
**Political party:** New Nigeria People's Party (NNPP)\
**Country:** Nigeria\
**Primary audience:** Constituents, supporters, volunteers, donors,
campaign staff, media and campaign administrators\
**Recommended stack:** Next.js + TypeScript + Tailwind CSS + Supabase +
Vercel\
**Document purpose:** Single source of truth for Antigravity to design,
implement, test and prepare the complete production campaign platform.

------------------------------------------------------------------------

# 1. Executive Summary

Build a production-grade digital campaign, constituency-engagement and
fundraising platform for **Engr. Buradum Baribefe Daniel**, candidate
for the **Federal House of Representatives, Khana/Gokana Federal
Constituency**, on the platform of the **New Nigeria People's Party
(NNPP)**.

This is not a prototype, static political landing page, generic campaign
template, or poster converted into a website. It is the campaign's
digital headquarters and operational web platform.

The product must combine:

-   Candidate profile and campaign identity
-   Vision, priorities and approved manifesto content
-   Constituency information
-   Campaign news and media
-   Events and event registration
-   Community feedback
-   Volunteer recruitment and management
-   Supporter engagement
-   Lawful campaign fundraising
-   Donation verification and financial records
-   Campaign transparency
-   Contact and communication channels
-   Content management
-   Role-based administration
-   Audit logging
-   Reporting and exports
-   Security, privacy and compliance controls
-   Responsive, accessible and high-performance public experiences

The public experience must emphasize the constituency and its people,
while the internal dashboard must provide the campaign team with a
reliable operational system.

The implementation must use real candidate identity but must **not
invent biographical claims, achievements, endorsements, manifesto
promises, statistics, testimonials, donor figures, campaign finance
figures or election facts**. Unknown campaign content must be
represented as CMS-editable placeholders until approved.

------------------------------------------------------------------------

# 2. Product Vision

Create a credible, modern digital platform through which people can:

1.  Identify the candidate and office being contested.
2.  Learn about the candidate from verified campaign-approved
    information.
3.  Understand approved campaign priorities.
4.  Explore information about Khana/Gokana Federal Constituency.
5.  Submit community concerns and ideas.
6.  Join the campaign as volunteers or supporters.
7.  Discover and register for campaign events.
8.  Read official campaign updates.
9.  Provide lawful financial support.
10. Contact the campaign.
11. Understand campaign-approved transparency information.

The product should support the campaign team's ability to:

-   Manage content without code changes.
-   Manage volunteers and supporters.
-   Organize events and registrations.
-   Review constituency feedback.
-   Track and reconcile contributions.
-   Control staff permissions.
-   Maintain audit records.
-   Export operational and financial reports.
-   Operate securely throughout the campaign.

------------------------------------------------------------------------

# 3. Product Principles

## 3.1 Constituency first

The website must not revolve exclusively around the candidate. It should
communicate that representation concerns the people, communities and
priorities of Khana/Gokana.

## 3.2 Trust by design

Avoid fabricated numbers, fake endorsements, misleading donation
counters, false urgency, dark patterns and unverified claims.

## 3.3 Mobile first

All critical journeys must work exceptionally well on smartphones.

## 3.4 Accessibility

Target WCAG 2.2 AA where practical.

## 3.5 Privacy by design

Collect the minimum personal data required for each workflow.

## 3.6 Security by default

Authorization must be enforced server-side. Sensitive keys and records
must never be exposed to the client.

## 3.7 Compliance configurable, not hard-coded

Election-finance limits, donor rules, disclosures and other
compliance-sensitive values must live in controlled configuration and
require authorized approval.

## 3.8 Content must be verifiable

Candidate biography, achievements, policy commitments, constituency
statistics and public claims require campaign approval before
publication.

------------------------------------------------------------------------

# 4. Success Criteria

The product is successful when:

-   A visitor immediately understands who the candidate is, the office
    sought, constituency and party.
-   Public pages are polished and production-quality on mobile and
    desktop.
-   Campaign staff can update approved content without editing source
    code.
-   A constituent can submit an issue successfully.
-   A volunteer can register and be managed through the dashboard.
-   A user can discover and register for an event.
-   A lawful donor can complete a payment through an approved provider
    and the server independently verifies it.
-   Financial transactions can be reconciled and exported.
-   Administrators only see functions allowed by their roles.
-   Sensitive actions create immutable or tamper-resistant audit
    records.
-   No fake campaign data is presented as real.
-   Production build, linting, type checks and critical tests pass.
-   Accessibility, performance, SEO and security have been reviewed
    before launch.

------------------------------------------------------------------------

# 5. Non-Goals for Initial Production Release

Unless separately approved, do not build:

-   Native Android/iOS applications
-   Public voter profiling
-   Automated political persuasion or voter scoring
-   Facial recognition
-   NIN/BVN collection
-   Banking credential collection
-   Public donor directories
-   Blockchain/crypto donations
-   Complex canvassing applications
-   Automatic posting to social networks
-   AI-generated campaign claims presented without human approval
-   Unapproved WhatsApp/SMS bulk messaging
-   A separate microservice architecture where the Next.js/Supabase
    architecture is sufficient

Keep architecture extensible without prematurely increasing complexity.

------------------------------------------------------------------------

# 6. Confirmed Campaign Identity

Use the following as authoritative project identity:

``` yaml
candidate:
  name: "Engr. Buradum Baribefe Daniel"
  office: "Federal House of Representatives"
  constituency: "Khana/Gokana Federal Constituency"
  party:
    name: "New Nigeria People's Party"
    abbreviation: "NNPP"
  country: "Nigeria"
```

The following remain content/configuration inputs and must not be
invented:

``` yaml
campaign:
  slogan: Let's build as one
  candidate_bio: null
  manifesto: null
  official_email: null
  official_phone: null
  office_address: null
  official_domain: null
  official_social_links: null
  official_candidate_photos: null
  approved_party_assets: null
```

------------------------------------------------------------------------

# 7. Target Users

## 7.1 Constituents

Need trustworthy information, community feedback channels, event
information and contact routes.

## 7.2 Supporters

Need campaign updates, event participation, volunteering and donation
options.

## 7.3 Donors

Need a trustworthy, secure, legally reviewed contribution experience and
receipts.

## 7.4 Volunteers

Need simple registration and clear campaign participation opportunities.

## 7.5 Media/Public

Need official candidate information, campaign statements, news and
contact details.

## 7.6 Campaign staff

Need controlled access to operational records, content, events,
volunteers and reports.

## 7.7 Finance/compliance staff

Need transaction verification, reconciliation, flags, refunds, exports
and audit history.

------------------------------------------------------------------------

# 8. Information Architecture

Public routes:

``` text
/
├── /about
├── /vision
├── /constituency
├── /community
├── /news
│   └── /news/[slug]
├── /events
│   └── /events/[slug]
├── /volunteer
├── /support
├── /contact
├── /media
├── /transparency
├── /privacy
├── /terms
├── /donation-terms
└── /accessibility
```

Administrative routes:

``` text
/admin
├── /admin/dashboard
├── /admin/candidate
├── /admin/priorities
├── /admin/news
├── /admin/events
├── /admin/media
├── /admin/supporters
├── /admin/volunteers
├── /admin/community
├── /admin/donations
├── /admin/finance
├── /admin/communications
├── /admin/reports
├── /admin/users
├── /admin/audit
├── /admin/compliance
└── /admin/settings
```

Authentication routes may use Supabase Auth and must not expose
privileged functionality publicly.

------------------------------------------------------------------------

# 9. Public Website Requirements

## 9.1 Global Header

Desktop: - Candidate/campaign identity - Home - About - Vision -
Constituency - News - Events - Get Involved - Support Campaign CTA

Mobile: - Compact brand - Accessible menu button - Slide-over/dropdown
navigation - Prominent but non-obstructive support CTA

Requirements: - Sticky navigation - Keyboard accessible - Active-page
indication - No layout shift - Responsive - Header becomes slightly
compact on scroll if implemented

## 9.2 Homepage

Recommended section order:

1.  Header
2.  Hero
3.  Campaign principles
4.  Candidate introduction
5.  Why I am running
6.  Approved priorities
7.  Constituency section
8.  Community voice CTA
9.  Upcoming events
10. Latest news
11. Volunteer CTA
12. Support campaign CTA
13. Transparency section
14. Contact/social CTA
15. Footer

### Hero

Must show: - Engr. Buradum Baribefe Daniel - Federal House of
Representatives - Khana/Gokana Federal Constituency - New Nigeria
People's Party (NNPP)

Do not invent a slogan. If no approved slogan exists, use neutral
descriptive copy such as: "Official campaign platform for Engr. Buradum
Baribefe Daniel."

Preferred CTAs: - Explore Our Vision - Meet the Candidate - Join the
Campaign - Support the Campaign

Use approved campaign photography once supplied. Until then, use clearly
replaceable local placeholder assets rather than misleading generated
photographs of the candidate.

## 9.3 Campaign Principles

CMS-editable values. Do not present unapproved political positions as
candidate commitments.

Component supports: - title - short description - icon - display order -
published flag

## 9.4 Candidate Introduction

Homepage summary links to `/about`.

Use verified candidate content only.

## 9.5 Why I Am Running

CMS-editable statement with: - title - lead paragraph - long-form
content - candidate image - optional video URL - publication status

## 9.6 Priorities

Cards link to `/vision#priority-slug`.

Priority data: - title - slug - icon - summary - problem/context -
proposed approach - expected benefit - related content - display order -
status

Use placeholders until the campaign supplies approved policy priorities.

## 9.7 Constituency Preview

Show verified high-level information about Khana/Gokana and link to full
constituency hub.

Do not invent population or demographic figures.

## 9.8 Events Preview

Show next published upcoming events.

## 9.9 News Preview

Show latest published official campaign content.

## 9.10 Volunteer CTA

Link to `/volunteer`.

## 9.11 Support CTA

Link to `/support`. Avoid manipulative countdowns or fake matching
offers.

## 9.12 Footer

Include: - Candidate identity - Office/constituency - Party -
Navigation - Legal links - Approved social accounts - Campaign contact -
Copyright - Required campaign disclaimer placeholder

------------------------------------------------------------------------

# 10. About Candidate

Route: `/about`

Modules: - Hero portrait - Verified biography - Professional
background - Education - Community/public service background - Candidate
statement - Timeline - Gallery - CTA to vision - CTA to
volunteer/support

Every factual field should be manageable through the CMS/dashboard.

Do not generate fictional milestones to fill visual space.

------------------------------------------------------------------------

# 11. Vision & Priorities

Route: `/vision`

Purpose: Present only campaign-approved priorities and commitments.

Each priority includes: - Title - Summary - Detailed context - Proposed
legislative/advocacy approach - Expected community benefit - Related
news/events - Optional downloadable policy document

Avoid wording that guarantees outcomes outside a legislator's control.

Admin workflow: `DRAFT -> REVIEW -> APPROVED -> PUBLISHED -> ARCHIVED`

Only authorized content roles can publish.

------------------------------------------------------------------------

# 12. Constituency Hub

Route: `/constituency`

Purpose: Create a useful public hub for Khana/Gokana Federal
Constituency.

Support: - Overview - Khana section - Gokana section - Wards/communities
when verified - Major local economic/community information when
verified - Campaign activities - Upcoming events - Community concerns
CTA - Map visualization if accurate data is available

Do not display precise supporter locations or personal records.

Geographic entities should be stored as structured records to support
future filtering.

------------------------------------------------------------------------

# 13. Community Voice

Route: `/community`

Public form: - Full name - Preferred contact method - Email (optional
depending on contact choice) - Phone (optional depending on contact
choice) - LGA - Ward - Community - Issue category - Subject - Message -
Consent checkbox

Issue categories should be configurable.

Submission statuses: - NEW - REVIEWING - ASSIGNED - RESPONDED - CLOSED -
ARCHIVED

Requirements: - Server-side validation - Spam/bot controls - Rate
limiting - Confirmation state - Admin notifications where configured -
No public exposure of submissions - Audit trail for staff status changes

------------------------------------------------------------------------

# 14. Volunteer Module

Route: `/volunteer`

Form: - Full name - Email - Phone - LGA - Ward - Community - Areas of
interest - Availability - Relevant skills (optional) - Consent to
volunteer contact - Optional consent to campaign updates as a separate
checkbox

Possible volunteer categories: - Community mobilisation - Event
support - Communications - Research - Technology - Digital media -
Photography/video - Logistics - Fundraising support - Other

Volunteer statuses: - NEW - CONTACTED - VERIFIED - ACTIVE - INACTIVE -
ARCHIVED

Admin features: - Search/filter - Assignment - Notes - Status history -
Export subject to permission - Geographic filtering - Interest
filtering - Bulk actions only where safe and authorized

Do not automatically subscribe volunteers to unrelated marketing
communications.

------------------------------------------------------------------------

# 15. Events Module

Routes: - `/events` - `/events/[slug]`

Event fields: - Title - Slug - Event type - Description - Featured
image - Date - Start time - End time - Venue - LGA - Ward - Map/location
link if approved - Registration required - Capacity - Registration close
time - Status - SEO fields

Statuses: - DRAFT - PUBLISHED - CANCELLED - COMPLETED - ARCHIVED

Registration fields: - Name - Email/phone - LGA/ward if required -
Attendance consent - Separate communications consent

Features: - Capacity enforcement - Confirmation - Registration count -
Admin attendee list - CSV export based on permission - Cancellation
state - Past/upcoming filters

------------------------------------------------------------------------

# 16. News / Campaign Updates

Routes: - `/news` - `/news/[slug]`

Article fields: - Title - Slug - Excerpt - Body - Featured image -
Category - Author - Publication date - SEO title - SEO description -
Open Graph image - Status - Related content

Statuses: - DRAFT - REVIEW - APPROVED - PUBLISHED - ARCHIVED

Requirements: - Rich text/editor support - Preview before publishing -
Scheduled publishing optional - Only approved roles can publish -
Preserve revision/audit information for important changes

Categories: - Campaign - Constituency - Events - Statements - Policy -
Community - Media

------------------------------------------------------------------------

# 17. Media Library

Route: `/media`

Admin media management: - Image/video metadata - Alt text - Caption -
Category - Credit/source - Approval status - Upload date - Usage
references

Use optimized responsive images.

Do not use unlicensed media.

------------------------------------------------------------------------

# 18. Campaign Fundraising

Route: `/support`

This is a compliance-sensitive module.

## 18.1 Public Experience

Page must identify: - Candidate - Office - Constituency - Campaign -
Purpose of contribution - Donation terms - Privacy notice - Required
eligibility/compliance statements once legally approved

Suggested amount shortcuts: - ₦5,000 - ₦10,000 - ₦25,000 - ₦50,000 -
₦100,000 - Custom

These are UX shortcuts, not statements of legal limits.

Fields should be finalized with campaign legal/compliance review.

Base fields: - Full name - Email - Phone - Amount - Required compliance
declarations - Donation terms acceptance - Privacy acknowledgement -
Optional campaign communication consent, separately captured

Do not collect: - BVN - NIN unless a specific verified legal requirement
later requires it - Card PIN - Banking password - Payment OTP - Bank
login credentials

## 18.2 Payment Provider

Provider must be configurable.

Do not hard-code a provider until: - Campaign merchant account is
approved - Provider permits the intended political fundraising use -
Compliance/legal team approves - Sandbox integration is tested

Implement provider abstraction:

``` ts
interface PaymentProvider {
  initializeContribution(input: ContributionInput): Promise<PaymentInitResult>;
  verifyTransaction(reference: string): Promise<VerificationResult>;
  verifyWebhook(payload: unknown, signature: string): Promise<boolean>;
  refund?(reference: string, amount?: number): Promise<RefundResult>;
}
```

## 18.3 Payment Flow

``` text
User selects amount
    ↓
Required donor/compliance data collected
    ↓
Server validates
    ↓
Contribution record = INITIATED
    ↓
Server initializes payment
    ↓
User completes provider flow
    ↓
Provider redirect/webhook
    ↓
Server verifies signature and transaction directly
    ↓
Amount + currency + reference + status checked
    ↓
Compliance checks executed
    ↓
Contribution = VERIFIED or REVIEW_REQUIRED
    ↓
Receipt generated/sent
    ↓
Finance ledger/reconciliation updated
```

Never trust a frontend success callback alone.

## 18.4 Contribution Status

-   INITIATED
-   PENDING
-   VERIFIED
-   FAILED
-   REVIEW_REQUIRED
-   REJECTED
-   REFUNDED
-   PARTIALLY_REFUNDED

## 18.5 Compliance Configuration

Do not embed legal limits in UI code.

Create controlled configuration:

``` ts
type CampaignFinanceConfig = {
  office: "HOUSE_OF_REPRESENTATIVES";
  expenditureLimitNgn: number | null;
  individualContributionLimitNgn: number | null;
  effectiveFrom: string | null;
  legalAuthority: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  enabled: boolean;
};
```

Production fundraising remains disabled until authorized configuration
is completed.

## 18.6 Fraud/Integrity Controls

Implement: - Idempotency - Duplicate reference detection - Webhook
signature verification - Amount/currency verification - Cumulative donor
rule hooks - Rate limiting - Suspicious transaction flags -
Reconciliation jobs - Refund records - Audit logs

------------------------------------------------------------------------

# 19. Transparency Page

Route: `/transparency`

Purpose: Publish only campaign-approved aggregate information.

Potential components: - Campaign finance summary - Community
engagements - Events - Volunteer participation - Campaign resource
categories - Required disclosures

Rules: - Never invent totals. - Do not publish donor PII unless
specifically required by applicable law and approved. - Clearly state
reporting period. - Allow figures to be hidden until verified.

------------------------------------------------------------------------

# 20. Contact

Route: `/contact`

Show only approved: - Campaign office - Email - Phone - Social
accounts - Contact hours if supplied

Contact form: - Name - Email/phone - Subject - Message - Consent/privacy
acknowledgment

Requirements: - Validation - Rate limiting - Spam controls - Admin
inbox/status - Optional email notification - No credentials or sensitive
identity documents

------------------------------------------------------------------------

# 21. Supporter / Newsletter Module

Newsletter signup should collect minimal data: - Name optional - Email
or phone depending on channel - Explicit campaign-update consent

Store: - consent source - timestamp - policy version - channel -
active/withdrawn status - withdrawal timestamp

Provide unsubscribe/withdrawal mechanisms.

Do not infer campaign-update consent from donations, volunteering or
event attendance.

------------------------------------------------------------------------

# 22. Admin Dashboard

Route: `/admin/dashboard`

Overview cards should use real database values: - Published content -
Upcoming events - Event registrations - New community issues -
Volunteers - Verified donations - Pending/review-required donations -
Recent admin activity

Do not display fake sample figures in production.

Dashboard modules: 1. Candidate 2. Priorities 3. News 4. Events 5. Media
6. Supporters 7. Volunteers 8. Community Feedback 9. Donations 10.
Finance 11. Communications 12. Reports 13. Compliance 14. Users & Roles
15. Audit Logs 16. Settings

------------------------------------------------------------------------

# 23. Role-Based Access Control

Roles:

### SUPER_ADMIN

Full technical access.

### CAMPAIGN_ADMIN

Broad campaign operations, excluding protected technical secrets and
restricted finance actions where appropriate.

### CONTENT_MANAGER

Candidate/public content, news and media.

### FINANCE_ADMIN

Donations, reconciliation, refunds subject to workflow, finance exports.

### COMPLIANCE_OFFICER

Compliance rules, flagged transactions, approvals and reporting.

### VOLUNTEER_MANAGER

Volunteer records and assignments.

### EVENTS_MANAGER

Events and registrations.

### COMMUNICATIONS_MANAGER

Approved supporter communications.

### VIEWER

Read-only access to specifically granted dashboard data.

Permissions must be explicit.

Implement permission checks server-side.

Do not rely on hiding navigation items.

------------------------------------------------------------------------

# 24. Sensitive Action Controls

Require elevated authorization and audit logging for: - Role changes -
Admin creation/deactivation - Refunds - Donation status overrides -
Finance configuration changes - Compliance decisions - Bulk PII
exports - Deleting supporter/volunteer records - Publishing important
content - Changing campaign identity/configuration

Consider re-authentication/MFA for especially sensitive actions.

------------------------------------------------------------------------

# 25. Database Model

Use PostgreSQL/Supabase migrations.

Minimum tables:

``` text
profiles
roles
permissions
user_roles

candidate_profile
campaign_settings
campaign_priorities

geographic_areas

supporters
supporter_consents

volunteers
volunteer_interests
volunteer_assignments
volunteer_notes

community_feedback
community_feedback_history

events
event_registrations

articles
article_categories
article_revisions

media_assets

donations
payment_transactions
payment_webhook_events
refunds
finance_records
finance_reconciliations
compliance_flags
campaign_finance_config

contact_messages

communication_subscriptions
communication_logs

audit_logs
system_settings
```

Every applicable table should include: - UUID primary key - created_at -
updated_at - created_by/updated_by where meaningful -
soft-delete/archive strategy where appropriate

Use foreign keys and indexes.

------------------------------------------------------------------------

# 26. Suggested Entity Relationships

``` text
candidate_profile ── campaign_priorities

geographic_areas ── volunteers
geographic_areas ── community_feedback
geographic_areas ── events

events ── event_registrations

supporters ── supporter_consents
supporters ── donations (where lawful/appropriate)

donations ── payment_transactions
donations ── refunds
donations ── compliance_flags

articles ── article_categories
articles ── article_revisions

profiles ── user_roles ── roles
profiles ── audit_logs
```

Do not duplicate personal data unnecessarily across tables.

------------------------------------------------------------------------

# 27. Supabase Requirements

Use: - PostgreSQL - Auth - Storage - Row Level Security

RLS must be enabled on sensitive tables.

Policies should follow least privilege.

Public anonymous users: - Read published public content only - Insert
into specifically permitted public forms through controlled server
routes/RPCs where appropriate - Never read donor, supporter, volunteer,
contact or community-submission records

Authenticated admin users: - Access according to server-side
roles/permissions

Never expose `SUPABASE_SERVICE_ROLE_KEY` to client code.

------------------------------------------------------------------------

# 28. Authentication & Admin Security

Use Supabase Auth or an equivalent approved authentication mechanism.

Requirements: - Strong passwords - MFA for privileged roles - Secure
session cookies - Session expiry - Account disable/revoke - Secure
password recovery - Rate limiting - Login audit records - No shared
admin accounts

Production finance/compliance/super-admin accounts should require MFA.

------------------------------------------------------------------------

# 29. API / Server Design

Prefer Server Components and Server Actions for suitable flows.

Use Route Handlers for: - Payment webhooks - Provider callbacks -
exports - integrations - externally invoked endpoints

Requirements: - Zod or equivalent validation - Typed responses - Central
error handling - Authorization helper - Rate limiting - Idempotency for
financial endpoints - Structured logs - No sensitive error details
returned to public clients

Suggested service boundaries:

``` text
lib/
├── auth/
├── permissions/
├── campaign/
├── content/
├── constituency/
├── volunteers/
├── events/
├── payments/
├── finance/
├── compliance/
├── communications/
├── audit/
├── validation/
└── supabase/
```

------------------------------------------------------------------------

# 30. Content Management

Campaign staff must be able to edit: - Candidate profile - Homepage
sections - Why I am running - Priorities - Constituency content - News -
Events - Media - Contact information - Legal-page content - Approved
social links - Campaign slogan when supplied

Workflow: `DRAFT -> REVIEW -> APPROVED -> PUBLISHED -> ARCHIVED`

At minimum, important public content should retain: - author - editor -
status - timestamps - publication time - audit history

------------------------------------------------------------------------

# 31. Design Requirements

The visual direction should be: - Premium - Modern - Nigerian - Civic -
Human - Professional - Trustworthy - Community-oriented

Avoid: - Generic campaign templates - Poster-like page design -
Excessive green/white decoration - Excessive gradients -
Neon/glassmorphism overload - AI-looking stock compositions - Clutter -
Fake badges/counters - Over-animation

Use: - Strong editorial typography - Generous spacing - Authentic
campaign photography - Clean grids - Subtle borders/shadows -
High-quality cards - Clear hierarchy - Consistent CTAs - Purposeful
micro-interactions

NNPP branding must use campaign/party-approved assets. Do not invent an
official logo.

------------------------------------------------------------------------

# 32. Design System

Create reusable tokens:

``` text
colors
typography
spacing
radii
shadows
breakpoints
motion
z-index
```

Components: - Button - Link - Badge - Card - Input - Textarea - Select -
Checkbox - Radio - Dialog - Drawer - Toast - Alert - Table -
Pagination - Tabs - Breadcrumb - Skeleton - Empty state - Error state -
Stat card - Content card - Event card - Priority card - Media card -
Form field - Data filter - Admin sidebar

Do not duplicate component implementations.

------------------------------------------------------------------------

# 33. Responsive Requirements

Support: - 320px+ mobile - 768px+ tablet - 1024px+ laptop - 1280px+
desktop - 1440px+ wide desktop

Critical mobile journeys: - Homepage - Navigation - Vision - Community
submission - Volunteer registration - Event registration - Donation -
Contact - News - Admin core views where operationally required

No horizontal overflow.

Tap targets should be accessible.

------------------------------------------------------------------------

# 34. Accessibility

Target WCAG 2.2 AA where practical.

Requirements: - Semantic HTML - Logical headings - Keyboard navigation -
Visible focus - Accessible menu/dialog behavior - Labels for every form
control - Helpful validation messages - Contrast compliance - Alt text -
Skip navigation - Reduced-motion support - No information conveyed only
by color - Screen-reader announcements for async form states

------------------------------------------------------------------------

# 35. SEO

Implement: - Unique title/description - Canonical URLs - Sitemap -
robots.txt - Open Graph - Twitter/X card metadata where appropriate -
Structured data when appropriate - Descriptive URLs - Image alt text -
Server-rendered public content

Example homepage title:

`Engr. Buradum Baribefe Daniel | Khana/Gokana Federal Constituency`

Do not add unsupported claims to metadata.

------------------------------------------------------------------------

# 36. Performance

Targets: - Strong Core Web Vitals - Optimized images - Responsive image
sizes - Lazy loading - Font optimization - Minimal client JS -
Route-level code splitting - CDN/cache use - Avoid unnecessarily large
libraries

The platform should tolerate sudden traffic spikes after campaign events
or media coverage.

------------------------------------------------------------------------

# 37. Privacy & Data Protection

The architecture must support applicable Nigerian data-protection
obligations and campaign legal review.

Principles: - Lawful processing - Purpose limitation - Data
minimization - Accuracy - Retention controls - Security - Transparency -
Consent management where applicable

Required production documents/configuration: - Privacy Policy - Cookie
Notice where applicable - Terms of Use - Donation Terms - Data retention
policy - Consent language - Data-subject request process

Support operational requests for: - access - correction - consent
withdrawal - deletion where applicable - restriction/objection where
applicable - portability where applicable

Do not promise automatic deletion of financial records that must legally
be retained.

------------------------------------------------------------------------

# 38. Security Requirements

Implement: - HTTPS - Secure headers - Secure cookies - CSRF protection
where applicable - XSS prevention - Server-side validation - Output
encoding - SQL injection prevention through parameterized APIs - Rate
limiting - Bot protection - Authorization - RLS - MFA - Secrets
management - Webhook verification - Financial idempotency - Audit logs -
Dependency/security updates - Backup and recovery procedures

Secrets never exposed client-side: - Supabase service role key -
database credentials - payment secret - webhook secret - email provider
secret

------------------------------------------------------------------------

# 39. Audit Logging

Audit schema should capture: - actor ID - action - resource type -
resource ID - timestamp - relevant before/after metadata where safe -
IP/user agent if appropriate - request/correlation ID

Audit: - role changes - admin access changes - content publication -
financial overrides - refunds - compliance decisions - PII exports -
sensitive deletions - configuration changes

Audit logs should not be casually editable by ordinary admins.

------------------------------------------------------------------------

# 40. Reporting & Export

Authorized reports: - Volunteer summary - Volunteer geographic
distribution - Event registrations - Community issue categories -
Donation transactions - Reconciliation - Refunds - Compliance flags -
Campaign-approved aggregate transparency figures

Formats: - CSV - XLSX where needed - PDF where needed

Exports containing PII must: - require appropriate permission - be
audited - minimize unnecessary columns

------------------------------------------------------------------------

# 41. Communications

Initial architecture should support: - Transactional email - Donation
receipts - Event confirmations - Volunteer acknowledgments - Contact
notifications - Campaign update subscriptions

Future SMS/WhatsApp integration should use approved providers and
consent rules.

Never send campaign marketing merely because a user donated or submitted
another form.

------------------------------------------------------------------------

# 42. Notifications

Admin notification types: - New community feedback - New volunteer - New
event registration - Payment requiring review - Failed
webhook/reconciliation - New contact message - Security-sensitive
administrative event

Allow notification preferences by role/user where practical.

------------------------------------------------------------------------

# 43. Error Handling

Public users must see: - Friendly validation errors - Retry guidance -
Non-sensitive failure messages - Clear payment status

Admins should see: - actionable errors - correlation IDs - appropriate
diagnostic information

Do not leak stack traces, SQL errors, secrets or provider credentials.

Create: - 404 - 500/error boundary - empty states - loading states -
offline/network-failure states where appropriate

------------------------------------------------------------------------

# 44. Observability

Production should support: - Error tracking - Application logs - Payment
webhook logs - Authentication/security events - Database failures -
Deployment failures - Performance monitoring

Critical finance/webhook failures should notify authorized
technical/finance personnel.

Avoid logging unnecessary PII.

------------------------------------------------------------------------

# 45. Testing Strategy

## Unit

-   Validation
-   Permissions
-   Finance/compliance helpers
-   Utility functions
-   State transformations

## Integration

-   Database operations
-   Auth/roles
-   Forms
-   Payment initialization/verification
-   Webhooks
-   Event registration
-   Volunteer submission

## End-to-End

-   Public navigation
-   Volunteer flow
-   Community feedback
-   Event registration
-   Admin login
-   Content publication
-   Donation sandbox flow
-   Payment webhook
-   Reconciliation
-   Permission boundaries

## Accessibility

Run automated checks plus manual keyboard/screen-reader-oriented review
of critical flows.

## Security

Test: - unauthorized admin routes - privilege escalation - RLS -
malformed payloads - rate limits - duplicate webhook events - payment
tampering - IDOR-style access attempts

------------------------------------------------------------------------

# 46. Environments

Use separate: - Development - Staging - Production

Each environment must use separate: - Supabase project/database where
feasible - payment credentials - storage - email settings - secrets

Never use production donor data in development.

------------------------------------------------------------------------

# 47. Environment Variables

Create `.env.example` with names only.

``` env
NEXT_PUBLIC_APP_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

PAYMENT_PROVIDER=
PAYMENT_PUBLIC_KEY=
PAYMENT_SECRET_KEY=
PAYMENT_WEBHOOK_SECRET=

EMAIL_PROVIDER=
EMAIL_API_KEY=
EMAIL_FROM=

ADMIN_NOTIFICATION_EMAIL=
```

No production secrets in Git.

------------------------------------------------------------------------

# 48. Repository Structure

``` text
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── vision/
│   │   ├── constituency/
│   │   ├── community/
│   │   ├── news/
│   │   ├── events/
│   │   ├── volunteer/
│   │   ├── support/
│   │   ├── media/
│   │   ├── transparency/
│   │   └── contact/
│   ├── admin/
│   ├── auth/
│   └── api/
├── components/
│   ├── ui/
│   ├── campaign/
│   ├── forms/
│   ├── content/
│   └── admin/
├── lib/
│   ├── auth/
│   ├── permissions/
│   ├── supabase/
│   ├── campaign/
│   ├── payments/
│   ├── finance/
│   ├── compliance/
│   ├── audit/
│   ├── validation/
│   └── communications/
├── config/
├── types/
├── hooks/
├── public/
├── supabase/
│   ├── migrations/
│   └── seed/
├── tests/
├── middleware.ts
├── .env.example
└── README.md
```

------------------------------------------------------------------------

# 49. Engineering Standards

-   TypeScript strict mode
-   No `any` unless justified
-   ESLint
-   Formatting consistency
-   Reusable components
-   Server-first architecture where sensible
-   Zod validation
-   Centralized error handling
-   Database migrations
-   No hard-coded campaign content scattered through components
-   No secrets in source
-   No production fake data
-   Document non-obvious architecture decisions

Commands:

``` bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm test
```

CI must at minimum run: 1. Install 2. Lint 3. Typecheck 4. Tests 5.
Production build

------------------------------------------------------------------------

# 50. Content Configuration

Create centralized campaign configuration for immutable/basic identity:

``` ts
export const campaign = {
  candidateName: "Engr. Buradum Baribefe Daniel",
  office: "Federal House of Representatives",
  constituency: "Khana/Gokana Federal Constituency",
  partyName: "New Nigeria People's Party",
  partyAbbreviation: "NNPP",
  country: "Nigeria",
} as const;
```

Dynamic campaign content belongs in the database/CMS.

------------------------------------------------------------------------

# 51. Placeholder Policy

Unknown real-world information must be represented as: - empty CMS
fields - explicit "Content pending campaign approval" states in
staging - local placeholder imagery clearly marked for replacement

Never fabricate: - candidate education - engineering credentials beyond
the supplied "Engr." name styling - achievements - awards -
endorsements - family details - policy promises - campaign slogan -
donation totals - volunteer totals - constituency statistics - office
addresses - phone numbers - email addresses - social accounts - election
dates/results

Production public pages should not show ugly placeholder tokens. If
approved content is missing, hide the optional section gracefully.

------------------------------------------------------------------------

# 52. Legal/Compliance Build Gate

Fundraising must be feature-flagged OFF in production until the campaign
confirms:

-   Applicable electoral/campaign-finance rules
-   Candidate expenditure rules
-   Donor/contribution rules
-   Required donor declarations
-   Record-retention obligations
-   Reporting obligations
-   Approved payment account/provider
-   Donation terms
-   Privacy notice
-   Refund handling
-   Compliance contact/owner

Implement:

``` ts
features = {
  fundraisingEnabled: false,
  newsletterEnabled: true,
  eventRegistrationEnabled: true,
  communityFeedbackEnabled: true,
};
```

Only authorized configuration can enable live fundraising.

------------------------------------------------------------------------

# 53. Analytics

Use privacy-conscious analytics.

Measure aggregate: - Page traffic - Content engagement - Event
conversions - Volunteer conversions - Donation funnel completion -
Referral channels - Device classes

Do not create political persuasion scores or infer sensitive political
profiles from browsing behavior.

------------------------------------------------------------------------

# 54. Backup & Recovery

Plan: - Database backups - Storage backup/recovery - Admin account
recovery - Payment reconciliation recovery - Audit preservation -
Incident runbook

Document recovery procedure before production launch.

------------------------------------------------------------------------

# 55. Build Phases for Antigravity

Antigravity should implement incrementally and keep the application
runnable after each phase.

## Phase 0 --- Repository & Architecture

-   Initialize Next.js/TypeScript/Tailwind
-   Configure lint/typecheck/test
-   Create folder architecture
-   Create campaign config
-   Create `.env.example`
-   Set up Supabase client patterns
-   Establish design tokens

## Phase 1 --- Public Design System & Shell

-   Header
-   Footer
-   Typography
-   Buttons/forms/cards
-   Responsive layout
-   Accessibility foundations
-   Global metadata

## Phase 2 --- Core Public Pages

-   Homepage
-   About
-   Vision
-   Constituency
-   Contact
-   Media
-   Transparency shell

Use CMS-ready data interfaces.

## Phase 3 --- Supabase & Admin Authentication

-   Database migrations
-   Auth
-   Profiles
-   Roles/permissions
-   RLS
-   Admin shell
-   Audit infrastructure

## Phase 4 --- CMS

-   Candidate profile
-   Priorities
-   News
-   Media
-   Campaign settings
-   Draft/review/publish workflow

## Phase 5 --- Community & Volunteers

-   Community form/dashboard
-   Volunteer form/dashboard
-   Status management
-   Filtering
-   Consent records
-   Notifications

## Phase 6 --- Events

-   Event CRUD
-   Public listing/detail
-   Registration
-   Capacity
-   Admin attendance/exports

## Phase 7 --- Fundraising Foundation

-   Donation schema
-   Provider abstraction
-   Feature flag
-   Compliance config
-   Finance dashboard
-   No live provider until credentials/approval exist

## Phase 8 --- Payment Integration

-   Sandbox provider
-   Initialize
-   Webhook verification
-   Server verification
-   Idempotency
-   Receipts
-   Reconciliation
-   Refund support if provider supports it

## Phase 9 --- Reporting, Security & Observability

-   Exports
-   Audit views
-   Error monitoring
-   Security hardening
-   Rate limiting
-   Backup documentation

## Phase 10 --- Production Readiness

-   Accessibility audit
-   Performance audit
-   SEO
-   Mobile QA
-   End-to-end tests
-   Legal content insertion
-   Approved branding/assets
-   Production deployment
-   Fundraising remains disabled until compliance sign-off

Do not skip directly to live payment processing.

------------------------------------------------------------------------

# 56. Acceptance Criteria by Major Feature

## Homepage

-   Correct candidate/office/constituency/party displayed
-   Fully responsive
-   No invented claims
-   All CTAs route correctly
-   CMS content rendered safely
-   Strong accessibility

## Candidate Profile

-   Admin-editable
-   Draft/publish workflow
-   Media support
-   No code changes needed for biography updates

## Priorities

-   Admin CRUD
-   Publication workflow
-   Public detail presentation
-   No hard-coded manifesto claims

## Community Feedback

-   Validated submission
-   Stored securely
-   Admin management
-   Status history
-   Spam/rate protection

## Volunteers

-   Validated registration
-   Separate consent
-   Admin filters/status
-   Secure PII access
-   Export permission/audit

## Events

-   Admin CRUD
-   Public pages
-   Registration
-   Capacity
-   Confirmation
-   Cancellation support

## News

-   CRUD
-   Review/publish
-   SEO
-   Responsive content
-   Revision/audit support

## Donations

-   Feature flag
-   Server initialization
-   Provider verification
-   Signed webhook
-   Idempotency
-   Correct amount/currency validation
-   Secure records
-   Compliance hook
-   Receipt
-   Reconciliation
-   Refund record
-   Audit trail

## Admin

-   Authentication
-   MFA-ready
-   RBAC
-   RLS
-   Server authorization
-   Audit logging
-   Responsive usable dashboard

------------------------------------------------------------------------

# 57. Production Launch Checklist

## Identity & Content

-   [ ] Candidate biography approved
-   [ ] Candidate photographs approved
-   [ ] Campaign slogan approved
-   [ ] Manifesto/priorities approved
-   [ ] NNPP assets approved
-   [ ] Contact details approved
-   [ ] Social accounts verified
-   [ ] Constituency content verified

## Legal & Privacy

-   [ ] Privacy policy approved
-   [ ] Terms approved
-   [ ] Donation terms approved
-   [ ] Campaign disclaimer approved
-   [ ] Consent language approved
-   [ ] Data retention process approved

## Fundraising

-   [ ] Legal/compliance review complete
-   [ ] Current finance rules configured
-   [ ] Payment provider approved
-   [ ] Merchant/campaign account active
-   [ ] Sandbox tests passed
-   [ ] Webhooks verified
-   [ ] Reconciliation tested
-   [ ] Refund workflow tested
-   [ ] Receipts tested
-   [ ] Finance permissions tested

## Security

-   [ ] RLS reviewed
-   [ ] RBAC tested
-   [ ] MFA enabled for privileged users
-   [ ] Secrets secured
-   [ ] Rate limits active
-   [ ] Security headers active
-   [ ] Audit logging active
-   [ ] Backups confirmed
-   [ ] Recovery tested

## Quality

-   [ ] Mobile QA
-   [ ] Desktop QA
-   [ ] Accessibility review
-   [ ] SEO review
-   [ ] Performance review
-   [ ] Cross-browser QA
-   [ ] Production build passes
-   [ ] Critical E2E tests pass
-   [ ] No placeholder/fake production data

------------------------------------------------------------------------

# 58. Definition of Done

A feature is done only when it has:

-   Approved UX/UI
-   Responsive implementation
-   Accessibility
-   Server validation
-   Authorization where required
-   Error/loading/empty states
-   Security review appropriate to risk
-   Tests
-   Audit behavior where applicable
-   Documentation
-   Production-safe data handling

Financial features additionally require: - compliance review hooks -
idempotency - provider verification - reconciliation - auditability

------------------------------------------------------------------------

# 59. Instructions to Antigravity

1.  Treat this PRD as the primary product specification.
2.  Do not rebuild the requirements into a simplified landing page.
3.  Implement the complete architecture incrementally.
4.  Keep the project runnable after each phase.
5.  Do not invent missing political/candidate facts.
6.  Use real confirmed identity only where supplied in this PRD.
7.  Make content CMS-driven wherever campaign staff will need to update
    it.
8.  Use production-quality TypeScript and reusable components.
9.  Use Supabase migrations and RLS rather than ad-hoc database changes.
10. Never expose privileged secrets to the browser.
11. Do not activate live fundraising without explicit configuration and
    compliance sign-off.
12. Do not trust client-side payment success.
13. Preserve user privacy and separate consent purposes.
14. Create audit trails for sensitive administrative actions.
15. Optimize for mobile first.
16. Maintain a premium, original campaign identity rather than copying
    another candidate's site.
17. Prefer maintainability and correctness over unnecessary
    architectural complexity.
18. Add TODOs only for genuine external dependencies such as approved
    biography, official imagery, payment credentials or legal text.
19. Update the README and setup instructions as implementation evolves.
20. At the end of every build phase, run lint, typecheck, tests and
    production build and resolve failures before proceeding.

------------------------------------------------------------------------

# 60. Final Product Statement

The finished product must function as the official digital campaign and
constituency-engagement platform for **Engr. Buradum Baribefe Daniel**,
candidate for the **Federal House of Representatives, Khana/Gokana
Federal Constituency**, under the **New Nigeria People's Party (NNPP)**.

The platform must balance four objectives:

**Inform** --- provide verified information about the candidate and
campaign.

**Engage** --- give constituents meaningful ways to communicate and
participate.

**Organize** --- give campaign staff secure tools for volunteers,
events, content and communications.

**Support** --- provide a trustworthy and compliant pathway for lawful
campaign contributions.

The result should be credible enough for public launch, maintainable by
a professional engineering team, safe enough to handle campaign
operational data, and flexible enough to evolve throughout the election
cycle.
