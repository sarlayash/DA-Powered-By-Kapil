import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { allModules } from './data/modulesData';
import { WeekType } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { ModuleList } from './components/ModuleList';
import { LabEnvironment } from './components/LabEnvironment';
import { CertificateView } from './components/CertificateView';
import { BadgesModal } from './components/BadgesModal';
import { AuthModal } from './components/AuthModal';
import { InteractivePlayground } from './components/InteractivePlayground';

function MainApp() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'modules' | 'playground' | 'badges' | 'certificate'>('dashboard');
  const [selectedWeek, setSelectedWeek] = useState<WeekType | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState<boolean>(false);

  // Handle module selection
  const handleSelectModule = (id: number) => {
    setSelectedModuleId(id);
    setActiveTab('modules');
  };

  const handleOpenWeek = (week: WeekType) => {
    setSelectedWeek(week);
    setSelectedModuleId(null);
    setActiveTab('modules');
  };

  // Find active module if selected
  const activeModule = selectedModuleId ? allModules.find(m => m.id === selectedModuleId) : null;
  const currentIdx = activeModule ? allModules.findIndex(m => m.id === activeModule.id) : -1;
  const hasNext = currentIdx !== -1 && currentIdx < allModules.length - 1;
  const hasPrev = currentIdx > 0;

  const handleNextModule = () => {
    if (hasNext) {
      setSelectedModuleId(allModules[currentIdx + 1].id);
    }
  };

  const handlePrevModule = () => {
    if (hasPrev) {
      setSelectedModuleId(allModules[currentIdx - 1].id);
    }
  };

  // Filter modules based on filterStatus
  const filteredModulesByStatus = allModules.filter(m => {
    if (filterStatus === 'completed') {
      return Boolean(user?.completedModuleIds.includes(m.id));
    }
    if (filterStatus === 'in-progress') {
      return !user?.completedModuleIds.includes(m.id);
    }
    if (filterStatus === 'bookmarked') {
      return Boolean(user?.bookmarkedModuleIds.includes(m.id));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#FFF6D1]">
      {/* Top Header */}
      <Header
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenBadges={() => setIsBadgesModalOpen(true)}
        onOpenCertificate={() => {
          setSelectedModuleId(null);
          setActiveTab('certificate');
        }}
      />

      {/* Main Layout with Left Navigation Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={tab => {
            setActiveTab(tab);
            if (tab !== 'modules') {
              setSelectedModuleId(null);
            }
          }}
          selectedWeek={selectedWeek}
          setSelectedWeek={week => {
            setSelectedWeek(week);
            setSelectedModuleId(null);
          }}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedModuleId={selectedModuleId}
          onSelectModule={handleSelectModule}
        />

        {/* Dynamic Center Canvas */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              onSelectModule={handleSelectModule}
              onOpenWeek={handleOpenWeek}
              onOpenPlayground={() => {
                setSelectedModuleId(null);
                setActiveTab('playground');
              }}
              onOpenBadges={() => setIsBadgesModalOpen(true)}
              onOpenCertificate={() => {
                setSelectedModuleId(null);
                setActiveTab('certificate');
              }}
            />
          )}

          {activeTab === 'modules' && (
            <>
              {activeModule ? (
                <LabEnvironment
                  module={activeModule}
                  onNextModule={handleNextModule}
                  onPrevModule={handlePrevModule}
                  hasNext={hasNext}
                  hasPrev={hasPrev}
                />
              ) : (
                <ModuleList
                  modules={filteredModulesByStatus}
                  onSelectModule={handleSelectModule}
                  selectedWeek={selectedWeek}
                  setSelectedWeek={setSelectedWeek}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}
            </>
          )}

          {activeTab === 'playground' && <InteractivePlayground />}

          {activeTab === 'badges' && (
            <div className="flex-1 p-6 lg:p-10">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between border-b border-[#2A261A] pb-4">
                  <div>
                    <h1 className="text-2xl font-bold font-luxury text-white">Curriculum Competency Badges</h1>
                    <p className="text-xs text-slate-400 mt-1">Download and share your accredited gold medallions in High-Res PNG or Vector PDF.</p>
                  </div>
                  <button
                    onClick={() => setIsBadgesModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-xs font-bold hover:brightness-110 cursor-pointer shadow"
                  >
                    Open Full Badges Deck
                  </button>
                </div>
                {/* Embedded Badges view */}
                <div className="text-slate-400 text-xs">
                  Click 'Open Full Badges Deck' or select any badge to download your verified PNG and PDF files.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificate' && <CertificateView />}

          {/* Proper Bottom Footer with Powered By Kapil */}
          <Footer
            onOpenCertificate={() => {
              setSelectedModuleId(null);
              setActiveTab('certificate');
            }}
            onOpenBadges={() => setIsBadgesModalOpen(true)}
          />
        </main>
      </div>

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
