
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import RoleDashboard from '@/components/RoleDashboard';
import BlockchainDashboard from '@/components/BlockchainDashboard';
import SmartContractVisualization from '@/components/SmartContractVisualization';
import ImpactSection from '@/components/ImpactSection';
import SecuritySection from '@/components/SecuritySection';
import Footer from '@/components/Footer';
import GovernmentProfileModal from '@/components/GovernmentProfileModal';
import ProducerProfileModal from '@/components/ProducerProfileModal';
import AuditorProfileModal from '@/components/AuditorProfileModal';
import BankProfileModal from '@/components/BankProfileModal';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { currentUser, showProfileModal, setShowProfileModal, completeProfile } = useAuth();

  // Debug logging
  React.useEffect(() => {
    console.log('🏠 Index component - currentUser:', currentUser);
    console.log('📋 Index component - showProfileModal:', showProfileModal);
  }, [currentUser, showProfileModal]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {currentUser ? (
          // Show dashboard first, then other sections for authenticated users
          <>
            <div id="dashboard">
              <RoleDashboard />
            </div>
            <div id="blockchain">
              <BlockchainDashboard />
            </div>
            <div id="smart-contracts">
              <SmartContractVisualization />
            </div>
            <div id="impact">
              <ImpactSection />
            </div>
            <div id="security">
              <SecuritySection />
            </div>
          </>
        ) : (
          // Show landing page for non-authenticated users
          <>
            <div id="home">
              <HeroSection />
            </div>
            <div id="blockchain">
              <BlockchainDashboard />
            </div>
            <div id="smart-contracts">
              <SmartContractVisualization />
            </div>
            <div id="impact">
              <ImpactSection />
            </div>
            <div id="security">
              <SecuritySection />
            </div>
          </>
        )}
      </main>
      <Footer />
      
      {/* Profile Completion Modals */}
      {currentUser && showProfileModal && (
        <>
          {currentUser.role === 'government' && (
            <GovernmentProfileModal
              isOpen={showProfileModal}
              onClose={() => setShowProfileModal(false)}
              onComplete={completeProfile}
              user={currentUser}
            />
          )}
          {currentUser.role === 'producer' && (
            <ProducerProfileModal
              isOpen={showProfileModal}
              onClose={() => setShowProfileModal(false)}
              onComplete={completeProfile}
              user={currentUser}
            />
          )}
          {currentUser.role === 'auditor' && (
            <AuditorProfileModal
              isOpen={showProfileModal}
              onClose={() => setShowProfileModal(false)}
              onComplete={completeProfile}
              user={currentUser}
            />
          )}
          {currentUser.role === 'bank' && (
            <BankProfileModal
              isOpen={showProfileModal}
              onClose={() => setShowProfileModal(false)}
              onComplete={completeProfile}
              user={currentUser}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Index;
