import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Share2,
  Clock
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { config, notify } = useCampaign();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setSubmitted(true);
    notify(
      'Message Received',
      `Thank you, ${name}. Your message has been routed to the campaign liaison office.`,
      'success'
    );

    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <section
      id="contact-section"
      className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Campaign Office Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>DIRECT CONTACT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Campaign Office & Liaison
            </h2>

            <p className="text-base text-stone-600 leading-relaxed">
              We welcome letters, community invitations, citizen memorandums, and general inquiries. Our constituency headquarters is open to all constituents.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Campaign Headquarters
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5">
                    {config.headquartersAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Official Campaign Phone
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5">
                    {config.campaignPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-sky-100/70 border border-sky-200 flex items-center justify-center text-sky-800 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Official Campaign Email
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5">
                    {config.campaignEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center text-stone-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Office Hours
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5">
                    Monday – Saturday: 9:00 AM – 6:00 PM WAT
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
                Official Digital Channels
              </h4>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <a
                  href={config.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 transition border border-stone-200"
                >
                  Facebook
                </a>
                <a
                  href={config.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 transition border border-stone-200"
                >
                  X (Twitter)
                </a>
                <a
                  href={config.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 transition border border-stone-200"
                >
                  Instagram
                </a>
                <a
                  href={config.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 transition border border-stone-200"
                >
                  YouTube
                </a>
                <a
                  href={config.socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 transition border border-stone-200"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-stone-50 border border-stone-200 shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Our secretariat typically replies within 24 to 48 hours.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-900 text-white text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-300 mx-auto" />
                  <h4 className="text-lg font-bold">Message Delivered</h4>
                  <p className="text-xs text-emerald-100 max-w-sm mx-auto">
                    Thank you for reaching out. A campaign representative will follow up via email or phone.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-bold underline text-emerald-200 hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Chief / Mrs. / Mr. ..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+234 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-semibold text-stone-700 mb-1">
                      Message / Inquiry Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={5}
                      required
                      placeholder="How can our campaign collaborate with or assist your community?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    id="contact-send-btn"
                    type="submit"
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 px-6 rounded-xl transition shadow flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
