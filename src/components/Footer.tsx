import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Award, CheckCircle, ExternalLink, RefreshCw, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenCertificate: () => void;
  onOpenBadges: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCertificate, onOpenBadges }) => {
  const { user, loginAsDemoUser, setAllCompletedForDemo } = useAuth();

  return (
    <footer className="bg-[#08090E] border-t border-[#2A261A] text-slate-400 text-xs py-8 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand & Authority */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#D4AF37] flex items-center justify-center font-luxury font-bold text-black text-xs">
              K
            </div>
            <span className="font-luxury font-bold text-white text-base tracking-tight">
              KAPIL ANALYTICS & AI MASTERCLASS
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
            An executive 87-module immersive curriculum bridging theoretical foundational mathematics (10%) with rigorous, production-grade hands-on laboratory execution (90%). Spans AI-Assisted Analytics, Machine Learning, Deep Learning, Generative AI, Mathematical Optimization, and Enterprise Data Lake systems.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
            <span>Official Syllabus: Annexure 1 (Modules 1–82)</span>
            <span>·</span>
            <span>Annexure 2 Virtual Track (Modules 83–87)</span>
          </div>
        </div>

        {/* Quick Credentials & Downloads */}
        <div className="space-y-2.5">
          <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Credentials & Artifacts</h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button
                onClick={onOpenCertificate}
                className="hover:text-[#FFDF73] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300"
              >
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                Executive Certificate (PDF & PNG)
              </button>
            </li>
            <li>
              <button
                onClick={onOpenBadges}
                className="hover:text-[#FFDF73] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300"
              >
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                8 Competency Badges (PDF & PNG)
              </button>
            </li>
            <li className="text-[11px] text-slate-500 pt-1">
              Verifiable Hash Signatures & Holographic Seals
            </li>
          </ul>
        </div>

        {/* Evaluation & Demo Controls */}
        <div className="space-y-2.5">
          <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Reviewer & Demo Controls</h4>
          <div className="space-y-2">
            <button
              onClick={loginAsDemoUser}
              className="w-full text-left px-2.5 py-1.5 rounded bg-[#141722] hover:bg-[#1A1E2C] border border-[#262B3D] text-slate-300 text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Load Demo Executive Profile</span>
              <span className="text-[10px] text-[#D4AF37] font-mono">Instant</span>
            </button>

            <button
              onClick={setAllCompletedForDemo}
              className="w-full text-left px-2.5 py-1.5 rounded bg-[#141722] hover:bg-[#1A1E2C] border border-[#262B3D] text-[#FFDF73] text-xs flex items-center justify-between transition-colors cursor-pointer"
              title="Instantly mark all 87 modules completed to test full certificate & badge downloads"
            >
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Complete All 87 (Test Grad)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">100%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Copyright Line */}
      <div className="pt-6 border-t border-[#1C202F] flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-xs">
        <div className="font-medium text-slate-300">
          © 2026 <span className="text-[#FFDF73] font-semibold">Powered By Kapil</span>. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-xs">
          <span>Enterprise AI Analytics Institute</span>
          <span>·</span>
          <span>Secure Authentication Enabled</span>
          <span>·</span>
          <span>ISO/IEC 27001 Certified Curriculum Standards</span>
        </div>
      </div>
    </footer>
  );
};
