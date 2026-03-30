export type UserType = 'fresher' | 'non-fresher' | null;

export type ReadinessLevel = 'high' | 'moderate' | 'needs-improvement';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type ExamLevel = 'basic' | 'gate' | 'cat';

export interface UserProfile {
  // Auth fields
  fullName?: string;
  email?: string;
  phone?: string;
  // Profile fields
  userType: UserType;
  academicYear?: string;
  degree?: string;
  branch?: string;
  cgpa?: number;
  areasOfInterest?: string[];
  preferredJobRoles?: string[];
  targetCompanies?: string[];
  // Non-fresher specific
  internships?: number;
  technicalSkills?: string[];
  projects?: string[];
  workExperience?: string;
}

export interface AssessmentScores {
  aptitude: number;
  coding: number;
  communication: number;
  analytical: number; // Replaces collaboration - for stoichiometric/psychological
  // Performance tracking
  gatePerformance?: number;
  catPerformance?: number;
  difficultyBreakdown?: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: DifficultyLevel;
  examLevel: ExamLevel;
  category?: string;
  explanation?: string;
}

export interface AssessmentModule {
  title: string;
  icon: string;
  description: string;
  questions: Question[];
}

export interface PlacementPrediction {
  probability: number;
  readinessLevel: ReadinessLevel;
  strengths: string[];
  improvements: string[];
  recommendedRoles: string[];
  companyTypes: string[];
  expectedPackageRange: { min: number; max: number };
  learningPaths: LearningPath[];
  gateReadiness?: 'high' | 'moderate' | 'low';
  catReadiness?: 'high' | 'moderate' | 'low';
  suggestedExams?: string[];
}

export interface LearningPath {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  resources: Resource[];
}

export interface Resource {
  title: string;
  type: 'course' | 'certification' | 'workshop' | 'tutorial';
  platform: string;
  url: string;
  isPaid: boolean;
  duration: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  type: 'product' | 'service' | 'startup';
  averagePackage: number;
  eligibilityCriteria: string;
  hiringPeriod: string;
  skills: string[];
  description: string;
}

export interface DailyChallenge {
  id: string;
  type: 'aptitude' | 'coding' | 'communication' | 'analytical';
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  points: number;
  completed: boolean;
}

// Interest to Role Mapping
export interface InterestRoleMapping {
  interest: string;
  roles: string[];
  requiredSkills: string[];
  gateRoles?: string[];
  catRoles?: string[];
}
