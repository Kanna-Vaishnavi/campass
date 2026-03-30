import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, AssessmentScores, PlacementPrediction, UserType } from '@/types/user';

interface UserContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  userType: UserType;
  setUserType: (type: UserType) => void;
  profile: Partial<UserProfile>;
  updateProfile: (data: Partial<UserProfile>) => void;
  assessmentScores: AssessmentScores;
  updateAssessmentScores: (scores: Partial<AssessmentScores>) => void;
  prediction: PlacementPrediction | null;
  setPrediction: (prediction: PlacementPrediction) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completedSteps: number[];
  markStepComplete: (step: number) => void;
  resetAll: () => void;
}

const defaultAssessmentScores: AssessmentScores = {
  aptitude: 0,
  coding: 0,
  communication: 0,
  analytical: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [assessmentScores, setAssessmentScores] = useState<AssessmentScores>(defaultAssessmentScores);
  const [prediction, setPrediction] = useState<PlacementPrediction | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const updateAssessmentScores = (scores: Partial<AssessmentScores>) => {
    setAssessmentScores(prev => ({ ...prev, ...scores }));
  };

  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => [...new Set([...prev, step])]);
  };

  const resetAll = () => {
    setUserType(null);
    setProfile({});
    setAssessmentScores(defaultAssessmentScores);
    setPrediction(null);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userType,
        setUserType,
        profile,
        updateProfile,
        assessmentScores,
        updateAssessmentScores,
        prediction,
        setPrediction,
        currentStep,
        setCurrentStep,
        completedSteps,
        markStepComplete,
        resetAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
