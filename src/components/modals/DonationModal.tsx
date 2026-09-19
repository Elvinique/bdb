import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Building2,
  Smartphone,
  Copy,
  Check,
  Download,
  AlertCircle
} from 'lucide-react';

export const DonationModal: React.FC = () => {
  const {
    isDonationModalOpen,
    setIsDonationModalOpen,
    donationPresetAmount,
    config,
    addDonation,
    notify
  } = useCampaign();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [amount, setAmount] = useState<number>(donationPresetAmount || 10000);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('5399 •••• •••• 4242');
  const [copiedBank, setCopiedBank] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedRecord, setCompletedRecord] = useState<any | null>(null);

  // Sync if preset amount updates
  React.useEffect(() => {
    if (donationPresetAmount) {
      setAmount(donationPresetAmount);
    }
  }, [donationPresetAmount]);

  if (!isDonationModalOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0123456789');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
    notify('Copied', 'Simulated campaign bank account number copied.', 'info');
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) {
      notify('Missing Fields', 'Please provide donor name and email for the receipt.', 'warning');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const record = addDonation({
        donorName,
        email: donorEmail,
        phone: donorPhone || '+234 803 000 0000',
        amount,
        lga: config.lgas[0]?.name || 'Constituency General',
        state: config.stateName,
        frequency: 'one-time',
        paymentMethod: paymentMethod === 'card' ? 'Debit Card' : paymentMethod === 'transfer' ? 'Bank Transfer' : 'USSD'
      });

      setIsProcessing(false);
      setCompletedRecord(record);
    }, 900);
  };

  const handleClose = () => {
    setIsDonationModalOpen(false);
    setCompletedRecord(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl text-white overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-800 bg-stone-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {completedRecord ? 'Contribution Receipt' : 'Voluntary Campaign Support'}
              </h3>
              <p className="text-[11px] text-stone-400">
                Official Electoral Compliance Gateway (Simulated)
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {completedRecord ? (
            /* Successful Receipt View */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-900/80 border border-emerald-500 text-emerald-300 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  PAYMENT SIMULATION SUCCESSFUL
                </span>
                <h4 className="text-2xl font-extrabold text-white">
                  ₦{completedRecord.amount.toLocaleString()}
                </h4>
                <p className="text-xs text-stone-300">
                  Thank you for supporting {config.candidateName}'s campaign for Federal House of Representatives.
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Reference:</span>
                  <span className="text-emerald-400 font-bold">{completedRecord.referenceCode}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Contributor:</span>
                  <span className="text-white">{completedRecord.donorName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Date & Time:</span>
                  <span className="text-white">{completedRecord.timestamp}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Method:</span>
                  <span className="text-white">{completedRecord.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Status:</span>
                  <span className="text-emerald-400 font-bold">VERIFIED (PROTOTYPE)</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => notify('Receipt Downloaded', 'Official prototype PDF receipt downloaded.', 'success')}
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD CITIZEN RECEIPT</span>
                </button>
                <button
                  onClick={handleClose}
                  className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-semibold py-2.5 rounded-xl text-xs transition"
                >
                  Done & Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSimulatePayment} className="space-y-5">
              
              {/* Prototype Alert Strip */}
              <div className="p-3 bg-amber-950/50 border border-amber-800/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <p>
                  <strong>Presentation Prototype:</strong> Real payments are not processed. Test cards or simulated bank transfers can be submitted safely.
                </p>
              </div>

              {/* Amount Display */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Contribution Value
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">
                    ₦{amount.toLocaleString()}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-[11px] font-bold border border-emerald-800">
                  Voluntary Civic Grant
                </span>
              </div>

              {/* Payment Method Switcher */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Select Simulated Gateway
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-bold ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-bold ${
                      paymentMethod === 'transfer'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ussd')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-bold ${
                      paymentMethod === 'ussd'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>USSD Code</span>
                  </button>
                </div>
              </div>

              {/* Method Specific Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs">
                  <div>
                    <label className="block text-stone-400 mb-1">Simulated Card Number</label>
                    <input
                      type="text"
                      disabled
                      value="5399 4100 8200 4242"
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-400 mb-1">Expiry</label>
                      <input
                        type="text"
                        disabled
                        value="12/28"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">CVV</label>
                      <input
                        type="text"
                        disabled
                        value="814"
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Bank Name:</span>
                    <span className="text-white font-semibold">First Bank of Nigeria (Demo)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Account Name:</span>
                    <span className="text-white font-semibold">{config.candidateName} Campaign Organization</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-800">
                    <div>
                      <span className="text-stone-400 block">Account Number:</span>
                      <span className="text-emerald-400 font-bold font-mono text-sm">3088 192 401</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-200 flex items-center gap-1.5 text-xs transition"
                    >
                      {copiedBank ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'ussd' && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-center space-y-2">
                  <p className="text-stone-400">Dial the simulated USSD string on your phone:</p>
                  <div className="text-emerald-400 font-mono font-bold text-lg bg-stone-900 py-2 rounded-xl border border-stone-800">
                    *894*000*3088#
                  </div>
                  <p className="text-[11px] text-stone-500">Supported on MTN, Airtel, Glo, 9mobile</p>
                </div>
              )}

              {/* Donor Verification Fields */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Your Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter donor name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Email for Receipt <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="receipt@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  {isProcessing ? (
                    <span>Verifying Prototype Transaction...</span>
                  ) : (
                    <span>CONFIRM SIMULATED PAYMENT (₦{amount.toLocaleString()})</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
