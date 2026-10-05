import React from 'react';
import { useAuth } from '../context/AuthContext';
import { allModules } from '../data/modulesData';
import { WeekType } from '../types';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Database,
  FileBadge,
  Flame,
  Layers,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';

interface DashboardProps {
  onSelectModule: (id: number) => void;
  onOpenWeek: (week: WeekType) => void;
  onOpenPlayground: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectModule,
  onOpenWeek,
  onOpenPlayground,
  onOpenBadges,
  onOpenCertificate
}) => {
  const { user, completionPercentage, earnedBadgesCount, resetToZero } = useAuth();
  const completedIds = user?.completedModuleIds || [];

  // Find next incomplete module (starts at Module 1 on Day 1 for fresh learners)
  const nextIncompleteModule = allModules.find(m => !completedIds.includes(m.id)) || allModules[0];
  const currentDay = nextIncompleteModule ? nextIncompleteModule.day : 'Day 1';

  // Track Progress counts
  const week1Count = allModules.filter(m => m.week === 'Week 1').length; // 27
  const week1Done = allModules.filter(m => m.week === 'Week 1' && completedIds.includes(m.id)).length;

  const week2Count = allModules.filter(m => m.week === 'Week 2').length; // 29
  const week2Done = allModules.filter(m => m.week === 'Week 2' && completedIds.includes(m.id)).length;

  const week3Count = allModules.filter(m => m.week === 'Week 3').length; // 26
  const week3Done = allModules.filter(m => m.week === 'Week 3' && completedIds.includes(m.id)).length;

  const edlCount = allModules.filter(m => m.week === 'Specialization').length; // 5
  const edlDone = allModules.filter(m => m.week === 'Specialization' && completedIds.includes(m.id)).length;

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 bg-[#090A0F]">
      {/* Hero Welcome Banner (Black, White & Gold theme) */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#121522] via-[#0E1018] to-[#14120D] border border-[#2A261A] p-6 lg:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FFDF73] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Executive Industrial Learning Track</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold font-luxury text-white tracking-tight leading-tight">
              Master Modern Analytics, ML & Enterprise Data Engineering
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Curriculum crafted with strict <span className="text-[#FFDF73] font-semibold">10% Theory</span> and <span className="text-[#FFDF73] font-semibold">90% Hands-On Code Labs</span>. Complete all 87 modules to earn industry badges and your executive certificate.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                140+ Hours Applied Lab Execution
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Python, SQL, RAG & Lakehouses
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Powered By Kapil</span>
            </div>
          </div>

          {/* Action CTA Card */}
          <div className="p-5 rounded-xl bg-[#181C2A] border border-[#D4AF37]/40 lg:w-80 shrink-0 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {completedIds.length === 0 ? 'Kickstart Curriculum:' : 'Next Recommended Lab:'}
              </span>
              <span className="text-[10px] text-[#FFDF73] font-mono font-semibold">
                {nextIncompleteModule.day} · Module {nextIncompleteModule.id}
              </span>
            </div>

            <div className="font-luxury font-bold text-sm text-white line-clamp-1">
              {nextIncompleteModule.title}
            </div>

            <div className="text-[11px] text-slate-400 line-clamp-2">
              {nextIncompleteModule.handsOn.title}
            </div>

            <button
              onClick={() => onSelectModule(nextIncompleteModule.id)}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B89225] hover:brightness-110 text-black text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{completedIds.length === 0 ? 'Start Day 1 (Launch Lab #1)' : `Launch Lab #${nextIncompleteModule.id}`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row (Strictly Real Learner Progress - No Fake Statistics) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0F121C] border border-[#2A261A] space-y-1">
          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Curriculum Progress</div>
          <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-1.5">
            <span>{completedIds.length}</span>
            <span className="text-xs text-slate-500 font-normal">/ 87 Modules</span>
          </div>
          <div className="text-[11px] text-[#FFDF73] font-semibold">{completionPercentage}% Completed</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F121C] border border-[#2A261A] space-y-1">
          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Earned Medallions</div>
          <div className="text-2xl font-bold font-mono text-[#D4AF37] flex items-baseline gap-1.5">
            <span>{earnedBadgesCount}</span>
            <span className="text-xs text-slate-500 font-normal">/ 8 Badges</span>
          </div>
          <div className="text-[11px] text-slate-400">Downloadable PNG & PDF</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F121C] border border-[#2A261A] space-y-1">
          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Applied Ratio</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 flex items-baseline gap-1.5">
            <span>90%</span>
            <span className="text-xs text-slate-500 font-normal">Hands-On Code</span>
          </div>
          <div className="text-[11px] text-slate-400">10% Executive Theory</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F121C] border border-[#2A261A] space-y-1">
          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Curriculum Schedule</div>
          <div className="text-2xl font-bold font-mono text-amber-400 flex items-baseline gap-1.5">
            <span>{currentDay}</span>
            <span className="text-xs text-slate-400 font-normal">Active</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {completedIds.length === 0 ? 'Starts from Zero · Day 1' : `Next: Module ${nextIncompleteModule.id}`}
          </div>
        </div>
      </div>

      {/* Curriculum Four Tracks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold font-luxury text-white">Curriculum Progression Roadmap</h2>
            <p className="text-xs text-slate-400">Comprehensive 87 modules covering the complete modern data science stack</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Week 1 Card */}
          <div
            onClick={() => onOpenWeek('Week 1')}
            className="p-5 rounded-xl bg-[#0E1017] hover:bg-[#121520] border border-[#2A261A] hover:border-[#D4AF37]/50 transition-all cursor-pointer space-y-4 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-[#FFDF73] font-semibold tracking-wider uppercase">
                  Week 1 · Modules 1–27 · 6 Days
                </span>
                <h3 className="text-base font-bold font-luxury text-white group-hover:text-[#FFDF73] transition-colors mt-0.5">
                  AI Analytics Foundations, Excel & Supervised ML
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              AI-assisted Excel formulas, analytical MECE problem framing, Python with Copilot & Claude, deep EDA with Pandas, Decision Trees, Random Forests, and XGBoost.
            </p>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Track Progress</span>
                <span className="font-mono text-slate-200">{week1Done} / {week1Count} completed</span>
              </div>
              <div className="w-full bg-[#1A1D27] h-2 rounded-full overflow-hidden border border-[#2E3346]">
                <div
                  className="bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] h-full transition-all duration-500"
                  style={{ width: `${Math.round((week1Done / week1Count) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Week 2 Card */}
          <div
            onClick={() => onOpenWeek('Week 2')}
            className="p-5 rounded-xl bg-[#0E1017] hover:bg-[#121520] border border-[#2A261A] hover:border-[#D4AF37]/50 transition-all cursor-pointer space-y-4 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-[#FFDF73] font-semibold tracking-wider uppercase">
                  Week 2 · Modules 28–56 · 6 Days
                </span>
                <h3 className="text-base font-bold font-luxury text-white group-hover:text-[#FFDF73] transition-colors mt-0.5">
                  Deep Learning, Vision, GenAI & Time Series
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Neural Networks, CNNs, Computer Vision, Natural Language Processing, Foundation Models, Industrial Agentic AI workflows, Responsible AI, and Time Series modeling.
            </p>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Track Progress</span>
                <span className="font-mono text-slate-200">{week2Done} / {week2Count} completed</span>
              </div>
              <div className="w-full bg-[#1A1D27] h-2 rounded-full overflow-hidden border border-[#2E3346]">
                <div
                  className="bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] h-full transition-all duration-500"
                  style={{ width: `${Math.round((week2Done / week2Count) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Week 3 Card */}
          <div
            onClick={() => onOpenWeek('Week 3')}
            className="p-5 rounded-xl bg-[#0E1017] hover:bg-[#121520] border border-[#2A261A] hover:border-[#D4AF37]/50 transition-all cursor-pointer space-y-4 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-[#FFDF73] font-semibold tracking-wider uppercase">
                  Week 3 · Modules 57–82 · 6 Days
                </span>
                <h3 className="text-base font-bold font-luxury text-white group-hover:text-[#FFDF73] transition-colors mt-0.5">
                  Optimization, RAG, Pipelines & DevSecOps
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Linear/Integer optimization with PuLP/SciPy, Data Warehousing, Prompt Engineering, RAG applications, MLflow model versioning, Docker deployment, and Capstone.
            </p>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Track Progress</span>
                <span className="font-mono text-slate-200">{week3Done} / {week3Count} completed</span>
              </div>
              <div className="w-full bg-[#1A1D27] h-2 rounded-full overflow-hidden border border-[#2E3346]">
                <div
                  className="bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] h-full transition-all duration-500"
                  style={{ width: `${Math.round((week3Done / week3Count) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Specialization Track Card */}
          <div
            onClick={() => onOpenWeek('Specialization')}
            className="p-5 rounded-xl bg-[#0E1017] hover:bg-[#121520] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all cursor-pointer space-y-4 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Annexure 2 · Modules 83–87 · Virtual Specialization</span>
                </span>
                <h3 className="text-base font-bold font-luxury text-white group-hover:text-[#FFDF73] transition-colors mt-0.5">
                  Enterprise Data Lake (EDL) Architecture
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Medallion Architecture tiers, Parquet & ORC columnar mechanics, Lakehouse catalogs, distributed processing engines, security policies, and feature stores.
            </p>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Track Progress</span>
                <span className="font-mono text-amber-200">{edlDone} / {edlCount} completed</span>
              </div>
              <div className="w-full bg-[#1A1D27] h-2 rounded-full overflow-hidden border border-[#2E3346]">
                <div
                  className="bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] h-full transition-all duration-500"
                  style={{ width: `${Math.round((edlDone / edlCount) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launchpad to Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <button
          onClick={onOpenPlayground}
          className="p-4 rounded-xl bg-[#111420] hover:bg-[#161B2B] border border-[#262B3D] text-left transition-all cursor-pointer flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="font-luxury font-bold text-sm text-white">Interactive Sandbox</div>
            <div className="text-xs text-slate-400">Direct Python, SQL & Prompt tester</div>
          </div>
        </button>

        <button
          onClick={onOpenBadges}
          className="p-4 rounded-xl bg-[#111420] hover:bg-[#161B2B] border border-[#262B3D] text-left transition-all cursor-pointer flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <div className="font-luxury font-bold text-sm text-white">8 Gold Badges</div>
            <div className="text-xs text-slate-400">Download PNG & Vector PDF cards</div>
          </div>
        </button>

        <button
          onClick={onOpenCertificate}
          className="p-4 rounded-xl bg-[#111420] hover:bg-[#161B2B] border border-[#262B3D] text-left transition-all cursor-pointer flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#FFDF73]" />
          </div>
          <div>
            <div className="font-luxury font-bold text-sm text-white">Master Certificate</div>
            <div className="text-xs text-slate-400">Executive credential export</div>
          </div>
        </button>
      </div>

      {completedIds.length > 0 && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#12141F] border border-[#2A261A] text-xs text-slate-400">
          <span>Currently tracking <strong className="text-white font-mono">{completedIds.length}</strong> completed modules. Want to restart fresh?</span>
          <button
            onClick={resetToZero}
            className="px-3 py-1.5 rounded-md bg-[#1E2234] hover:bg-[#262B40] text-[#FFDF73] border border-[#D4AF37]/30 font-medium transition-colors cursor-pointer text-xs"
          >
            Reset Progress to Day 1 (0 Modules)
          </button>
        </div>
      )}
    </div>
  );
};
