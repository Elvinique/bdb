import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { CollapsibleSection } from '../common/CollapsibleSection';

export const CommunityVoiceSection: React.FC = () => {
  const { config, addFeedback, feedbackList } = useCampaign();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lga, setLga] = useState(config.lgas[0]?.name || '[PRIMARY LGA]');
  const [ward, setWard] = useState('');
  const [community, setCommunity] = useState('');
  const [topic, setTopic] = useState('Roads & Infrastructure');
  const [message, setMessage] = useState('');

  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  const topicOptions = [
    'Education',
    'Healthcare',
    'Roads & Infrastructure',
    'Youth',
    'Employment',
    'Agriculture',
    'Security',
    'Women & Families',
    'Small Business',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !message || !community) {
      return;
    }

    const record = addFeedback({
      fullName,
      email: email || undefined,
      phone: phone || undefined,
      lga,
      ward: ward || 'Constituency General',
      community,
      topic,
      message
    });

    setLastSubmittedId(record.id);

    // reset fields
    setFullName('');
    setEmail('');
    setPhone('');
    setWard('');
    setCommunity('');
    setMessage('');
  };

  return (
    <section
      id="community-voice-section"
      className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CollapsibleSection
          theme="light"
          collapsedHeightMobile="480px"
          expandLabel="Open Citizen Concern Submission Form"
          collapseLabel="Collapse Feedback Form"
          badge="Citizen Registry"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Section Context & Explanation (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>COMMUNITY VOICE & PETITIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              What Matters to You?
            </h2>

            <p className="text-base text-stone-600 leading-relaxed">
              Legislation is only as powerful as the citizen realities that shape it. Share the specific challenges facing your ward, market, school, or street directly with our campaign policy team.
            </p>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                How Your Input Is Handled:
              </h4>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Logged directly into our Constituency Needs Registry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Reviewed by our policy team for incorporation into legislative motions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Assigned to a designated ward community caseworker.</span>
                </li>
              </ul>
            </div>

            {/* Live Counter of Community Feedback items */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-950 text-white shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-800 flex items-center justify-center font-bold text-base text-emerald-200">
                {feedbackList.length + 312}
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Community Submissions Received</p>
                <p className="text-stone-300">Active constituent voices across all wards</p>
              </div>
            </div>
          </div>

          {/* Right: Feedback Submission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-stone-50 border border-stone-200 shadow-sm">
              
              {lastSubmittedId ? (
                <div className="p-8 rounded-2xl bg-emerald-900 text-white text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-800 flex items-center justify-center mx-auto text-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Your Concern Has Been Submitted</h3>
                  <p className="text-sm text-emerald-100 max-w-md mx-auto leading-relaxed">
                    Thank you for actively contributing to your community. Your submission has been logged with reference code <strong>{lastSubmittedId}</strong>.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setLastSubmittedId(null)}
                      className="bg-white text-emerald-900 hover:bg-emerald-50 px-5 py-2.5 rounded-xl font-bold text-xs transition"
                    >
                      Submit Another Community Concern
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="voice-fullname" className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="voice-fullname"
                        type="text"
                        required
                        placeholder="e.g. Babatunde Adeyemi"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="voice-topic" className="block text-xs font-semibold text-stone-700 mb-1">
                        Topic Area <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="voice-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {topicOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="voice-lga" className="block text-xs font-semibold text-stone-700 mb-1">
                        LGA <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="voice-lga"
                        value={lga}
                        onChange={(e) => setLga(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {config.lgas.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="voice-ward" className="block text-xs font-semibold text-stone-700 mb-1">
                        Ward
                      </label>
                      <input
                        id="voice-ward"
                        type="text"
                        placeholder="e.g. Ward 03"
                        value={ward}
                        onChange={(e) => setWard(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="voice-community" className="block text-xs font-semibold text-stone-700 mb-1">
                        Community / Area <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="voice-community"
                        type="text"
                        required
                        placeholder="e.g. Central Market Area"
                        value={community}
                        onChange={(e) => setCommunity(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="voice-phone" className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        id="voice-phone"
                        type="tel"
                        placeholder="+234 803 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="voice-email" className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        id="voice-email"
                        type="email"
                        placeholder="citizen@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="voice-message" className="block text-xs font-semibold text-stone-700 mb-1">
                      Describe What Needs Attention <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="voice-message"
                      rows={4}
                      required
                      placeholder="Please share details about the challenge, location, and the impact on families or local commerce..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      id="voice-submit-btn"
                      type="submit"
                      className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT YOUR CONCERN</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  </section>
  );
};
