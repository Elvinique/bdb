import React, { useState, useEffect, useRef } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  X,
  Loader2
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpenDirect?: boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpenDirect = false }) => {
  const {
    isAdminLoginModalOpen,
    setIsAdminLoginModalOpen,
    verifyAdminPassword,
    setCurrentPage,
    config
  } = useCampaign();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = isOpenDirect || isAdminLoginModalOpen;

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setErrorMsg('');
      setIsVerifying(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAdminLoginModalOpen(false);
    if (isOpenDirect) {
      setCurrentPage('home');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Please enter the admin passcode.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    try {
      const success = await verifyAdminPassword(password);
      if (!success) {
        setErrorMsg('Incorrect admin passcode. Access denied.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please retry.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md bg-stone-900 border border-stone-700/80 rounded-3xl shadow-2xl text-white overflow-hidden my-8 transition-transform duration-200 ${
          shake ? 'animate-bounce' : ''
        }`}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between p-6 border-b border-stone-800 bg-stone-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-600/50 flex items-center justify-center text-emerald-400 shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Staff Operations Portal
              </h3>
              <p className="text-[11px] text-stone-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
                <span>Authorized Campaign Staff Only</span>
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

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-left space-y-1.5">
            <h4 className="text-sm font-semibold text-stone-200">
              Security Authentication
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Enter the designated campaign operations passcode to access volunteer rosters, community petitions, financial ledgers, and live audit logs.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-passcode-input"
                className="block text-xs font-semibold text-stone-300 mb-2 flex items-center justify-between"
              >
                <span>Admin Passcode</span>
                <span className="text-[10px] text-stone-400 font-mono">
                  Default: 2255
                </span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  ref={inputRef}
                  id="admin-passcode-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter passcode"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-stone-500 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="admin-login-submit-btn"
                type="submit"
                disabled={isVerifying}
                className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 text-sm border border-emerald-400/30"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>UNLOCK STAFF PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Cancel / Return */}
            <div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 text-xs text-stone-400 hover:text-white transition font-medium text-center"
              >
                Cancel & Return to Public Site
              </button>
            </div>
          </form>

          {/* Compliance & Security Footer Notice */}
          <div className="pt-2 border-t border-stone-800 text-center">
            <p className="text-[10px] text-stone-400 leading-normal">
              {config.candidateName} Campaign Organization • All staff activity is logged under statutory electoral audit requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
