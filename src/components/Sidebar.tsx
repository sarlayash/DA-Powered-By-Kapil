import React from 'react';
import { useAuth } from '../context/AuthContext';
import { WeekType } from '../types';
import {
  Award,
  BookOpen,
  Bookmark,
  CheckCircle,
  Code2,
  Database,
  FileBadge,
  Layers,
  LayoutDashboard,
  Search,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'modules' | 'playground' | 'badges' | 'certificate';
  setActiveTab: (tab: 'dashboard' | 'modules' | 'playground' | 'badges' | 'certificate') => void;
  selectedWeek: WeekType | 'All';
  setSelectedWeek: (week: WeekType | 'All') => void;
  filterStatus: 'all' | 'completed' | 'in-progress' | 'bookmarked';
  setFilterStatus: (status: 'all' | 'completed' | 'in-progress' | 'bookmarked') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedModuleId: number | null;
  onSelectModule: (id: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedWeek,
  setSelectedWeek,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
}) => {
  const { user, completionPercentage, earnedBadgesCount } = useAuth();
  const completedCount = user?.completedModuleIds.length || 0;

  return (
    <aside className="w-72 bg-[#0C0E14] border-r border-[#2A261A] flex flex-col shrink-0 h-[calc(100vh-4.5rem)] sticky top-18 overflow-hidden z-30 select-none">
      {/* Search Input Box */}
      <div className="p-3.5 border-b border-[#1E2230]">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search 87 modules..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#141722] text-xs text-white placeholder-slate-500 rounded-lg pl-9 pr-3 py-2 border border-[#262B3D] focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="p-3 space-y-1 border-b border-[#1E2230]">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-[#1C202F] text-[#FFDF73] border border-[#D4AF37]/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
            <span>Dashboard Overview</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Overview</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('modules');
            setSelectedWeek('All');
          }}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'modules' && selectedWeek === 'All'
              ? 'bg-[#1C202F] text-[#FFDF73] border border-[#D4AF37]/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>All 87 Modules</span>
          </div>
          <span className="text-[10px] bg-[#141722] px-1.5 py-0.5 rounded text-slate-400 font-mono">
            87
          </span>
        </button>

        <button
          onClick={() => setActiveTab('playground')}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'playground'
              ? 'bg-[#1C202F] text-[#FFDF73] border border-[#D4AF37]/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-[#D4AF37]" />
            <span>Live Hands-on Sandbox</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono font-medium">90% Code</span>
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'badges'
              ? 'bg-[#1C202F] text-[#FFDF73] border border-[#D4AF37]/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Gold Badges (PNG/PDF)</span>
          </div>
          <span className="text-[10px] text-[#D4AF37] font-mono">{earnedBadgesCount}/8</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'certificate'
              ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#8C6D14]/20 text-[#FFDF73] border border-[#D4AF37]/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <FileBadge className="w-4 h-4 text-[#FFDF73]" />
            <span>Executive Certificate</span>
          </div>
          <span className="text-[10px] text-amber-300 font-mono">Issued</span>
        </button>
      </div>

      {/* Curriculum Tracks / Weeks Section */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        <div>
          <div className="px-2 pb-1.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase flex items-center justify-between">
            <span>Curriculum Tracks</span>
            <Layers className="w-3 h-3 text-slate-600" />
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab('modules');
                setSelectedWeek('Week 1');
              }}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                activeTab === 'modules' && selectedWeek === 'Week 1'
                  ? 'bg-[#1C202F] text-white border-l-2 border-[#D4AF37]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
              }`}
            >
              <div>
                <div className="font-semibold text-slate-200">Week 1: AI Analytics & ML</div>
                <div className="text-[10px] text-slate-500">Modules 1–27 · 6 Days (In-Person)</div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">27</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('modules');
                setSelectedWeek('Week 2');
              }}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                activeTab === 'modules' && selectedWeek === 'Week 2'
                  ? 'bg-[#1C202F] text-white border-l-2 border-[#D4AF37]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
              }`}
            >
              <div>
                <div className="font-semibold text-slate-200">Week 2: Deep Learning & GenAI</div>
                <div className="text-[10px] text-slate-500">Modules 28–56 · Agentic & Time Series</div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">29</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('modules');
                setSelectedWeek('Week 3');
              }}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                activeTab === 'modules' && selectedWeek === 'Week 3'
                  ? 'bg-[#1C202F] text-white border-l-2 border-[#D4AF37]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
              }`}
            >
              <div>
                <div className="font-semibold text-slate-200">Week 3: Optimization & MLOps</div>
                <div className="text-[10px] text-slate-500">Modules 57–82 · Pipelines & DevSecOps</div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">26</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('modules');
                setSelectedWeek('Specialization');
              }}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                activeTab === 'modules' && selectedWeek === 'Specialization'
                  ? 'bg-[#1C202F] text-white border-l-2 border-[#D4AF37]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#141722]'
              }`}
            >
              <div>
                <div className="font-semibold text-amber-200 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Enterprise Data Lake (EDL)</span>
                </div>
                <div className="text-[10px] text-slate-500">Modules 83–87 · Annexure 2 Track</div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37]">5</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Controls */}
        <div className="pt-2 border-t border-[#1E2230]">
          <div className="px-2 pb-1.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            Filter Status
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2 py-1.5 rounded text-left transition-colors flex items-center justify-between cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-[#1A1E2C] text-[#FFDF73] font-semibold border border-[#D4AF37]/30'
                  : 'text-slate-400 hover:bg-[#141722]'
              }`}
            >
              <span>Show All</span>
              <span className="font-mono text-slate-500">87</span>
            </button>

            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-2 py-1.5 rounded text-left transition-colors flex items-center justify-between cursor-pointer ${
                filterStatus === 'completed'
                  ? 'bg-[#1A1E2C] text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:bg-[#141722]'
              }`}
            >
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                Done
              </span>
              <span className="font-mono text-slate-500">{completedCount}</span>
            </button>

            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-2 py-1.5 rounded text-left transition-colors flex items-center justify-between cursor-pointer ${
                filterStatus === 'in-progress'
                  ? 'bg-[#1A1E2C] text-amber-400 font-semibold border border-amber-500/30'
                  : 'text-slate-400 hover:bg-[#141722]'
              }`}
            >
              <span>Pending</span>
              <span className="font-mono text-slate-500">{87 - completedCount}</span>
            </button>

            <button
              onClick={() => setFilterStatus('bookmarked')}
              className={`px-2 py-1.5 rounded text-left transition-colors flex items-center justify-between cursor-pointer ${
                filterStatus === 'bookmarked'
                  ? 'bg-[#1A1E2C] text-[#FFDF73] font-semibold border border-[#D4AF37]/30'
                  : 'text-slate-400 hover:bg-[#141722]'
              }`}
            >
              <span className="flex items-center gap-1">
                <Bookmark className="w-3 h-3 text-[#D4AF37]" />
                Saved
              </span>
              <span className="font-mono text-slate-500">{user?.bookmarkedModuleIds.length || 0}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Footer: Curriculum Guarantee Badge */}
      <div className="p-3.5 border-t border-[#2A261A] bg-[#090A0F]">
        <div className="p-2.5 rounded-lg bg-[#141722] border border-[#2A261A] space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Hands-on Ratio</span>
            <span className="text-[#FFDF73] font-bold">90% Code</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Curriculum Total</span>
            <span className="text-slate-200 font-mono">140+ Lab Hrs</span>
          </div>
          <div className="pt-1 text-[10px] text-slate-500 flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#D4AF37]" />
            <span>Interactive sandbox enabled</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
