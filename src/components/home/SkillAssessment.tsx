import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Brain, Code, MessageCircle, FlaskConical, CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question, DifficultyLevel } from '@/types/user';
import { getAssessmentQuestions, shuffleArray } from '@/lib/questionBank';

interface AssessmentModuleConfig {
  title: string;
  icon: React.ElementType;
  description: string;
  questionCount: number;
  category: 'aptitude' | 'coding' | 'communication' | 'analytical';
}

const assessmentModules: Record<string, AssessmentModuleConfig> = {
  aptitude: {
    title: 'Aptitude Skills',
    icon: Brain,
    description: 'GATE & CAT level quantitative aptitude, logical reasoning, and problem-solving',
    questionCount: 10,
    category: 'aptitude',
  },
  coding: {
    title: 'Coding Skills',
    icon: Code,
    description: 'DSA, algorithms, and programming concepts at GATE level',
    questionCount: 10,
    category: 'coding',
  },
  communication: {
    title: 'Communication Skills',
    icon: MessageCircle,
    description: 'CAT level verbal ability, grammar, vocabulary, and professional communication',
    questionCount: 10,
    category: 'communication',
  },
  analytical: {
    title: 'Stoichiometric & Psychological Skills',
    icon: FlaskConical,
    description: 'Analytical reasoning, stoichiometry, decision-making, and psychological assessment',
    questionCount: 10,
    category: 'analytical',
  },
};

export function SkillAssessment() {
  const { updateAssessmentScores, setCurrentStep, markStepComplete } = useUser();
  const [currentModule, setCurrentModule] = useState<keyof typeof assessmentModules | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [moduleQuestions, setModuleQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [moduleScores, setModuleScores] = useState<Record<string, { score: number; difficultyBreakdown: Record<DifficultyLevel, { correct: number; total: number }> }>>({});

  // Timer for each module (10 minutes per module)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentModule && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Auto-submit when time runs out
            completeModule(currentModule);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentModule, timeRemaining]);

  const startModule = async (moduleKey: keyof typeof assessmentModules) => {
    setIsLoading(true);
    setShowExplanation(false);
    
    // Get randomized questions from the question bank
    const config = assessmentModules[moduleKey];
    const questions = getAssessmentQuestions(config.category, config.questionCount);
    
    // Shuffle options for each question (while tracking correct answer)
    const questionsWithShuffledOptions = questions.map(q => {
      const originalCorrectOption = q.options[q.correctAnswer];
      const shuffledOptions = shuffleArray([...q.options]);
      const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);
      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: newCorrectIndex,
      };
    });

    setModuleQuestions(questionsWithShuffledOptions);
    setCurrentModule(moduleKey);
    setCurrentQuestionIndex(0);
    setTimeRemaining(10 * 60); // 10 minutes in seconds
    setIsLoading(false);
  };

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [`${currentModule}_${questionId}`]: answerIndex }));
  };

  const calculateModuleScore = (moduleKey: keyof typeof assessmentModules) => {
    let correct = 0;
    const difficultyBreakdown: Record<DifficultyLevel, { correct: number; total: number }> = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 },
    };

    moduleQuestions.forEach(q => {
      difficultyBreakdown[q.difficulty].total++;
      if (answers[`${moduleKey}_${q.id}`] === q.correctAnswer) {
        correct++;
        difficultyBreakdown[q.difficulty].correct++;
      }
    });

    const score = Math.round((correct / moduleQuestions.length) * 100);
    return { score, difficultyBreakdown };
  };

  const completeModule = (moduleKey: keyof typeof assessmentModules) => {
    const { score, difficultyBreakdown } = calculateModuleScore(moduleKey);
    
    // Calculate GATE/CAT performance based on medium and hard questions
    const advancedScore = 
      (difficultyBreakdown.medium.correct + difficultyBreakdown.hard.correct) /
      Math.max(1, difficultyBreakdown.medium.total + difficultyBreakdown.hard.total) * 100;

    setModuleScores(prev => ({
      ...prev,
      [moduleKey]: { score, difficultyBreakdown },
    }));

    const config = assessmentModules[moduleKey];
    updateAssessmentScores({ [config.category]: score });
    setCompletedModules(prev => [...prev, moduleKey]);
    setCurrentModule(null);
    setCurrentQuestionIndex(0);
    setModuleQuestions([]);
    setTimeRemaining(0);
  };

  const handleComplete = () => {
    // Calculate overall GATE/CAT performance
    let totalMediumHardCorrect = 0;
    let totalMediumHardQuestions = 0;
    
    Object.values(moduleScores).forEach(({ difficultyBreakdown }) => {
      totalMediumHardCorrect += difficultyBreakdown.medium.correct + difficultyBreakdown.hard.correct;
      totalMediumHardQuestions += difficultyBreakdown.medium.total + difficultyBreakdown.hard.total;
    });

    const gatePerformance = totalMediumHardQuestions > 0 
      ? Math.round((totalMediumHardCorrect / totalMediumHardQuestions) * 100)
      : 0;

    updateAssessmentScores({
      gatePerformance,
      catPerformance: gatePerformance, // Using same score for CAT as both assess advanced reasoning
    });

    markStepComplete(2);
    setCurrentStep(3);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const allModulesCompleted = Object.keys(assessmentModules).every(key => completedModules.includes(key));

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  if (currentModule && moduleQuestions.length > 0) {
    const module = assessmentModules[currentModule];
    const question = moduleQuestions[currentQuestionIndex];
    const Icon = module.icon;
    const isAnswered = answers[`${currentModule}_${question.id}`] !== undefined;
    const selectedAnswer = answers[`${currentModule}_${question.id}`];

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="gradient-primary p-2 rounded-lg">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold font-display">{module.title}</h2>
            </div>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full font-mono font-medium",
              timeRemaining < 60 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
            )}>
              <Clock className="h-4 w-4" />
              {formatTime(timeRemaining)}
            </div>
          </div>
          <Progress value={(currentQuestionIndex / moduleQuestions.length) * 100} className="h-2" />
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {moduleQuestions.length}
            </p>
            <Badge variant={
              question.difficulty === 'easy' ? 'secondary' :
              question.difficulty === 'medium' ? 'default' : 'destructive'
            }>
              {question.difficulty.toUpperCase()} • {question.examLevel.toUpperCase()}
            </Badge>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="mb-2">
              {question.category && (
                <Badge variant="outline" className="mb-3">{question.category}</Badge>
              )}
            </div>
            <h3 className="text-lg font-medium mb-6">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(question.id, index)}
                    className={cn(
                      'w-full p-4 text-left rounded-lg border-2 transition-all',
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors font-medium',
                        isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(prev => prev - 1);
                setShowExplanation(false);
              } else {
                setCurrentModule(null);
                setModuleQuestions([]);
                setTimeRemaining(0);
              }
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={() => {
              if (currentQuestionIndex < moduleQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setShowExplanation(false);
              } else {
                completeModule(currentModule);
              }
            }}
            disabled={!isAnswered}
            className="gradient-primary"
          >
            {currentQuestionIndex < moduleQuestions.length - 1 ? 'Next' : 'Complete Module'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => setCurrentStep(1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold font-display">Skill Assessment</h2>
        <div className="w-24" />
      </div>

      <div className="text-center mb-8">
        <p className="text-muted-foreground mb-2">
          Complete all assessment modules to get your placement prediction
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <Badge variant="secondary">Easy</Badge>
          <Badge variant="default">Medium (GATE/CAT)</Badge>
          <Badge variant="destructive">Hard (GATE/CAT)</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Questions are randomly generated with balanced difficulty levels
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {(Object.keys(assessmentModules) as Array<keyof typeof assessmentModules>).map((key) => {
          const module = assessmentModules[key];
          const Icon = module.icon;
          const isCompleted = completedModules.includes(key);
          const scoreData = moduleScores[key];

          return (
            <Card
              key={key}
              className={cn(
                'cursor-pointer transition-all hover:shadow-lg',
                isCompleted && 'border-success/50'
              )}
              onClick={() => !isCompleted && startModule(key)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={cn(
                    'p-2 rounded-lg',
                    isCompleted ? 'bg-success/10' : 'bg-primary/10'
                  )}>
                    <Icon className={cn(
                      'h-5 w-5',
                      isCompleted ? 'text-success' : 'text-primary'
                    )} />
                  </div>
                  {isCompleted && scoreData && (
                    <Badge variant="outline" className="border-success text-success">
                      {scoreData.score}% Score
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-4">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    {module.questionCount} Questions • 10 min
                  </span>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowRight className="h-5 w-5 text-primary" />
                  )}
                </div>
                
                {isCompleted && scoreData && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Performance Breakdown:</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-secondary/50 rounded">
                        <div className="font-medium text-success">
                          {scoreData.difficultyBreakdown.easy.correct}/{scoreData.difficultyBreakdown.easy.total}
                        </div>
                        <div className="text-muted-foreground">Easy</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/50 rounded">
                        <div className="font-medium text-primary">
                          {scoreData.difficultyBreakdown.medium.correct}/{scoreData.difficultyBreakdown.medium.total}
                        </div>
                        <div className="text-muted-foreground">Medium</div>
                      </div>
                      <div className="text-center p-2 bg-secondary/50 rounded">
                        <div className="font-medium text-destructive">
                          {scoreData.difficultyBreakdown.hard.correct}/{scoreData.difficultyBreakdown.hard.total}
                        </div>
                        <div className="text-muted-foreground">Hard</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {allModulesCompleted && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">All assessments completed!</span>
          </div>
          <Button onClick={handleComplete} size="lg" className="gradient-primary gap-2">
            View Your Results
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
