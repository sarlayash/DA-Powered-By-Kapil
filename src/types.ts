/**
 * Types for Kapil Analytics & AI Masterclass Learning Platform
 * Powered By Kapil
 */

export type WeekType = 'Week 1' | 'Week 2' | 'Week 3' | 'Specialization';

export type LabType = 'python' | 'sql' | 'prompt' | 'pipeline' | 'optimization' | 'design';

export interface ModuleItem {
  id: number;
  week: WeekType;
  day: string;
  title: string;
  details: string;
  durationMins: number;
  category: string;
  isVirtualOnly?: boolean;
  
  // 10% Theory
  theory: {
    overview: string;
    keyConcepts: string[];
    industryRelevance: string;
    architectureOrRule?: string;
  };

  // 90% Hands-On
  handsOn: {
    title: string;
    type: LabType;
    scenario: string;
    datasetDescription?: string;
    sampleData?: Record<string, unknown>[];
    starterCode: string;
    solutionCode: string;
    hints: string[];
    validationCriteria: string[];
    expectedOutcome: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  isDemoUser: boolean;
  completedModuleIds: number[];
  earnedBadgeIds: string[];
  bookmarkedModuleIds: number[];
  joinedDate: string;
  lastActive: string;
  codeSubmissions?: Record<number, string>;
}

export interface Badge {
  id: string;
  title: string;
  category: string;
  description: string;
  requiredModuleCount?: number;
  requiredModuleIds?: number[];
  iconType: 'python' | 'sql' | 'ml' | 'deeplearning' | 'genai' | 'optimization' | 'dataengineering' | 'master';
  goldLevel: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
}
