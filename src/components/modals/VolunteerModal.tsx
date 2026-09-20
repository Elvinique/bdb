import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  X,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  MapPin,
  Clock
} from 'lucide-react';

export const VolunteerModal: React.FC = () => {
  const {
    isVolunteerModalOpen,
    setIsVolunteerModalOpen,
    config,
    addVolunteer,
    notify
  } = useCampaign();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lga, setLga] = useState(config.lgas[0]?.name || '[PRIMARY LGA]');
  const [ward, setWard] = useState('');
  const [community, setCommunity] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Field organizing', 'Community outreach']);
  const [availability, setAvailability] = useState<'Weekdays' | 'Weekends' | 'Full-time' | 'Flexible'>('Weekends');
  const [skills, setSkills] = useState('');
  const [message, setMessage] = useState('');

  const [registeredVolunteer, setRegisteredVolunteer] = useState<any | null>(null);

  if (!isVolunteerModalOpen) return null;

  const interestOptions = [
    'Field organizing',
    'Community outreach',
    'Digital campaign',
    'Event support',
    'Policy and research',
    'Youth mobilization',
    'Women’s mobilization',
    'Voter education'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      notify('Incomplete Form', 'Please provide your name, email and phone number.', 'warning');
      return;
    }

    const volunteerRecord = addVolunteer({
      fullName,
      email,
      phone,
      lga,
      ward: ward || 'Constituency General',
      community: community || 'Urban Central',
      areas: selectedInterests,
      interests: selectedInterests,
      availability,
      skills: skills || 'General Grassroots Support',
      message: message || undefined
    });

    setRegisteredVolunteer(volunteerRecord);
  };

  const handleClose = () => {
    setIsVolunteerModalOpen(false);
    setRegisteredVolunteer(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-2xl text-stone-900 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                {registeredVolunteer ? 'Volunteer Pass Confirmed' : 'Join the Grassroots Volunteer Corps'}
              </h3>
              <p className="text-xs text-stone-500">
                Building an empowered movement across {config.constituencyName}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {registeredVolunteer ? (
            /* Volunteer Success Pass */
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  OFFICIAL REGISTRATION LOGGED
                </span>
                <h4 className="text-2xl font-extrabold text-stone-900">
                  Welcome to the Campaign, {registeredVolunteer.fullName}!
                </h4>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Your volunteer profile has been dispatched to your Ward Coordinator in <strong>{registeredVolunteer.lga}</strong>.
                </p>
              </div>

              {/* Volunteer Credential Card */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Volunteer ID:</span>
                  <span className="text-emerald-700 font-bold">{registeredVolunteer.id}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">LGA / Ward:</span>
                  <span className="text-stone-800">{registeredVolunteer.lga} • {registeredVolunteer.ward}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Availability:</span>
                  <span className="text-stone-800">{registeredVolunteer.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Primary Roles:</span>
                  <span className="text-stone-800 font-sans font-semibold">{registeredVolunteer.interests.join(', ')}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleClose}
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm transition shadow"
                >
                  Return to Campaign Portal
                </button>
              </div>
            </div>
          ) : (
            /* Volunteer Application Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vol-fullname" className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Legal / Preferred Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="vol-fullname"
                    type="text"
                    required
                    placeholder="e.g. Fatima Mohammed"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="vol-email" className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="vol-email"
                    type="email"
                    required
                    placeholder="volunteer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="vol-phone" className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="vol-phone"
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="vol-lga" className="block text-xs font-semibold text-stone-700 mb-1">
                    LGA of Residence <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="vol-lga"
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {config.lgas.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="vol-ward" className="block text-xs font-semibold text-stone-700 mb-1">
                    Ward Name / Number
                  </label>
                  <input
                    id="vol-ward"
                    type="text"
                    placeholder="e.g. Ward 04"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Areas of Interest Multi-select */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-stone-700">
                  Areas of Contribution (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {interestOptions.map((opt) => {
                    const isSelected = selectedInterests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-left transition border ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label htmlFor="vol-avail" className="block text-xs font-semibold text-stone-700 mb-1">
                    Availability
                  </label>
                  <select
                    id="vol-avail"
                    value={availability}
                    onChange={(e: any) => setAvailability(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Weekends">Weekends Only</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Flexible">Flexible / On-call</option>
                    <option value="Full-time">Full-time Campaign Fellow</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vol-skills" className="block text-xs font-semibold text-stone-700 mb-1">
                    Key Skills / Profession
                  </label>
                  <input
                    id="vol-skills"
                    type="text"
                    placeholder="e.g. Graphic design, Teaching, Logistics..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="vol-message" className="block text-xs font-semibold text-stone-700 mb-1">
                  Why do you want to volunteer for this campaign? (Optional)
                </label>
                <textarea
                  id="vol-message"
                  rows={3}
                  placeholder="Share a short note about your motivation..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>JOIN THE VOLUNTEER TEAM</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
