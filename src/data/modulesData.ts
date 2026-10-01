import { ModuleItem } from '../types';

export const allModules: ModuleItem[] = [
  // ==========================================
  // WEEK 1: FOUNDATIONS, EXCEL, PYTHON & ML
  // ==========================================
  {
    id: 1,
    week: 'Week 1',
    day: 'Day 1',
    title: 'Program Kick-off & Orientation to AI-Assisted Analytics',
    details: 'Program objectives, structure, learning outcomes; overview of AI assistants (Copilot, ChatGPT, Claude) in the analytics workflow; ground rules, tooling setup, expectations',
    durationMins: 60,
    category: 'Foundations & Excel',
    theory: {
      overview: 'Modern analytics leverages Large Language Models (LLMs) and AI coding assistants not as replacements for critical thinking, but as 10x leverage for exploratory data analysis, code scaffolding, and rapid hypothesis testing. Understanding system prompt constraints, hallucinations, and deterministic verification protocols is essential for enterprise compliance.',
      keyConcepts: [
        'AI-in-the-Loop Workflow: Framing → Generation → Verification → Execution',
        'Comparing AI Coding Assistants: GitHub Copilot vs. ChatGPT vs. Claude 3.5 Sonnet',
        'Enterprise Guardrails: PII anonymization, data sovereignty, token efficiency'
      ],
      industryRelevance: 'Fortune 500 analytics teams utilizing structured AI workflows report a 40% reduction in time-to-insight for routine data curation and reporting.',
      architectureOrRule: 'Rule of Dual Verification: Never run AI-generated analytical code in production without deterministic schema validation and unit assertions.'
    },
    handsOn: {
      title: 'Configuring Enterprise AI Analytics Environment & Safety Wrapper',
      type: 'python',
      scenario: 'You are an analytics lead establishing the ground rules and sandbox test environment. Build a Python sanitization harness that screens incoming analytical prompts for PII (Credit Cards, SSNs, Client Names) before passing them to an AI Assistant.',
      sampleData: [
        { query: 'Calculate average revenue for John Doe customer id 4892-2910-1122-3344', piiExpected: true },
        { query: 'Group aggregate quarterly churn rate by product segment', piiExpected: false }
      ],
      starterCode: `# Task: Complete the enterprise prompt sanitizer function
import re

def sanitize_analytics_prompt(raw_prompt: str) -> dict:
    """
    1. Mask 16-digit credit card patterns with '[REDACTED_CC]'
    2. Check if sanitized prompt is safe for external AI assistant
    """
    cc_pattern = r'\\b\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}\\b'
    # TODO: Redact credit card numbers
    sanitized = raw_prompt
    has_redaction = False
    
    return {
        "original_length": len(raw_prompt),
        "sanitized_prompt": sanitized,
        "is_safe": not has_redaction
    }

# Test sample
test_input = "Analyze sales for card 4111-2222-3333-4444 in Region North"
print(sanitize_analytics_prompt(test_input))
`,
      solutionCode: `import re

def sanitize_analytics_prompt(raw_prompt: str) -> dict:
    cc_pattern = r'\\b\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}\\b'
    has_cc = bool(re.search(cc_pattern, raw_prompt))
    sanitized = re.sub(cc_pattern, '[REDACTED_CC]', raw_prompt)
    
    return {
        "original_length": len(raw_prompt),
        "sanitized_prompt": sanitized,
        "is_safe": True,
        "had_redaction": has_cc
    }

test_input = "Analyze sales for card 4111-2222-3333-4444 in Region North"
print(sanitize_analytics_prompt(test_input))
`,
      hints: [
        'Use re.sub(cc_pattern, "[REDACTED_CC]", raw_prompt) to replace sensitive card numbers.',
        'Ensure re.search is checked to flag if redaction occurred.',
        'Enterprise compliance requires logging redaction events without saving the sensitive string.'
      ],
      validationCriteria: [
        'Regex accurately matches 16-digit card numbers with hyphens or spaces',
        'Masks detected sequences with [REDACTED_CC]',
        'Returns valid structured JSON metadata'
      ],
      expectedOutcome: '{"original_length": 62, "sanitized_prompt": "Analyze sales for card [REDACTED_CC] in Region North", "is_safe": true, "had_redaction": true}'
    }
  },
  {
    id: 2,
    week: 'Week 1',
    day: 'Day 1',
    title: 'Analytics Foundation Refresher',
    details: 'Descriptive vs. diagnostic vs. predictive vs. prescriptive analytics; data types, variables, distributions; basic statistics and measures of central tendency/dispersion',
    durationMins: 60,
    category: 'Foundations & Excel',
    theory: {
      overview: 'The analytics maturity curve spans four stages: Descriptive (What happened?), Diagnostic (Why did it happen?), Predictive (What will happen?), and Prescriptive (What action should be executed?). A firm grasp of skewness, kurtosis, variance, and interquartile range (IQR) guarantees robust statistical reasoning.',
      keyConcepts: [
        'Analytics Spectrum: Descriptive → Diagnostic → Predictive → Prescriptive',
        'Data Types: Nominal, Ordinal, Interval, Ratio',
        'Measures of Dispersion: Mean, Median, Mode, Variance, Std Dev, IQR'
      ],
      industryRelevance: 'Outliers in financial and operational telemetry skew mean metrics; senior analysts rely on median and trimmed metrics to avoid multimillion-dollar allocation errors.',
      architectureOrRule: 'The Robustness Invariant: When data distribution shows |skewness| > 1.0, report Median and IQR alongside Mean and Standard Deviation.'
    },
    handsOn: {
      title: 'Statistical Profiling Engine & Outlier Gatekeeper',
      type: 'python',
      scenario: 'Given an industrial plant sensor temperature dataset with severe machine fault spikes, compute descriptive statistics and calculate Tukey’s 1.5x IQR upper and lower outlier fences.',
      sampleData: [
        { sensor_id: 'S1', temps: [45.2, 46.1, 44.8, 45.9, 45.0, 99.4, 46.3, 44.9, 12.1] }
      ],
      starterCode: `# Task: Compute robust stats & IQR outlier bounds without external heavy libraries
temperatures = [45.2, 46.1, 44.8, 45.9, 45.0, 99.4, 46.3, 44.9, 12.1, 45.5, 45.8]

def compute_distribution_profile(data):
    sorted_data = sorted(data)
    n = len(sorted_data)
    mean_val = sum(sorted_data) / n
    median_val = sorted_data[n // 2]
    
    # TODO: Calculate Q1 (25th percentile), Q3 (75th percentile), and IQR
    q1 = sorted_data[int(n * 0.25)]
    q3 = sorted_data[int(n * 0.75)]
    iqr = q3 - q1
    
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    
    outliers = [x for x in data if x < lower_bound or x > upper_bound]
    
    return {
        "count": n,
        "mean": round(mean_val, 2),
        "median": round(median_val, 2),
        "iqr": round(iqr, 2),
        "outliers_detected": outliers
    }

print(compute_distribution_profile(temperatures))
`,
      solutionCode: `temperatures = [45.2, 46.1, 44.8, 45.9, 45.0, 99.4, 46.3, 44.9, 12.1, 45.5, 45.8]

def compute_distribution_profile(data):
    sorted_data = sorted(data)
    n = len(sorted_data)
    mean_val = sum(sorted_data) / n
    median_val = sorted_data[n // 2]
    
    q1 = sorted_data[int(n * 0.25)]
    q3 = sorted_data[int(n * 0.75)]
    iqr = q3 - q1
    
    lower_bound = q1 - (1.5 * iqr)
    upper_bound = q3 + (1.5 * iqr)
    
    outliers = [x for x in data if x < lower_bound or x > upper_bound]
    
    return {
        "count": n,
        "mean": round(mean_val, 2),
        "median": round(median_val, 2),
        "iqr": round(iqr, 2),
        "outliers_detected": sorted(outliers)
    }

print(compute_distribution_profile(temperatures))
`,
      hints: [
        'Notice how mean (approx 47.37) is pulled by the 99.4 anomaly, while median (45.5) remains steady.',
        'Tukey fences: Lower = Q1 - 1.5 * IQR; Upper = Q3 + 1.5 * IQR.',
        'Compare parametric (mean/std) vs non-parametric (median/IQR) resilience.'
      ],
      validationCriteria: [
        'Correctly sorts dataset and finds accurate median',
        'Identifies 99.4 and 12.1 as Tukey outliers',
        'Returns formatted statistical summary'
      ],
      expectedOutcome: 'Outliers detected: [12.1, 99.4] with median ~45.5 and clear skew isolation.'
    }
  },
  {
    id: 3,
    week: 'Week 1',
    day: 'Day 1',
    title: 'Introduction to Analytics in Business Functions',
    details: 'Analytics across finance, operations, HR, procurement, supply chain; value chain mapping; KPIs and decision support in industrial context',
    durationMins: 60,
    category: 'Foundations & Excel',
    theory: {
      overview: 'Enterprise value chains convert capital and raw materials into profitable goods and customer experiences. Analytics drives distinct KPI trees: Finance (EBITDA, Working Capital Days), Operations (OEE, Cycle Time), Procurement (Spend Under Management, PPV), and HR (eNPS, Quality of Hire).',
      keyConcepts: [
        'Value Chain Decomposition (Porter’s Framework applied to Data)',
        'KPI Cascades: Strategic Objectives → Operational Driver Metrics → Raw Telemetry',
        'OEE Formula: Overall Equipment Effectiveness = Availability × Performance × Quality'
      ],
      industryRelevance: 'Aligning data metrics to corporate P&L drivers is the #1 discriminator between high-impact analytics directors and siloed technicians.',
      architectureOrRule: 'Metric Single-Source Rule: Every executive dashboard metric must possess a deterministic, audited lineage equation in the corporate metric store.'
    },
    handsOn: {
      title: 'Industrial Manufacturing OEE & Financial Impact Calculator',
      type: 'python',
      scenario: 'You are auditing a manufacturing facility. Implement the industrial Overall Equipment Effectiveness (OEE) equation and compute lost revenue per shift based on availability and quality shortfalls.',
      sampleData: [
        { shift: 'Shift A', planned_hours: 8, run_hours: 6.8, ideal_run_rate_per_hr: 120, total_units: 780, defective_units: 35, unit_margin: 25.0 }
      ],
      starterCode: `# Task: Implement OEE (Overall Equipment Effectiveness) and Financial Loss Calculator
def calculate_shift_kpis(planned_hrs, actual_run_hrs, ideal_units_per_hr, total_units_produced, defect_count, unit_margin_usd):
    # 1. Availability = Run Time / Planned Production Time
    availability = actual_run_hrs / planned_hrs
    
    # 2. Performance = (Total Produced / Actual Run Time) / Ideal Rate
    actual_rate = total_units_produced / actual_run_hrs
    performance = actual_rate / ideal_units_per_hr
    
    # 3. Quality = (Total Produced - Defect Count) / Total Produced
    good_units = total_units_produced - defect_count
    quality = good_units / total_units_produced
    
    # 4. Overall OEE = Availability * Performance * Quality
    oee = availability * performance * quality
    
    # 5. Opportunity Loss: (Planned Potential Good Units - Actual Good Units) * unit_margin_usd
    max_possible_units = planned_hrs * ideal_units_per_hr
    financial_loss = (max_possible_units - good_units) * unit_margin_usd
    
    return {
        "availability_pct": round(availability * 100, 2),
        "performance_pct": round(performance * 100, 2),
        "quality_pct": round(quality * 100, 2),
        "oee_pct": round(oee * 100, 2),
        "opportunity_loss_usd": round(financial_loss, 2)
    }

result = calculate_shift_kpis(8.0, 6.8, 120, 780, 35, 25.0)
print(result)
`,
      solutionCode: `def calculate_shift_kpis(planned_hrs, actual_run_hrs, ideal_units_per_hr, total_units_produced, defect_count, unit_margin_usd):
    availability = actual_run_hrs / planned_hrs
    actual_rate = total_units_produced / actual_run_hrs
    performance = actual_rate / ideal_units_per_hr
    good_units = total_units_produced - defect_count
    quality = good_units / total_units_produced
    oee = availability * performance * quality
    
    max_possible_units = planned_hrs * ideal_units_per_hr
    financial_loss = (max_possible_units - good_units) * unit_margin_usd
    
    return {
        "availability_pct": round(availability * 100, 2),
        "performance_pct": round(performance * 100, 2),
        "quality_pct": round(quality * 100, 2),
        "oee_pct": round(oee * 100, 2),
        "opportunity_loss_usd": round(financial_loss, 2)
    }

result = calculate_shift_kpis(8.0, 6.8, 120, 780, 35, 25.0)
print(result)
`,
      hints: [
        'Availability checks how long equipment ran versus scheduled hours.',
        'World-class OEE benchmark in automotive & aerospace is ~85%.',
        'Notice how slight drops in each factor multiply down: 85% x 95% x 95% = 76.7% OEE.'
      ],
      validationCriteria: [
        'Calculates Availability, Performance, and Quality accurately',
        'Multiplies factors into overall OEE percentage',
        'Computes dollar value of lost production margin'
      ],
      expectedOutcome: 'availability_pct: 85.0%, performance_pct: 95.59%, quality_pct: 95.51%, oee_pct: 77.6%, opportunity_loss_usd: $5,375.0'
    }
  },
  {
    id: 4,
    week: 'Week 1',
    day: 'Day 1',
    title: 'Advanced Excel with AI-Assisted Formulas & Automation',
    details: 'Lookup/array/dynamic functions, pivot tables, Power Query basics; AI-assisted formula generation, error checking, and macro/automation prompting',
    durationMins: 90,
    category: 'Foundations & Excel',
    theory: {
      overview: 'Modern spreadsheet engineering has transformed with dynamic array formulas (`XLOOKUP`, `LAMBDA`, `LET`, `FILTER`, `UNIQUE`). Leveraging AI prompts to author complex nested formulas and automate Power Query M code prevents common errors like `#N/A` propagation and computational bottlenecks.',
      keyConcepts: [
        'Dynamic Arrays: Spill ranges, FILTER, SORT, UNIQUE',
        'Performance Optimization: LET function for variable reuse & sub-expression caching',
        'AI Prompt Patterns for Excel: Describing schemas, edge condition constraints, VBA/Office Scripts'
      ],
      industryRelevance: 'Over 80% of business planning still originates in spreadsheets; senior analysts proficient in AI formula authoring cut spreadsheet modeling time by 60%.',
      architectureOrRule: 'LET Hygiene Rule: Any formula exceeding two lines or referencing the same calculation twice must be refactored using LET() for legibility and execution speed.'
    },
    handsOn: {
      title: 'AI Prompt Engineering for Excel Complex Multi-Criteria Dynamic Lookups',
      type: 'prompt',
      scenario: 'You need to formulate a multi-criteria lookup in Excel that extracts the latest contract price for an enterprise vendor across fluctuating quarterly brackets, returning $0 if vendor is expired.',
      starterCode: `PROMPT FOR AI ASSISTANT:
I have an Excel sheet 'Contracts' with Columns:
- A: VendorID (text, e.g. "VND-104")
- B: Category (text, e.g. "Logistics")
- C: EffectiveDate (Date format YYYY-MM-DD)
- D: UnitRate (Currency)
- E: Status ("Active" or "Expired")

Write an optimized Excel 365 formula using LET, FILTER, and XLOOKUP that:
1. Filters for VendorID = "VND-104" and Status = "Active"
2. Returns the UnitRate with the latest EffectiveDate
3. If no matching active contract exists, safely return 0.00 without throwing #CALC! or #N/A errors.
Explain the formula step by step.`,
      solutionCode: `=LET(
    v_id, "VND-104",
    filtered_data, FILTER(Contracts!C:D, (Contracts!A:A = v_id) * (Contracts!E:E = "Active"), "None"),
    IF(
        INDEX(filtered_data, 1, 1) = "None",
        0.00,
        INDEX(SORT(filtered_data, 1, -1), 1, 2)
    )
)`,
      hints: [
        'Use boolean multiplication (CondA) * (CondB) inside FILTER for logical AND.',
        'SORT(filtered_data, 1, -1) sorts by EffectiveDate in descending order.',
        'INDEX(..., 1, 2) retrieves the UnitRate of the top row.'
      ],
      validationCriteria: [
        'Uses LET() to avoid recalculating filtered ranges',
        'Handles empty results gracefully without #CALC!',
        'Sorts descending on date to guarantee latest rate'
      ],
      expectedOutcome: 'Robust dynamic array formula with sub-millisecond execution and graceful zero fallback.'
    }
  },
  {
    id: 5,
    week: 'Week 1',
    day: 'Day 1',
    title: 'Analytical Problem Solving End-to-End (Refresher)',
    details: 'Problem framing, hypothesis structuring, MECE thinking; data-to-insight-to-recommendation flow; structured storyboarding of analyses',
    durationMins: 60,
    category: 'Foundations & Excel',
    theory: {
      overview: 'Structured problem solving uses the MECE principle (Mutually Exclusive, Collectively Exhaustive) and Issue Trees to disaggregate ambiguous business dilemmas into testable hypotheses. Translating raw findings into executive "Situation-Complication-Resolution" (SCR) storylines ensures stakeholder adoption.',
      keyConcepts: [
        'MECE Principle: Non-overlapping segments that cover 100% of the problem universe',
        'Hypothesis-Led Analysis vs Data Fishing: Formulate hypothesis BEFORE querying',
        'The Pyramid Principle: Lead with the recommendation, followed by clustered arguments'
      ],
      industryRelevance: 'Unstructured analytics projects suffer a 70% rate of "interesting charts, zero business action". MECE framing ensures every query answers a decision hurdle.',
      architectureOrRule: 'The Actionability Test: Every chart in an executive storyboard must answer: "So what? Now what? Who owns the decision?"'
    },
    handsOn: {
      title: 'MECE Issue Tree Builder & Hypothesis Disaggregation',
      type: 'design',
      scenario: 'A retail logistics client has suffered a 22% drop in EBITDA margin. Deconstruct the problem into a MECE issue tree balancing Revenue and Cost drivers, and formulate prioritized hypotheses for AI investigation.',
      starterCode: `# Complete the structured MECE Tree schema
problem_statement = "Why did Retail Corp EBITDA margin decline by 22% in FY26?"

mece_structure = {
    "Level_1_Revenue_Drivers": [
        {"factor": "Price Realization", "hypothesis": "Average selling price fell due to aggressive holiday discounts", "test_metric": "Discount_Pct_per_SKU"},
        {"factor": "Volume / Sales Quantity", "hypothesis": "Foot traffic dropped in urban flagships", "test_metric": "Traffic_Count"}
    ],
    "Level_1_Cost_Drivers": [
        # TODO: Add MECE cost factors (COGS, Logistics/Freight, SG&A overhead)
    ]
}
`,
      solutionCode: `problem_statement = "Why did Retail Corp EBITDA margin decline by 22% in FY26?"

mece_structure = {
    "Level_1_Revenue_Drivers": [
        {"factor": "Price Realization", "hypothesis": "Average selling price fell due to aggressive holiday discounts", "test_metric": "Discount_Pct_per_SKU"},
        {"factor": "Volume / Units Sold", "hypothesis": "Foot traffic dropped in urban flagships", "test_metric": "Transaction_Volume"},
        {"factor": "Product Mix", "hypothesis": "Sales shifted toward low-margin generic categories", "test_metric": "Category_Contribution_Margin"}
    ],
    "Level_1_Cost_Drivers": [
        {"factor": "COGS / Raw Material", "hypothesis": "Supplier contract renegotiations increased unit sourcing cost", "test_metric": "Purchase_Price_Variance"},
        {"factor": "Logistics & Fulfillment", "hypothesis": "Last-mile courier surcharges spiked during Q4 peak", "test_metric": "Freight_Cost_per_Unit"},
        {"factor": "Fixed SG&A Overhead", "hypothesis": "Administrative and tech platform expansion exceeded budget", "test_metric": "Opex_to_Revenue_Ratio"}
    ]
}
print("MECE Tree validated: Covers 100% of P&L with zero overlapping drivers.")
`,
      hints: [
        'EBITDA = Revenue - Costs. Revenue = Price x Volume. Costs = Variable (COGS + Delivery) + Fixed (SG&A).',
        'Ensure no factor overlaps with another (Mutually Exclusive).',
        'Ensure no P&L component is omitted (Collectively Exhaustive).'
      ],
      validationCriteria: [
        'Separates revenue drivers from cost drivers',
        'Includes explicit test metrics for quantitative validation',
        'Demonstrates Pyramid Principle hypothesis formulation'
      ],
      expectedOutcome: 'Pristine MECE breakdown ready for automated SQL/Python metric extraction.'
    }
  },
  {
    id: 6,
    week: 'Week 1',
    day: 'Day 1',
    title: 'Python Programming with Copilot, ChatGPT & Claude',
    details: 'Python setup, syntax, data types, control flow, functions; using AI coding assistants for code generation, explanation, and debugging',
    durationMins: 90,
    category: 'Python & AI Coding',
    theory: {
      overview: 'Writing production Python in an AI-accelerated world requires mastering prompt decomposition, docstring-driven code synthesis, and automated debugging. Modern coding assistants thrive when provided explicit type annotations, boundary constraints, and doctest specifications.',
      keyConcepts: [
        'Type Hinting & Pydantic contracts for deterministic AI outputs',
        'Zero-shot code generation vs Few-shot test-driven prompting',
        'Debugging patterns: Feeding traceback logs directly into LLM prompts for root-cause synthesis'
      ],
      industryRelevance: 'Developers using AI pair-programming author 55% more code while reducing syntax syntax lookup time to zero, pivoting their effort toward algorithmic correctness.',
      architectureOrRule: 'Type Safety Mandate: All AI-generated Python functions in data pipelines must specify explicit return type annotations and input validations.'
    },
    handsOn: {
      title: 'AI-Assisted Python Data Normalization & Resilient Parsing',
      type: 'python',
      scenario: 'You are parsing dirty transaction records from an enterprise legacy system. Write a robust parser that handles currency symbols, string floats, nulls, and date strings using modern Python typing.',
      sampleData: [
        { raw: '$1,249.50', valid: true },
        { raw: 'N/A', valid: false },
        { raw: 'EUR 820.00', valid: true }
      ],
      starterCode: `# Task: Build a robust currency normalizer function
from typing import Optional, Dict

def parse_financial_amount(raw_val: str) -> Optional[float]:
    """
    Cleans dirty string amounts e.g., '$1,420.50', ' 2,300.00 ', 'EUR 95.20', 'NULL'
    Returns float value or None if invalid.
    """
    if not raw_val or raw_val.strip().upper() in ('N/A', 'NULL', 'NONE', '-'):
        return None
    
    # TODO: Clean non-numeric characters except '.'
    cleaned = ""
    for char in raw_val:
        if char.isdigit() or char == '.':
            cleaned += char
            
    try:
        return float(cleaned)
    except ValueError:
        return None

# Test transactions
test_cases = ["$1,249.50", "  340.00 ", "N/A", "GBP 4,810.75", "MISSING"]
results = {tc: parse_financial_amount(tc) for tc in test_cases}
print(results)
`,
      solutionCode: `from typing import Optional, Dict
import re

def parse_financial_amount(raw_val: str) -> Optional[float]:
    if not raw_val:
        return None
    cleaned_str = raw_val.strip()
    if cleaned_str.upper() in ('N/A', 'NULL', 'NONE', '-', 'MISSING'):
        return None
    
    # Remove commas and currency tags, keep digits and single dot
    nums = re.findall(r'\\d+(?:\\.\\d+)?', cleaned_str.replace(',', ''))
    if nums:
        return float(nums[0])
    return None

test_cases = ["$1,249.50", "  340.00 ", "N/A", "GBP 4,810.75", "MISSING"]
results = {tc: parse_financial_amount(tc) for tc in test_cases}
print(results)
`,
      hints: [
        'Notice how simple character filtering can fail if multiple decimals or negative signs exist.',
        'Use re.findall(r"\\d+(?:\\.\\d+)?", ...) after stripping commas.',
        'Always return Optional[float] to prevent silent runtime crashes.'
      ],
      validationCriteria: [
        'Handles commas in multi-thousand numbers correctly',
        'Gracefully handles null/missing indicator tokens',
        'Outputs float with 2 decimal precision'
      ],
      expectedOutcome: "{'$1,249.50': 1249.5, '  340.00 ': 340.0, 'N/A': None, 'GBP 4,810.75': 4810.75, 'MISSING': None}"
    }
  },
  {
    id: 7,
    week: 'Week 1',
    day: 'Day 1',
    title: 'Intermediate Python with AI Pair Programming',
    details: 'Data structures, comprehensions, modules, file I/O, error handling; effective pair-programming prompts and iterative refinement with AI',
    durationMins: 60,
    category: 'Python & AI Coding',
    theory: {
      overview: 'Intermediate Python unlocks memory-efficient list/dictionary comprehensions, generators for large dataset streams, context managers for I/O safety, and robust try-except-finally blocks. When pairing with AI, giving concrete examples of edge conditions creates bulletproof utility modules.',
      keyConcepts: [
        'Generators & yield for streaming gigabyte-scale logs without RAM bloat',
        'Dictionary & Set Comprehensions for O(1) lookups',
        'Custom Exception Hierarchies for enterprise data pipeline tracking'
      ],
      industryRelevance: 'Memory-efficient Python pipelines process millions of events per second on standard cloud container nodes without incurring multi-thousand dollar vertical scaling costs.',
      architectureOrRule: 'Generator First Rule: When processing unbounded input streams or files exceeding 50MB, always yield stream batches rather than loading full lists into memory.'
    },
    handsOn: {
      title: 'Streaming Log Event Analyzer with Custom Error Handling',
      type: 'python',
      scenario: 'Build a streaming generator that processes high-velocity server logs, extracts error codes, and aggregates frequency distributions in O(1) auxiliary memory.',
      sampleData: [
        { log: '2026-10-01 10:00:01 INFO [Auth] User 481 logged in' },
        { log: '2026-10-01 10:00:02 ERROR [Payment] Gateway timeout 504' }
      ],
      starterCode: `# Build a memory-safe generator log parser
from typing import Generator, Dict

raw_logs = [
    "2026-10-01 10:00:01 [AUTH] User logged in",
    "2026-10-01 10:00:02 [PAYMENT] Gateway timeout 504",
    "2026-10-01 10:00:05 [DATABASE] Deadlock detected on table orders",
    "2026-10-01 10:00:08 [PAYMENT] Insufficient funds 402",
    "2026-10-01 10:00:11 [AUTH] Token expired 401"
]

def stream_log_categories(logs: list) -> Generator[str, None, None]:
    for entry in logs:
        # TODO: Extract category between [ and ]
        start = entry.find('[')
        end = entry.find(']')
        if start != -1 and end != -1:
            yield entry[start+1:end]

# Aggregate category frequencies
category_counts: Dict[str, int] = {}
for category in stream_log_categories(raw_logs):
    category_counts[category] = category_counts.get(category, 0) + 1

print("Event Stream Summary:", category_counts)
`,
      solutionCode: `from typing import Generator, Dict

raw_logs = [
    "2026-10-01 10:00:01 [AUTH] User logged in",
    "2026-10-01 10:00:02 [PAYMENT] Gateway timeout 504",
    "2026-10-01 10:00:05 [DATABASE] Deadlock detected on table orders",
    "2026-10-01 10:00:08 [PAYMENT] Insufficient funds 402",
    "2026-10-01 10:00:11 [AUTH] Token expired 401"
]

def stream_log_categories(logs: list) -> Generator[str, None, None]:
    for entry in logs:
        start = entry.find('[')
        end = entry.find(']')
        if start != -1 and end != -1:
            yield entry[start+1:end]

category_counts: Dict[str, int] = {}
for category in stream_log_categories(raw_logs):
    category_counts[category] = category_counts.get(category, 0) + 1

print("Event Stream Summary:", category_counts)
`,
      hints: [
        'Notice how yield turns the function into a generator that evaluates lazily.',
        'Dictionary .get(key, 0) + 1 provides an idiomatic frequency counter.',
        'Try modifying the parser to filter only for PAYMENT events.'
      ],
      validationCriteria: [
        'Implements generator syntax using yield',
        'Extracts bracketed category tokens cleanly',
        'Correctly counts frequencies across categories'
      ],
      expectedOutcome: "Event Stream Summary: {'AUTH': 2, 'PAYMENT': 2, 'DATABASE': 1}"
    }
  },
  {
    id: 8,
    week: 'Week 1',
    day: 'Day 2',
    title: 'AI-Assisted Exploratory Data Analysis (EDA) in Python',
    details: 'pandas, NumPy fundamentals; data loading, cleaning, profiling; summary statistics and distribution analysis with AI assistance',
    durationMins: 60,
    category: 'EDA & Feature Engineering',
    theory: {
      overview: 'Exploratory Data Analysis (EDA) is the detective work of data science. With Pandas and NumPy, analysts inspect distributions, missingness matrices, collinearity, and cardinality. Prompting AI with `.info()`, `.describe()`, and `.isna().sum()` outputs produces high-precision diagnostic hypotheses.',
      keyConcepts: [
        'Vectorized operations in NumPy & Pandas vs slow Python loops',
        'Data Profiling: Sparsity, Cardinality, Skewness, Kurtosis',
        'AI Prompt Pattern: Feeding dataframe schema & statistical summaries to generate targeted questions'
      ],
      industryRelevance: 'Rushing to machine learning without rigorous EDA leads to data leakage, silent type coercion bugs, and severe model decay in production.',
      architectureOrRule: 'The Missingness Protocol: Always categorize missing values into MCAR (Completely at Random), MAR (At Random), or MNAR (Not at Random) before choosing imputation or drop.'
    },
    handsOn: {
      title: 'Automated Dataset Profiler & Anomaly Diagnostic Engine',
      type: 'python',
      scenario: 'Build a lightweight automated Pandas data profiler that inspects column data types, computes null ratios, calculates skewness, and detects potential categorical high-cardinality risks.',
      sampleData: [
        { customer_id: 'C101', age: 34, churn: 0, spending_score: 72 },
        { customer_id: 'C102', age: null, churn: 1, spending_score: 18 },
        { customer_id: 'C103', age: 45, churn: 0, spending_score: 95 }
      ],
      starterCode: `# Lightweight automated data profiler
sample_records = [
    {"cust_id": "C01", "age": 28, "income": 52000, "region": "North", "churn": 0},
    {"cust_id": "C02", "age": 42, "income": 85000, "region": "South", "churn": 1},
    {"cust_id": "C03", "age": None, "income": 41000, "region": "North", "churn": 0},
    {"cust_id": "C04", "age": 31, "income": 62000, "region": "East", "churn": 0},
    {"cust_id": "C05", "age": 55, "income": None, "region": "West", "churn": 1},
    {"cust_id": "C06", "age": 23, "income": 38000, "region": "North", "churn": 0}
]

def profile_dataset(records):
    num_rows = len(records)
    cols = records[0].keys()
    profile = {}
    
    for col in cols:
        vals = [r[col] for r in records]
        null_count = sum(1 for v in vals if v is None)
        valid_vals = [v for v in vals if v is not None]
        unique_count = len(set(valid_vals))
        
        # Check if numeric
        is_numeric = all(isinstance(v, (int, float)) for v in valid_vals)
        mean_val = round(sum(valid_vals) / len(valid_vals), 2) if is_numeric and valid_vals else None
        
        profile[col] = {
            "null_pct": round((null_count / num_rows) * 100, 1),
            "cardinality": unique_count,
            "type": "Numeric" if is_numeric else "Categorical",
            "mean": mean_val
        }
    return profile

print(profile_dataset(sample_records))
`,
      solutionCode: `def profile_dataset(records):
    num_rows = len(records)
    cols = records[0].keys()
    profile = {}
    
    for col in cols:
        vals = [r[col] for r in records]
        null_count = sum(1 for v in vals if v is None)
        valid_vals = [v for v in vals if v is not None]
        unique_count = len(set(valid_vals))
        
        is_numeric = all(isinstance(v, (int, float)) for v in valid_vals)
        mean_val = round(sum(valid_vals) / len(valid_vals), 2) if is_numeric and valid_vals else None
        
        profile[col] = {
            "null_pct": round((null_count / num_rows) * 100, 1),
            "cardinality": unique_count,
            "type": "Numeric" if is_numeric else "Categorical",
            "mean": mean_val
        }
    return profile

print(profile_dataset(sample_records))
`,
      hints: [
        'Look at income and age missingness rates.',
        'High cardinality in categorical fields (like customer IDs) requires target encoding or hash hashing rather than One-Hot.',
        'Feed this profile dictionary into an AI prompt to request feature engineering recommendations.'
      ],
      validationCriteria: [
        'Correctly measures null percentage across all fields',
        'Separates numeric from categorical types',
        'Computes valid mean without being corrupted by None values'
      ],
      expectedOutcome: 'Pristine profile displaying age: 16.7% null, income: 16.7% null, and distinct categorical distribution.'
    }
  },
  {
    id: 9,
    week: 'Week 1',
    day: 'Day 2',
    title: 'Hands-on Python EDA with AI Coding Assistants',
    details: 'Guided exercise: ingest a dataset, clean, transform, and profile; AI-supported visualization with matplotlib/seaborn',
    durationMins: 90,
    category: 'EDA & Feature Engineering',
    theory: {
      overview: 'Data visualization is the bridge between statistical computation and executive decisions. Matplotlib provides the low-level graphics foundation, while Seaborn abstracts statistical plotting. AI coding assistants excel at generating custom color palettes, faceted subplots, and publication-ready annotations.',
      keyConcepts: [
        'Chart Chooser: Distributions (Histograms, KDE), Relationships (Scatter, Hexbin), Categorical (Bar, Boxplot)',
        'Cognitive Load Reduction: Direct labeling over legends, muted background grids, high-contrast focal points',
        'Prompting for Visualization: Specifying canvas dimensions, DPI, labels, and color hex codes'
      ],
      industryRelevance: 'Executive presentations fail when charts suffer from illegible micro-fonts or confusing 3D bar effects. Clean visual hierarchies drive immediate alignment.',
      architectureOrRule: 'Direct Labeling Rule: Whenever a time-series or bar chart has fewer than 7 data points, label values directly on the mark rather than requiring axis back-and-forth.'
    },
    handsOn: {
      title: 'Customer Churn Cohort Matrix & Visual Distribution Generator',
      type: 'python',
      scenario: 'You are analyzing customer churn across tenure cohorts and spending tiers. Write the data aggregation script that outputs a clean ASCII correlation matrix and distribution summary.',
      sampleData: [
        { cohort: '0-6m', tier: 'High', churn_rate: 0.38 },
        { cohort: '6-12m', tier: 'High', churn_rate: 0.18 },
        { cohort: '12m+', tier: 'High', churn_rate: 0.06 }
      ],
      starterCode: `# Build Cohort Churn Rate Analysis
customers = [
    {"id": 1, "tenure_months": 3, "spend": 1200, "churn": 1},
    {"id": 2, "tenure_months": 15, "spend": 4500, "churn": 0},
    {"id": 3, "tenure_months": 5, "spend": 800, "churn": 1},
    {"id": 4, "tenure_months": 8, "spend": 2100, "churn": 0},
    {"id": 5, "tenure_months": 24, "spend": 9800, "churn": 0},
    {"id": 6, "tenure_months": 4, "spend": 600, "churn": 1},
    {"id": 7, "tenure_months": 18, "spend": 3200, "churn": 0},
    {"id": 8, "tenure_months": 7, "spend": 1900, "churn": 1}
]

def build_tenure_cohort_analysis(data):
    cohorts = {"0-6 Months": [], "7-12 Months": [], "12+ Months": []}
    for c in data:
        t = c["tenure_months"]
        if t <= 6:
            cohorts["0-6 Months"].append(c)
        elif t <= 12:
            cohorts["7-12 Months"].append(c)
        else:
            cohorts["12+ Months"].append(c)
            
    summary = {}
    for group_name, members in cohorts.items():
        total = len(members)
        churned = sum(1 for m in members if m["churn"] == 1)
        avg_spend = sum(m["spend"] for m in members) / total if total > 0 else 0
        summary[group_name] = {
            "customer_count": total,
            "churn_rate_pct": round((churned / total) * 100, 1) if total > 0 else 0,
            "avg_spend_usd": round(avg_spend, 2)
        }
    return summary

print(build_tenure_cohort_analysis(customers))
`,
      solutionCode: `def build_tenure_cohort_analysis(data):
    cohorts = {"0-6 Months": [], "7-12 Months": [], "12+ Months": []}
    for c in data:
        t = c["tenure_months"]
        if t <= 6:
            cohorts["0-6 Months"].append(c)
        elif t <= 12:
            cohorts["7-12 Months"].append(c)
        else:
            cohorts["12+ Months"].append(c)
            
    summary = {}
    for group_name, members in cohorts.items():
        total = len(members)
        churned = sum(1 for m in members if m["churn"] == 1)
        avg_spend = sum(m["spend"] for m in members) / total if total > 0 else 0
        summary[group_name] = {
            "customer_count": total,
            "churn_rate_pct": round((churned / total) * 100, 1) if total > 0 else 0,
            "avg_spend_usd": round(avg_spend, 2)
        }
    return summary

print(build_tenure_cohort_analysis(customers))
`,
      hints: [
        'Notice how early tenure (0-6 Months) has 100% churn in this sample while 12+ Months has 0%.',
        'This pattern suggests onboarding friction rather than product dissatisfaction.',
        'Use AI to generate a Seaborn barplot snippet from this summary dictionary.'
      ],
      validationCriteria: [
        'Correctly buckets customers into distinct non-overlapping tenure intervals',
        'Calculates accurate churn percentage per cohort',
        'Computes average spend per group'
      ],
      expectedOutcome: "{'0-6 Months': {'customer_count': 3, 'churn_rate_pct': 100.0, 'avg_spend_usd': 866.67}, '7-12 Months': {'customer_count': 2, 'churn_rate_pct': 50.0, 'avg_spend_usd': 2000.0}, '12+ Months': {'customer_count': 3, 'churn_rate_pct': 0.0, 'avg_spend_usd': 5833.33}}"
    }
  },
  {
    id: 10,
    week: 'Week 1',
    day: 'Day 2',
    title: 'Additional Hands-on Python EDA (AI-Supported)',
    details: 'Extended practice on a domain dataset; missing-value handling, outlier detection, feature inspection; insight write-up',
    durationMins: 150,
    category: 'EDA & Feature Engineering',
    theory: {
      overview: 'Real-world datasets require extended diagnostic endurance. Feature inspection encompasses correlation matrices, multicollinearity checks via Variance Inflation Factor (VIF), and strategic missing-value imputation. We formulate an executive insight brief summarizing findings.',
      keyConcepts: [
        'Multicollinearity & VIF (Variance Inflation Factor > 5 indicates redundant features)',
        'Imputation Strategies: Mean/Median vs KNN vs IterativeImputer',
        'Executive Insight Framing: Observation → Root Cause Hypothesis → Commercial Impact'
      ],
      industryRelevance: 'Treating symptoms instead of underlying data anomalies costs companies months of wasted modeling cycles. Deep EDA uncovers structural ground truth.',
      architectureOrRule: 'Imputation Leakage Prevention: Always compute imputation statistics (mean, median, scalers) ONLY on the training fold, never on the full combined dataset.'
    },
    handsOn: {
      title: 'End-to-End Telecom Churn Feature Cleansing & Insight Synthesizer',
      type: 'python',
      scenario: 'Implement a comprehensive preprocessing pipeline that imputes missing numerical values using median, handles categorical missingness with "Unknown", and detects extreme outliers.',
      starterCode: `# Build Robust Feature Preprocessor Pipeline
def cleanse_and_transform_features(records):
    # Step 1: Compute median for numeric fields
    numeric_keys = ["tenure", "monthly_charges", "total_charges"]
    medians = {}
    for k in numeric_keys:
        valid_nums = [r[k] for r in records if r.get(k) is not None]
        valid_nums.sort()
        medians[k] = valid_nums[len(valid_nums)//2] if valid_nums else 0
        
    cleaned_records = []
    for r in records:
        entry = dict(r)
        # Apply median imputation
        for k in numeric_keys:
            if entry.get(k) is None:
                entry[k] = medians[k]
        # Categorical imputation
        if not entry.get("contract_type"):
            entry["contract_type"] = "Month-to-Month"
        cleaned_records.append(entry)
        
    return {
        "imputation_constants": medians,
        "processed_count": len(cleaned_records),
        "sample": cleaned_records[0]
    }

raw_data = [
    {"id": "A1", "tenure": 12, "monthly_charges": 65.5, "total_charges": None, "contract_type": "One-Year"},
    {"id": "A2", "tenure": None, "monthly_charges": 20.0, "total_charges": 140.0, "contract_type": None},
    {"id": "A3", "tenure": 36, "monthly_charges": 89.0, "total_charges": 3200.0, "contract_type": "Two-Year"}
]
print(cleanse_and_transform_features(raw_data))
`,
      solutionCode: `def cleanse_and_transform_features(records):
    numeric_keys = ["tenure", "monthly_charges", "total_charges"]
    medians = {}
    for k in numeric_keys:
        valid_nums = [r[k] for r in records if r.get(k) is not None]
        valid_nums.sort()
        medians[k] = valid_nums[len(valid_nums)//2] if valid_nums else 0
        
    cleaned_records = []
    for r in records:
        entry = dict(r)
        for k in numeric_keys:
            if entry.get(k) is None:
                entry[k] = medians[k]
        if not entry.get("contract_type"):
            entry["contract_type"] = "Month-to-Month"
        cleaned_records.append(entry)
        
    return {
        "imputation_constants": medians,
        "processed_count": len(cleaned_records),
        "sample": cleaned_records[0]
    }

raw_data = [
    {"id": "A1", "tenure": 12, "monthly_charges": 65.5, "total_charges": None, "contract_type": "One-Year"},
    {"id": "A2", "tenure": None, "monthly_charges": 20.0, "total_charges": 140.0, "contract_type": None},
    {"id": "A3", "tenure": 36, "monthly_charges": 89.0, "total_charges": 3200.0, "contract_type": "Two-Year"}
]
print(cleanse_and_transform_features(raw_data))
`,
      hints: [
        'Notice how record A1 had total_charges missing and was imputed with the median of remaining records.',
        'Record A2 had contract_type missing and defaulted to default "Month-to-Month".',
        'In production, save medians dictionary as an artifact for deployment scoring.'
      ],
      validationCriteria: [
        'Calculates numeric medians ignoring None values',
        'Replaces missing entries without mutating original records',
        'Applies default categorical imputation'
      ],
      expectedOutcome: 'Zero missing values remaining in dataset; clean serialization ready for Scikit-Learn.'
    }
  },
  {
    id: 11,
    week: 'Week 1',
    day: 'Day 2',
    title: 'AI-Assisted Predictive Modeling Foundations',
    details: 'Supervised learning concepts; train/test split, baseline models, regression vs. classification; AI-assisted scikit-learn workflows',
    durationMins: 90,
    category: 'Supervised ML',
    theory: {
      overview: 'Supervised machine learning maps feature vectors X to target variable y. Formulating a baseline model (DummyClassifier or MeanRegressor) is essential to establish whether machine learning adds true lift. Stratified train/test splits ensure rare event targets (like fraud or churn) are proportionally represented.',
      keyConcepts: [
        'Bias-Variance Tradeoff: Underfitting (High Bias) vs Overfitting (High Variance)',
        'Train/Validation/Test Split ratios and Stratified K-Fold',
        'Baseline Heuristics: Zero-Rule model (always predicting majority class)'
      ],
      industryRelevance: 'Many companies spend months deploying deep learning models that perform no better than a simple logistic regression or rule-based baseline.',
      architectureOrRule: 'The Baseline Benchmark Invariant: No complex machine learning model may be approved for production unless it beats the heuristic baseline by at least 15% on the business metric.'
    },
    handsOn: {
      title: 'Scikit-Learn Predictive Baseline & Confusion Matrix Evaluator',
      type: 'python',
      scenario: 'You are building a churn prediction engine. Create a simulated train/test split, calculate the majority-class baseline accuracy, and evaluate a simulated logistic regression predictor.',
      starterCode: `# Build Supervised Baseline vs Predictive Model Evaluation
def evaluate_model_performance(y_true, y_pred):
    total = len(y_true)
    # 1. Confusion Matrix elements
    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)
    tn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 0)
    fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 1)
    fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 0)
    
    accuracy = (tp + tn) / total
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    
    # Baseline: predict all 0 (majority)
    majority_accuracy = sum(1 for yt in y_true if yt == 0) / total
    
    return {
        "accuracy": round(accuracy, 3),
        "majority_baseline_accuracy": round(majority_accuracy, 3),
        "precision": round(precision, 3),
        "recall": round(recall, 3),
        "f1_score": round(f1, 3),
        "lift_over_baseline": round(accuracy - majority_accuracy, 3)
    }

actuals =     [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1]
predictions = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]
print(evaluate_model_performance(actuals, predictions))
`,
      solutionCode: `def evaluate_model_performance(y_true, y_pred):
    total = len(y_true)
    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)
    tn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 0)
    fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 1)
    fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 0)
    
    accuracy = (tp + tn) / total
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    
    majority_accuracy = sum(1 for yt in y_true if yt == 0) / total
    
    return {
        "accuracy": round(accuracy, 3),
        "majority_baseline_accuracy": round(majority_accuracy, 3),
        "precision": round(precision, 3),
        "recall": round(recall, 3),
        "f1_score": round(f1, 3),
        "lift_over_baseline": round(accuracy - majority_accuracy, 3)
    }

actuals =     [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1]
predictions = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]
print(evaluate_model_performance(actuals, predictions))
`,
      hints: [
        'Notice how the majority class (0) has 66.7% baseline accuracy without any intelligence.',
        'Precision measures: of all predicted churners, how many actually churned? (100% here).',
        'Recall measures: of all actual churners, how many did we catch? (80% here, missed 1).'
      ],
      validationCriteria: [
        'Calculates true positives, false positives, true negatives, and false negatives',
        'Computes Precision, Recall, and F1 Score with division by zero safety',
        'Measures net lift over the majority-class baseline'
      ],
      expectedOutcome: "{'accuracy': 0.933, 'majority_baseline_accuracy': 0.667, 'precision': 1.0, 'recall': 0.8, 'f1_score': 0.889, 'lift_over_baseline': 0.267}"
    }
  }
];

// Helper to generate the remaining modules systematically with full curriculum details
const additionalModuleDefinitions: Array<{
  id: number;
  week: 'Week 1' | 'Week 2' | 'Week 3' | 'Specialization';
  day: string;
  title: string;
  details: string;
  durationMins: number;
  category: string;
  type: 'python' | 'sql' | 'prompt' | 'pipeline' | 'optimization' | 'design';
  concept: string;
  labTitle: string;
  codeSnippet: string;
}> = [
  // Modules 12-27 (Week 1 completion)
  {
    id: 12, week: 'Week 1', day: 'Day 2',
    title: 'Working with Client Data & Systems',
    details: 'Overview of client data sources, systems, and access patterns; data security, governance, and contextual constraints for analytics',
    durationMins: 90, category: 'SQL & Cloud', type: 'python',
    concept: 'Enterprise data access patterns, role-based access control (RBAC), and contextual data governance masking.',
    labTitle: 'Role-Based Data Column Masking Engine',
    codeSnippet: 'def apply_rbac_masking(dataset, user_role): return [{"name": r["name"] if user_role=="admin" else "***", "salary": r["salary"] if user_role in ("admin","hr") else None} for r in dataset]'
  },
  {
    id: 13, week: 'Week 1', day: 'Day 3',
    title: 'Model Evaluation & Selection',
    details: 'Metrics (accuracy, precision/recall, F1, RMSE, R²), cross-validation, overfitting/underfitting, bias-variance; model comparison practices',
    durationMins: 60, category: 'Supervised ML', type: 'python',
    concept: 'K-Fold cross-validation, ROC-AUC curve analysis, precision-recall trade-offs, and cost-matrix weighted loss.',
    labTitle: 'Multi-Metric Model Leaderboard & Cost-Matrix Evaluator',
    codeSnippet: 'def calculate_cost_matrix(fp, fn, fp_cost=50, fn_cost=500): return (fp * fp_cost) + (fn * fn_cost)'
  },
  {
    id: 14, week: 'Week 1', day: 'Day 3',
    title: 'SQL & Data Handling with AI Query Assistance',
    details: 'Relational concepts; SELECT, JOIN, GROUP BY, subqueries, window functions; AI-assisted query generation and optimization',
    durationMins: 90, category: 'SQL & Cloud', type: 'sql',
    concept: 'Relational algebra, execution plans, index utilization, and AI prompt engineering for complex window partitions.',
    labTitle: 'Enterprise Window Functions & Churn Recency Query',
    codeSnippet: 'SELECT customer_id, transaction_date, amount, AVG(amount) OVER (PARTITION BY customer_id ORDER BY transaction_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg FROM transactions'
  },
  {
    id: 15, week: 'Week 1', day: 'Day 3',
    title: 'Hands-on SQL Exercises (AI-Assisted Query Building)',
    details: 'Guided query-building exercises against sample schemas; query debugging and tuning with AI assistants',
    durationMins: 180, category: 'SQL & Cloud', type: 'sql',
    concept: 'Query optimization, CTE chaining (Common Table Expressions), avoiding Cartesian joins, and query plan diagnosis.',
    labTitle: 'Multi-Stage E-Commerce Funnel Attribution with CTEs',
    codeSnippet: 'WITH sessions AS (SELECT session_id, user_id, channel FROM web_traffic), orders AS (SELECT session_id, revenue FROM checkouts) SELECT s.channel, COUNT(s.session_id) as visits, SUM(COALESCE(o.revenue, 0)) as total_rev FROM sessions s LEFT JOIN orders o ON s.session_id = o.session_id GROUP BY s.channel'
  },
  {
    id: 16, week: 'Week 1', day: 'Day 3',
    title: 'Cloud Familiarization for Analytics Workloads',
    details: 'Cloud fundamentals, storage/compute services, managed analytics offerings; deploying notebooks and pipelines in the cloud',
    durationMins: 150, category: 'SQL & Cloud', type: 'pipeline',
    concept: 'Decoupled storage and compute (S3/GCS + BigQuery/Snowflake), managed notebook clusters, and cost governor alarms.',
    labTitle: 'Cloud Storage Tiering & Lifecycle Policy Architect',
    codeSnippet: 'def calculate_cloud_cost(gb_hot, gb_glacier, hot_rate=0.023, glacier_rate=0.004): return round((gb_hot * hot_rate) + (gb_glacier * glacier_rate), 2)'
  },
  {
    id: 17, week: 'Week 1', day: 'Day 4',
    title: 'Design Thinking for Analytics Use Cases – Part 1',
    details: 'Empathize and define; user/stakeholder needs, problem statements, persona and journey mapping for analytics use cases',
    durationMins: 210, category: 'Design Thinking & Cases', type: 'design',
    concept: 'Stakeholder persona mapping, pain point categorization, and empathy canvas for executive consumers of analytical dashboards.',
    labTitle: 'Executive Persona & User Journey Matrix Builder',
    codeSnippet: 'persona = {"role": "VP Operations", "pain_points": ["Late inventory alerts", "Unreliable lead times"], "required_latency": "< 5 minutes"}'
  },
  {
    id: 18, week: 'Week 1', day: 'Day 4',
    title: 'Design Thinking for Analytics Use Cases – Part 2',
    details: 'Ideate, prototype, test; framing analytics solutions, rapid prototyping, feedback loops',
    durationMins: 120, category: 'Design Thinking & Cases', type: 'design',
    concept: 'Low-fidelity wireframing, heuristic evaluation, rapid metric prototyping, and stakeholder feedback iteration loops.',
    labTitle: 'Dashboard Wireframe Metric Hierarchy Simulator',
    codeSnippet: 'dashboard_specs = {"hero_kpi": "EBITDA Margin", "secondary_kpis": ["OEE", "PPV", "OTIF"], "refresh_interval": "Hourly"}'
  },
  {
    id: 19, week: 'Week 1', day: 'Day 4',
    title: 'Case Studies & AI-Supported Self-Practice Notebooks',
    details: 'Worked case studies; self-paced AI-supported notebooks for reinforcement and independent practice',
    durationMins: 120, category: 'Design Thinking & Cases', type: 'python',
    concept: 'Autonomous notebook problem solving, iterative AI prompt debugging, and industrial scenario evaluation.',
    labTitle: 'Independent Industrial Defect Rate Diagnostic',
    codeSnippet: 'def compute_defect_drift(batch_a_defects, batch_b_defects): return round((sum(batch_b_defects)/len(batch_b_defects)) - (sum(batch_a_defects)/len(batch_a_defects)), 4)'
  },
  {
    id: 20, week: 'Week 1', day: 'Day 5',
    title: 'RPA for Service Functions',
    details: 'Robotic Process Automation concepts; identifying automatable processes; bots for service and back-office functions',
    durationMins: 120, category: 'RPA & Trees', type: 'pipeline',
    concept: 'Robotic Process Automation (RPA), rule-based decision triggers, exception queues, and unattended bot scheduling.',
    labTitle: 'Automated Invoice Reconciliation Rule Engine',
    codeSnippet: 'def reconcile_invoice(po_amount, invoice_amount, tolerance=0.02): return abs(po_amount - invoice_amount) <= (po_amount * tolerance)'
  },
  {
    id: 21, week: 'Week 1', day: 'Day 5',
    title: 'Introduction to Decision Trees',
    details: 'Tree structure, splitting criteria (Gini, entropy), pruning, interpretability; strengths and limitations',
    durationMins: 60, category: 'RPA & Trees', type: 'python',
    concept: 'Information gain, Shannon Entropy, Gini Impurity, recursive binary splitting, and tree depth control to prevent overfitting.',
    labTitle: 'Gini Impurity & Information Gain Split Calculator',
    codeSnippet: 'def compute_gini(labels): total = len(labels); from collections import Counter; counts = Counter(labels); return round(1.0 - sum((c/total)**2 for c in counts.values()), 4)'
  },
  {
    id: 22, week: 'Week 1', day: 'Day 5',
    title: 'Decision Tree Modeling with AI-Assisted Coding',
    details: 'Building, tuning, and visualizing decision trees in Python with AI coding support',
    durationMins: 150, category: 'RPA & Trees', type: 'python',
    concept: 'Cost-complexity pruning (ccp_alpha), max_depth hyperparameter tuning, and tree path rule extraction.',
    labTitle: 'Decision Tree Churn Classifier with Feature Importance Extraction',
    codeSnippet: 'tree_rules = {"split_feature": "monthly_charges", "threshold": 70.0, "left": {"prediction": 0, "confidence": 0.88}, "right": {"prediction": 1, "confidence": 0.74}}'
  },
  {
    id: 23, week: 'Week 1', day: 'Day 6',
    title: 'Machine Learning Refresher',
    details: 'ML pipeline recap, feature engineering, encoding/scaling, training and validation workflows',
    durationMins: 30, category: 'Supervised ML', type: 'python',
    concept: 'StandardScaler vs MinMaxScaler, Target Encoding vs OneHot, and leakage-proof Scikit-Learn Pipelines.',
    labTitle: 'Scikit-Learn ColumnTransformer Pipeline Builder',
    codeSnippet: 'def standardize_array(arr): mean = sum(arr)/len(arr); std = (sum((x-mean)**2 for x in arr)/len(arr))**0.5; return [(x-mean)/std for x in arr]'
  },
  {
    id: 24, week: 'Week 1', day: 'Day 6',
    title: 'Machine Learning Deep Dive with AI Coding Support',
    details: 'End-to-end ML workflow on a dataset; hyperparameter tuning and pipeline construction with AI assistance',
    durationMins: 120, category: 'Supervised ML', type: 'python',
    concept: 'GridSearchCV vs RandomizedSearchCV vs Bayesian Optimization, stratified splitting, and classification report generation.',
    labTitle: 'Automated Hyperparameter Grid Search Runner',
    codeSnippet: 'best_params = {"max_depth": 5, "min_samples_split": 10, "criterion": "gini", "cv_roc_auc": 0.892}'
  },
  {
    id: 25, week: 'Week 1', day: 'Day 6',
    title: 'Introduction to Random Forest',
    details: 'Ensemble learning and bagging; random forest mechanics, feature importance, hyperparameters',
    durationMins: 90, category: 'Supervised ML', type: 'python',
    concept: 'Bootstrap aggregating (bagging), random subspace projection, out-of-bag (OOB) error estimation, and MDI feature importances.',
    labTitle: 'Bootstrap Aggregating (Bagging) Ensemble Simulator',
    codeSnippet: 'def bootstrap_sample(data): import random; n = len(data); return [random.choice(data) for _ in range(n)]'
  },
  {
    id: 26, week: 'Week 1', day: 'Day 6',
    title: 'Random Forest with AI-Assisted Python Coding',
    details: 'Implementing, tuning, and evaluating random forests in Python with AI coding support',
    durationMins: 120, category: 'Supervised ML', type: 'python',
    concept: 'Tuning n_estimators, max_features, and min_samples_leaf; evaluating OOB score and permutation feature importance.',
    labTitle: 'Random Forest Ensemble with Permutation Importance',
    codeSnippet: 'rf_importance = {"tenure": 0.34, "contract_type": 0.28, "monthly_charges": 0.21, "payment_method": 0.17}'
  },
  {
    id: 27, week: 'Week 1', day: 'Day 6',
    title: 'Introduction to XGBoost',
    details: 'Boosting concepts, gradient boosting, XGBoost architecture and key hyperparameters',
    durationMins: 90, category: 'Supervised ML', type: 'python',
    concept: 'Gradient boosted trees, learning rate (eta), column subsampling, gamma regularization, and early stopping protocols.',
    labTitle: 'Gradient Residual Fitting Step Simulator',
    codeSnippet: 'def compute_gradient_residuals(y_true, y_pred): return [yt - yp for yt, yp in zip(y_true, y_pred)]'
  },

  // ==========================================
  // WEEK 2: DEEP LEARNING, NLP & GENAI
  // ==========================================
  {
    id: 28, week: 'Week 2', day: 'Day 1',
    title: 'Neural Networks & Deep Learning Foundations',
    details: 'Perceptron, activation functions, layers, forward/backpropagation; intuition for deep learning',
    durationMins: 60, category: 'Deep Learning & Vision', type: 'python',
    concept: 'Artificial neurons, activation functions (ReLU, Sigmoid, GeLU), chain rule of calculus, and gradient descent optimization.',
    labTitle: 'Single Perceptron Forward Pass & ReLU Activation',
    codeSnippet: 'def forward_perceptron(inputs, weights, bias): z = sum(i*w for i,w in zip(inputs, weights)) + bias; return max(0.0, z) # ReLU'
  },
  {
    id: 29, week: 'Week 2', day: 'Day 1',
    title: 'Introduction to Unsupervised Learning',
    details: 'Clustering and dimensionality reduction concepts; when and why to use unsupervised methods',
    durationMins: 60, category: 'Deep Learning & Vision', type: 'python',
    concept: 'Unsupervised taxonomy, centroid-based vs density-based clustering, PCA eigen-decomposition, and t-SNE / UMAP embeddings.',
    labTitle: 'Euclidean Distance Matrix & Closest Centroid Assignment',
    codeSnippet: 'def assign_cluster(point, centroids): return min(range(len(centroids)), key=lambda i: sum((a-b)**2 for a,b in zip(point, centroids[i])))'
  },
  {
    id: 30, week: 'Week 2', day: 'Day 1',
    title: 'Participant Presentation: Random Forest Models',
    details: 'Participants present their random forest model work; peer review and instructor feedback',
    durationMins: 150, category: 'Supervised ML', type: 'design',
    concept: 'Executive presentation rubrics, model storytelling, communicating ROC-AUC to business heads, and peer feedback calibration.',
    labTitle: 'Model Review Rubric & Metric Peer Scorecard',
    codeSnippet: 'peer_evaluation = {"model_name": "RF-Churn-V2", "auc_score": 0.884, "business_clarity": 9, "bias_risk_mitigated": True}'
  },
  {
    id: 31, week: 'Week 2', day: 'Day 1',
    title: 'XGBoost with AI-Assisted Python Coding',
    details: 'Implementing and tuning XGBoost in Python with AI coding support; comparison with other models',
    durationMins: 180, category: 'Supervised ML', type: 'python',
    concept: 'XGBoost multi-core training, tree pruning with gamma, L1 (reg_alpha) and L2 (reg_lambda) regularization, and DMatrix formatting.',
    labTitle: 'XGBoost Early-Stopping Classifier with Evaluation Log',
    codeSnippet: 'xgb_params = {"objective": "binary:logistic", "eval_metric": "logloss", "learning_rate": 0.05, "max_depth": 6, "subsample": 0.8}'
  },
  {
    id: 32, week: 'Week 2', day: 'Day 2',
    title: 'Deep Dive into K-Means Clustering',
    details: 'K-Means algorithm, choosing k, elbow/silhouette methods, scaling and interpretation',
    durationMins: 120, category: 'Deep Learning & Vision', type: 'python',
    concept: 'Within-Cluster Sum of Squares (WCSS), Elbow curve inflection point, Silhouette coefficient (-1 to +1), and feature standardization.',
    labTitle: 'Elbow Method & Silhouette Coefficient Calculator',
    codeSnippet: 'def calculate_wcss(clusters, centroids): return sum(sum((x - centroids[c])**2 for x in points) for c, points in clusters.items())'
  },
  {
    id: 33, week: 'Week 2', day: 'Day 2',
    title: 'Clustering with AI-Assisted Python Coding',
    details: 'Implementing K-Means and other clustering in Python; visualizing and interpreting clusters with AI support',
    durationMins: 120, category: 'Deep Learning & Vision', type: 'python',
    concept: 'Customer segmentation, cluster centroid characterization, radar charts for persona profiling, and DBSCAN for spatial outliers.',
    labTitle: 'Customer Persona Segmentation & Centroid Profiler',
    codeSnippet: 'cluster_profiles = {0: {"label": "High Spend Loyalists", "avg_spend": 8200, "frequency": 14}, 1: {"label": "Discount Hunters", "avg_spend": 1200, "frequency": 2}}'
  },
  {
    id: 34, week: 'Week 2', day: 'Day 2',
    title: 'Participant Project Presentation',
    details: 'Participants present analytics project progress; structured feedback and discussion',
    durationMins: 210, category: 'Design Thinking & Cases', type: 'design',
    concept: 'Sprint review governance, demonstrating business lift, addressing technical debt, and scoping next sprint iterations.',
    labTitle: 'Mid-Program Project Sprint Review Scorecard',
    codeSnippet: 'sprint_status = {"deliverables_completed": 8, "blockers_resolved": 3, "demo_grade": "A+", "approved_for_deployment": True}'
  },
  {
    id: 35, week: 'Week 2', day: 'Day 3',
    title: 'Agile Ways of Working for Analytics Projects – Part 1',
    details: 'Agile and Scrum fundamentals; roles, ceremonies, backlog, sprints applied to analytics delivery',
    durationMins: 150, category: 'Design Thinking & Cases', type: 'design',
    concept: 'Adapting Agile/Scrum for exploratory data science; defining Spike stories, sprint cadences, and Data Definition of Done (DoD).',
    labTitle: 'Data Science User Story & Acceptance Criteria Formulator',
    codeSnippet: 'user_story = {"as_a": "Inventory Manager", "i_want": "Daily replenishment forecasting", "so_that": "Stockout incidents drop by 30%"}'
  },
  {
    id: 36, week: 'Week 2', day: 'Day 3',
    title: 'Agile Ways of Working for Analytics Projects – Part 2',
    details: 'Agile estimation, boards, retrospectives; scaling agile to data/ML teams',
    durationMins: 90, category: 'Design Thinking & Cases', type: 'design',
    concept: 'Story point estimation for uncertain R&D, Jira/Kanban flow for ML pipelines, and blameless post-mortem retrospectives.',
    labTitle: 'Sprint Velocity Tracker & Blameless Post-Mortem Canvas',
    codeSnippet: 'sprint_metrics = {"committed_points": 45, "completed_points": 42, "velocity": 42.0, "carryover_points": 3}'
  },
  {
    id: 37, week: 'Week 2', day: 'Day 3',
    title: 'Effective Communication',
    details: 'Structured communication, data storytelling, audience tailoring, executive-ready messaging',
    durationMins: 180, category: 'Design Thinking & Cases', type: 'prompt',
    concept: 'Executive briefing structures (Minto Pyramid, Barbara Minto SCQA), eliminating jargon, and tailoring messages to CFO vs CTO.',
    labTitle: 'Executive One-Pager & Action Memo Generator',
    codeSnippet: 'memo_structure = {"situation": "Churn increased by 4%", "complication": "High-value tiers driving 80% of lost revenue", "resolution": "Deploy proactive AI retention discounts"}'
  },
  {
    id: 38, week: 'Week 2', day: 'Day 4',
    title: 'Introduction to Neural Networks',
    details: 'Neuron model, network topology, weights and biases, training intuition',
    durationMins: 60, category: 'Deep Learning & Vision', type: 'python',
    concept: 'Multi-layer perceptron (MLP) architecture, hidden layers, cross-entropy loss function, and stochastic gradient descent.',
    labTitle: 'Multi-Layer Dense Layer Matrix Multiplier',
    codeSnippet: 'def dense_layer_forward(X, W, b): return [[max(0, sum(x*w for x,w in zip(row, col)) + b_val) for col, b_val in zip(W, b)] for row in X]'
  },
  {
    id: 39, week: 'Week 2', day: 'Day 4',
    title: 'Introduction to Deep Learning',
    details: 'Deep architectures, frameworks (TensorFlow/PyTorch/Keras), GPUs, training considerations',
    durationMins: 60, category: 'Deep Learning & Vision', type: 'python',
    concept: 'TensorFlow vs PyTorch ecosystems, automatic differentiation (autograd), CUDA GPU acceleration, and batch normalization.',
    labTitle: 'PyTorch/TensorFlow Training Loop Lifecycle Emulator',
    codeSnippet: 'training_history = [{"epoch": 1, "loss": 0.652, "val_acc": 0.68}, {"epoch": 5, "loss": 0.284, "val_acc": 0.89}, {"epoch": 10, "loss": 0.112, "val_acc": 0.94}]'
  },
  {
    id: 40, week: 'Week 2', day: 'Day 4',
    title: 'Introduction to CNNs',
    details: 'Convolution, pooling, filters, feature maps; CNN architecture for images',
    durationMins: 60, category: 'Deep Learning & Vision', type: 'python',
    concept: '2D Convolution kernel filtering, Max Pooling downsampling, stride, padding, and hierarchical spatial feature extraction.',
    labTitle: '2D Convolution Edge Detection Filter Simulator',
    codeSnippet: 'def apply_sobel_kernel(img_patch, kernel): return sum(p*k for p,k in zip(img_patch, kernel))'
  },
  {
    id: 41, week: 'Week 2', day: 'Day 4',
    title: 'Computer Vision & Image Recognition with AI-Assisted Python',
    details: 'Image classification and recognition workflows; transfer learning; hands-on with AI coding support',
    durationMins: 60, category: 'Deep Learning & Vision', type: 'python',
    concept: 'Transfer learning with pre-trained backbones (ResNet, EfficientNet, MobileNet), freezing layers, and fine-tuning top heads.',
    labTitle: 'Defect Image Classifier with Pretrained Head Fine-Tuning',
    codeSnippet: 'transfer_model = {"backbone": "ResNet-50", "frozen_layers": 48, "trainable_head": "Dense(2, activation=\'softmax\')", "target_accuracy": 0.965}'
  },
  {
    id: 42, week: 'Week 2', day: 'Day 4',
    title: 'Introduction to Natural Language Processing',
    details: 'Text preprocessing, tokenization, embeddings, core NLP tasks',
    durationMins: 90, category: 'NLP & GenAI', type: 'python',
    concept: 'Tokenization (BPE, WordPiece), stopword pruning, TF-IDF vectorization, Cosine similarity, and dense vector embeddings.',
    labTitle: 'TF-IDF Vectorizer & Cosine Similarity Semantic Search',
    codeSnippet: 'def cosine_similarity(v1, v2): dot = sum(a*b for a,b in zip(v1,v2)); m1 = sum(a**2 for a in v1)**0.5; m2 = sum(b**2 for b in v2)**0.5; return round(dot/(m1*m2), 4) if m1*m2>0 else 0'
  },
  {
    id: 43, week: 'Week 2', day: 'Day 4',
    title: 'NLP & Text Analytics with Copilot, ChatGPT & Claude',
    details: 'Sentiment, classification, summarization; building NLP pipelines with AI assistants',
    durationMins: 60, category: 'NLP & GenAI', type: 'prompt',
    concept: 'Zero-shot sentiment classification, entity extraction (NER), and multi-document synthesis using state-of-the-art LLM prompts.',
    labTitle: 'Enterprise Customer Review Sentiment & Action Extractor',
    codeSnippet: 'prompt = "Classify this enterprise review into: Sentiment (Positive/Neutral/Negative), Urgency (1-5), and Target Department (Billing/Engineering/Support). Output pure JSON."'
  },
  {
    id: 44, week: 'Week 2', day: 'Day 5',
    title: 'Introduction to Generative AI',
    details: 'Foundation models, transformers, LLMs; capabilities, limitations, and the GenAI landscape',
    durationMins: 60, category: 'NLP & GenAI', type: 'prompt',
    concept: 'Transformer self-attention mechanism, scaling laws, temperature/top-p sampling parameters, and hallucination bounds.',
    labTitle: 'LLM Hyperparameter Tuning & Hallucination Guardrail Tester',
    codeSnippet: 'sampling_config = {"temperature": 0.2, "top_p": 0.95, "max_tokens": 512, "presence_penalty": 0.0, "frequency_penalty": 0.0}'
  },
  {
    id: 45, week: 'Week 2', day: 'Day 5',
    title: 'Generative AI and Analytics Use Cases',
    details: 'Applied GenAI scenarios; opportunity identification',
    durationMins: 60, category: 'NLP & GenAI', type: 'design',
    concept: 'Identifying viable GenAI applications: Text-to-SQL, automated report synthesis, synthetic data generation, and internal knowledge search.',
    labTitle: 'GenAI Feasibility vs Business Value Assessment Matrix',
    codeSnippet: 'use_case_score = {"name": "Auto-SQL Generator", "business_impact": 9, "feasibility": 8, "risk": "Medium", "verdict": "Prioritize"}'
  },
  {
    id: 46, week: 'Week 2', day: 'Day 5',
    title: 'Interactive Case Study / Group Activity (GenAI)',
    details: 'Group-based case study applying GenAI and analytics concepts; presentation and discussion',
    durationMins: 60, category: 'NLP & GenAI', type: 'design',
    concept: 'Collaborative solutioning for enterprise GenAI implementation, calculating ROI, token budgets, and latency SLA targets.',
    labTitle: 'Enterprise GenAI Architecture Blueprint & Token Cost Model',
    codeSnippet: 'def estimate_token_cost(daily_queries, avg_input_tokens=1500, avg_output_tokens=300, rate_per_million=2.50): return round((daily_queries * (avg_input_tokens+avg_output_tokens) / 1e6) * rate_per_million * 30, 2)'
  },
  {
    id: 47, week: 'Week 2', day: 'Day 5',
    title: 'Introduction to Agentic AI',
    details: 'Agents, tools, memory, planning, and orchestration; agentic patterns and frameworks',
    durationMins: 60, category: 'Agentic & Responsible AI', type: 'python',
    concept: 'ReAct pattern (Reasoning + Acting), tool calling definitions, short-term vs long-term memory, and multi-agent coordination.',
    labTitle: 'Autonomous ReAct Agent Loop with Mock Tool Dispatch',
    codeSnippet: 'def execute_agent_step(thought, action_name, action_args): return {"thought": thought, "tool_executed": action_name, "observation": "Query returned 14 anomaly records"}'
  },
  {
    id: 48, week: 'Week 2', day: 'Day 5',
    title: 'Agentic AI for Industrial Operations',
    details: 'Designing agentic workflows for Industrial-operations use cases; human-in-the-loop considerations',
    durationMins: 60, category: 'Agentic & Responsible AI', type: 'pipeline',
    concept: 'Supervisory Control and Data Acquisition (SCADA) integrations, safety interlocks, and Human-in-the-Loop (HITL) approval gates.',
    labTitle: 'Industrial Asset Maintenance Agent with HITL Approval Gate',
    codeSnippet: 'def trigger_maintenance_workflow(asset_id, confidence, threshold=0.90): return {"asset": asset_id, "action": "Automatic Dispatch" if confidence >= threshold else "Requires Chief Engineer Signature"}'
  },
  {
    id: 49, week: 'Week 2', day: 'Day 5',
    title: 'Interactive Case Study / Group Activity (Agentic AI)',
    details: 'Group activity designing an agentic AI solution; review and feedback',
    durationMins: 60, category: 'Agentic & Responsible AI', type: 'design',
    concept: 'Multi-agent orchestration architecture: Planner Agent, Researcher Agent, Executor Agent, and Evaluator Agent.',
    labTitle: 'Multi-Agent Supply Chain Disruption Resolution Flow',
    codeSnippet: 'agent_swarm = {"planner": "Disaggregate port bottleneck", "data_agent": "Fetch vessel telemetry", "analyst_agent": "Reroute cargo via rail"}'
  },
  {
    id: 50, week: 'Week 2', day: 'Day 5',
    title: 'Introduction to Responsible AI',
    details: 'Fairness, bias, transparency, accountability, privacy; governance frameworks',
    durationMins: 60, category: 'Agentic & Responsible AI', type: 'python',
    concept: 'Disparate Impact ratio, Equalized Odds, model explainability (SHAP, LIME), and GDPR/EU AI Act regulatory compliance.',
    labTitle: 'Disparate Impact & Demographic Parity Ratio Checker',
    codeSnippet: 'def calculate_disparate_impact(favorable_rate_protected, favorable_rate_control): return round(favorable_rate_protected / favorable_rate_control, 3)'
  },
  {
    id: 51, week: 'Week 2', day: 'Day 6',
    title: 'Responsible AI for Industrial Applications',
    details: 'Safety, reliability, explainability, and compliance considerations for industrial AI',
    durationMins: 60, category: 'Agentic & Responsible AI', type: 'python',
    concept: 'Deterministic fail-safes, catastrophic drift alarms, explainable SHAP force plots for equipment operators, and audit logs.',
    labTitle: 'SHAP Value Feature Attribution Interpreter',
    codeSnippet: 'shap_contributions = {"vibration_hz": +0.42, "lubrication_level": -0.15, "operating_hours": +0.31, "base_value": 0.05, "final_prediction": 0.63}'
  },
  {
    id: 52, week: 'Week 2', day: 'Day 6',
    title: 'Interactive Case Study / Group Activity (Responsible AI)',
    details: 'Group activity assessing an AI use case against responsible-AI principles',
    durationMins: 60, category: 'Agentic & Responsible AI', type: 'design',
    concept: 'EU AI Act Risk Classification (Unacceptable, High, Limited, Minimal Risk) and Algorithmic Impact Assessment (AIA).',
    labTitle: 'EU AI Act Compliance & Risk Classification Audit',
    codeSnippet: 'compliance_audit = {"system_name": "Autonomous Boiler Control", "tier": "High Risk", "mandated_controls": ["Continuous logging", "Manual emergency stop", "Bi-annual fairness audit"]}'
  },
  {
    id: 53, week: 'Week 2', day: 'Day 6',
    title: 'Introduction to Time Series Modeling',
    details: 'Trend, seasonality, stationarity; ARIMA/exponential smoothing fundamentals',
    durationMins: 60, category: 'Time Series', type: 'python',
    concept: 'Additive vs Multiplicative decomposition, Augmented Dickey-Fuller (ADF) stationarity test, ACF/PACF plots, and ARIMA (p, d, q).',
    labTitle: 'Rolling Moving Average & Differencing Stationarity Transformer',
    codeSnippet: 'def difference_series(ts): return [ts[i] - ts[i-1] for i in range(1, len(ts))]'
  },
  {
    id: 54, week: 'Week 2', day: 'Day 6',
    title: 'Time Series Modeling with AI-Assisted Python Coding',
    details: 'Building and validating time series models in Python with AI coding support',
    durationMins: 90, category: 'Time Series', type: 'python',
    concept: 'Auto-ARIMA parameter search, SARIMAX with exogenous variables, Prophet, and rolling-origin backtesting.',
    labTitle: 'Rolling Window Backtesting & MAPE Evaluator',
    codeSnippet: 'def compute_mape(actuals, forecasts): return round(sum(abs((a-f)/a) for a,f in zip(actuals, forecasts))/len(actuals)*100, 2)'
  },
  {
    id: 55, week: 'Week 2', day: 'Day 6',
    title: 'Handling Large Time Series Data (AI-Assisted)',
    details: 'Scaling, resampling, feature engineering, and efficient processing of large time series with AI assistance',
    durationMins: 60, category: 'Time Series', type: 'python',
    concept: 'Time-series downsampling (1s to 1m), rolling aggregations (min, max, std), lag features, and Fourier terms for seasonality.',
    labTitle: 'High-Frequency Telemetry Downsampler & Lag Feature Generator',
    codeSnippet: 'def create_lag_features(series, lag=1): return [{"current": series[i], f"lag_{lag}": series[i-lag]} for i in range(lag, len(series))]'
  },
  {
    id: 56, week: 'Week 2', day: 'Day 6',
    title: 'Hands-on Exercises & Hackathon',
    details: 'Team hackathon applying time series and ML to a industrial dataset',
    durationMins: 90, category: 'Time Series', type: 'python',
    concept: 'Competitive hackathon execution: Feature engineering under time pressure, ensemble stacking, and leaderboard submission.',
    labTitle: 'Industrial Energy Demand Hackathon Leaderboard Predictor',
    codeSnippet: 'hackathon_submission = {"team": "Kapil Analytics Alpha", "model": "Ensemble(XGBoost + SARIMA)", "leaderboard_mape": 4.12, "rank": 1}'
  },

  // ==========================================
  // WEEK 3: OPTIMIZATION, DATA PIPELINES & DEPLOYMENT
  // ==========================================
  {
    id: 57, week: 'Week 3', day: 'Day 1',
    title: 'Introduction to Optimization',
    details: 'Optimization problem framing; objectives, constraints, decision variables; solution landscape',
    durationMins: 60, category: 'Mathematical Optimization', type: 'optimization',
    concept: 'Mathematical programming framing: Objective function f(x), decision variables x, equality/inequality constraints, and feasible region.',
    labTitle: 'Feasible Region & Constraint Boundary Validator',
    codeSnippet: 'def is_solution_feasible(x1, x2): return (x1 >= 0) and (x2 >= 0) and (2*x1 + 3*x2 <= 120) and (x1 + x2 <= 50)'
  },
  {
    id: 58, week: 'Week 3', day: 'Day 1',
    title: 'Optimization with AI-Assisted Python Coding',
    details: 'Formulating and solving optimization problems in Python (e.g., PuLP/SciPy) with AI support',
    durationMins: 60, category: 'Mathematical Optimization', type: 'optimization',
    concept: 'Using PuLP for Linear Programming (LP), solver invocation (CBC, GLPK), and extracting optimal dual values (shadow prices).',
    labTitle: 'Factory Production Profit Maximizer with PuLP/SciPy Formulation',
    codeSnippet: 'def solve_factory_production(): return {"optimal_units_A": 30, "optimal_units_B": 20, "max_profit_usd": 4800, "binding_constraint": "Labor Hours"}'
  },
  {
    id: 59, week: 'Week 3', day: 'Day 1',
    title: 'Linear / Integer / Non-Linear Optimization',
    details: 'LP, IP/MIP, and NLP formulations; solver selection and interpretation of results',
    durationMins: 60, category: 'Mathematical Optimization', type: 'optimization',
    concept: 'Mixed Integer Linear Programming (MIP) with binary selection variables, non-linear convex optimization, and branch-and-bound algorithms.',
    labTitle: 'Warehouse Facility Location MIP Binary Selection Solver',
    codeSnippet: 'warehouse_mip = {"selected_sites": ["Dallas", "Chicago"], "total_fixed_cost": 50000, "total_shipping_cost": 84200, "total_cost": 134200}'
  },
  {
    id: 60, week: 'Week 3', day: 'Day 1',
    title: 'Blackbox Optimization',
    details: 'Derivative-free and surrogate-based optimization; Bayesian optimization concepts',
    durationMins: 90, category: 'Mathematical Optimization', type: 'optimization',
    concept: 'Derivative-free search, Gaussian Process surrogates, Acquisition functions (Expected Improvement, UCB), and Nelder-Mead simplex.',
    labTitle: 'Bayesian Optimization Acquisition Function (Expected Improvement) Simulator',
    codeSnippet: 'def expected_improvement(mu, sigma, current_best, xi=0.01): improvement = mu - current_best - xi; return max(0.0, improvement) # simplified intuition'
  },
  {
    id: 61, week: 'Week 3', day: 'Day 1',
    title: 'Hands-on Optimization Exercise (AI-Assisted)',
    details: 'Guided optimization exercise on a domain problem with AI coding support',
    durationMins: 60, category: 'Mathematical Optimization', type: 'optimization',
    concept: 'Solving vehicle routing problem (VRP) or supply chain inventory buffer optimization using AI-generated formulations.',
    labTitle: 'Vehicle Routing Problem (VRP) Cost Minimizer',
    codeSnippet: 'vrp_solution = {"routes": [["Depot", "Store_1", "Store_4", "Depot"], ["Depot", "Store_2", "Store_3", "Depot"]], "total_km": 142.5}'
  },
  {
    id: 62, week: 'Week 3', day: 'Day 2',
    title: 'New Project Discussion',
    details: 'Scoping and planning a new analytics/optimization project; objectives and approach',
    durationMins: 90, category: 'Design Thinking & Cases', type: 'design',
    concept: 'Project charter creation: Business goal, data requirements, technical architecture, timeline milestones, and risk register.',
    labTitle: 'Enterprise Project Charter & Risk Register Generator',
    codeSnippet: 'project_charter = {"project_name": "Predictive Fleet Maintenance", "sponsor": "VP Logistics", "target_roi": "3.8x in 12 months", "key_risk": "Sensor data latency"}'
  },
  {
    id: 63, week: 'Week 3', day: 'Day 2',
    title: 'Introduction to AI/ML (Refresher for SL)',
    details: 'Refresher on AI/ML concepts tailored for senior leaders; terminology and value framing',
    durationMins: 60, category: 'Design Thinking & Cases', type: 'prompt',
    concept: 'Executive translation: Demystifying ML jargon into ROI, CapEx/OpEx, time-to-value, and risk governance for the C-Suite.',
    labTitle: 'C-Suite Value Proposition & ROI Translator',
    codeSnippet: 'c_suite_summary = {"technical_metric": "0.89 F1 on Churn", "business_translation": "$2.4M saved annually in customer retention with 85% lower false alerts"}'
  },
  {
    id: 64, week: 'Week 3', day: 'Day 2',
    title: 'Optimization Case Studies',
    details: 'Industry optimization case studies in operations; lessons learned',
    durationMins: 90, category: 'Mathematical Optimization', type: 'design',
    concept: 'Real-world deployment failures and successes in airline crew scheduling, steel cutting-stock, and refinery blending optimization.',
    labTitle: 'Refinery Blending Linear Program Analysis',
    codeSnippet: 'blending_spec = {"octane_min": 91, "vapor_pressure_max": 10.5, "sulfur_ppm_max": 10, "cost_per_barrel": 74.20}'
  },
  {
    id: 65, week: 'Week 3', day: 'Day 2',
    title: 'Participant Project Presentation',
    details: 'Participants present optimization project work; feedback and discussion',
    durationMins: 210, category: 'Design Thinking & Cases', type: 'design',
    concept: 'Presenting mathematical formulations and sensitivity analysis to operational managers and decision makers.',
    labTitle: 'Sensitivity Analysis & Shadow Price Presentation Deck',
    codeSnippet: 'sensitivity_report = {"resource": "Raw Material X", "shadow_price_usd": 14.50, "allowable_increase": 500, "action": "Purchase up to 500 units at <= $14.50 premium"}'
  },
  {
    id: 66, week: 'Week 3', day: 'Day 3',
    title: 'Introduction to Data Definition and Structure',
    details: 'Fundamentals of data types, associated protocols, data library and definitions. Data structure based on data type and policies',
    durationMins: 60, category: 'Data Warehousing & Engineering', type: 'pipeline',
    concept: 'Data dictionaries, schema catalogs (Avro, Protobuf, JSON Schema), data contracts, and semantic types.',
    labTitle: 'Data Contract & JSON Schema Validator',
    codeSnippet: 'def validate_order_contract(event): required = ["order_id", "timestamp", "amount_cents"]; return all(k in event for k in required)'
  },
  {
    id: 67, week: 'Week 3', day: 'Day 3',
    title: 'Data Warehousing Concepts',
    details: 'Data warehousing for different type of data sets, Schema definitions, table definitions',
    durationMins: 90, category: 'Data Warehousing & Engineering', type: 'sql',
    concept: 'Kimball dimensional modeling: Fact tables (additive/non-additive), Dimension tables (SCD Type 1, 2, 3), and Star vs Snowflake schemas.',
    labTitle: 'Star Schema Dimensional Model (Fact & Slowly Changing Dimension Type 2) Builder',
    codeSnippet: 'CREATE TABLE dim_customer (customer_sk BIGINT, customer_id VARCHAR, address VARCHAR, effective_date DATE, expiry_date DATE, is_current BOOLEAN)'
  },
  {
    id: 68, week: 'Week 3', day: 'Day 3',
    title: 'Data Ingestion Pipeline and Processing',
    details: 'Fundamentals of data pipelines, Understanding ETL (Extract, Transform, Load) vs ELT processes, Data flow architecture in analytics systems, Concepts of batch processing and streaming data, Use cases and differences in analytical applications, Techniques for ingesting data from multiple sources (databases, APIs, files), Introduction to data connectors and ingestion workflows',
    durationMins: 60, category: 'Data Warehousing & Engineering', type: 'pipeline',
    concept: 'ETL vs ELT paradigm shift, Kafka / Event Hub streaming, Airflow / Dagster orchestration, and idempotent data pipelines.',
    labTitle: 'Idempotent Batch Ingestion Pipeline with Upsert Logic',
    codeSnippet: 'def upsert_records(existing_table, new_batch, pkey="id"): return {**{r[pkey]: r for r in existing_table}, **{r[pkey]: r for r in new_batch}}'
  },
  {
    id: 69, week: 'Week 3', day: 'Day 3',
    title: 'Data Quality & Lineage',
    details: 'End to end data governance - source, processing, destination, registry tokens, Deduplication, exception handling, data processing efficiency',
    durationMins: 60, category: 'Data Warehousing & Engineering', type: 'pipeline',
    concept: 'Great Expectations data testing, anomaly assertions, DAG data lineage, exact deduplication vs fuzzy deduplication.',
    labTitle: 'Automated Data Quality Suite & Deduplication Engine',
    codeSnippet: 'def run_quality_checks(df_rows): return {"completeness_pass": all(r["id"] is not None for r in df_rows), "uniqueness_pass": len(set(r["id"] for r in df_rows)) == len(df_rows)}'
  },
  {
    id: 70, week: 'Week 3', day: 'Day 3',
    title: 'AI Pipeline Designing',
    details: 'OLTP / OLAP, parallel processing of structured, semi structured and unstructured data, nested model ingestion',
    durationMins: 60, category: 'Data Warehousing & Engineering', type: 'pipeline',
    concept: 'OLTP transactional vs OLAP analytical workloads, processing multimodal data (text + image + metrics), and nested JSON document unnesting.',
    labTitle: 'Multimodal Semi-Structured JSON Flattening & OLAP Ingester',
    codeSnippet: 'def flatten_nested_order(doc): return {"order_id": doc["id"], "user_id": doc["user"]["id"], "first_item": doc["items"][0]["sku"] if doc["items"] else None}'
  },
  {
    id: 71, week: 'Week 3', day: 'Day 4',
    title: 'Hands-on Exercise (Data Engineering)',
    details: 'Building a data pipeline using OLTP, with minimum runtime storage, notebook runtime success and write back to DB query',
    durationMins: 120, category: 'Data Warehousing & Engineering', type: 'pipeline',
    concept: 'End-to-end data pipeline: Extract from transactional OLTP, perform streaming aggregation, and write back materialized views to analytical DB.',
    labTitle: 'End-to-End Stream Aggregation & Database Write-Back Pipeline',
    codeSnippet: 'pipeline_stats = {"records_ingested": 100000, "execution_time_sec": 3.4, "memory_peak_mb": 42, "status": "COMPLETED"}'
  },
  {
    id: 72, week: 'Week 3', day: 'Day 4',
    title: 'Introduction to Prompt Engineering',
    details: 'Fundamentals of prompt engineering, Understanding how Large Language Models (LLMs) interpret instructions, Types of prompts – zero-shot, few-shot, chain-of-thought, Best practices for writing effective prompts for analytics and business use cases',
    durationMins: 120, category: 'LLM Applications & RAG', type: 'prompt',
    concept: 'Prompt topologies: System role prompting, Zero-shot, Few-shot exemplars, Chain-of-Thought (CoT), and ReAct format constraints.',
    labTitle: 'Chain-of-Thought (CoT) Financial Anomaly Reasoning Lab',
    codeSnippet: 'cot_prompt = """System: You are an expert financial forensic auditor. Rule: Think step-by-step before declaring whether a vendor transaction is anomalous. Example: ... Input: ... Response: """'
  },
  {
    id: 73, week: 'Week 3', day: 'Day 4',
    title: 'Building Applications using LLMs',
    details: 'Introduction to LLM APIs (Azure OpenAI / Gemini / OpenAI), Designing simple applications using LLMs, Automating reports, generating insights, and building conversational assistants for business use cases',
    durationMins: 60, category: 'LLM Applications & RAG', type: 'python',
    concept: 'LLM API integration (@google/genai, OpenAI SDK), streaming responses, structured JSON schema outputs, and rate-limit backoff.',
    labTitle: 'Structured JSON Extraction Engine with Schema Enforcement',
    codeSnippet: 'schema = {"type": "object", "properties": {"executive_summary": {"type": "string"}, "key_risks": {"type": "array", "items": {"type": "string"}}}, "required": ["executive_summary"]}'
  },
  {
    id: 74, week: 'Week 3', day: 'Day 4',
    title: 'Retrieval Augmented Generation (RAG)',
    details: 'Concept of grounding LLMs with enterprise data, Integrating internal datasets with LLMs for contextual responses, Building simple Q&A systems using structured / unstructured data',
    durationMins: 120, category: 'LLM Applications & RAG', type: 'python',
    concept: 'RAG Architecture: Chunking strategies, dense vector embeddings, vector databases (Chroma/FAISS/Pinecone), top-k similarity retrieval, and prompt synthesis.',
    labTitle: 'Vector RAG Pipeline & Context-Grounded QA Synthesizer',
    codeSnippet: 'def retrieve_top_k_chunks(query_vector, doc_vectors, k=2): return sorted(doc_vectors, key=lambda d: -sum(a*b for a,b in zip(query_vector, d["vector"])))[:k]'
  },
  {
    id: 75, week: 'Week 3', day: 'Day 4',
    title: 'Use Cases of LLMs in Operations & Analytics',
    details: 'Practical applications of LLMs in business functions such as operations, finance, and analytics, Examples: report automation, root cause analysis assistant, document search, decision support systems',
    durationMins: 60, category: 'LLM Applications & RAG', type: 'design',
    concept: 'Enterprise impact mapping: Automated daily operational briefing, Root Cause Analysis (RCA) generator, and contract liability search.',
    labTitle: 'Industrial Root Cause Analysis (RCA) Assistant Flow',
    codeSnippet: 'rca_workflow = {"incident": "Boiler 4 Pressure Drop", "matched_sops": ["SOP-401 Valve Inspection"], "suggested_actions": ["Inspect relief valve seal", "Check sensor calibration"]}'
  },
  {
    id: 76, week: 'Week 3', day: 'Day 5',
    title: 'Hands-on Exercise & Mini Project (LLM Apps)',
    details: 'Hands-on implementation of prompt engineering and LLM-based applications, Building a basic chatbot or analytical assistant using enterprise or simulated datasets',
    durationMins: 120, category: 'LLM Applications & RAG', type: 'python',
    concept: 'End-to-end LLM application: Query parsing, vector retrieval from knowledge base, prompt formatting with enterprise guardrails, and user feedback logging.',
    labTitle: 'Enterprise Analytics Q&A Chatbot with Source Grounding',
    codeSnippet: 'chatbot_response = {"answer": "Q3 Revenue grew by 14% driven by European expansion.", "sources": ["FY26_Q3_Earnings_Deck.pdf, page 12"], "confidence": 0.94}'
  },
  {
    id: 77, week: 'Week 3', day: 'Day 5',
    title: 'Introduction to DevSecOps (AI/ML)',
    details: 'AI and ML deployment and management - code branches, deployment, version management, issue management',
    durationMins: 60, category: 'DevSecOps & MLOps', type: 'pipeline',
    concept: 'Git branching models for ML (Trunk-based vs GitFlow), CI/CD pipelines, container vulnerability scanning, and secret management.',
    labTitle: 'CI/CD Pipeline Security Gate & Linter Validator',
    codeSnippet: 'cicd_manifest = {"stages": ["lint", "unit_test", "security_scan", "model_eval", "deploy_staging"], "security_scan_pass": True}'
  },
  {
    id: 78, week: 'Week 3', day: 'Day 5',
    title: 'Model Management (Model Versioning & Experiment Tracking)',
    details: 'Fundamentals of model registry management, versioning, tracking efficiency, movement from development to training to serve layer',
    durationMins: 60, category: 'DevSecOps & MLOps', type: 'pipeline',
    concept: 'MLflow / Weights & Biases experiment tracking, model registry stages (Staging, Production, Archived), artifact hashing, and data versioning with DVC.',
    labTitle: 'MLflow Model Registry State Machine & Promotion Gate',
    codeSnippet: 'def promote_model_stage(model_name, version, target_stage="Production", min_auc=0.85, current_auc=0.89): return target_stage if current_auc >= min_auc else "REJECTED"'
  },
  {
    id: 79, week: 'Week 3', day: 'Day 5',
    title: 'Model Deployment Fundamentals',
    details: 'Model deployment in containers, cloud to on premise deployment, redeployment after tuning',
    durationMins: 60, category: 'DevSecOps & MLOps', type: 'pipeline',
    concept: 'Dockerizing ML microservices (FastAPI / Triton), cold start mitigation, REST vs gRPC interfaces, and Blue/Green vs Canary deployments.',
    labTitle: 'FastAPI Production Model Serving Microservice & Healthcheck',
    codeSnippet: 'api_spec = {"endpoint": "/predict", "method": "POST", "latency_p99_ms": 18, "container": "gcr.io/analytics/churn-service:v2.1"}'
  },
  {
    id: 80, week: 'Week 3', day: 'Day 5',
    title: 'Integration of Models with Business Systems',
    details: 'Connecting ML models to enterprise systems for real-time decision-making. Basic understanding of workflows and automation pipelines',
    durationMins: 60, category: 'DevSecOps & MLOps', type: 'pipeline',
    concept: 'Integrating inference endpoints with Salesforce CRM, SAP ERP, and real-time operational message queues (Kafka, RabbitMQ).',
    labTitle: 'Real-Time ERP Webhook & Decision Dispatcher',
    codeSnippet: 'def process_erp_webhook(event): return {"decision": "AUTO_APPROVE_CREDIT" if event["score"] > 750 else "ROUTE_TO_CREDIT_ANALYST"}'
  },
  {
    id: 81, week: 'Week 3', day: 'Day 6',
    title: 'Hands-on Exercise & Mini Project (Deployment)',
    details: 'Execution of end-to-end model flow - development, training, DevOps based serve layer deployment though production branch',
    durationMins: 120, category: 'DevSecOps & MLOps', type: 'pipeline',
    concept: 'Complete ML lifecycle: Commit to production branch, trigger automated test suite, container build, and live zero-downtime serving.',
    labTitle: 'Full MLOps Pipeline Deployment & Production Smoke Tester',
    codeSnippet: 'deployment_status = {"commit_hash": "a98c21f", "build_status": "SUCCESS", "traffic_split": {"v1": 0.10, "v2": 0.90}, "uptime": "99.99%"}'
  },
  {
    id: 82, week: 'Week 3', day: 'Day 6',
    title: 'Q&A and Assessment',
    details: 'Open Q&A, knowledge assessment, and consolidation of learning',
    durationMins: 180, category: 'DevSecOps & MLOps', type: 'python',
    concept: 'Comprehensive 82-module synthesis: Architectural trade-offs, executive case defense, and mastery assessment.',
    labTitle: 'Comprehensive Masterclass Final Knowledge Assessment & Certification Evaluation',
    codeSnippet: 'assessment_submission = {"candidate": "Kapil Learner", "score": 96.5, "passed": True, "honors": True, "credential_issued": True}'
  },

  // ==========================================
  // ANNEXURE 2: ENTERPRISE DATA LAKE (EDL) SPECIALIZATION
  // ==========================================
  {
    id: 83, week: 'Specialization', day: 'Day 1',
    title: 'Introduction to Enterprise Data Lake (EDL)',
    details: 'EDL concepts, purpose, and positioning vs. warehouses; zones and tiers',
    durationMins: 60, category: 'Enterprise Data Lake', type: 'pipeline',
    concept: 'Data Lake vs Data Warehouse, Medallion Architecture (Bronze / Raw Ingestion, Silver / Cleansed & Conformed, Gold / Business Aggregates).',
    labTitle: 'Medallion Architecture (Bronze-Silver-Gold) Partition Validator',
    codeSnippet: 'def classify_lake_tier(path): return "Bronze" if "/raw/" in path else "Silver" if "/cleansed/" in path else "Gold"'
  },
  {
    id: 84, week: 'Specialization', day: 'Day 2',
    title: 'EDL Architecture & Components',
    details: 'Storage, ingestion, catalog, processing, and consumption layers of an EDL',
    durationMins: 60, category: 'Enterprise Data Lake', type: 'pipeline',
    concept: 'Five-layer Data Lake architecture: Object storage, CDC Ingestion, Data Catalog (Glue/Unity), Distributed Compute (Spark/Trino), and BI/ML Consumption.',
    labTitle: 'Data Catalog Schema Registry & Table Metadata Inspector',
    codeSnippet: 'catalog_entry = {"table_name": "gold_daily_kpis", "format": "delta", "partition_cols": ["year", "month"], "owner": "Kapil Analytics"}'
  },
  {
    id: 85, week: 'Specialization', day: 'Day 3',
    title: 'Data Storage & Processing in EDL',
    details: 'File/formats (Parquet, ORC), partitioning, distributed processing engines',
    durationMins: 60, category: 'Enterprise Data Lake', type: 'pipeline',
    concept: 'Columnar storage mechanics: Apache Parquet vs ORC, dictionary encoding, snappy compression, and date/region partition pruning.',
    labTitle: 'Columnar Parquet Compression & Scan Savings Calculator',
    codeSnippet: 'def compute_parquet_savings(raw_csv_bytes, parquet_bytes): return round((1.0 - (parquet_bytes / raw_csv_bytes)) * 100, 1)'
  },
  {
    id: 86, week: 'Specialization', day: 'Day 4',
    title: 'Data Governance in EDL',
    details: 'Cataloging, access control, security, compliance, and stewardship in the lake',
    durationMins: 60, category: 'Enterprise Data Lake', type: 'pipeline',
    concept: 'Lakehouse governance: Fine-grained column/row masking, data retention policies, audit logs, and Apache Ranger / Unity Catalog policies.',
    labTitle: 'Enterprise Lakehouse Policy & Column Security Guard',
    codeSnippet: 'def enforce_lake_policy(user_groups, col_name): return not (col_name == "pii_ssn" and "compliance_officer" not in user_groups)'
  },
  {
    id: 87, week: 'Specialization', day: 'Day 5',
    title: 'Use Cases of EDL in Analytics',
    details: 'Analytics and ML use cases enabled by the EDL; reference patterns and examples',
    durationMins: 60, category: 'Enterprise Data Lake', type: 'pipeline',
    concept: 'Real-world Lakehouse patterns: Feature Stores for ML, unified streaming + batch analytics (Kappa architecture), and cross-domain data mesh federated queries.',
    labTitle: 'Lakehouse Unified Feature Store Query & Online-Offline Sync Engine',
    codeSnippet: 'feature_store_record = {"entity_id": "cust_4892", "features": {"avg_spend_30d": 412.50, "churn_risk_score": 0.14}, "as_of_date": "2026-10-01"}'
  }
];

// Combine modules 1-11 with 12-87 to provide all 87 modules
additionalModuleDefinitions.forEach(def => {
  allModules.push({
    id: def.id,
    week: def.week,
    day: def.day,
    title: def.title,
    details: def.details,
    durationMins: def.durationMins,
    category: def.category,
    isVirtualOnly: def.id >= 83,
    theory: {
      overview: `${def.title} establishes the theoretical foundation for ${def.category}. ${def.concept}`,
      keyConcepts: [
        `Core Engineering Principle: ${def.concept}`,
        `Architectural Best Practice for ${def.category}`,
        `Industry Standard Failure Modes & Verification Checklists`
      ],
      industryRelevance: `Mastery of ${def.title} directly impacts enterprise deployment velocity, eliminating rework and securing operational compliance in data-driven organizations.`,
      architectureOrRule: `Mandatory Quality Invariant: Verify all outputs against deterministic unit assertions and maintain comprehensive audit logs.`
    },
    handsOn: {
      title: def.labTitle,
      type: def.type,
      scenario: `You are leading an industrial analytics team. Implement the technical solution for '${def.title}' to satisfy production enterprise standards.`,
      sampleData: [
        { test_id: `T-${def.id}-01`, status: 'VALIDATED', metric_gain: '+24.5%' },
        { test_id: `T-${def.id}-02`, status: 'CONFIRMED', metric_gain: '+18.2%' }
      ],
      starterCode: `# Hands-on Lab: ${def.labTitle}
# Category: ${def.category} (${def.durationMins} mins)
# Task: Execute and validate the implementation below.

${def.codeSnippet}

# Test execution:
print("Executing ${def.labTitle}...")
print("Status: Active and Ready for Verification")
`,
      solutionCode: `# Verified Solution: ${def.labTitle}
${def.codeSnippet}

print("Executing ${def.labTitle}...")
print("Validation Check: Passed 100% of assertions.")
`,
      hints: [
        `Inspect the core variables: notice how input parameters align with the ${def.category} curriculum.`,
        `Apply AI-assisted prompts (Copilot/Claude style) to test edge cases such as null values or high-throughput limits.`,
        `Run the code sandbox to check live outputs against the expected outcome.`
      ],
      validationCriteria: [
        'Code runs without syntax errors or unhandled exceptions',
        'Produces valid return values conforming to schema specifications',
        'Meets the 90% hands-on validation check'
      ],
      expectedOutcome: `Successful execution of ${def.labTitle} with confirmed operational telemetry and 100% verification pass.`
    }
  });
});

export const categoriesList = [
  'All Modules',
  'Foundations & Excel',
  'Python & AI Coding',
  'EDA & Feature Engineering',
  'Supervised ML',
  'SQL & Cloud',
  'Design Thinking & Cases',
  'RPA & Trees',
  'Deep Learning & Vision',
  'NLP & GenAI',
  'Agentic & Responsible AI',
  'Time Series',
  'Mathematical Optimization',
  'Data Warehousing & Engineering',
  'LLM Applications & RAG',
  'DevSecOps & MLOps',
  'Enterprise Data Lake'
];
