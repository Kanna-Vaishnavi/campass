import { Question, DifficultyLevel, ExamLevel } from '@/types/user';

// Utility function to shuffle array (Fisher-Yates algorithm)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random questions from a pool
export function getRandomQuestions(
  questions: Question[],
  count: number,
  difficulty?: DifficultyLevel,
  examLevel?: ExamLevel
): Question[] {
  let filtered = [...questions];
  
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  if (examLevel) {
    filtered = filtered.filter(q => q.examLevel === examLevel);
  }
  
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get balanced questions (mix of difficulties)
export function getBalancedQuestions(questions: Question[], total: number): Question[] {
  const easyCount = Math.ceil(total * 0.3); // 30% easy
  const mediumCount = Math.ceil(total * 0.4); // 40% medium
  const hardCount = total - easyCount - mediumCount; // 30% hard
  
  const easyQuestions = getRandomQuestions(questions, easyCount, 'easy');
  const mediumQuestions = getRandomQuestions(questions, mediumCount, 'medium');
  const hardQuestions = getRandomQuestions(questions, hardCount, 'hard');
  
  return shuffleArray([...easyQuestions, ...mediumQuestions, ...hardQuestions]);
}

// ========================
// APTITUDE QUESTIONS POOL
// ========================
export const aptitudeQuestions: Question[] = [
  // EASY - Basic
  {
    id: 'apt_easy_1',
    question: 'If a pen costs ₹15 and a notebook costs ₹45, what is the total cost of 3 pens and 2 notebooks?',
    options: ['₹125', '₹135', '₹145', '₹155'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Arithmetic',
    explanation: '3 × 15 + 2 × 45 = 45 + 90 = ₹135'
  },
  {
    id: 'apt_easy_2',
    question: 'What is 25% of 200?',
    options: ['40', '50', '60', '75'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Percentage',
    explanation: '25% of 200 = (25/100) × 200 = 50'
  },
  {
    id: 'apt_easy_3',
    question: 'A train travels 180 km in 3 hours. What is its speed?',
    options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Speed & Distance',
    explanation: 'Speed = Distance/Time = 180/3 = 60 km/h'
  },
  {
    id: 'apt_easy_4',
    question: 'If 5 workers can complete a task in 10 days, how many days will 10 workers take?',
    options: ['5 days', '10 days', '15 days', '20 days'],
    correctAnswer: 0,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Work & Time',
    explanation: 'Workers × Days = Constant. 5 × 10 = 10 × x, x = 5 days'
  },
  {
    id: 'apt_easy_5',
    question: 'What comes next in the series: 2, 4, 8, 16, ?',
    options: ['24', '28', '32', '36'],
    correctAnswer: 2,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Number Series',
    explanation: 'Each number is multiplied by 2. 16 × 2 = 32'
  },
  {
    id: 'apt_easy_6',
    question: 'The average of 10, 20, 30, 40, 50 is:',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Average',
    explanation: 'Average = (10+20+30+40+50)/5 = 150/5 = 30'
  },
  {
    id: 'apt_easy_7',
    question: 'A book originally priced at ₹500 is sold at 20% discount. What is the selling price?',
    options: ['₹380', '₹400', '₹420', '₹450'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Profit & Loss',
    explanation: 'Discount = 20% of 500 = ₹100. Selling Price = 500 - 100 = ₹400'
  },
  {
    id: 'apt_easy_8',
    question: 'If Monday is Day 1, what day of the week is Day 22?',
    options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Calendar',
    explanation: '22 = 21 + 1. 21 is divisible by 7, so Day 22 is Monday'
  },

  // MEDIUM - GATE Level
  {
    id: 'apt_med_1',
    question: 'A and B can complete a work in 12 days, B and C in 15 days, C and A in 20 days. In how many days can A, B, and C together complete the work?',
    options: ['8 days', '10 days', '12 days', '15 days'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Work & Time',
    explanation: '2(A+B+C) = 1/12 + 1/15 + 1/20 = 1/5. A+B+C = 1/10. So 10 days.'
  },
  {
    id: 'apt_med_2',
    question: 'The ratio of ages of A and B is 4:5. If after 5 years the ratio becomes 5:6, what is the present age of A?',
    options: ['16 years', '20 years', '24 years', '28 years'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Age Problems',
    explanation: 'Let ages be 4x and 5x. (4x+5)/(5x+5) = 5/6. Solving: x = 5. Age of A = 20 years'
  },
  {
    id: 'apt_med_3',
    question: 'A boat travels 24 km upstream in 6 hours and 24 km downstream in 4 hours. Find the speed of the stream.',
    options: ['1 km/h', '2 km/h', '3 km/h', '4 km/h'],
    correctAnswer: 0,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Boats & Streams',
    explanation: 'Upstream speed = 4 km/h, Downstream speed = 6 km/h. Stream speed = (6-4)/2 = 1 km/h'
  },
  {
    id: 'apt_med_4',
    question: 'If log₁₀(x) + log₁₀(x+3) = 1, find x.',
    options: ['2', '3', '5', '7'],
    correctAnswer: 0,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Logarithms',
    explanation: 'log₁₀(x(x+3)) = 1 → x² + 3x = 10 → x² + 3x - 10 = 0 → x = 2 (positive root)'
  },
  {
    id: 'apt_med_5',
    question: 'A mixture contains alcohol and water in the ratio 4:3. If 5 liters of water is added, the ratio becomes 4:5. Find the quantity of alcohol.',
    options: ['8 liters', '10 liters', '12 liters', '15 liters'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Mixtures & Alligations',
    explanation: 'Let alcohol = 4x, water = 3x. 4x/(3x+5) = 4/5. Solving: x = 2.5. Alcohol = 10 liters'
  },
  {
    id: 'apt_med_6',
    question: 'The probability that it rains on day 1 is 0.4 and on day 2 is 0.5. What is the probability it rains on exactly one day?',
    options: ['0.45', '0.50', '0.55', '0.60'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Probability',
    explanation: 'P(exactly one) = 0.4×0.5 + 0.6×0.5 = 0.2 + 0.3 = 0.50'
  },
  {
    id: 'apt_med_7',
    question: 'Find the number of ways to arrange the letters of the word "MISSISSIPPI".',
    options: ['34650', '38650', '42350', '46200'],
    correctAnswer: 0,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Permutations',
    explanation: '11!/(4!×4!×2!) = 34650'
  },

  // HARD - GATE/CAT Level
  {
    id: 'apt_hard_1',
    question: 'In how many ways can 8 persons be seated in a row such that two particular persons are never together?',
    options: ['30240', '35280', '40320', '45360'],
    correctAnswer: 0,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Permutations',
    explanation: 'Total arrangements = 8! = 40320. Together = 7! × 2 = 10080. Not together = 40320 - 10080 = 30240'
  },
  {
    id: 'apt_hard_2',
    question: 'A shopkeeper marks his goods 40% above cost price and gives 20% discount. Find his profit percentage.',
    options: ['10%', '12%', '15%', '18%'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Profit & Loss',
    explanation: 'Let CP = 100. MP = 140. SP = 140 × 0.8 = 112. Profit = 12%'
  },
  {
    id: 'apt_hard_3',
    question: 'Three pipes A, B, C can fill a tank in 6, 8, 12 hours respectively. If A is opened for 2 hours and then closed, and B and C are opened simultaneously, how long will it take to fill the remaining tank?',
    options: ['2.4 hours', '2.8 hours', '3.2 hours', '3.6 hours'],
    correctAnswer: 0,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Pipes & Cisterns',
    explanation: 'A fills 1/3 in 2 hours. Remaining = 2/3. B+C rate = 1/8+1/12 = 5/24. Time = (2/3)/(5/24) = 2.4 hours'
  },
  {
    id: 'apt_hard_4',
    question: 'A sum of money doubles itself at compound interest in 5 years. In how many years will it become 8 times?',
    options: ['12 years', '15 years', '18 years', '20 years'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Compound Interest',
    explanation: '2^1 in 5 years, 2^3 = 8 times in 5×3 = 15 years'
  },
  {
    id: 'apt_hard_5',
    question: 'If x + 1/x = 5, find the value of x³ + 1/x³.',
    options: ['105', '110', '115', '120'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Algebra',
    explanation: 'x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x) = 125 - 15 = 110'
  },
  {
    id: 'apt_hard_6',
    question: 'In a class, 60% students passed in English, 70% in Math. If 40% passed in both, what percentage failed in both?',
    options: ['5%', '10%', '15%', '20%'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Set Theory',
    explanation: 'Passed in at least one = 60 + 70 - 40 = 90%. Failed in both = 10%'
  },
  {
    id: 'apt_hard_7',
    question: 'Two trains start from stations A and B towards each other at 50 km/h and 40 km/h. When they meet, one train has traveled 100 km more than the other. Find the distance between A and B.',
    options: ['800 km', '900 km', '1000 km', '1100 km'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Speed & Distance',
    explanation: 'Let time = t. 50t - 40t = 100, t = 10 hours. Distance = (50+40)×10 = 900 km'
  },
  {
    id: 'apt_hard_8',
    question: 'The sum of an infinite GP is 4 and the sum of cubes of its terms is 192. Find the first term.',
    options: ['2', '3', '4', '6'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Progressions',
    explanation: 'a/(1-r) = 4, a³/(1-r³) = 192. Solving: a = 3, r = 1/4'
  },
];

// ========================
// CODING QUESTIONS POOL
// ========================
export const codingQuestions: Question[] = [
  // EASY
  {
    id: 'code_easy_1',
    question: 'What is the time complexity of accessing an element in an array by index?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Arrays',
    explanation: 'Array index access is constant time O(1) as it directly calculates memory address'
  },
  {
    id: 'code_easy_2',
    question: 'Which data structure uses LIFO (Last In First Out) principle?',
    options: ['Queue', 'Stack', 'Linked List', 'Tree'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Data Structures',
    explanation: 'Stack follows LIFO - the last element pushed is the first to be popped'
  },
  {
    id: 'code_easy_3',
    question: 'What does SQL stand for?',
    options: ['Simple Query Language', 'Structured Query Language', 'Sequential Query Language', 'Standard Query Language'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Database',
    explanation: 'SQL stands for Structured Query Language, used for managing relational databases'
  },
  {
    id: 'code_easy_4',
    question: 'Which of the following is NOT a primitive data type in JavaScript?',
    options: ['String', 'Number', 'Array', 'Boolean'],
    correctAnswer: 2,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'JavaScript',
    explanation: 'Array is an object in JavaScript, not a primitive data type'
  },
  {
    id: 'code_easy_5',
    question: 'What is the output of: print(len("Hello"))?',
    options: ['4', '5', '6', 'Error'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Python',
    explanation: 'The string "Hello" has 5 characters'
  },
  {
    id: 'code_easy_6',
    question: 'Which keyword is used to define a function in Python?',
    options: ['func', 'define', 'def', 'function'],
    correctAnswer: 2,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Python',
    explanation: 'The "def" keyword is used to define functions in Python'
  },
  {
    id: 'code_easy_7',
    question: 'What is the correct way to declare a constant in JavaScript?',
    options: ['var', 'let', 'const', 'constant'],
    correctAnswer: 2,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'JavaScript',
    explanation: 'The "const" keyword declares a constant that cannot be reassigned'
  },

  // MEDIUM - GATE Level
  {
    id: 'code_med_1',
    question: 'What is the time complexity of binary search?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 2,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Algorithms',
    explanation: 'Binary search divides the search space by half each iteration, giving O(log n)'
  },
  {
    id: 'code_med_2',
    question: 'In a min-heap, what is the relationship between parent and child nodes?',
    options: ['Parent > Child', 'Parent < Child', 'Parent = Child', 'No relationship'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Data Structures',
    explanation: 'In a min-heap, parent node value is always smaller than its children'
  },
  {
    id: 'code_med_3',
    question: 'What is the worst-case time complexity of QuickSort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 2,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Algorithms',
    explanation: 'QuickSort degrades to O(n²) when pivot selection is poor (already sorted array)'
  },
  {
    id: 'code_med_4',
    question: 'Which traversal of a BST gives elements in sorted order?',
    options: ['Preorder', 'Postorder', 'Inorder', 'Level order'],
    correctAnswer: 2,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Trees',
    explanation: 'Inorder traversal (Left-Root-Right) of BST gives ascending sorted order'
  },
  {
    id: 'code_med_5',
    question: 'What is the space complexity of merge sort?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Algorithms',
    explanation: 'Merge sort requires O(n) auxiliary space for merging'
  },
  {
    id: 'code_med_6',
    question: 'Which algorithm is used to find the shortest path in a weighted graph with negative edges?',
    options: ['Dijkstra', 'Bellman-Ford', 'BFS', 'Floyd-Warshall'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Graph Algorithms',
    explanation: 'Bellman-Ford can handle negative edge weights unlike Dijkstra'
  },
  {
    id: 'code_med_7',
    question: 'What is the time complexity of inserting an element at the beginning of an ArrayList?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Data Structures',
    explanation: 'Inserting at beginning requires shifting all existing elements, making it O(n)'
  },

  // HARD - GATE Level
  {
    id: 'code_hard_1',
    question: 'What is the time complexity of building a heap from n elements?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 0,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Heap',
    explanation: 'Building a heap using bottom-up heapify is O(n), not O(n log n)'
  },
  {
    id: 'code_hard_2',
    question: 'In dynamic programming, what is the time complexity of the 0/1 Knapsack problem with n items and capacity W?',
    options: ['O(n)', 'O(nW)', 'O(n²)', 'O(2^n)'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Dynamic Programming',
    explanation: 'DP table has n×W cells, each computed in O(1), giving O(nW)'
  },
  {
    id: 'code_hard_3',
    question: 'What is the amortized time complexity of push operation in a dynamic array?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correctAnswer: 2,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Amortized Analysis',
    explanation: 'Although resizing costs O(n), amortized cost per push is O(1)'
  },
  {
    id: 'code_hard_4',
    question: 'Which of the following problems is NOT NP-Complete?',
    options: ['Traveling Salesman', 'Shortest Path', 'Graph Coloring', 'Subset Sum'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Computational Theory',
    explanation: 'Shortest path can be solved in polynomial time using Dijkstra/Bellman-Ford'
  },
  {
    id: 'code_hard_5',
    question: 'The recurrence T(n) = 2T(n/2) + n represents which sorting algorithm?',
    options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Insertion Sort'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Recurrence Relations',
    explanation: 'Merge sort divides into 2 halves (2T(n/2)) and merges in O(n)'
  },
  {
    id: 'code_hard_6',
    question: 'What is the minimum number of comparisons needed to find both the minimum and maximum in an array of n elements?',
    options: ['n-1', '2n-2', '3n/2 - 2', '2n'],
    correctAnswer: 2,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Algorithm Design',
    explanation: 'Using pair comparison technique, we need 3n/2 - 2 comparisons'
  },
  {
    id: 'code_hard_7',
    question: 'In the LRU cache implementation, which data structure combination provides O(1) time for both get and put?',
    options: ['Array + Stack', 'HashMap + Doubly Linked List', 'Binary Search Tree', 'Heap + Array'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'System Design',
    explanation: 'HashMap provides O(1) lookup, Doubly Linked List provides O(1) insertion/deletion'
  },
  {
    id: 'code_hard_8',
    question: 'What is the time complexity of the Knuth-Morris-Pratt (KMP) string matching algorithm?',
    options: ['O(m×n)', 'O(m+n)', 'O(n²)', 'O(n log n)'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'String Algorithms',
    explanation: 'KMP preprocesses pattern in O(m) and searches in O(n), giving O(m+n) total'
  },
];

// ========================
// COMMUNICATION QUESTIONS POOL
// ========================
export const communicationQuestions: Question[] = [
  // EASY
  {
    id: 'comm_easy_1',
    question: 'In a professional email, what is the most appropriate greeting?',
    options: ['Hey!', 'Dear Sir/Madam,', 'Yo', 'What\'s up?'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Email Etiquette',
    explanation: '"Dear Sir/Madam" is the most formal and professional greeting'
  },
  {
    id: 'comm_easy_2',
    question: 'During a presentation, what is the recommended eye contact strategy?',
    options: ['Avoid eye contact', 'Look at one person only', 'Scan the room making brief eye contact', 'Look at the ceiling'],
    correctAnswer: 2,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Presentation Skills',
    explanation: 'Scanning the room engages the entire audience'
  },
  {
    id: 'comm_easy_3',
    question: 'What does active listening involve?',
    options: ['Interrupting with your thoughts', 'Nodding and paraphrasing', 'Looking at your phone', 'Thinking about your response'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Listening Skills',
    explanation: 'Active listening involves showing engagement through verbal and non-verbal cues'
  },
  {
    id: 'comm_easy_4',
    question: 'Which is the correct sentence?',
    options: ['Their going to the park', 'There going to the park', 'They\'re going to the park', 'Theyre going to the park'],
    correctAnswer: 2,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Grammar',
    explanation: '"They\'re" is the contraction of "they are"'
  },
  {
    id: 'comm_easy_5',
    question: 'What is the purpose of a cover letter?',
    options: ['To list your skills', 'To introduce yourself and express interest', 'To negotiate salary', 'To list references'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Professional Writing',
    explanation: 'Cover letters introduce candidates and explain their interest in the position'
  },
  {
    id: 'comm_easy_6',
    question: 'In a group discussion, what is the best approach when you disagree?',
    options: ['Ignore the point', 'Respectfully present your view', 'Interrupt immediately', 'Stay silent'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Group Discussion',
    explanation: 'Respectful disagreement shows professionalism and confidence'
  },

  // MEDIUM - CAT Level Verbal
  {
    id: 'comm_med_1',
    question: 'Choose the word that best completes the sentence: "The scientist\'s _____ approach to research led to groundbreaking discoveries."',
    options: ['haphazard', 'methodical', 'arbitrary', 'negligent'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'cat',
    category: 'Vocabulary',
    explanation: '"Methodical" means systematic and organized, fitting groundbreaking research'
  },
  {
    id: 'comm_med_2',
    question: 'Identify the error: "Neither the manager nor the employees was aware of the policy change."',
    options: ['Neither', 'nor', 'was', 'aware'],
    correctAnswer: 2,
    difficulty: 'medium',
    examLevel: 'cat',
    category: 'Grammar',
    explanation: 'With "neither...nor", verb agrees with the nearer subject ("employees" - plural), so "were"'
  },
  {
    id: 'comm_med_3',
    question: 'What is a synonym for "ubiquitous"?',
    options: ['Rare', 'Omnipresent', 'Ancient', 'Mysterious'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'cat',
    category: 'Vocabulary',
    explanation: '"Ubiquitous" means present everywhere, synonym of "omnipresent"'
  },
  {
    id: 'comm_med_4',
    question: 'Choose the correct word: "The company\'s _____ to environmental issues has improved its public image."',
    options: ['adherence', 'adherance', 'adherence', 'adhering'],
    correctAnswer: 0,
    difficulty: 'medium',
    examLevel: 'cat',
    category: 'Spelling',
    explanation: '"Adherence" is the correct spelling meaning dedication or commitment'
  },
  {
    id: 'comm_med_5',
    question: '"Bellicose" is to "peaceful" as "frugal" is to:',
    options: ['Economical', 'Extravagant', 'Careful', 'Thrifty'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'cat',
    category: 'Analogies',
    explanation: 'Bellicose (aggressive) is opposite of peaceful; Frugal (thrifty) is opposite of extravagant'
  },
  {
    id: 'comm_med_6',
    question: 'What is the meaning of the idiom "to bite the bullet"?',
    options: ['To eat quickly', 'To accept something difficult', 'To be aggressive', 'To make a mistake'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'cat',
    category: 'Idioms',
    explanation: '"Bite the bullet" means to face a painful situation with courage'
  },

  // HARD - CAT Level
  {
    id: 'comm_hard_1',
    question: 'Choose the word that is most nearly OPPOSITE in meaning to "SANGUINE"',
    options: ['Cheerful', 'Pessimistic', 'Hopeful', 'Confident'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Vocabulary',
    explanation: '"Sanguine" means optimistic; "pessimistic" is its antonym'
  },
  {
    id: 'comm_hard_2',
    question: 'Identify the correctly punctuated sentence:',
    options: [
      'The CEO said, "We must innovate, or we will stagnate."',
      'The CEO said "We must innovate or we will stagnate".',
      'The CEO, said "We must innovate, or we will stagnate."',
      'The CEO said, We must innovate, or we will stagnate.'
    ],
    correctAnswer: 0,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Punctuation',
    explanation: 'Proper comma after "said", quotes around speech, period inside quotes'
  },
  {
    id: 'comm_hard_3',
    question: '"Perspicacious" most nearly means:',
    options: ['Sweaty', 'Discerning', 'Persistent', 'Persuasive'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Vocabulary',
    explanation: '"Perspicacious" means having keen mental perception and understanding'
  },
  {
    id: 'comm_hard_4',
    question: 'Which sentence demonstrates correct parallel structure?',
    options: [
      'She likes swimming, to hike, and biking.',
      'She likes swimming, hiking, and biking.',
      'She likes to swim, hiking, and to bike.',
      'She likes swim, hike, and bike.'
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Grammar',
    explanation: 'Parallel structure requires consistent verb forms (gerunds: swimming, hiking, biking)'
  },
  {
    id: 'comm_hard_5',
    question: 'What is the meaning of "The meeting was adjourned sine die"?',
    options: ['Postponed to next week', 'Cancelled permanently', 'Suspended indefinitely', 'Rescheduled for today'],
    correctAnswer: 2,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Legal/Formal Terms',
    explanation: '"Sine die" is Latin meaning "without a day" - suspended indefinitely'
  },
  {
    id: 'comm_hard_6',
    question: 'Choose the sentence with correct subject-verb agreement:',
    options: [
      'The data shows that sales have increased.',
      'The data show that sales has increased.',
      'The data show that sales have increased.',
      'The data shows that sales has increased.'
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Grammar',
    explanation: '"Data" is plural (datum is singular), and "sales" is also plural'
  },
];

// ========================
// ANALYTICAL/PSYCHOLOGICAL QUESTIONS POOL
// ========================
export const analyticalQuestions: Question[] = [
  // EASY - Logical Reasoning
  {
    id: 'anal_easy_1',
    question: 'If all roses are flowers and some flowers are red, which statement is definitely true?',
    options: ['All roses are red', 'Some roses are red', 'No roses are red', 'Cannot be determined'],
    correctAnswer: 3,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Logical Reasoning',
    explanation: 'We cannot determine if roses are among the red flowers without more information'
  },
  {
    id: 'anal_easy_2',
    question: 'In a family, A is the father of B. C is the daughter of B. What is A to C?',
    options: ['Father', 'Grandfather', 'Uncle', 'Brother'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Blood Relations',
    explanation: 'A is B\'s father, C is B\'s daughter, so A is C\'s grandfather'
  },
  {
    id: 'anal_easy_3',
    question: 'If you face North and turn 90° clockwise, then 180°, which direction do you face?',
    options: ['North', 'South', 'East', 'West'],
    correctAnswer: 3,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Direction Sense',
    explanation: 'North → 90° clockwise → East → 180° → West'
  },
  {
    id: 'anal_easy_4',
    question: 'You are under pressure to meet a deadline. What is the best approach?',
    options: ['Panic and work faster', 'Prioritize tasks and focus', 'Blame others for the situation', 'Give up'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Stress Management',
    explanation: 'Prioritizing and focusing helps manage stress and meet deadlines effectively'
  },
  {
    id: 'anal_easy_5',
    question: 'A colleague takes credit for your work. What is the most professional response?',
    options: ['Confront them publicly', 'Discuss privately with your manager', 'Do nothing', 'Spread rumors about them'],
    correctAnswer: 1,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Workplace Psychology',
    explanation: 'Private discussion with manager is professional and protects relationships'
  },
  {
    id: 'anal_easy_6',
    question: 'Find the odd one out: 2, 5, 10, 17, 26, 35',
    options: ['5', '17', '26', '35'],
    correctAnswer: 3,
    difficulty: 'easy',
    examLevel: 'basic',
    category: 'Number Series',
    explanation: 'Pattern: 1², 2²+1, 3²+1, 4²+1, 5²+1. 35 should be 36 (6²)'
  },

  // MEDIUM - GATE/CAT Analytical
  {
    id: 'anal_med_1',
    question: 'In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written?',
    options: ['MFEJDJOF', 'EFJDJOFM', 'FMDJJEOF', 'ENICFMDE'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Coding-Decoding',
    explanation: 'Each letter is replaced by next letter (+1), then reversed'
  },
  {
    id: 'anal_med_2',
    question: 'Statement: All managers are leaders. Some leaders are visionaries. Conclusion: Some managers are visionaries.',
    options: ['Definitely True', 'Probably True', 'Definitely False', 'Cannot be Determined'],
    correctAnswer: 3,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Syllogisms',
    explanation: 'The overlap between managers and visionaries is not established'
  },
  {
    id: 'anal_med_3',
    question: 'A project faces an unexpected setback. As the team leader, your first action should be:',
    options: ['Identify who caused the problem', 'Assess the impact and possible solutions', 'Report to management immediately', 'Work overtime to fix it alone'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'cat',
    category: 'Decision Making',
    explanation: 'Assessing impact first helps in making informed decisions'
  },
  {
    id: 'anal_med_4',
    question: 'If a chemical reaction has a stoichiometric ratio of 2:3, and you have 10 moles of reactant A, how many moles of reactant B are needed?',
    options: ['10 moles', '15 moles', '20 moles', '6.67 moles'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Stoichiometry',
    explanation: 'If A:B = 2:3, then 10 moles A needs (10 × 3/2) = 15 moles B'
  },
  {
    id: 'anal_med_5',
    question: 'Six people A, B, C, D, E, F sit in a row. A sits at one end. B sits next to A. C does not sit next to B. Who can sit in the middle?',
    options: ['Only C and D', 'Only D and E', 'C, D, E, or F', 'Cannot be determined'],
    correctAnswer: 2,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Seating Arrangement',
    explanation: 'A is at end, B next to A. Middle positions (3,4) can be D, E, F, or C (not adjacent to B)'
  },
  {
    id: 'anal_med_6',
    question: 'You discover your colleague is taking shortcuts that could affect quality. What do you do?',
    options: ['Ignore it - not your problem', 'Discuss concerns with the colleague first', 'Report directly to HR', 'Join them in taking shortcuts'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'cat',
    category: 'Ethics & Integrity',
    explanation: 'Direct communication first maintains trust while addressing the issue'
  },
  {
    id: 'anal_med_7',
    question: 'In a balanced equation: 2H₂ + O₂ → 2H₂O, if 4g of H₂ reacts, how much water is formed?',
    options: ['18g', '36g', '72g', '9g'],
    correctAnswer: 1,
    difficulty: 'medium',
    examLevel: 'gate',
    category: 'Stoichiometry',
    explanation: '4g H₂ = 2 moles. 2 moles H₂ produces 2 moles H₂O = 36g'
  },

  // HARD - GATE/CAT Level
  {
    id: 'anal_hard_1',
    question: 'Five houses A, B, C, D, E are in a row. B is to the right of A. E is to the left of C but right of A. B is to the left of D. Which house is in the middle?',
    options: ['A', 'B', 'C', 'E'],
    correctAnswer: 3,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Logical Arrangement',
    explanation: 'Order: A-E-B-D-C or similar. E is in position 3 (middle)'
  },
  {
    id: 'anal_hard_2',
    question: 'If "P $ Q" means P is the father of Q, "P # Q" means P is the mother of Q, "P * Q" means P is the brother of Q. What does "A $ B # C * D" mean?',
    options: ['A is grandfather of D', 'A is uncle of D', 'A is father of D', 'A is grandmother of D'],
    correctAnswer: 0,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Blood Relations',
    explanation: 'A is father of B, B is mother of C, C is brother of D. So A is grandfather of C and D'
  },
  {
    id: 'anal_hard_3',
    question: 'You are leading a team with conflicting personalities. Two high-performers openly clash. The best leadership approach is:',
    options: ['Fire one of them', 'Ignore until it affects work', 'Facilitate private mediation and set boundaries', 'Take sides with the more valuable employee'],
    correctAnswer: 2,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Leadership & Conflict Resolution',
    explanation: 'Mediation addresses the issue while preserving talent and team dynamics'
  },
  {
    id: 'anal_hard_4',
    question: 'Complete combustion of 1 mole of propane (C₃H₈) requires how many moles of oxygen?',
    options: ['3 moles', '4 moles', '5 moles', '10 moles'],
    correctAnswer: 2,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Stoichiometry',
    explanation: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. 5 moles O₂ required'
  },
  {
    id: 'anal_hard_5',
    question: 'Statement: Most successful entrepreneurs are risk-takers. All risk-takers are optimistic. Conclusion I: All entrepreneurs are optimistic. Conclusion II: Some optimistic people are entrepreneurs.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 1,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Critical Reasoning',
    explanation: 'II follows because some entrepreneurs (who are risk-takers) are optimistic'
  },
  {
    id: 'anal_hard_6',
    question: 'You are offered a higher-paying job at a competitor, but you have critical knowledge about your current company\'s strategy. What is the most ethical course of action?',
    options: ['Take the job and share strategic info', 'Negotiate a higher salary using the offer', 'Accept if you can maintain confidentiality', 'Decline any competitor offers permanently'],
    correctAnswer: 2,
    difficulty: 'hard',
    examLevel: 'cat',
    category: 'Professional Ethics',
    explanation: 'Accepting while maintaining confidentiality is ethical and legal'
  },
  {
    id: 'anal_hard_7',
    question: 'Eight people sit around a circular table. A and B are not adjacent. C sits opposite to A. D sits between E and F. If B sits two seats from C, who can sit next to A?',
    options: ['Only D, E, F, G, H', 'Only C and D', 'Anyone except B and C', 'Cannot be determined'],
    correctAnswer: 0,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Circular Arrangement',
    explanation: 'A cannot sit next to B (given) or C (C is opposite). Others can sit next to A.'
  },
  {
    id: 'anal_hard_8',
    question: 'What is the limiting reagent when 5 moles of N₂ react with 15 moles of H₂ to form ammonia (N₂ + 3H₂ → 2NH₃)?',
    options: ['N₂', 'H₂', 'Both are limiting', 'Neither is limiting'],
    correctAnswer: 0,
    difficulty: 'hard',
    examLevel: 'gate',
    category: 'Stoichiometry',
    explanation: '5 moles N₂ needs 15 moles H₂. H₂ is exactly enough, N₂ limits the reaction'
  },
];

// Export all question pools
export const questionPools = {
  aptitude: aptitudeQuestions,
  coding: codingQuestions,
  communication: communicationQuestions,
  analytical: analyticalQuestions,
};

// Get questions for assessment (balanced difficulty)
export function getAssessmentQuestions(category: keyof typeof questionPools, count: number = 10): Question[] {
  const pool = questionPools[category];
  return getBalancedQuestions(pool, count);
}
