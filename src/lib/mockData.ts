import { Company, DailyChallenge } from '@/types/user';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Google',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    type: 'product',
    averagePackage: 25,
    eligibilityCriteria: 'CGPA >= 7.0, No active backlogs',
    hiringPeriod: 'August - September',
    skills: ['DSA', 'System Design', 'Problem Solving', 'Communication'],
    description: 'Global technology leader known for innovation and employee culture.',
  },
  {
    id: '2',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png',
    type: 'product',
    averagePackage: 22,
    eligibilityCriteria: 'CGPA >= 7.5, Strong coding skills',
    hiringPeriod: 'July - August',
    skills: ['C++', 'Azure', 'Data Structures', 'Cloud Computing'],
    description: 'Leading enterprise software and cloud computing company.',
  },
  {
    id: '3',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png',
    type: 'product',
    averagePackage: 28,
    eligibilityCriteria: 'CGPA >= 6.5, Leadership principles',
    hiringPeriod: 'September - October',
    skills: ['AWS', 'Distributed Systems', 'Leadership', 'Problem Solving'],
    description: 'E-commerce and cloud computing giant with focus on customer obsession.',
  },
  {
    id: '4',
    name: 'TCS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/512px-Tata_Consultancy_Services_Logo.svg.png',
    type: 'service',
    averagePackage: 7,
    eligibilityCriteria: 'CGPA >= 6.0, No backlogs',
    hiringPeriod: 'Year-round',
    skills: ['Java', 'Python', 'Communication', 'Teamwork'],
    description: 'Largest IT services company in India with global presence.',
  },
  {
    id: '5',
    name: 'Infosys',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/512px-Infosys_logo.svg.png',
    type: 'service',
    averagePackage: 6.5,
    eligibilityCriteria: 'CGPA >= 6.0, Good aptitude',
    hiringPeriod: 'Year-round',
    skills: ['Programming', 'Aptitude', 'Communication', 'Adaptability'],
    description: 'Global leader in digital services and consulting.',
  },
  {
    id: '6',
    name: 'Flipkart',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flipkart_logo.svg/512px-Flipkart_logo.svg.png',
    type: 'startup',
    averagePackage: 18,
    eligibilityCriteria: 'CGPA >= 7.0, Strong problem solving',
    hiringPeriod: 'August - September',
    skills: ['DSA', 'System Design', 'JavaScript', 'React'],
    description: 'India\'s leading e-commerce marketplace.',
  },
];

export interface CompanyInsight {
  id: string;
  name: string;
  type: 'product' | 'service' | 'startup';
  description: string;
  averagePackage: number;
  eligibilityCriteria: string;
  hiringPeriod: string;
  skills: string[];
  interviewProcess: {
    rounds: string[];
    duration: string;
    tips: string[];
  };
  hiringTrends: {
    year: number;
    hired: number;
    growth: string;
  }[];
  roles: {
    title: string;
    package: string;
    openings: number;
  }[];
  culture: string[];
  benefits: string[];
  locations: string[];
  website: string;
}

export const companyInsights: CompanyInsight[] = [
  {
    id: '1',
    name: 'Google',
    type: 'product',
    description: 'Google is a multinational technology company specializing in Internet-related services and products. Known for its innovative culture, excellent work-life balance, and industry-leading compensation packages.',
    averagePackage: 25,
    eligibilityCriteria: 'CGPA >= 7.0, No active backlogs, Strong problem-solving skills',
    hiringPeriod: 'August - September',
    skills: ['DSA', 'System Design', 'Problem Solving', 'Communication', 'Python', 'Java', 'C++'],
    interviewProcess: {
      rounds: ['Online Assessment (2 coding problems)', 'Phone Screen (45 mins coding)', 'Virtual Onsite (4-5 rounds)', 'Team Matching', 'Hiring Committee Review'],
      duration: '4-6 weeks',
      tips: ['Practice LeetCode medium/hard problems', 'Focus on time & space complexity', 'Prepare for behavioral questions using STAR method', 'Study system design fundamentals']
    },
    hiringTrends: [
      { year: 2024, hired: 150, growth: '+12%' },
      { year: 2023, hired: 134, growth: '+8%' },
      { year: 2022, hired: 124, growth: '+15%' }
    ],
    roles: [
      { title: 'Software Engineer L3', package: '₹22-28 LPA', openings: 50 },
      { title: 'Software Engineer L4', package: '₹35-45 LPA', openings: 25 },
      { title: 'Cloud Engineer', package: '₹20-26 LPA', openings: 30 }
    ],
    culture: ['Innovation-first mindset', '20% time for personal projects', 'Flat hierarchy', 'Psychological safety emphasized'],
    benefits: ['Health insurance', 'Free meals', 'Gym access', 'Learning budget ₹2L/year', 'Stock options', 'Parental leave 6 months'],
    locations: ['Bangalore', 'Hyderabad', 'Gurgaon', 'Mumbai'],
    website: 'https://careers.google.com'
  },
  {
    id: '2',
    name: 'Microsoft',
    type: 'product',
    description: 'Microsoft Corporation develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services. Known for Azure cloud services and developer tools.',
    averagePackage: 22,
    eligibilityCriteria: 'CGPA >= 7.5, Strong coding skills, Good communication',
    hiringPeriod: 'July - August',
    skills: ['C++', 'Azure', 'Data Structures', 'Cloud Computing', '.NET', 'TypeScript'],
    interviewProcess: {
      rounds: ['Online Coding Test (3 problems)', 'Technical Phone Screen', 'Virtual Onsite (4 rounds)', 'As Appropriate Interview', 'HR Discussion'],
      duration: '3-5 weeks',
      tips: ['Strong fundamentals in OS and DBMS', 'Practice design patterns', 'Know Azure services basics', 'Prepare for behavioral scenarios']
    },
    hiringTrends: [
      { year: 2024, hired: 180, growth: '+15%' },
      { year: 2023, hired: 156, growth: '+10%' },
      { year: 2022, hired: 142, growth: '+18%' }
    ],
    roles: [
      { title: 'SDE 1', package: '₹18-24 LPA', openings: 80 },
      { title: 'SDE 2', package: '₹30-40 LPA', openings: 45 },
      { title: 'Program Manager', package: '₹20-28 LPA', openings: 20 }
    ],
    culture: ['Growth mindset', 'Diversity & Inclusion focus', 'Work-life balance', 'Continuous learning'],
    benefits: ['Comprehensive health coverage', 'Annual bonus', 'Stock grants', 'Wellness programs', 'Education assistance'],
    locations: ['Bangalore', 'Hyderabad', 'Noida', 'Pune'],
    website: 'https://careers.microsoft.com'
  },
  {
    id: '3',
    name: 'Amazon',
    type: 'product',
    description: 'Amazon is the world\'s largest e-commerce and cloud computing company. AWS (Amazon Web Services) leads the cloud market. Known for its customer obsession and leadership principles.',
    averagePackage: 28,
    eligibilityCriteria: 'CGPA >= 6.5, Leadership principles alignment, Problem-solving skills',
    hiringPeriod: 'September - October',
    skills: ['AWS', 'Distributed Systems', 'Leadership', 'Problem Solving', 'Java', 'Python'],
    interviewProcess: {
      rounds: ['Online Assessment (2 coding + Work Style Survey)', 'Phone Interview', 'Virtual Onsite (4-5 loops)', 'Bar Raiser Round', 'HR Discussion'],
      duration: '3-4 weeks',
      tips: ['Master all 16 Leadership Principles', 'Prepare STAR stories for each LP', 'Practice system design for scale', 'Focus on customer-centric solutions']
    },
    hiringTrends: [
      { year: 2024, hired: 200, growth: '+20%' },
      { year: 2023, hired: 167, growth: '+12%' },
      { year: 2022, hired: 149, growth: '+25%' }
    ],
    roles: [
      { title: 'SDE 1', package: '₹25-32 LPA', openings: 100 },
      { title: 'SDE 2', package: '₹40-55 LPA', openings: 50 },
      { title: 'Solutions Architect', package: '₹22-30 LPA', openings: 35 }
    ],
    culture: ['Customer obsession', 'Ownership mentality', 'Bias for action', 'High bar for hiring'],
    benefits: ['Relocation bonus', 'Sign-on bonus', 'RSUs vesting over 4 years', 'Career choice program', 'Health benefits'],
    locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR'],
    website: 'https://amazon.jobs'
  },
  {
    id: '4',
    name: 'TCS',
    type: 'service',
    description: 'Tata Consultancy Services is the largest IT services company in India and a leader in digital transformation. Offers excellent training programs for freshers and global exposure.',
    averagePackage: 7,
    eligibilityCriteria: 'CGPA >= 6.0, No backlogs, Communication skills',
    hiringPeriod: 'Year-round',
    skills: ['Java', 'Python', 'Communication', 'Teamwork', 'SQL', 'Agile'],
    interviewProcess: {
      rounds: ['TCS NQT (National Qualifier Test)', 'Technical Interview', 'Managerial Interview', 'HR Round'],
      duration: '2-4 weeks',
      tips: ['Clear TCS NQT with good percentile', 'Basic programming concepts', 'Communication skills matter', 'Know about TCS projects and clients']
    },
    hiringTrends: [
      { year: 2024, hired: 5000, growth: '+8%' },
      { year: 2023, hired: 4630, growth: '+5%' },
      { year: 2022, hired: 4410, growth: '+10%' }
    ],
    roles: [
      { title: 'Assistant System Engineer', package: '₹3.6 LPA', openings: 3000 },
      { title: 'Digital Specialist', package: '₹7-9 LPA', openings: 500 },
      { title: 'Ninja (TCS NQT)', package: '₹7 LPA', openings: 1500 }
    ],
    culture: ['Learning & development focus', 'Global exposure', 'Job security', 'Structured career path'],
    benefits: ['Training programs', 'Health insurance', 'Onsite opportunities', 'Internal mobility', 'ESOPs for senior roles'],
    locations: ['All major Indian cities', 'Global offices in 50+ countries'],
    website: 'https://www.tcs.com/careers'
  },
  {
    id: '5',
    name: 'Infosys',
    type: 'service',
    description: 'Infosys is a global leader in next-generation digital services and consulting. Known for its Infosys Springboard platform and InStep internship program.',
    averagePackage: 6.5,
    eligibilityCriteria: 'CGPA >= 6.0, Good aptitude, No backlogs',
    hiringPeriod: 'Year-round',
    skills: ['Programming', 'Aptitude', 'Communication', 'Adaptability', 'Java', 'Python'],
    interviewProcess: {
      rounds: ['InfyTQ Certification', 'Online Assessment', 'Technical Interview', 'HR Interview'],
      duration: '2-3 weeks',
      tips: ['Complete InfyTQ certification', 'Strong aptitude preparation', 'Basic programming knowledge', 'Good communication skills']
    },
    hiringTrends: [
      { year: 2024, hired: 4000, growth: '+6%' },
      { year: 2023, hired: 3774, growth: '+4%' },
      { year: 2022, hired: 3629, growth: '+12%' }
    ],
    roles: [
      { title: 'System Engineer', package: '₹3.6 LPA', openings: 2500 },
      { title: 'Specialist Programmer', package: '₹6.5-8 LPA', openings: 800 },
      { title: 'Digital Specialist', package: '₹8-10 LPA', openings: 400 }
    ],
    culture: ['Continuous learning', 'Innovation labs', 'Work-life balance', 'Diverse projects'],
    benefits: ['Infosys Springboard learning', 'Health benefits', 'Onsite opportunities', 'Performance bonus'],
    locations: ['Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Mysore'],
    website: 'https://www.infosys.com/careers'
  },
  {
    id: '6',
    name: 'Flipkart',
    type: 'startup',
    description: 'Flipkart is India\'s leading e-commerce marketplace, now a Walmart subsidiary. Known for solving complex problems at scale and a fast-paced engineering culture.',
    averagePackage: 18,
    eligibilityCriteria: 'CGPA >= 7.0, Strong problem solving, Coding proficiency',
    hiringPeriod: 'August - September',
    skills: ['DSA', 'System Design', 'JavaScript', 'React', 'Java', 'Microservices'],
    interviewProcess: {
      rounds: ['Online Coding Test', 'Machine Coding Round', 'Problem Solving Interviews (2)', 'System Design (for experienced)', 'HR + Hiring Manager'],
      duration: '2-3 weeks',
      tips: ['Strong DSA fundamentals', 'Practice machine coding', 'Know e-commerce domain', 'Prepare for scale discussions']
    },
    hiringTrends: [
      { year: 2024, hired: 120, growth: '+18%' },
      { year: 2023, hired: 102, growth: '+15%' },
      { year: 2022, hired: 89, growth: '+22%' }
    ],
    roles: [
      { title: 'SDE 1', package: '₹16-20 LPA', openings: 60 },
      { title: 'SDE 2', package: '₹28-38 LPA', openings: 35 },
      { title: 'UI Engineer', package: '₹14-18 LPA', openings: 25 }
    ],
    culture: ['Move fast', 'Customer first', 'Bold bets', 'High ownership'],
    benefits: ['ESOPs', 'Flexible work', 'Learning budget', 'Health insurance', 'Flipkart discounts'],
    locations: ['Bangalore'],
    website: 'https://www.flipkartcareers.com'
  }
];

export interface ChallengeWithQuestion extends DailyChallenge {
  question?: {
    text: string;
    options?: string[];
    correctAnswer?: string | number;
    explanation?: string;
    codeTemplate?: string;
    testCases?: { input: string; output: string }[];
  };
}

export const mockChallenges: ChallengeWithQuestion[] = [
  {
    id: '1',
    type: 'aptitude',
    title: 'Number Series Puzzle',
    description: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    difficulty: 'easy',
    points: 10,
    completed: false,
    question: {
      text: 'What is the next number in the series: 2, 6, 12, 20, 30, ?',
      options: ['36', '40', '42', '44'],
      correctAnswer: 2,
      explanation: 'The pattern is n×(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42. The differences between consecutive terms are 4, 6, 8, 10, 12 (increasing by 2).'
    }
  },
  {
    id: '2',
    type: 'coding',
    title: 'Two Sum Problem',
    description: 'Given an array of integers, return indices of the two numbers that add up to a target.',
    difficulty: 'easy',
    points: 20,
    completed: false,
    question: {
      text: 'Given an array nums = [2, 7, 11, 15] and target = 9, find two numbers that add up to the target. Return their indices.',
      codeTemplate: `function twoSum(nums, target) {
  // Your code here
  // Return an array of two indices
}

// Example:
// twoSum([2, 7, 11, 15], 9) should return [0, 1]`,
      testCases: [
        { input: 'twoSum([2, 7, 11, 15], 9)', output: '[0, 1]' },
        { input: 'twoSum([3, 2, 4], 6)', output: '[1, 2]' },
        { input: 'twoSum([3, 3], 6)', output: '[0, 1]' }
      ],
      explanation: 'Use a hash map to store each number and its index. For each number, check if (target - number) exists in the map. Time: O(n), Space: O(n).'
    }
  },
  {
    id: '3',
    type: 'coding',
    title: 'Palindrome Check',
    description: 'Write a function to check if a string is a palindrome.',
    difficulty: 'easy',
    points: 15,
    completed: true,
    question: {
      text: 'Check if the given string reads the same forwards and backwards (ignoring case and non-alphanumeric characters).',
      codeTemplate: `function isPalindrome(s) {
  // Your code here
  // Return true if palindrome, false otherwise
}

// Example:
// isPalindrome("A man, a plan, a canal: Panama") should return true`,
      testCases: [
        { input: 'isPalindrome("racecar")', output: 'true' },
        { input: 'isPalindrome("hello")', output: 'false' },
        { input: 'isPalindrome("A man, a plan, a canal: Panama")', output: 'true' }
      ],
      explanation: 'Clean the string by removing non-alphanumeric chars and converting to lowercase. Then use two pointers from both ends moving inward, comparing characters.'
    }
  },
  {
    id: '4',
    type: 'communication',
    title: 'Elevator Pitch',
    description: 'Prepare a 60-second pitch introducing yourself and your skills.',
    difficulty: 'medium',
    points: 25,
    completed: false,
    question: {
      text: 'Create a compelling 60-second elevator pitch following this structure:\n\n1. **Hook** (5 sec): Start with something memorable\n2. **Who you are** (10 sec): Name, education, current role\n3. **What you do** (15 sec): Key skills and expertise\n4. **Achievements** (15 sec): Notable accomplishments\n5. **Value proposition** (10 sec): What you bring to the table\n6. **Call to action** (5 sec): What you\'re looking for\n\n**Example:**\n"Did you know that 60% of e-commerce purchases happen on mobile? I\'m Sarah, a final-year CS student from IIT Delhi. I specialize in building responsive web applications using React and Node.js. Last summer, I interned at Swiggy where I reduced page load time by 40%, improving user retention by 15%. I\'m passionate about creating seamless user experiences at scale. I\'d love to discuss how I can contribute to your engineering team."',
      explanation: 'A good elevator pitch is concise, memorable, and tailored to your audience. Practice until it sounds natural, not rehearsed. Make eye contact and show enthusiasm.'
    }
  },
  {
    id: '5',
    type: 'aptitude',
    title: 'Logical Reasoning',
    description: 'All roses are flowers. Some flowers fade quickly. Therefore...?',
    difficulty: 'medium',
    points: 15,
    completed: false,
    question: {
      text: 'Given the premises:\n1. All roses are flowers.\n2. Some flowers fade quickly.\n\nWhich conclusion can be definitely drawn?',
      options: [
        'All roses fade quickly',
        'Some roses fade quickly',
        'Some roses may fade quickly',
        'No valid conclusion about roses can be drawn'
      ],
      correctAnswer: 3,
      explanation: 'This is a syllogism problem. While all roses are flowers, we only know that SOME flowers fade quickly. We cannot determine if any roses are in that subset. Therefore, no definite conclusion about roses fading can be logically drawn.'
    }
  },
  {
    id: '6',
    type: 'aptitude',
    title: 'Percentage Problem',
    description: 'If the price of an item is increased by 20% and then decreased by 20%, what is the net change?',
    difficulty: 'easy',
    points: 10,
    completed: false,
    question: {
      text: 'A product costs ₹100. The price is first increased by 20%, then the new price is decreased by 20%. What is the final price?',
      options: ['₹100', '₹96', '₹104', '₹98'],
      correctAnswer: 1,
      explanation: 'Original: ₹100. After 20% increase: ₹100 × 1.20 = ₹120. After 20% decrease: ₹120 × 0.80 = ₹96. The net change is -4%. Remember: Successive percentage changes don\'t cancel out!'
    }
  },
  {
    id: '7',
    type: 'coding',
    title: 'Reverse a Linked List',
    description: 'Reverse a singly linked list iteratively.',
    difficulty: 'medium',
    points: 25,
    completed: false,
    question: {
      text: 'Given the head of a singly linked list, reverse the list and return the reversed list.',
      codeTemplate: `function reverseList(head) {
  // head is the first node: { val: number, next: ListNode | null }
  // Your code here
  // Return the new head of reversed list
}

// Example:
// Input: 1 -> 2 -> 3 -> 4 -> 5
// Output: 5 -> 4 -> 3 -> 2 -> 1`,
      testCases: [
        { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' },
        { input: '[1,2]', output: '[2,1]' },
        { input: '[]', output: '[]' }
      ],
      explanation: 'Use three pointers: prev (initially null), curr (initially head), and next. Traverse the list, reversing each node\'s pointer. Time: O(n), Space: O(1).'
    }
  },
  {
    id: '8',
    type: 'communication',
    title: 'STAR Method Practice',
    description: 'Practice answering behavioral questions using the STAR method.',
    difficulty: 'medium',
    points: 20,
    completed: false,
    question: {
      text: 'Answer this behavioral question using the STAR method:\n\n**"Tell me about a time when you faced a challenging deadline."**\n\n**STAR Framework:**\n- **S**ituation: Set the context (where, when, what project)\n- **T**ask: Describe your responsibility\n- **A**ction: Explain what YOU specifically did\n- **R**esult: Share the outcome with metrics if possible\n\n**Example Answer:**\n"During my final semester (S), I had to complete my capstone project while preparing for campus placements (T). I created a detailed schedule, broke the project into sprints, and woke up early to study DSA before classes. I also formed a study group for mock interviews (A). I delivered my project a week early with an A grade and secured 3 job offers (R)."',
      explanation: 'The STAR method provides a structured way to answer behavioral questions. Focus on YOUR actions, be specific, and always include measurable results when possible.'
    }
  },
  {
    id: '9',
    type: 'aptitude',
    title: 'Probability Puzzle',
    description: 'Calculate the probability of getting at least one head in 3 coin tosses.',
    difficulty: 'medium',
    points: 15,
    completed: false,
    question: {
      text: 'A fair coin is tossed 3 times. What is the probability of getting at least one head?',
      options: ['1/8', '3/8', '7/8', '1/2'],
      correctAnswer: 2,
      explanation: 'P(at least 1 head) = 1 - P(no heads) = 1 - P(all tails) = 1 - (1/2)³ = 1 - 1/8 = 7/8. Using complement is often easier than calculating all favorable outcomes.'
    }
  },
  {
    id: '10',
    type: 'coding',
    title: 'Valid Parentheses',
    description: 'Check if a string of parentheses is balanced.',
    difficulty: 'easy',
    points: 15,
    completed: false,
    question: {
      text: 'Given a string containing just \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      codeTemplate: `function isValid(s) {
  // A string is valid if:
  // 1. Open brackets are closed by same type
  // 2. Open brackets are closed in correct order
  // 3. Every close bracket has a corresponding open bracket
}

// Example:
// isValid("()[]{}") returns true
// isValid("(]") returns false`,
      testCases: [
        { input: 'isValid("()")', output: 'true' },
        { input: 'isValid("()[]{}")', output: 'true' },
        { input: 'isValid("(]")', output: 'false' },
        { input: 'isValid("([)]")', output: 'false' }
      ],
      explanation: 'Use a stack. For opening brackets, push to stack. For closing brackets, check if stack top has matching opening bracket. Stack should be empty at end.'
    }
  }
];

export interface LearningResource {
  id: string;
  title: string;
  platform: string;
  instructor: string;
  rating: number;
  duration: string;
  enrolled: string;
  isPaid: boolean;
  trending: boolean;
  skills: string[];
  url: string;
  description: string;
  price?: string;
}

export const learningResources: LearningResource[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms Masterclass',
    platform: 'Coursera',
    instructor: 'Stanford University',
    rating: 4.8,
    duration: '40 hours',
    enrolled: '50K+',
    isPaid: false,
    trending: true,
    skills: ['DSA', 'Problem Solving', 'Algorithms'],
    url: 'https://www.coursera.org/specializations/data-structures-algorithms',
    description: 'Comprehensive DSA course covering arrays, trees, graphs, and dynamic programming with hands-on projects.'
  },
  {
    id: '2',
    title: 'System Design Interview Prep',
    platform: 'Educative',
    instructor: 'Design Gurus',
    rating: 4.9,
    duration: '30 hours',
    enrolled: '25K+',
    isPaid: true,
    trending: true,
    skills: ['System Design', 'Architecture', 'Scalability'],
    url: 'https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers',
    description: 'Learn to design scalable systems like YouTube, Twitter, and Uber with real-world case studies.',
    price: '$79'
  },
  {
    id: '3',
    title: 'The Complete Web Developer Bootcamp',
    platform: 'Udemy',
    instructor: 'Angela Yu',
    rating: 4.7,
    duration: '60 hours',
    enrolled: '100K+',
    isPaid: true,
    trending: false,
    skills: ['React', 'Node.js', 'MongoDB', 'HTML/CSS'],
    url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    description: 'Full-stack web development from scratch covering HTML, CSS, JavaScript, React, Node.js, and databases.',
    price: '₹499'
  },
  {
    id: '4',
    title: 'Machine Learning Specialization',
    platform: 'Coursera',
    instructor: 'Andrew Ng',
    rating: 4.9,
    duration: '80 hours',
    enrolled: '200K+',
    isPaid: true,
    trending: true,
    skills: ['ML', 'Python', 'TensorFlow', 'Neural Networks'],
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    description: 'Stanford\'s legendary ML course updated for 2024. Learn supervised learning, neural networks, and ML best practices.',
    price: 'Free (Audit)'
  },
  {
    id: '5',
    title: 'AWS Cloud Practitioner Essentials',
    platform: 'AWS',
    instructor: 'AWS Training',
    rating: 4.6,
    duration: '20 hours',
    enrolled: '75K+',
    isPaid: false,
    trending: false,
    skills: ['AWS', 'Cloud', 'DevOps'],
    url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/',
    description: 'Official AWS training for cloud fundamentals. Perfect preparation for AWS Cloud Practitioner certification.'
  },
  {
    id: '6',
    title: 'Communication Skills for IT Professionals',
    platform: 'LinkedIn Learning',
    instructor: 'Tatiana Kolovou',
    rating: 4.5,
    duration: '10 hours',
    enrolled: '30K+',
    isPaid: true,
    trending: false,
    skills: ['Communication', 'Soft Skills', 'Interviews'],
    url: 'https://www.linkedin.com/learning/paths/improve-your-communication-skills',
    description: 'Master professional communication, presentations, and interview skills for career success.',
    price: 'LinkedIn Premium'
  },
  {
    id: '7',
    title: 'NeetCode 150',
    platform: 'NeetCode',
    instructor: 'NeetCode',
    rating: 4.9,
    duration: 'Self-paced',
    enrolled: '500K+',
    isPaid: false,
    trending: true,
    skills: ['DSA', 'LeetCode', 'Interview Prep'],
    url: 'https://neetcode.io/practice',
    description: 'Curated list of 150 LeetCode problems covering all patterns. Video explanations for each problem.'
  },
  {
    id: '8',
    title: 'JavaScript: The Advanced Concepts',
    platform: 'Udemy',
    instructor: 'Andrei Neagoie',
    rating: 4.8,
    duration: '25 hours',
    enrolled: '150K+',
    isPaid: true,
    trending: true,
    skills: ['JavaScript', 'Advanced JS', 'Performance'],
    url: 'https://www.udemy.com/course/advanced-javascript-concepts/',
    description: 'Deep dive into JavaScript internals: closures, prototypes, async patterns, and performance optimization.',
    price: '₹449'
  },
  {
    id: '9',
    title: 'CS50: Introduction to Computer Science',
    platform: 'edX',
    instructor: 'Harvard University',
    rating: 4.9,
    duration: '100 hours',
    enrolled: '3M+',
    isPaid: false,
    trending: true,
    skills: ['C', 'Python', 'SQL', 'Web Dev', 'CS Fundamentals'],
    url: 'https://cs50.harvard.edu/x/',
    description: 'Harvard\'s legendary intro to CS. Covers algorithms, data structures, memory, and web development from scratch.'
  },
  {
    id: '10',
    title: 'Docker & Kubernetes: The Practical Guide',
    platform: 'Udemy',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.7,
    duration: '23 hours',
    enrolled: '80K+',
    isPaid: true,
    trending: true,
    skills: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
    url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/',
    description: 'Learn containerization and orchestration with Docker and Kubernetes through hands-on projects.',
    price: '₹499'
  }
];

export interface Certification {
  id: string;
  name: string;
  provider: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  value: 'Low' | 'Medium' | 'High';
  url: string;
  cost: string;
  duration: string;
  description: string;
}

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Solutions Architect Associate',
    provider: 'Amazon',
    difficulty: 'Intermediate',
    value: 'High',
    url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    cost: '$150',
    duration: '2-3 months prep',
    description: 'Validates ability to design distributed systems on AWS. Highly valued for cloud roles.'
  },
  {
    id: '2',
    name: 'Google Cloud Professional Cloud Architect',
    provider: 'Google',
    difficulty: 'Advanced',
    value: 'High',
    url: 'https://cloud.google.com/learn/certification/cloud-architect',
    cost: '$200',
    duration: '3-4 months prep',
    description: 'Design and manage solutions on Google Cloud Platform. Great for senior cloud positions.'
  },
  {
    id: '3',
    name: 'Microsoft Azure Fundamentals (AZ-900)',
    provider: 'Microsoft',
    difficulty: 'Beginner',
    value: 'Medium',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
    cost: '$99',
    duration: '2-4 weeks prep',
    description: 'Entry-level Azure certification. Good starting point for cloud journey.'
  },
  {
    id: '4',
    name: 'Certified Kubernetes Administrator (CKA)',
    provider: 'CNCF',
    difficulty: 'Advanced',
    value: 'High',
    url: 'https://www.cncf.io/certification/cka/',
    cost: '$395',
    duration: '2-3 months prep',
    description: 'Hands-on certification for K8s administration. Highly valued in DevOps roles.'
  },
  {
    id: '5',
    name: 'Certified Scrum Master (CSM)',
    provider: 'Scrum Alliance',
    difficulty: 'Beginner',
    value: 'Medium',
    url: 'https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster',
    cost: '$500-1000',
    duration: '2-day course',
    description: 'Agile methodology certification. Useful for project management and team lead roles.'
  },
  {
    id: '6',
    name: 'Meta Front-End Developer Professional Certificate',
    provider: 'Meta',
    difficulty: 'Intermediate',
    value: 'Medium',
    url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    cost: 'Free (Audit)',
    duration: '7 months',
    description: 'Comprehensive front-end development certificate from Meta. Includes React specialization.'
  }
];

export const areasOfInterest = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'AI/ML',
  'Cloud Computing',
  'Cybersecurity',
  'DevOps',
  'Blockchain',
  'IoT',
  'Game Development',
  'UI/UX Design',
];

export const technicalSkillsList = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'React',
  'Angular',
  'Vue.js',
  'Node.js',
  'Django',
  'Flask',
  'Spring Boot',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Git',
  'Linux',
  'Machine Learning',
  'TensorFlow',
  'PyTorch',
];

export const degreeOptions = [
  'B.Tech',
  'B.E.',
  'B.Sc',
  'BCA',
  'M.Tech',
  'M.E.',
  'M.Sc',
  'MCA',
  'MBA',
];

export const branchOptions = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Data Science',
  'Artificial Intelligence',
];

export const projectIdeas = [
  {
    title: 'E-commerce Platform',
    description: 'Build a full-stack e-commerce website with payment integration',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    difficulty: 'Intermediate',
    type: 'individual',
  },
  {
    title: 'ML-based Recommendation System',
    description: 'Create a recommendation engine using collaborative filtering',
    skills: ['Python', 'TensorFlow', 'Flask', 'AWS'],
    difficulty: 'Advanced',
    type: 'group',
  },
  {
    title: 'Real-time Chat Application',
    description: 'Build a chat app with WebSocket for real-time communication',
    skills: ['React', 'Socket.io', 'Node.js', 'Redis'],
    difficulty: 'Intermediate',
    type: 'individual',
  },
  {
    title: 'Task Management Dashboard',
    description: 'Create a Kanban-style project management tool',
    skills: ['React', 'TypeScript', 'PostgreSQL', 'Docker'],
    difficulty: 'Beginner',
    type: 'individual',
  },
];
