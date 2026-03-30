import React from 'react';
import { useUser } from '@/context/UserContext';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { UserTypeSelection } from '@/components/home/UserTypeSelection';
import { ProfileForm } from '@/components/home/ProfileForm';
import { SkillAssessment } from '@/components/home/SkillAssessment';
import { ResultsDashboard } from '@/components/home/ResultsDashboard';
import { StepIndicator } from '@/components/ui/step-indicator';

const steps = [
  { title: 'User Type', description: 'Select your profile' },
  { title: 'Profile', description: 'Academic details' },
  { title: 'Assessment', description: 'Skill evaluation' },
  { title: 'Results', description: 'Your prediction' },
];

const Index = () => {
  const { currentStep, setCurrentStep, completedSteps, userType } = useUser();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <HeroSection />
            <UserTypeSelection />
          </>
        );
      case 1:
        return <ProfileForm />;
      case 2:
        return <SkillAssessment />;
      case 3:
        return <ResultsDashboard />;
      default:
        return <UserTypeSelection />;
    }
  };

  return (
    <Layout>
      {currentStep > 0 && (
        <div className="max-w-3xl mx-auto mb-8">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>
      )}
      {renderStep()}
    </Layout>
  );
};

export default Index;
