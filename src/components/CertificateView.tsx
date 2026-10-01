import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { downloadCertificatePDF, downloadCertificatePNG } from '../utils/pdfGenerator';
import {
  Award,
  CheckCircle2,
  Download,
  FileText,
  Printer,
  ShieldCheck,
  Sparkles,
  UserCheck
} from 'lucide-react';

export const CertificateView: React.FC = () => {
  const { user, completionPercentage, setAllCompletedForDemo } = useAuth();
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
        <p>Please sign in to view your personalized executive certificate.</p>
      </div>
    );
  }

  const handleDownloadPNG = async () => {
    setIsExporting(true);
    await downloadCertificatePNG(user, completionPercentage);
    setIsExporting(false);
  };

  const handleDownloadPDF = () => {
    downloadCertificatePDF(user, completionPercentage);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#090A0F]">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A261A] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FFDF73] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Accredited Executive Credential</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-luxury text-white mt-1">
              Executive Certificate of Mastery
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Official conferral for completing the 87-Module Curriculum in AI-Assisted Analytics & Enterprise Data Lake.
            </p>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-lg bg-[#141722] hover:bg-[#1C2030] border border-[#D4AF37]/50 text-[#FFDF73] text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>{isExporting ? 'Rendering...' : 'Download PNG'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B89225] hover:brightness-110 text-black text-xs font-extrabold flex items-center gap-2 transition-all shadow-md shadow-[#D4AF37]/25 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-black" />
              <span>Download PDF (A4)</span>
            </button>
          </div>
        </div>

        {/* Certificate Visual Preview Frame (Luxurious Black & Gold Theme) */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#10131E] to-[#0A0C13] border-4 border-[#D4AF37] p-8 md:p-14 shadow-2xl shadow-[#D4AF37]/10 text-center space-y-6 overflow-hidden">
          {/* Inner hairline gold border */}
          <div className="absolute inset-3 border border-[#8C6D14]/70 pointer-events-none rounded-xl" />

          {/* Ornate corner ornaments */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#FFDF73]" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#FFDF73]" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#FFDF73]" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#FFDF73]" />

          {/* Institution Header */}
          <div className="space-y-1">
            <h3 className="font-luxury font-bold text-sm md:text-base text-[#D4AF37] tracking-[0.25em] uppercase">
              Kapil Analytics & Artificial Intelligence Institute
            </h3>
            <p className="text-[10px] md:text-xs text-slate-400 tracking-[0.15em] uppercase">
              Executive Fellowship Program & Curriculum Board
            </p>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
          </div>

          {/* Title */}
          <div className="pt-2">
            <h2 className="font-luxury font-black text-2xl md:text-4xl text-white tracking-wide">
              CERTIFICATE OF MASTERY
            </h2>
            <p className="text-xs md:text-sm text-slate-300 tracking-wider uppercase mt-2">
              This prestigious credential is proud conferred upon
            </p>
          </div>

          {/* Recipient Name */}
          <div className="py-2">
            <div className="font-luxury font-extrabold text-3xl md:text-5xl gold-text-gradient tracking-wider inline-block border-b-2 border-[#D4AF37]/60 pb-2 px-6">
              {user.name.toUpperCase()}
            </div>
          </div>

          {/* Body Statement */}
          <div className="max-w-2xl mx-auto space-y-2 text-xs md:text-sm text-slate-300 leading-relaxed">
            <p>
              For successfully demonstrating industrial competence and quantitative rigor across the comprehensive
            </p>
            <p className="font-luxury font-bold text-sm md:text-base text-white tracking-wide">
              87-Module Curriculum in AI-Assisted Analytics, ML, GenAI & Enterprise Data Lake
            </p>
            <p className="text-slate-400 text-xs">
              Completed with 10% Foundational Theory and 90% Industrial Hands-On Laboratory Verification ({completionPercentage}% verified)
            </p>
          </div>

          {/* Medallion Holographic Seal in Center */}
          <div className="pt-4 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#8C6D14] via-[#D4AF37] to-[#FFF6D1] p-1 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0C0E16] rounded-full border border-[#D4AF37]/60 flex flex-col items-center justify-center text-center p-2">
                <span className="text-[10px] text-[#FFDF73]">★ ★ ★</span>
                <span className="font-luxury font-black text-sm text-[#FFDF73] leading-tight">KAPIL</span>
                <span className="text-[8px] text-[#D4AF37] font-bold tracking-widest uppercase">SEAL OF MASTERY</span>
                <span className="text-[8px] text-slate-400 font-mono">2026</span>
              </div>
            </div>
          </div>

          {/* Signatures & Accreditation */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto text-center border-t border-[#1F2436]">
            <div>
              <div className="font-luxury font-bold text-sm text-slate-200">Kapil Narula</div>
              <div className="text-[11px] text-slate-400">Program Lead & Chief AI Architect</div>
              <div className="text-[10px] text-slate-500">Kapil Analytics Institute</div>
            </div>
            <div>
              <div className="font-luxury font-bold text-sm text-slate-200">Dr. Marcus Vance, Ph.D.</div>
              <div className="text-[11px] text-slate-400">Director of Enterprise Curriculum</div>
              <div className="text-[10px] text-slate-500">Global Data Science Council</div>
            </div>
          </div>

          {/* Footer Metadata & Copyright */}
          <div className="pt-4 border-t border-[#1C202F] text-[11px] text-slate-500 space-y-1">
            <div className="font-mono text-[#D4AF37]">
              CREDENTIAL ID: KAPIL-CERT-{user.id.slice(-6).toUpperCase()}-2026 · CRYPTOGRAPHICALLY VERIFIED
            </div>
            <div>
              © 2026 <span className="text-slate-300 font-semibold">Powered By Kapil</span>. All rights reserved. Issued under Kapil Analytics Framework.
            </div>
          </div>
        </div>

        {/* Graduation Booster Card */}
        {completionPercentage < 100 && (
          <div className="p-4 rounded-xl bg-[#141722] border border-[#262B3D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Current Progress: {completionPercentage}%</span>
              <p className="text-slate-400 mt-0.5">
                Reviewing or testing certificate generation? You can simulate 100% completion in one click.
              </p>
            </div>
            <button
              onClick={setAllCompletedForDemo}
              className="px-4 py-2 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#FFDF73] border border-[#D4AF37]/40 text-xs font-semibold whitespace-nowrap cursor-pointer"
            >
              Simulate 100% Graduation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
