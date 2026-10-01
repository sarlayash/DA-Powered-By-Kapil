import { Badge } from '../types';

export const badgesList: Badge[] = [
  {
    id: 'badge-python-ai',
    title: 'Python AI Copilot Practitioner',
    category: 'Python & AI Coding',
    description: 'Demonstrated mastery of AI-assisted Python programming, EDA with Pandas, and automated data profiling pipelines.',
    requiredModuleCount: 5,
    requiredModuleIds: [1, 6, 7, 8, 9],
    iconType: 'python',
    goldLevel: 'Gold'
  },
  {
    id: 'badge-sql-architect',
    title: 'Enterprise SQL & Query Maestro',
    category: 'SQL & Cloud',
    description: 'Built multi-stage CTE analytical queries, window functions, and AI-assisted performance tuning for cloud data warehouses.',
    requiredModuleCount: 4,
    requiredModuleIds: [14, 15, 16],
    iconType: 'sql',
    goldLevel: 'Gold'
  },
  {
    id: 'badge-ml-ensemble',
    title: 'Predictive ML & Ensemble Specialist',
    category: 'Supervised ML',
    description: 'Engineered robust Decision Tree, Random Forest, and XGBoost gradient boosting pipelines with cross-validation.',
    requiredModuleCount: 6,
    requiredModuleIds: [11, 21, 22, 25, 26, 27],
    iconType: 'ml',
    goldLevel: 'Diamond'
  },
  {
    id: 'badge-deeplearning-cv',
    title: 'Neural Networks & Computer Vision Expert',
    category: 'Deep Learning & Vision',
    description: 'Designed forward/backward propagation perceptrons, CNN filter kernels, and transfer learning image classifiers.',
    requiredModuleCount: 5,
    requiredModuleIds: [28, 38, 39, 40, 41],
    iconType: 'deeplearning',
    goldLevel: 'Diamond'
  },
  {
    id: 'badge-genai-agentic',
    title: 'Industrial GenAI & Agentic Architect',
    category: 'NLP & GenAI',
    description: 'Architected enterprise RAG pipelines, Chain-of-Thought prompts, and autonomous multi-agent industrial workflows with HITL safeguards.',
    requiredModuleCount: 6,
    requiredModuleIds: [44, 47, 48, 72, 73, 74],
    iconType: 'genai',
    goldLevel: 'Diamond'
  },
  {
    id: 'badge-optimization-ops',
    title: 'Mathematical Optimization Solver',
    category: 'Mathematical Optimization',
    description: 'Formulated and solved LP, MIP, and blackbox surrogate optimization models for production and logistics using PuLP and SciPy.',
    requiredModuleCount: 5,
    requiredModuleIds: [57, 58, 59, 60, 61],
    iconType: 'optimization',
    goldLevel: 'Gold'
  },
  {
    id: 'badge-data-lake-titan',
    title: 'Enterprise Data Lake & Pipeline Titan',
    category: 'Enterprise Data Lake',
    description: 'Engineered Medallion Architecture (Bronze/Silver/Gold) Lakehouses, Parquet columnar optimization, and data governance policies.',
    requiredModuleCount: 5,
    requiredModuleIds: [68, 83, 84, 85, 86, 87],
    iconType: 'dataengineering',
    goldLevel: 'Diamond'
  },
  {
    id: 'badge-executive-master',
    title: 'Executive Analytics Master',
    category: 'Executive Capstone',
    description: 'Highest distinction awarded for cross-disciplinary mastery across all 87 modules of the Kapil Analytics Institute curriculum.',
    requiredModuleCount: 20,
    iconType: 'master',
    goldLevel: 'Diamond'
  }
];
