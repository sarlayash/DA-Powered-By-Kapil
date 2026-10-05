import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { badgesList } from '../data/badgesData';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithGoogle: (email?: string, name?: string) => void;
  loginAsDemoUser: () => void;
  logout: () => void;
  resetToZero: () => void;
  markModuleComplete: (moduleId: number, codeUsed?: string) => void;
  toggleBookmark: (moduleId: number) => void;
  isModuleCompleted: (moduleId: number) => boolean;
  isModuleBookmarked: (moduleId: number) => boolean;
  totalModulesCount: number;
  completionPercentage: number;
  earnedBadgesCount: number;
  triggerCelebration: () => void;
  setAllCompletedForDemo: () => void;
}

const STORAGE_KEY = 'kapil_analytics_learner_progress_v4';

// Real authentic learner starting from ZERO on Day 1
export const FRESH_LEARNER_PROFILE: UserProfile = {
  id: 'usr-kapil-learner',
  email: 'kapilnarula27july@gmail.com',
  name: 'Kapil Narula',
  avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Kapil+Narula&backgroundColor=090a0f&textColor=d4af37',
  isDemoUser: false,
  completedModuleIds: [], // Strictly 0 completed modules
  earnedBadgeIds: [],     // Strictly 0 badges earned
  bookmarkedModuleIds: [],// Strictly 0 bookmarks
  joinedDate: new Date().toISOString().split('T')[0],
  lastActive: new Date().toISOString().split('T')[0],
  codeSubmissions: {}
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.completedModuleIds)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored user profile:', e);
    }
    // Learner starts cleanly from zero on Day 1
    return FRESH_LEARNER_PROFILE;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF6D1', '#AA8323', '#FFFFFF']
      });
    } catch {
      // Fallback if canvas is unavailable
    }
  };

  const loginWithGoogle = (customEmail?: string, customName?: string) => {
    const email = customEmail || 'kapilnarula27july@gmail.com';
    const name = customName || 'Kapil Narula';
    const newUser: UserProfile = {
      id: `usr-google-${Date.now()}`,
      email,
      name,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=090a0f&textColor=d4af37`,
      isDemoUser: false,
      completedModuleIds: [],
      earnedBadgeIds: [],
      bookmarkedModuleIds: [],
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      codeSubmissions: {}
    };
    setUser(newUser);
    triggerCelebration();
  };

  const loginAsDemoUser = () => {
    setUser({
      ...FRESH_LEARNER_PROFILE,
      id: 'usr-demo-kapil',
      name: 'Kapil Narula',
      email: 'kapilnarula27july@gmail.com',
      isDemoUser: true,
      completedModuleIds: [],
      earnedBadgeIds: [],
      bookmarkedModuleIds: []
    });
    triggerCelebration();
  };

  const resetToZero = () => {
    setUser(prev => ({
      id: prev?.id || FRESH_LEARNER_PROFILE.id,
      email: prev?.email || FRESH_LEARNER_PROFILE.email,
      name: prev?.name || FRESH_LEARNER_PROFILE.name,
      avatarUrl: prev?.avatarUrl || FRESH_LEARNER_PROFILE.avatarUrl,
      isDemoUser: prev?.isDemoUser || false,
      completedModuleIds: [],
      earnedBadgeIds: [],
      bookmarkedModuleIds: [],
      joinedDate: prev?.joinedDate || new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      codeSubmissions: {}
    }));
  };

  const logout = () => {
    setUser(null);
  };

  const checkBadgeUnlocks = (completedIds: number[]): string[] => {
    const unlocked: string[] = [];
    badgesList.forEach(badge => {
      let isEligible = false;
      if (badge.requiredModuleIds && badge.requiredModuleIds.length > 0) {
        isEligible = badge.requiredModuleIds.every(id => completedIds.includes(id));
      } else if (badge.requiredModuleCount) {
        isEligible = completedIds.length >= badge.requiredModuleCount;
      }
      if (isEligible) {
        unlocked.push(badge.id);
      }
    });
    return unlocked;
  };

  const markModuleComplete = (moduleId: number, codeUsed?: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const alreadyDone = prev.completedModuleIds.includes(moduleId);
      const newCompleted = alreadyDone
        ? prev.completedModuleIds.filter(id => id !== moduleId)
        : [...prev.completedModuleIds, moduleId];

      const newBadges = checkBadgeUnlocks(newCompleted);

      if (!alreadyDone) {
        triggerCelebration();
      }

      return {
        ...prev,
        completedModuleIds: newCompleted,
        earnedBadgeIds: Array.from(new Set([...prev.earnedBadgeIds, ...newBadges])),
        codeSubmissions: codeUsed
          ? { ...prev.codeSubmissions, [moduleId]: codeUsed }
          : prev.codeSubmissions,
        lastActive: new Date().toISOString().split('T')[0]
      };
    });
  };

  const setAllCompletedForDemo = () => {
    if (!user) return;
    const all87Ids = Array.from({ length: 87 }, (_, i) => i + 1);
    const allBadges = badgesList.map(b => b.id);
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        completedModuleIds: all87Ids,
        earnedBadgeIds: allBadges
      };
    });
    triggerCelebration();
  };

  const toggleBookmark = (moduleId: number) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.bookmarkedModuleIds.includes(moduleId);
      const updated = exists
        ? prev.bookmarkedModuleIds.filter(id => id !== moduleId)
        : [...prev.bookmarkedModuleIds, moduleId];
      return {
        ...prev,
        bookmarkedModuleIds: updated
      };
    });
  };

  const isModuleCompleted = (moduleId: number): boolean => {
    return Boolean(user?.completedModuleIds.includes(moduleId));
  };

  const isModuleBookmarked = (moduleId: number): boolean => {
    return Boolean(user?.bookmarkedModuleIds.includes(moduleId));
  };

  const totalModulesCount = 87;
  const completedCount = user?.completedModuleIds.length || 0;
  const completionPercentage = Math.round((completedCount / totalModulesCount) * 100);
  const earnedBadgesCount = user?.earnedBadgeIds.length || 0;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginAsDemoUser,
        logout,
        resetToZero,
        markModuleComplete,
        toggleBookmark,
        isModuleCompleted,
        isModuleBookmarked,
        totalModulesCount,
        completionPercentage,
        earnedBadgesCount,
        triggerCelebration,
        setAllCompletedForDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
