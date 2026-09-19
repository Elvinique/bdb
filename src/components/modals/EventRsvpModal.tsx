import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  CheckCircle2,
  Users
} from 'lucide-react';

export const EventRsvpModal: React.FC = () => {
  const { selectedEventForRsvp, setSelectedEventForRsvp, notify } = useCampaign();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState(1);
  const [confirmedPass, setConfirmedPass] = useState<string | null>(null);

  if (!selectedEventForRsvp) return null;

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      notify('Missing Details', 'Please provide your name and email.', 'warning');
      return;
    }

    const code = `PASS-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedPass(code);
    notify('Reservation Confirmed', `Seat reserved for ${selectedEventForRsvp.title}.`, 'success');
  };

  const handleClose = () => {
    setSelectedEventForRsvp(null);
    setConfirmedPass(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl shadow-2xl text-stone-900 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-stone-900">
              {confirmedPass ? 'Event Admission Pass' : 'Reserve Your Seat'}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {confirmedPass ? (
            <div className="text-center space-y-5 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  CONFIRMATION ISSUED
                </span>
                <h4 className="text-xl font-bold text-stone-900 mt-1">
                  You are registered!
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Present this pass or your name at the registration desk.
                </p>
              </div>

              {/* Digital Pass Ticket */}
              <div className="p-5 rounded-2xl bg-stone-900 text-white text-left font-mono text-xs space-y-2.5 shadow-lg border border-stone-800">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Pass Code:</span>
                  <span className="text-emerald-400 font-bold">{confirmedPass}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Attendee:</span>
                  <span className="text-white font-sans">{name}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Seats Reserved:</span>
                  <span className="text-white">{seats}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Event:</span>
                  <span className="text-white font-sans truncate max-w-[200px]">{selectedEventForRsvp.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Date & Time:</span>
                  <span className="text-stone-300">{selectedEventForRsvp.date} • {selectedEventForRsvp.time}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl text-xs transition"
              >
                Close Pass
              </button>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              
              {/* Event Quick Info */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
                <h4 className="font-bold text-sm text-emerald-950">
                  {selectedEventForRsvp.title}
                </h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-emerald-800">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedEventForRsvp.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedEventForRsvp.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedEventForRsvp.location}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amaka Okafor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Number of Attendees
                </label>
                <select
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value, 10))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={1}>1 Seat (Just me)</option>
                  <option value={2}>2 Seats</option>
                  <option value={3}>3 Seats</option>
                  <option value={4}>4 Seats</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 text-sm"
                >
                  <Ticket className="w-4 h-4" />
                  <span>CONFIRM RESERVATION</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
