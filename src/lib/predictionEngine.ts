import { UserProfile, AssessmentScores, PlacementPrediction, ReadinessLevel, LearningPath, Resource } from '@/types/user';

const skillResources: Record<string, Resource[]> = {
  'Data Structures': [
    { title: 'DSA Masterclass', type: 'course', platform: 'Coursera', url: '#', isPaid: false, duration: '40 hours' },
    { title: 'LeetCode Premium', type: 'tutorial', platform: 'LeetCode', url: '#', isPaid: true, duration: 'Self-paced' },
  ],
  'System Design': [
    { title: 'System Design Primer', type: 'course', platform: 'YouTube', url: '#', isPaid: false, duration: '20 hours' },
    { title: 'Designing Data-Intensive Apps', type: 'tutorial', platform: 'Book', url: '#', isPaid: true, duration: '30 hours' },
  ],
  'Communication': [
    { title: 'Business Communication', type: 'course', platform: 'LinkedIn Learning', url: '#', isPaid: true, duration: '10 hours' },
    { title: 'Public Speaking Workshop', type: 'workshop', platform: 'Toastmasters', url: '#', isPaid: false, duration: '8 hours' },
  ],
  'Machine Learning': [
    { title: 'ML Specialization', type: 'certification', platform: 'Coursera', url: '#', isPaid: true, duration: '60 hours' },
    { title: 'Fast.ai Course', type: 'course', platform: 'Fast.ai', url: '#', isPaid: false, duration: '40 hours' },
  ],
  'Cloud Computing': [
    { title: 'AWS Solutions Architect', type: 'certification', platform: 'AWS', url: '#', isPaid: true, duration: '50 hours' },
    { title: 'GCP Fundamentals', type: 'course', platform: 'Google Cloud', url: '#', isPaid: false, duration: '20 hours' },
  ],
};

export function calculatePlacementProbability(
  profile: UserProfile,
  scores: AssessmentScores
): PlacementPrediction {
  // Base score from CGPA (max 25 points)
  let baseScore = Math.min(profile.cgpa / 10 * 25, 25);

  // Assessment scores (max 40 points - 10 each)
  const assessmentScore = (
    (scores.aptitude / 100) * 10 +
    (scores.coding / 100) * 10 +
    (scores.communication / 100) * 10 +
    (scores.analytical / 100) * 10
  );

  // Experience bonus for non-freshers (max 20 points)
  let experienceScore = 0;
  if (profile.userType === 'non-fresher') {
    experienceScore += Math.min((profile.internships || 0) * 5, 10);
    experienceScore += Math.min((profile.projects?.length || 0) * 2, 5);
    experienceScore += Math.min((profile.technicalSkills?.length || 0) * 0.5, 5);
  }

  // Interest alignment bonus (max 15 points)
  const interestScore = Math.min(profile.areasOfInterest.length * 3, 15);

  // Calculate total probability
  const totalScore = baseScore + assessmentScore + experienceScore + interestScore;
  const probability = Math.min(Math.round(totalScore), 100);

  // Determine readiness level
  let readinessLevel: ReadinessLevel;
  if (probability >= 75) {
    readinessLevel = 'high';
  } else if (probability >= 50) {
    readinessLevel = 'moderate';
  } else {
    readinessLevel = 'needs-improvement';
  }

  // Identify strengths and improvements
  const strengths: string[] = [];
  const improvements: string[] = [];
  const learningPaths: LearningPath[] = [];

  if (profile.cgpa >= 8) strengths.push('Strong academic performance');
  else improvements.push('Academic performance');

  if (scores.aptitude >= 70) strengths.push('Good aptitude skills');
  else {
    improvements.push('Aptitude skills');
    learningPaths.push({
      skill: 'Aptitude',
      priority: 'high',
      resources: [
        { title: 'Aptitude Mastery', type: 'course', platform: 'IndiaBix', url: '#', isPaid: false, duration: '15 hours' },
      ],
    });
  }

  if (scores.coding >= 70) strengths.push('Strong coding abilities');
  else {
    improvements.push('Coding skills');
    learningPaths.push({
      skill: 'Data Structures',
      priority: 'high',
      resources: skillResources['Data Structures'],
    });
  }

  if (scores.communication >= 70) strengths.push('Excellent communication');
  else {
    improvements.push('Communication skills');
    learningPaths.push({
      skill: 'Communication',
      priority: 'medium',
      resources: skillResources['Communication'],
    });
  }

  if (profile.userType === 'non-fresher' && (profile.internships || 0) >= 2) {
    strengths.push('Valuable internship experience');
  }

  // Recommend roles based on interests with GATE/CAT specific roles
  const roleMapping: Record<string, { standard: string[]; gate: string[]; cat: string[] }> = {
    'Web Development': { 
      standard: ['Full Stack Developer', 'Frontend Engineer', 'Backend Developer'],
      gate: ['Software Engineer - Product', 'Technical Lead'],
      cat: ['Product Manager', 'Technical Program Manager']
    },
    'Data Science': { 
      standard: ['Data Analyst', 'Data Scientist', 'ML Engineer'],
      gate: ['Research Scientist', 'Algorithm Developer'],
      cat: ['Business Analyst', 'Analytics Manager']
    },
    'Data Analysis': { 
      standard: ['Data Analyst', 'Business Intelligence Analyst'],
      gate: ['Quantitative Analyst', 'Operations Research Analyst'],
      cat: ['Business Analyst', 'Management Consultant']
    },
    'Mobile Development': { 
      standard: ['Android Developer', 'iOS Developer', 'React Native Developer'],
      gate: ['Mobile Architect', 'Platform Engineer'],
      cat: ['Product Manager - Mobile', 'Technical PM']
    },
    'Cloud Computing': { 
      standard: ['Cloud Engineer', 'DevOps Engineer', 'SRE'],
      gate: ['Cloud Architect', 'Infrastructure Engineer - PSU'],
      cat: ['Cloud Solutions Manager', 'Technical Account Manager']
    },
    'Cybersecurity': { 
      standard: ['Security Analyst', 'Penetration Tester', 'Security Engineer'],
      gate: ['Security Researcher', 'Cryptography Engineer'],
      cat: ['Security Consultant', 'Risk Manager']
    },
    'AI/ML': { 
      standard: ['ML Engineer', 'AI Developer', 'NLP Engineer'],
      gate: ['AI Researcher', 'Deep Learning Engineer - Research'],
      cat: ['AI Product Manager', 'ML Strategy Consultant']
    },
    'Core Engineering': {
      standard: ['Design Engineer', 'Process Engineer'],
      gate: ['PSU Technical Officer', 'Research Engineer', 'Core Domain Specialist'],
      cat: ['Operations Manager', 'Technical Consultant']
    },
    'Management': {
      standard: ['Associate Consultant', 'Operations Associate'],
      gate: ['Technical Manager'],
      cat: ['Management Trainee', 'Strategy Consultant', 'MBA-oriented Roles']
    },
    'Research': {
      standard: ['Research Assistant', 'Junior Researcher'],
      gate: ['Research Scientist', 'PhD Candidate', 'Lab Engineer'],
      cat: ['Research Analyst', 'Market Research Manager']
    },
  };

  // Determine GATE/CAT performance levels
  const gatePerformance = scores.gatePerformance || 0;
  const catPerformance = scores.catPerformance || 0;
  const isGateReady = gatePerformance >= 60;
  const isCatReady = catPerformance >= 60;

  const recommendedRoles: string[] = [];
  profile.areasOfInterest.forEach(interest => {
    const mapping = roleMapping[interest];
    if (mapping) {
      recommendedRoles.push(...mapping.standard.slice(0, 1));
      if (isGateReady) recommendedRoles.push(...mapping.gate.slice(0, 1));
      if (isCatReady) recommendedRoles.push(...mapping.cat.slice(0, 1));
    }
  });

  if (recommendedRoles.length === 0) {
    recommendedRoles.push('Software Engineer', 'Technical Analyst', 'Associate Developer');
    if (isGateReady) recommendedRoles.push('PSU Technical Officer', 'Research Engineer');
    if (isCatReady) recommendedRoles.push('Management Trainee', 'Business Analyst');
  }

  // Determine company types and package range
  let companyTypes: string[] = [];
  let packageRange = { min: 0, max: 0 };

  if (probability >= 75) {
    companyTypes = ['Product Companies', 'Top MNCs', 'Unicorn Startups'];
    packageRange = { min: 12, max: 30 };
  } else if (probability >= 50) {
    companyTypes = ['Service Companies', 'Mid-size Companies', 'Growing Startups'];
    packageRange = { min: 6, max: 15 };
  } else {
    companyTypes = ['Service Companies', 'Entry-level Positions', 'Internships'];
    packageRange = { min: 3, max: 8 };
  }

  // Add trending skills to learning paths
  const trendingSkills = ['System Design', 'Cloud Computing', 'Machine Learning'];
  trendingSkills.forEach(skill => {
    if (!learningPaths.find(lp => lp.skill === skill) && skillResources[skill]) {
      learningPaths.push({
        skill,
        priority: 'medium',
        resources: skillResources[skill],
      });
    }
  });

  return {
    probability,
    readinessLevel,
    strengths: strengths.slice(0, 5),
    improvements: improvements.slice(0, 5),
    recommendedRoles: [...new Set(recommendedRoles)].slice(0, 5),
    companyTypes,
    expectedPackageRange: packageRange,
    learningPaths: learningPaths.slice(0, 5),
  };
}

export function getCompanyRecommendations(prediction: PlacementPrediction): string[] {
  const companies: Record<ReadinessLevel, string[]> = {
    'high': ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Goldman Sachs', 'Morgan Stanley'],
    'moderate': ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'Capgemini', 'Tech Mahindra'],
    'needs-improvement': ['Startups', 'Local IT Companies', 'Internship Programs'],
  };

  return companies[prediction.readinessLevel];
}

export function getInterviewStrategy(prediction: PlacementPrediction): string[] {
  if (prediction.readinessLevel === 'high') {
    return [
      'Focus on system design and scalability questions',
      'Practice behavioral interviews with STAR method',
      'Prepare for competitive coding rounds',
      'Research company-specific interview patterns',
      'Mock interviews with industry professionals',
    ];
  } else if (prediction.readinessLevel === 'moderate') {
    return [
      'Strengthen fundamentals in DSA',
      'Practice aptitude questions daily',
      'Improve problem-solving speed',
      'Work on communication clarity',
      'Build at least 2-3 strong projects',
    ];
  } else {
    return [
      'Focus on basic programming concepts',
      'Complete foundational courses',
      'Start with easy coding problems',
      'Join study groups for motivation',
      'Consider internship opportunities first',
    ];
  }
}
