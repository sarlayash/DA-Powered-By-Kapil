import React from 'react';
import { badgesList } from '../data/badgesData';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../types';
import { downloadBadgePDF, downloadBadgePNG } from '../utils/pdfGenerator';
import { Award, CheckCircle2, Download, FileText, Lock, ShieldCheck, Sparkles, X } from 'lucide-react';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  if (!isOpen) return null;

  const earnedBadgeIds = user?.earnedBadgeIds || [];
  const userName = user?.name || 'Kapil Learner';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0C0E15] border border-[#D4AF37]/40 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#2A261A] flex items-center justify-between bg-[#0F121C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#8C6D14] p-0.5 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10">
              <div className="w-full h-full bg-[#0C0E15] rounded-[10px] flex items-center justify-center">
                <Award className="w-5 h-5 text-[#FFDF73]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold font-luxury text-white">Competency Medallions & Badges</h2>
              <p className="text-xs text-slate-400">
                Official accreditation issued under Master Data Analytics With Kapil · Downloadable in High-Res PNG & Vector PDF
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A1D2A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {badgesList.map(badge => {
            const isEarned = earnedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  isEarned
                    ? 'bg-[#121522] border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/5'
                    : 'bg-[#0E1017] border-[#1C202F] opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Medallion Visual */}
                    <div className="relative">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${
                          isEarned
                            ? 'bg-gradient-to-tr from-[#8C6D14] via-[#D4AF37] to-[#FFF6D1] p-1'
                            : 'bg-slate-800 p-1'
                        }`}
                      >
                        <div className="w-full h-full bg-[#0A0C13] rounded-full flex flex-col items-center justify-center text-center p-1 border border-[#D4AF37]/40">
                          <span className="text-[10px] text-[#FFDF73] font-serif font-black">★</span>
                          <span className="text-[9px] text-[#D4AF37] font-bold uppercase leading-none">
                            {badge.goldLevel}
                          </span>
                        </div>
                      </div>
                      {isEarned && (
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 shadow">
                          <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[#D4AF37] tracking-wider uppercase">
                          {badge.category}
                        </span>
                        {isEarned ? (
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            Unlocked & Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Locked
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold font-luxury text-white mt-1">
                        {badge.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Controls: PNG and PDF Download */}
                <div className="pt-3 border-t border-[#1F2436] flex items-center justify-between gap-3 mt-2">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {badge.requiredModuleCount ? `${badge.requiredModuleCount} Modules Required` : 'Milestone Track'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadBadgePNG(badge, userName)}
                      disabled={!isEarned}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isEarned
                          ? 'bg-[#181C2B] hover:bg-[#22273D] text-[#FFDF73] border border-[#D4AF37]/40 cursor-pointer'
                          : 'bg-[#12141F] text-slate-600 border border-[#1A1D29] cursor-not-allowed'
                      }`}
                      title={isEarned ? 'Download high-res PNG' : 'Complete track to unlock'}
                    >
                      <Download className="w-3 h-3 text-[#D4AF37]" />
                      <span>PNG</span>
                    </button>

                    <button
                      onClick={() => downloadBadgePDF(badge, userName)}
                      disabled={!isEarned}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isEarned
                          ? 'bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B89225] text-black font-bold hover:brightness-110 cursor-pointer shadow'
                          : 'bg-[#12141F] text-slate-600 border border-[#1A1D29] cursor-not-allowed'
                      }`}
                      title={isEarned ? 'Download Vector PDF' : 'Complete track to unlock'}
                    >
                      <FileText className="w-3 h-3 text-black" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0A0C13] border-t border-[#2A261A] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>All badges formatted with cryptographic hash & official Kapil seal.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1A1E2C] hover:bg-[#252A3D] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
