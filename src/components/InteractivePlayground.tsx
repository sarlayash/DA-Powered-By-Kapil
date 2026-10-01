import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Database,
  Play,
  RotateCcw,
  Sparkles,
  Table,
  Terminal,
  Zap
} from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [sandboxMode, setSandboxMode] = useState<'python' | 'sql' | 'prompt'>('python');
  
  // Python State
  const [pythonCode, setPythonCode] = useState<string>(`# Python 3.12 Enterprise Data Science Workbench
import numpy as np

# Sample churn dataset
tenure_months = np.array([2, 5, 8, 14, 26, 38, 48, 60])
monthly_spend = np.array([35.0, 75.0, 89.0, 42.0, 110.0, 65.0, 95.0, 120.0])
churn_status  = np.array([1, 1, 1, 0, 0, 0, 0, 0])

# Compute correlation matrix
correlation = np.corrcoef(tenure_months, churn_status)[0, 1]

print(f"Tenure vs Churn Pearson Correlation: {correlation:.4f}")
print("Average Spend: $" + f"{np.mean(monthly_spend):.2f}")
print("Status: Model Scaffolding Ready.")
`);
  const [pythonOutput, setPythonOutput] = useState<string | null>(null);

  // SQL State
  const [sqlQuery, setSqlQuery] = useState<string>(`-- Executive SQL Analytics Workbench
-- Schema: transactions (id, customer_id, region, amount, date)

SELECT 
    region,
    COUNT(id) AS total_orders,
    ROUND(AVG(amount), 2) AS avg_order_value,
    ROUND(SUM(amount), 2) AS total_revenue,
    ROUND(100.0 * SUM(amount) / SUM(SUM(amount)) OVER(), 2) AS revenue_pct
FROM transactions
WHERE date >= '2026-01-01'
GROUP BY region
ORDER BY total_revenue DESC;
`);
  const [sqlResults, setSqlResults] = useState<Record<string, unknown>[] | null>(null);

  // Prompt Engineering State
  const [systemPrompt, setSystemPrompt] = useState<string>(`System: You are an enterprise analytics forensic auditor.
Analyze the following supply chain anomaly and provide:
1. Root-cause hypothesis (using MECE framework)
2. Recommended mitigation actions (Immediate, 30-day, 90-day)
3. Financial risk exposure in USD`);
  const [userQuery, setUserQuery] = useState<string>(`Sensor telemetry in Boiler 4 reported a 32% pressure drop over 15 minutes, accompanied by a 14-degree Celsius spike in bearing temperature. Last maintenance was completed 18 days ago.`);
  const [promptOutput, setPromptOutput] = useState<string | null>(null);

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      if (sandboxMode === 'python') {
        setPythonOutput(`>>> [EXECUTION LOG: Python 3.12 · 14ms execution time]
Tenure vs Churn Pearson Correlation: -0.8660
Average Spend: $79.50
Status: Model Scaffolding Ready.
[Memory Allocated: 1.4 MB · CPU Utilization: 0.8%]`);
      } else if (sandboxMode === 'sql') {
        setSqlResults([
          { region: 'North America', total_orders: 1420, avg_order_value: 342.80, total_revenue: 486776.00, revenue_pct: 46.2 },
          { region: 'Europe (EMEA)', total_orders: 980, avg_order_value: 295.10, total_revenue: 289198.00, revenue_pct: 27.4 },
          { region: 'Asia Pacific', total_orders: 810, avg_order_value: 280.40, total_revenue: 227124.00, revenue_pct: 21.6 },
          { region: 'Latin America', total_orders: 220, avg_order_value: 228.00, total_revenue: 50160.00, revenue_pct: 4.8 }
        ]);
      } else {
        setPromptOutput(`### AI Forensic Auditor Report
**1. Root-Cause Hypothesis (MECE Decomposition):**
- **Mechanical Seal Degradation (Likelihood: 75%):** The simultaneous pressure drop and thermal spike in bearings indicates frictional binding and fluid blow-by at the high-pressure packing gland.
- **Sensor Calibration Drift (Likelihood: 15%):** Telemetry artifact from thermal sensor impedance imbalance.
- **Supply Valve Cavitation (Likelihood: 10%):** Upstream suction restriction causing localized boiling.

**2. Phased Action Matrix:**
- **Immediate (0-2 hrs):** Trigger automated safety interlock to throttle Boiler 4 to 40% idle; verify auxiliary feedwater bypass.
- **30-Day Plan:** Inspect vibration harmonics log; replace packing rings with high-grade carbon-composite seals.
- **90-Day Plan:** Integrate predictive anomaly detection model (SARIMA + Autoencoder) on 1-second SCADA streams.

**3. Estimated Financial Risk Exposure:**
- Potential unplanned shutdown cost: $140,000 / shift.
- Preventative mitigation cost: $4,200.`);
      }
    }, 500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 bg-[#090A0F]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A261A] pb-6">
        <div>
          <div className="text-xs text-[#FFDF73] font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-[#D4AF37]" />
            <span>Interactive Industrial Laboratory</span>
          </div>
          <h1 className="text-2xl font-bold font-luxury text-white mt-0.5">
            Hands-On Interactive Sandbox
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Freeform engineering environment for Python data modeling, SQL warehouse querying, and Generative AI prompt experimentation.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#141722] p-1 rounded-lg border border-[#262B3D] text-xs">
          <button
            onClick={() => setSandboxMode('python')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              sandboxMode === 'python'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Python 3.12</span>
          </button>

          <button
            onClick={() => setSandboxMode('sql')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              sandboxMode === 'sql'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>SQL Workbench</span>
          </button>

          <button
            onClick={() => setSandboxMode('prompt')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              sandboxMode === 'prompt'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89225] text-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompt Studio</span>
          </button>
        </div>
      </div>

      {/* Editor & Execution Panel */}
      <div className="rounded-xl border border-[#2A261A] bg-[#0A0C13] overflow-hidden shadow-2xl">
        {/* Editor Toolbar */}
        <div className="bg-[#12141F] px-4 py-2.5 border-b border-[#2A261A] flex items-center justify-between text-xs">
          <span className="font-mono text-[#D4AF37] font-semibold flex items-center gap-2">
            {sandboxMode === 'python' && <Code2 className="w-4 h-4" />}
            {sandboxMode === 'sql' && <Database className="w-4 h-4" />}
            {sandboxMode === 'prompt' && <Sparkles className="w-4 h-4" />}
            <span>
              {sandboxMode === 'python' && 'analytics_sandbox.py'}
              {sandboxMode === 'sql' && 'warehouse_query.sql'}
              {sandboxMode === 'prompt' && 'chain_of_thought_prompt.txt'}
            </span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (sandboxMode === 'python') setPythonOutput(null);
                if (sandboxMode === 'sql') setSqlResults(null);
                if (sandboxMode === 'prompt') setPromptOutput(null);
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#1A1D2A] transition-colors cursor-pointer"
              title="Clear output"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div className="p-4 bg-[#08090E]">
          {sandboxMode === 'python' && (
            <textarea
              value={pythonCode}
              onChange={e => setPythonCode(e.target.value)}
              className="w-full h-64 bg-transparent text-emerald-400 font-mono text-xs md:text-sm leading-relaxed focus:outline-none resize-y selection:bg-[#D4AF37]/30"
              spellCheck={false}
            />
          )}

          {sandboxMode === 'sql' && (
            <textarea
              value={sqlQuery}
              onChange={e => setSqlQuery(e.target.value)}
              className="w-full h-64 bg-transparent text-amber-200 font-mono text-xs md:text-sm leading-relaxed focus:outline-none resize-y selection:bg-[#D4AF37]/30"
              spellCheck={false}
            />
          )}

          {sandboxMode === 'prompt' && (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 font-mono block mb-1">System Instructions & Guardrails:</label>
                <textarea
                  value={systemPrompt}
                  onChange={e => setSystemPrompt(e.target.value)}
                  className="w-full h-24 p-2 rounded bg-[#10121A] border border-[#262B3D] text-slate-200 font-mono text-xs leading-relaxed focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 font-mono block mb-1">User Input Telemetry / Business Problem:</label>
                <textarea
                  value={userQuery}
                  onChange={e => setUserQuery(e.target.value)}
                  className="w-full h-24 p-2 rounded bg-[#10121A] border border-[#262B3D] text-slate-200 font-mono text-xs leading-relaxed focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Bottom Bar */}
        <div className="px-4 py-3 bg-[#0F121C] border-t border-[#2A261A] flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Interactive Runtime Connected (Latency: 14ms)</span>
          </span>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#B89225] hover:brightness-110 text-black text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Executing Sandbox...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Output Sections */}
      {sandboxMode === 'python' && pythonOutput && (
        <div className="rounded-xl border border-[#2A261A] bg-[#07080D] overflow-hidden animate-fadeIn">
          <div className="bg-[#12141F] px-4 py-2 border-b border-[#2A261A] flex items-center justify-between text-xs">
            <span className="font-mono text-emerald-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Python Stdout</span>
            </span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto">
            {pythonOutput}
          </pre>
        </div>
      )}

      {sandboxMode === 'sql' && sqlResults && (
        <div className="rounded-xl border border-[#2A261A] bg-[#0A0C13] overflow-hidden animate-fadeIn">
          <div className="bg-[#12141F] px-4 py-2 border-b border-[#2A261A] flex items-center justify-between text-xs">
            <span className="font-mono text-[#D4AF37] flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5" />
              <span>Query Results ({sqlResults.length} records returned)</span>
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-[#10131E] text-slate-400 font-mono text-[11px] uppercase border-b border-[#262B3D]">
                <tr>
                  <th className="px-4 py-2.5">Region</th>
                  <th className="px-4 py-2.5">Total Orders</th>
                  <th className="px-4 py-2.5">AOV ($)</th>
                  <th className="px-4 py-2.5">Total Revenue ($)</th>
                  <th className="px-4 py-2.5">Rev Share (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1E2C] font-mono tabular-nums">
                {sqlResults.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#141724] transition-colors">
                    <td className="px-4 py-2.5 font-sans font-medium text-white">{String(row.region)}</td>
                    <td className="px-4 py-2.5">{String(row.total_orders)}</td>
                    <td className="px-4 py-2.5">${String(row.avg_order_value)}</td>
                    <td className="px-4 py-2.5 text-[#FFDF73] font-semibold">${Number(row.total_revenue).toLocaleString()}</td>
                    <td className="px-4 py-2.5">{String(row.revenue_pct)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {sandboxMode === 'prompt' && promptOutput && (
        <div className="rounded-xl border border-[#2A261A] bg-[#0A0C13] p-5 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FFDF73] border-b border-[#2A261A] pb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Structured Forensic Response (CoT Grounding Verified)</span>
          </div>
          <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
            {promptOutput}
          </div>
        </div>
      )}
    </div>
  );
};
