import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { initiateFlutterwavePayment } from '../../lib/payments/flutterwave';
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
  Lock,
  ExternalLink,
  Loader2
} from 'lucide-react';

export const DonationModal: React.FC = () => {
  const {
    isDonationModalOpen,
    setIsDonationModalOpen,
    donationPresetAmount,
    donationPrefillData,
    config,
    addDonation,
    notify
  } = useCampaign();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [amount, setAmount] = useState<number>(donationPresetAmount || 10000);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedRecord, setCompletedRecord] = useState<any | null>(null);

  // Sync if preset amount or prefill data updates
  React.useEffect(() => {
    if (donationPresetAmount) {
      setAmount(donationPresetAmount);
    }
  }, [donationPresetAmount]);

  React.useEffect(() => {
    if (donationPrefillData) {
      if (donationPrefillData.donorName) setDonorName(donationPrefillData.donorName);
      if (donationPrefillData.email) setDonorEmail(donationPrefillData.email);
      if (donationPrefillData.phone) setDonorPhone(donationPrefillData.phone);
    }
  }, [donationPrefillData]);

  if (!isDonationModalOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('3088192401');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
    notify('Copied', 'Campaign designated account number copied.', 'info');
  };

  const handleProcessDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorEmail.trim()) {
      notify('Missing Fields', 'Please provide donor name and email for the receipt.', 'warning');
      return;
    }

    if (amount <= 0) {
      notify('Invalid Amount', 'Please specify a valid contribution amount.', 'warning');
      return;
    }

    setIsProcessing(true);

    try {
      notify('Connecting Gateway', 'Opening Flutterwave secure checkout...', 'info');

      const paymentResponse = await initiateFlutterwavePayment({
        amount,
        donorName: donorName.trim(),
        email: donorEmail.trim(),
        phone: donorPhone.trim() || undefined,
        candidateName: config.candidateName,
        paymentMethod: paymentMethod === 'card' ? 'card' : paymentMethod === 'transfer' ? 'transfer' : 'ussd'
      });

      // Record verified contribution in campaign state and Supabase
      const record = addDonation({
        donorName: donorName.trim(),
        email: donorEmail.trim(),
        phone: donorPhone.trim() || '+234 800 000 0000',
        amount,
        lga: config.lgas[0]?.name || 'Khana / Gokana Federal Constituency',
        state: config.stateName || 'Rivers State',
        frequency: 'one-time',
        paymentMethod: paymentMethod === 'card' ? 'Debit Card' : paymentMethod === 'transfer' ? 'Bank Transfer' : 'USSD',
        paymentProvider: 'flutterwave',
        reference: paymentResponse.tx_ref || ('TX-BDB-FLW-' + (paymentResponse.transaction_id || Date.now())),
      });

      setIsProcessing(false);
      setCompletedRecord(record);
      notify('Payment Verified!', `Thank you ${donorName}! Your contribution has been verified by Flutterwave.`, 'success');
    } catch (err: any) {
      setIsProcessing(false);
      console.warn('Flutterwave payment notice:', err);
      if (err.message && err.message.toLowerCase().includes('cancelled')) {
        notify('Payment Cancelled', 'You closed the Flutterwave checkout window before completing payment.', 'info');
      } else {
        notify('Payment Gateway Notice', err.message || 'Could not launch payment gateway. Please retry.', 'warning');
      }
    }
  };

  const handleClose = () => {
    setIsDonationModalOpen(false);
    setCompletedRecord(null);
    setIsProcessing(false);
  };

  const presetValues = [5000, 10000, 25000, 50000, 100000];

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
                {completedRecord ? 'Citizen Contribution Receipt' : 'Voluntary Campaign Contribution'}
              </h3>
              <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400 inline" />
                <span>Secured by Flutterwave • Electoral Compliance</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {completedRecord ? (
            /* Success Receipt View */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/40">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">Thank You for Standing with Us!</h4>
                <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                  Your voluntary contribution has been verified by Flutterwave and registered on the transparent campaign ledger.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-400">Transaction Ref:</span>
                  <span className="font-mono text-emerald-400 font-bold">{completedRecord.reference || completedRecord.id}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-400">Payment Gateway:</span>
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider">FLUTTERWAVE VERIFIED</span>
                </div>
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-400">Contributor:</span>
                  <span className="text-white font-medium">{completedRecord.donorName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-400">Email:</span>
                  <span className="text-stone-300 font-mono">{completedRecord.email}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-400">Amount Contributed:</span>
                  <span className="text-white font-bold text-sm text-emerald-400">₦{completedRecord.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-400">Payment Channel:</span>
                  <span className="text-white">{completedRecord.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-stone-400">Audit Status:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-700/60">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    VERIFIED & RECORDED
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    window.print();
                    notify('Receipt Printed', 'Campaign contribution receipt sent to printer.', 'success');
                  }}
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  <Download className="w-4 h-4" />
                  <span>PRINT / SAVE CITIZEN RECEIPT</span>
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
            <form onSubmit={handleProcessDonation} className="space-y-5">
              
              {/* Electoral Security & Compliance Notice */}
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/70 rounded-xl flex items-start gap-2.5 text-xs text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <p>
                  <strong>Electoral Compliance & Security:</strong> All voluntary contributions adhere strictly to INEC guidelines and Nigerian Electoral Act financing limits.
                </p>
              </div>

              {/* Amount Display & Quick Presets */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                      Contribution Amount
                    </span>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">
                      ₦{amount.toLocaleString()}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-[11px] font-bold border border-emerald-800">
                    Voluntary Civic Grant
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {presetValues.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-1.5 text-[11px] font-bold rounded-lg border transition ${
                        amount === val
                          ? 'bg-emerald-700 border-emerald-500 text-white'
                          : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      ₦{(val / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Select Preferred Payment Channel
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

              {/* Gateway Channel Explanatory Banner */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 text-xs space-y-2">
                {paymentMethod === 'card' && (
                  <div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Secured Card Checkout</span>
                    </div>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Accepts Nigerian & international <strong>Mastercard, Visa, and Verve</strong> cards. Flutterwave handles your card credentials with 256-bit SSL encryption and 3D Secure OTP.
                    </p>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Instant Dynamic Bank Transfer</span>
                    </div>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Flutterwave will generate a dedicated 1-time virtual bank account number for your transfer. Once sent via your mobile banking app, confirmation is instantaneous.
                    </p>
                  </div>
                )}

                {paymentMethod === 'ussd' && (
                  <div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Direct USSD Banking</span>
                    </div>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Flutterwave generates your bank-specific USSD dial string (GTBank, Zenith, Access, UBA, etc.) for instant mobile authorization without internet data.
                    </p>
                  </div>
                )}
              </div>

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
                    Email for Official Receipt <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="donor@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Phone Number <span className="text-stone-500">(Optional for SMS alert)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0803 123 4567"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 text-sm"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                      <span>Connecting to Flutterwave Gateway...</span>
                    </>
                  ) : (
                    <span>PAY ₦{amount.toLocaleString()} WITH FLUTTERWAVE</span>
                  )}
                </button>

                <p className="text-[11px] text-stone-400 text-center mt-2.5 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400 inline" />
                  <span>Powered by Flutterwave • 256-Bit Bank-Grade Encryption</span>
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

