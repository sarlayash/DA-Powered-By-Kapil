import React, { useState } from 'react';
import { ModuleItem, WeekType } from '../types';
import { useAuth } from '../context/AuthContext';
import { categoriesList } from '../data/modulesData';
import {
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Filter,
  Play,
  Search,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';

interface ModuleListProps {
  modules: ModuleItem[];
  onSelectModule: (id: number) => void;
  selectedWeek: WeekType | 'All';
  setSelectedWeek: (week: WeekType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onSelectModule,
  selectedWeek,
  setSelectedWeek,
  searchQuery,
  setSearchQuery
}) => {
  const { isModuleCompleted, isModuleBookmarked, toggleBookmark } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Modules');

  // Filter modules
  const filtered = modules.filter(m => {
    // Week filter
    if (selectedWeek !== 'All' && m.week !== selectedWeek) return false;
    // Category filter
    if (selectedCategory !== 'All Modules' && m.category !== selectedCategory) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDetails = m.details.toLowerCase().includes(q);
      const matchLab = m.handsOn.title.toLowerCase().includes(q);
      const matchId = String(m.id) === q;
      if (!matchTitle && !matchDetails && !matchLab && !matchId) return false;
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 bg-[#090A0F]">
      {/* Top Header & Track Selector */}
      <div className="space-y-4 border-b border-[#2A261A] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[#FFDF73] font-semibold uppercase tracking-wider">
              {selectedWeek === 'All' ? 'Complete 87-Module Syllabus' : selectedWeek}
            </div>
            <h1 className="text-2xl font-bold font-luxury text-white mt-0.5">
              Curriculum Modules & Hands-on Labs
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Showing {filtered.length} of {modules.length} modules · 10% Theory, 90% Applied Sandbox
            </p>
          </div>

          {/* Week Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-[#141722] p-1 rounded-lg border border-[#262B3D] text-xs self-start">
            <button
              onClick={() => setSelectedWeek('All')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                selectedWeek === 'All'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All (87)
            </button>
            <button
              onClick={() => setSelectedWeek('Week 1')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                selectedWeek === 'Week 1'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Week 1
            </button>
            <button
              onClick={() => setSelectedWeek('Week 2')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                selectedWeek === 'Week 2'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Week 2
            </button>
            <button
              onClick={() => setSelectedWeek('Week 3')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                selectedWeek === 'Week 3'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Week 3
            </button>
            <button
              onClick={() => setSelectedWeek('Specialization')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                selectedWeek === 'Specialization'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EDL Track
            </button>
          </div>
        </div>

        {/* Category Filter Scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFDF73] font-semibold'
                  : 'bg-[#121520] border border-[#262B3D] text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 bg-[#0F121C] rounded-xl border border-[#1C202F]">
            No modules match your current filter or search criteria.
          </div>
        ) : (
          filtered.map(mod => {
            const completed = isModuleCompleted(mod.id);
            const bookmarked = isModuleBookmarked(mod.id);

            return (
              <div
                key={mod.id}
                className={`p-4 md:p-5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  completed
                    ? 'bg-[#0E121B] border-[#1E2D27] hover:border-emerald-500/40'
                    : 'bg-[#0D0F17] border-[#222636] hover:border-[#D4AF37]/50'
                }`}
              >
                {/* Left Info Column */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-[#D4AF37] font-bold">
                      Module #{mod.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{mod.week} ({mod.day})</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-amber-400/80 font-medium">{mod.category}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {mod.durationMins}m
                    </span>
                    {mod.isVirtualOnly && (
                      <span className="text-[10px] text-amber-300 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-600/30">
                        Virtual
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-luxury text-white hover:text-[#FFDF73] transition-colors cursor-pointer"
                      onClick={() => onSelectModule(mod.id)}>
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-1 max-w-3xl">
                    {mod.details}
                  </p>

                  {/* 90% Hands-on Tag */}
                  <div className="pt-1 flex items-center gap-3 text-xs">
                    <span className="text-emerald-400/90 font-medium flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      Lab: {mod.handsOn.title}
                    </span>
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  <button
                    onClick={() => toggleBookmark(mod.id)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      bookmarked
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFDF73]'
                        : 'bg-[#141722] border-[#262B3D] text-slate-500 hover:text-white'
                    }`}
                    title={bookmarked ? 'Saved' : 'Bookmark'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={() => onSelectModule(mod.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      completed
                        ? 'bg-[#15231F] hover:bg-[#1E332D] text-emerald-400 border border-emerald-500/40'
                        : 'bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B89225] hover:brightness-110 text-black shadow-md'
                    }`}
                  >
                    {completed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Completed (Review)</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Launch Lab</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
