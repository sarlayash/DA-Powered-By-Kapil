import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Award, CheckCircle2, Flame, LogIn, LogOut, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, onOpenBadges, onOpenCertificate }) => {
  const { user, logout, completionPercentage, earnedBadgesCount, loginAsDemoUser } = useAuth();
  const completedCount = user?.completedModuleIds.length || 0;

  return (
    <header className="h-18 bg-[#090A0F]/95 backdrop-blur-md border-b border-[#2A261A] sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Zone 1: Brand Title (Strictly one text wordmark per guidelines) */}
      <div className="flex items-center gap-3">
        <a href="#dashboard" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#8C6D14] p-0.5 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10">
            <div className="w-full h-full bg-[#0E1017] rounded-[7px] flex items-center justify-center font-luxury font-black text-[#D4AF37] text-lg">
              K
            </div>
          </div>
          <div>
            <span className="font-luxury font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
              KAPIL ANALYTICS
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5">
              87-Module Masterclass
            </span>
          </div>
        </a>
      </div>

      {/* Zone 2: Curriculum Metrics (Clean unboxed typography) */}
      <div className="hidden lg:flex items-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-slate-300 font-medium">{completedCount} of 87 Modules</span>
          <span className="text-slate-600">·</span>
          <span className="text-[#FFDF73] font-semibold">{completionPercentage}% Completed</span>
        </div>

        <div className="w-32 bg-[#1A1D27] h-2 rounded-full overflow-hidden border border-[#2E3346]">
          <div
            className="bg-gradient-to-r from-[#8C6D14] via-[#D4AF37] to-[#FFDF73] h-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <button
          onClick={onOpenBadges}
          className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer group"
          title="View Badges"
        >
          <Award className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
          <span className="text-slate-200 font-semibold">{earnedBadgesCount}</span>
          <span className="text-slate-400">Badges</span>
        </button>

        <div className="flex items-center gap-1 text-amber-400">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="font-semibold text-slate-200">Day 6</span>
          <span className="text-slate-400">Streak</span>
        </div>
      </div>

      {/* Zone 3: User Controls & Authentication */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCertificate}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#090A0F] bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B89225] rounded-md hover:brightness-110 transition-all shadow-sm shadow-[#D4AF37]/20 whitespace-nowrap cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Certificate
        </button>

        {user ? (
          <div className="flex items-center gap-2 pl-2 border-l border-[#2A261A]">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#141722] hover:bg-[#1A1E2C] border border-[#2A261A] transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D4AF37]">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="hidden md:inline-block text-xs font-medium text-slate-200 max-w-[130px] truncate">
                {user.name}
              </span>
              {user.isDemoUser && (
                <span className="text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/20">
                  Demo
                </span>
              )}
            </button>

            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/20 rounded transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={loginAsDemoUser}
              className="px-3 py-1.5 text-xs font-medium text-[#D4AF37] border border-[#D4AF37]/40 rounded-md hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
            >
              Demo User
            </button>
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1A1D27] border border-[#2E3346] rounded-md hover:border-[#D4AF37] transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
              Sign In with Google
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
