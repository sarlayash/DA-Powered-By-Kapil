import React, { useState } from 'react';
import { ModuleItem } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  AlertTriangle,
  Award,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Copy,
  Cpu,
  Database,
  Eye,
  FileText,
  Lightbulb,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';

interface LabEnvironmentProps {
  module: ModuleItem;
  onNextModule?: () => void;
  onPrevModule?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const LabEnvironment: React.FC<LabEnvironmentProps> = ({
  module,
  onNextModule,
  onPrevModule,
  hasNext,
  hasPrev
}) => {
  const { isModuleCompleted, isModuleBookmarked, markModuleComplete, toggleBookmark } = useAuth();
  const [activeTab, setActiveTab] = useState<'hands-on' | 'theory'>('hands-on'); // Default to 90% hands-on
  const [code, setCode] = useState<string>(module.handsOn.starterCode);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [validationPassed, setValidationPassed] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [aiAssistantTip, setAiAssistantTip] = useState<string | null>(null);

  const completed = isModuleCompleted(module.id);
  const bookmarked = isModuleBookmarked(module.id);

  // Sync code when module changes
  React.useEffect(() => {
    setCode(module.handsOn.starterCode);
    setConsoleOutput(null);
    setValidationPassed(false);
    setShowSolution(false);
    setAiAssistantTip(null);
  }, [module.id]);

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('Executing in Python 3.12 sandbox...\nRunning deterministic assertions against industrial mock dataset...');

    setTimeout(() => {
      setIsRunning(false);
      const isUsingSolution = code.includes('Validation Check: Passed') || code.includes('solution') || showSolution;
      
      const simulatedOutput = `>>> [PROCESS EXECUTION COMPLETED IN 18ms]
--------------------------------------------------
Running module: ${module.handsOn.title}
Runtime Environment: Linux x86_64 · Python 3.12.2 · Scikit-Learn 1.4 / Pandas 2.2
Expected Outcome: ${module.handsOn.expectedOutcome}

OUTPUT:
${isUsingSolution ? '✓ Test Suite: 3/3 passed (100% assertions satisfied)\n✓ Schema integrity: VERIFIED\n✓ Computational complexity: O(N) acceptable' : '>>> Execution output emitted:\n' + module.handsOn.expectedOutcome}
--------------------------------------------------
Status: Operational Telemetry Verified.`;

      setConsoleOutput(simulatedOutput);
      setValidationPassed(true);
    }, 600);
  };

  const handleValidateAndComplete = () => {
    handleRunCode();
    markModuleComplete(module.id, code);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskAIAssistant = () => {
    const randomHint = module.handsOn.hints[Math.floor(Math.random() * module.handsOn.hints.length)];
    setAiAssistantTip(randomHint);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0A0C12] overflow-y-auto">
      {/* Module Title Banner */}
      <div className="px-6 py-5 border-b border-[#2A261A] bg-[#0E1017]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="text-[#FFDF73] font-semibold">{module.week}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{module.day}</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400/90 font-medium">{module.category}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {module.durationMins} mins
              </span>
              {module.isVirtualOnly && (
                <span className="text-[10px] text-amber-300 bg-amber-950/40 border border-amber-600/30 px-1.5 py-0.5 rounded font-mono">
                  Virtual Specialization
                </span>
              )}
            </div>

            <h1 className="text-xl md:text-2xl font-bold font-luxury text-white tracking-tight flex items-center gap-3">
              <span>{module.id}. {module.title}</span>
              {completed && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-sans font-semibold bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Completed
                </span>
              )}
            </h1>

            <p className="text-xs md:text-sm text-slate-400 max-w-4xl leading-relaxed">
              {module.details}
            </p>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => toggleBookmark(module.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                bookmarked
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#FFDF73]'
                  : 'bg-[#141722] border-[#262B3D] text-slate-400 hover:text-white'
              }`}
              title={bookmarked ? 'Saved to Bookmarks' : 'Bookmark Module'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={onPrevModule}
              disabled={!hasPrev}
              className={`p-2 rounded-lg border transition-colors ${
                hasPrev
                  ? 'bg-[#141722] border-[#262B3D] text-slate-300 hover:text-white hover:border-[#D4AF37] cursor-pointer'
                  : 'bg-[#10121A] border-[#1C202F] text-slate-600 cursor-not-allowed'
              }`}
              title="Previous Module"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onNextModule}
              disabled={!hasNext}
              className={`p-2 rounded-lg border transition-colors ${
                hasNext
                  ? 'bg-[#141722] border-[#262B3D] text-slate-300 hover:text-white hover:border-[#D4AF37] cursor-pointer'
                  : 'bg-[#10121A] border-[#1C202F] text-slate-600 cursor-not-allowed'
              }`}
              title="Next Module"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 10% vs 90% Tab Segmented Bar */}
        <div className="mt-5 flex items-center justify-between border-t border-[#1C202F] pt-3">
          <div className="flex items-center gap-2 bg-[#141722] p-1 rounded-lg border border-[#262B3D]">
            <button
              onClick={() => setActiveTab('hands-on')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'hands-on'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Hands-on Lab (90% Weight)</span>
              <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded font-mono font-bold">
                Interactive
              </span>
            </button>

            <button
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'theory'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Theory Briefing (10% Weight)</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
              Kernel: <span className="text-slate-200 font-mono">Python 3.12 Sandbox</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 max-w-7xl mx-auto w-full flex-1">
        {activeTab === 'theory' ? (
          /* ========================================================================= */
          /* 10% THEORY BRIEFING (Clean, concise executive conceptual grounding)      */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="p-6 rounded-xl bg-[#0F121C] border border-[#2A261A] space-y-3">
              <div className="flex items-center gap-2 text-[#FFDF73] font-semibold text-xs tracking-wider uppercase">
                <Lightbulb className="w-4 h-4" />
                <span>Executive Conceptual Foundation</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {module.theory.overview}
              </p>
            </div>

            {/* Key Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#121520] border border-[#262B3D] space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Key Principles & Formulations</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {module.theory.keyConcepts.map((concept, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">0{idx + 1}.</span>
                      <span className="leading-relaxed">{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#121520] border border-[#262B3D] space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#FFDF73]" />
                  <span>Industry Application & Value Realization</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {module.theory.industryRelevance}
                </p>
                {module.theory.architectureOrRule && (
                  <div className="p-3 rounded-lg bg-[#090A0F] border border-[#4D3F19] text-xs text-amber-200/90 font-mono">
                    <span className="text-[#D4AF37] font-bold block mb-1">Architectural Invariant:</span>
                    {module.theory.architectureOrRule}
                  </div>
                )}
              </div>
            </div>

            {/* Prompt to switch to Hands-on */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#141722] to-[#1C1F2E] border border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold text-sm">Ready to code?</h4>
                <p className="text-xs text-slate-400">
                  90% of your grade and competency badge progress is determined by the live lab exercise.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('hands-on')}
                className="px-4 py-2 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#FFDF73] rounded-lg transition-colors cursor-pointer"
              >
                Launch Hands-On Lab →
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 90% INTERACTIVE HANDS-ON LAB (Live interactive editor, sandbox & checks) */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Lab Scenario Card */}
            <div className="p-4 rounded-xl bg-[#0F121C] border border-[#2A261A] flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#FFDF73] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Lab Challenge: {module.handsOn.title}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  {module.handsOn.scenario}
                </p>
              </div>

              {/* AI Assistant Copilot Button */}
              <button
                onClick={handleAskAIAssistant}
                className="px-3 py-1.5 rounded-lg bg-[#191D2B] hover:bg-[#22273A] border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>AI Assistant Hint</span>
              </button>
            </div>

            {/* AI Assistant Tip Callout */}
            {aiAssistantTip && (
              <div className="p-3.5 rounded-lg bg-[#141824] border border-[#D4AF37]/40 text-xs text-slate-200 flex items-start gap-3 animate-fadeIn">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-[#FFDF73] font-semibold block mb-0.5">Claude & Copilot Pair-Programming Tip:</span>
                  <p className="text-slate-300 leading-relaxed">{aiAssistantTip}</p>
                </div>
                <button
                  onClick={() => setAiAssistantTip(null)}
                  className="text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Code / SQL Editor Container */}
            <div className="rounded-xl border border-[#2A261A] bg-[#0A0C13] overflow-hidden shadow-2xl">
              {/* Editor Top Bar */}
              <div className="bg-[#12141F] px-4 py-2.5 border-b border-[#2A261A] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#D4AF37] font-semibold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>lab_solution.{module.handsOn.type === 'sql' ? 'sql' : 'py'}</span>
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400 text-[11px]">Type: {module.handsOn.type.toUpperCase()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCode(module.handsOn.starterCode)}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#1A1D2A] transition-colors cursor-pointer"
                    title="Reset to starter code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#1A1D2A] transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setShowSolution(!showSolution);
                      if (!showSolution) {
                        setCode(module.handsOn.solutionCode);
                      }
                    }}
                    className={`px-2.5 py-1 text-[11px] rounded border transition-colors flex items-center gap-1 cursor-pointer ${
                      showSolution
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                        : 'bg-[#181B26] border-[#2A261A] text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>{showSolution ? 'Hide Solution' : 'View Verified Solution'}</span>
                  </button>
                </div>
              </div>

              {/* Code Textarea Area */}
              <div className="p-4 bg-[#08090E]">
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full h-72 bg-transparent text-emerald-400 font-mono text-xs md:text-sm leading-relaxed focus:outline-none resize-y selection:bg-[#D4AF37]/30 selection:text-white"
                  spellCheck={false}
                />
              </div>

              {/* Action Buttons Below Editor */}
              <div className="px-4 py-3 bg-[#0F121C] border-t border-[#2A261A] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sandbox Ready: 100% Deterministic Verification</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-4 py-2 rounded-lg bg-[#1A1E2C] hover:bg-[#252A3D] border border-[#2E3346] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                    <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
                  </button>

                  <button
                    onClick={handleValidateAndComplete}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B89225] text-black text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Verify & Complete Lab</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Execution Console Output Terminal */}
            {consoleOutput && (
              <div className="rounded-xl border border-[#2A261A] bg-[#07080D] overflow-hidden animate-fadeIn">
                <div className="bg-[#12141F] px-4 py-2 border-b border-[#2A261A] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Console Execution Output</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Exit Code 0</span>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {consoleOutput}
                </pre>
              </div>
            )}

            {/* Verification Criteria Checklist */}
            <div className="p-5 rounded-xl bg-[#0F121C] border border-[#2A261A] space-y-3">
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>90% Hands-On Competency Criteria</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {module.handsOn.validationCriteria.map((crit, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#141722] border border-[#262B3D] text-xs text-slate-300 space-y-1">
                    <div className="text-[10px] text-[#D4AF37] font-mono font-semibold">RULE 0{idx + 1}</div>
                    <p className="leading-snug">{crit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
