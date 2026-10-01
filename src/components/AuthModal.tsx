import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Shield, Sparkles, User, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, loginWithGoogle, loginAsDemoUser, logout } = useAuth();
  const [googleEmail, setGoogleEmail] = useState('');
  const [learnerName, setLearnerName] = useState('');

  if (!isOpen) return null;

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      loginWithGoogle('kapilnarula27july@gmail.com', 'Kapil Narula');
    } else {
      loginWithGoogle(googleEmail.trim(), learnerName.trim() || undefined);
    }
    onClose();
  };

  const handleDemoSelect = () => {
    loginAsDemoUser();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0D0F17] border border-[#D4AF37]/50 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#2A261A] flex items-center justify-between bg-[#12141F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center font-luxury font-bold text-black text-sm">
              K
            </div>
            <div>
              <h3 className="font-luxury font-bold text-base text-white">Learner Authentication</h3>
              <p className="text-[11px] text-slate-400">Master Data Analytics With Kapil</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#1A1E2B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Current Profile Banner if signed in */}
          {user && (
            <div className="p-3.5 rounded-xl bg-[#141722] border border-[#262B3D] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-[#D4AF37] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{user.name}</span>
                    {user.isDemoUser && (
                      <span className="text-[9px] text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-1 rounded">
                        Demo
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">{user.email}</div>
                </div>
              </div>
              <button
                onClick={logout}
                className="text-xs text-red-400 hover:underline cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Quick Demo User Option */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#171B28] to-[#121520] border border-[#D4AF37]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FFDF73] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                One-Click Demo Executive User
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Recommended</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Instantly test the curriculum, interactive labs, earned badges, and certificate download as Kapil Narula (Lead AI Architect).
            </p>
            <button
              onClick={handleDemoSelect}
              className="w-full mt-2 py-2 px-3 rounded-lg bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B89225] text-black text-xs font-bold hover:brightness-110 transition-all shadow cursor-pointer"
            >
              Sign In as Demo Executive (Kapil Learner)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#1F2436]" />
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">or Google ID</span>
            <div className="flex-1 h-px bg-[#1F2436]" />
          </div>

          {/* Google Sign-In Form */}
          <form onSubmit={handleGoogleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">
                Your Name (for Certificate & Badges)
              </label>
              <input
                type="text"
                placeholder="e.g. Kapil Narula"
                value={learnerName}
                onChange={e => setLearnerName(e.target.value)}
                className="w-full bg-[#12141F] text-xs text-white rounded-lg px-3 py-2 border border-[#262B3D] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">
                Google ID / Corporate Email
              </label>
              <input
                type="email"
                placeholder="kapilnarula27july@gmail.com"
                value={googleEmail}
                onChange={e => setGoogleEmail(e.target.value)}
                className="w-full bg-[#12141F] text-xs text-white rounded-lg px-3 py-2 border border-[#262B3D] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#141722] hover:bg-[#1A1E2C] border border-[#D4AF37]/50 text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer"
            >
              {/* Google G SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google Authentication</span>
            </button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#08090E] border-t border-[#1C202F] text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            Encrypted session persistence
          </span>
          <span>Powered By Kapil</span>
        </div>
      </div>
    </div>
  );
};
