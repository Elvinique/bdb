import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { ShieldCheck, Info, Check, ArrowRight, Lock } from 'lucide-react';

export const DonationSection: React.FC = () => {
  const {
    config,
    setIsDonationModalOpen,
    setDonationPresetAmount,
    setDonationPrefillData,
    setIsLegalModalOpen,
    setLegalModalTab,
    notify
  } = useCampaign();

  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [donorLga, setDonorLga] = useState(config.lgas[0]?.name || '[PRIMARY LGA]');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const presetAmounts = [5000, 10000, 25000, 50000, 100000];

  const handleSelectPreset = (amt: number) => {
    setSelectedAmount(amt);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      setSelectedAmount(num);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      notify('Acceptance Required', 'Please confirm agreement with the campaign contribution terms.', 'warning');
      return;
    }

    const finalAmount = isCustom ? parseInt(customAmount.replace(/[^0-9]/g, ''), 10) || 5000 : selectedAmount;
    if (finalAmount < 1000) {
      notify('Minimum Amount', 'Minimum voluntary contribution amount is ₦1,000.', 'warning');
      return;
    }

    setDonationPresetAmount(finalAmount);
    setDonationPrefillData({
      donorName: fullName.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
    });
    setIsDonationModalOpen(true);
  };

  const openLegal = (tab: 'finance' | 'terms' | 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  return (
    <section
      id="donate-section"
      className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-b border-stone-800 relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-amber-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Campaign Support Purpose & Trust Note (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GRASSROOTS FUNDRAISING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Support the Campaign
            </h2>

            <p className="text-base text-stone-300 leading-relaxed font-normal">
              Your support helps us connect with communities, share our vision and build a stronger grassroots campaign. Every contribution powers ward listening townhalls, voter education literature, and citizen mobilization.
            </p>

            {/* Electoral Compliance Notice Box */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Electoral Compliance & Security
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  All campaign contributions strictly adhere to INEC regulations and Nigerian Electoral Act financing thresholds. Contributions are processed through encrypted payment channels.
                </p>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secured by Flutterwave • 256-bit Encrypted Electoral Gateway</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Corporate Dark Money • 100% People-Funded</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Audited Under Nigerian Electoral Act & INEC Rules</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Digital Voluntary Contribution Receipt</span>
              </div>
            </div>

            {/* Legal policy links */}
            <div className="pt-4 border-t border-stone-800 flex flex-wrap gap-4 text-xs text-stone-400">
              <button
                type="button"
                onClick={() => openLegal('terms')}
                className="hover:text-emerald-400 underline transition"
              >
                Donation Terms
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal('privacy')}
                className="hover:text-emerald-400 underline transition"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal('finance')}
                className="hover:text-emerald-400 underline transition"
              >
                Campaign Finance Disclosures
              </button>
            </div>
          </div>

          {/* Right: Donation Flow Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-stone-800/90 border border-stone-700/80 shadow-2xl backdrop-blur-md">
              
              <form onSubmit={handleContinue} className="space-y-6">
                
                {/* 1. Frequency Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-stone-900 rounded-xl border border-stone-700">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      frequency === 'one-time'
                        ? 'bg-emerald-700 text-white shadow'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    One-time Contribution
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      frequency === 'monthly'
                        ? 'bg-emerald-700 text-white shadow'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Monthly Recurring
                  </button>
                </div>

                {/* 2. Amount Selection Buttons */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-300">
                    Select Contribution Amount (NGN)
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {presetAmounts.map((amt) => {
                      const isSelected = !isCustom && selectedAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          id={`donate-preset-${amt}`}
                          onClick={() => handleSelectPreset(amt)}
                          className={`py-3 px-2 rounded-xl text-sm font-bold transition border ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                              : 'bg-stone-900/80 text-stone-200 border-stone-700 hover:bg-stone-900 hover:border-stone-600'
                          }`}
                        >
                          ₦{amt.toLocaleString()}
                        </button>
                      );
                    })}

                    {/* Custom Amount Toggle Button */}
                    <button
                      type="button"
                      id="donate-preset-custom"
                      onClick={() => setIsCustom(true)}
                      className={`py-3 px-2 rounded-xl text-sm font-bold transition border ${
                        isCustom
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                          : 'bg-stone-900/80 text-stone-200 border-stone-700 hover:bg-stone-900 hover:border-stone-600'
                      }`}
                    >
                      Custom Amount
                    </button>
                  </div>

                  {/* Custom Amount Input field if active */}
                  {isCustom && (
                    <div className="pt-2 animate-in fade-in duration-200">
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-stone-400 font-bold text-sm">
                          ₦
                        </span>
                        <input
                          id="donate-custom-input"
                          type="text"
                          placeholder="Enter custom amount (e.g. 75,000)"
                          value={customAmount}
                          onChange={(e) => handleCustomChange(e.target.value)}
                          className="w-full bg-stone-900 border border-emerald-500/60 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Donor Details Form */}
                <div className="space-y-3 pt-2 border-t border-stone-700/60">
                  <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Contributor Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="donor-fullname" className="block text-[11px] font-medium text-stone-300 mb-1">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="donor-fullname"
                        type="text"
                        required
                        placeholder="e.g. Dr. Kelechi Nwosu"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="donor-email" className="block text-[11px] font-medium text-stone-300 mb-1">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="donor-email"
                        type="email"
                        required
                        placeholder="contributor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="donor-phone" className="block text-[11px] font-medium text-stone-300 mb-1">
                        Phone Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="donor-phone"
                        type="tel"
                        required
                        placeholder="+234 803 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="donor-lga" className="block text-[11px] font-medium text-stone-300 mb-1">
                        Local Government Area (Optional)
                      </label>
                      <select
                        id="donor-lga"
                        value={donorLga}
                        onChange={(e) => setDonorLga(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {config.lgas.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                        <option value="Outside Constituency">Outside Constituency / Diaspora</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Compliance Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-300 leading-relaxed">
                    <input
                      id="donor-terms-checkbox"
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 rounded mt-0.5 text-emerald-600 bg-stone-900 border-stone-600 focus:ring-emerald-500"
                    />
                    <span>
                      I confirm that this voluntary contribution is made from my own personal funds, and I agree to the campaign's donation terms and privacy policy.
                    </span>
                  </label>
                </div>

                {/* 5. Submit CTA Button */}
                <div className="pt-2">
                  <button
                    id="donate-continue-btn"
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg hover:shadow-emerald-900/50 flex items-center justify-center gap-2 text-sm active:scale-95 border border-emerald-400/30"
                  >
                    <span>PROCEED TO SECURE CONTRIBUTION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[11px] text-stone-400 mt-2 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-400 inline" />
                    <span>Secured by Flutterwave • 256-bit SSL Encrypted • Cards, Bank Transfer & USSD</span>
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
