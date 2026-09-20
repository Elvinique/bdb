import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { X, Shield, BookOpen, Lock, Scale } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const {
    isLegalModalOpen,
    setIsLegalModalOpen,
    legalModalTab,
    setLegalModalTab,
    config
  } = useCampaign();

  if (!isLegalModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl shadow-2xl text-stone-900 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Legal, Regulatory & Compliance Framework
              </h3>
              <p className="text-xs text-stone-500">
                Aligned with the Nigerian Electoral Act 2022 & INEC Guidelines
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLegalModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-100/70 px-6">
          <button
            onClick={() => setLegalModalTab('finance')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              legalModalTab === 'finance'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Campaign Finance & INEC Rules</span>
          </button>

          <button
            onClick={() => setLegalModalTab('terms')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              legalModalTab === 'terms'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Donation Terms</span>
          </button>

          <button
            onClick={() => setLegalModalTab('privacy')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              legalModalTab === 'privacy'
                ? 'border-emerald-700 text-emerald-900 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy & NDPR Compliance</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-4 text-sm text-stone-700 leading-relaxed font-normal">
          {legalModalTab === 'finance' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-stone-900">
                Electoral Act 2022 & INEC Compliance Standards
              </h4>
              <p>
                The {config.candidateName} Campaign Organization operates in strict compliance with the provisions of the Constitution of the Federal Republic of Nigeria, the Electoral Act 2022, and relevant guidelines published by the Independent National Electoral Commission (INEC).
              </p>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <p className="font-bold text-stone-900">Core Statutory Commitments:</p>
                <ul className="list-disc list-inside space-y-1 text-stone-600">
                  <li>No foreign donations or anonymized corporate shell contributions are accepted.</li>
                  <li>All contributions over the statutory threshold are documented with traceable citizen identification.</li>
                  <li>Campaign spending is strictly capped within limits prescribed under Section 88 of the Electoral Act 2022.</li>
                  <li>Audited campaign accounts will be submitted to INEC and made available for civic scrutiny following election conclusion.</li>
                </ul>
              </div>
            </div>
          )}

          {legalModalTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-stone-900">
                Terms of Voluntary Civic Contributions
              </h4>
              <p>
                By making a contribution to this campaign, you confirm and agree to the following conditions:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-xs text-stone-600">
                <li>I am a citizen of Nigeria or an eligible contributor acting in accordance with statutory guidelines.</li>
                <li>This contribution is made from my own personal funds and not provided to me by another person or entity for the purpose of making this contribution.</li>
                <li>I understand that contributions to political campaigns are not tax-deductible under current Nigerian tax law.</li>
                <li>All contributions are voluntary and non-refundable once disbursed into voter education and field logistics.</li>
                <li><strong>Statutory Recordkeeping:</strong> All donor records are preserved in strict compliance with the Electoral Act and audited campaign finance regulations.</li>
              </ol>
            </div>
          )}

          {legalModalTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-stone-900">
                Privacy Policy & Nigeria Data Protection Regulation (NDPR)
              </h4>
              <p>
                The campaign is committed to safeguarding the privacy and personal data of every volunteer, donor, and citizen who interacts with our digital platforms.
              </p>
              <div className="space-y-2 text-xs text-stone-600">
                <p>
                  <strong>Data Minimization:</strong> We do NOT collect national identity numbers (NIN), Bank Verification Numbers (BVN), or biometric records.
                </p>
                <p>
                  <strong>Purpose Limitation:</strong> Information provided through community feedback forms, RSVP registrations, and volunteer applications is used exclusively for campaign organizing and constituent outreach.
                </p>
                <p>
                  <strong>No Third-Party Commercialization:</strong> We do not sell, rent, or lease citizen contact information to commercial brokers or third-party advertisers.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsLegalModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
          >
            Close Legal Notice
          </button>
        </div>

      </div>
    </div>
  );
};
