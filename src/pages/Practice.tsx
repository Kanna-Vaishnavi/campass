import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { mockChallenges, ChallengeWithQuestion } from '@/lib/mockData';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Brain,
  Code,
  MessageCircle,
  Trophy,
  Zap,
  CheckCircle,
  Clock,
  ArrowRight,
  Flame,
  Lightbulb,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Practice = () => {
  const [challenges, setChallenges] = useState<ChallengeWithQuestion[]>(mockChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeWithQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const completedCount = challenges.filter(c => c.completed).length;
  const totalPoints = challenges.reduce((acc, c) => acc + (c.completed ? c.points : 0), 0);
  const streak = 5;

  const toggleComplete = (id: string) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === id ? { ...c, completed: !c.completed } : c
      )
    );
  };

  const handleSubmitAnswer = () => {
    setIsAnswered(true);
    setShowExplanation(true);
    if (selectedChallenge?.question?.correctAnswer === selectedAnswer) {
      toggleComplete(selectedChallenge.id);
      setSelectedChallenge({ ...selectedChallenge, completed: true });
    }
  };

  const handleCloseModal = () => {
    setSelectedChallenge(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsAnswered(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'aptitude': return Brain;
      case 'coding': return Code;
      case 'communication': return MessageCircle;
      default: return Brain;
    }
  };

  const filterChallenges = (type: string) => {
    if (type === 'all') return challenges;
    return challenges.filter(c => c.type === type);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Daily Practice</h1>
            <p className="text-muted-foreground">
              Sharpen your skills with daily challenges
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-accent/10">
            <Flame className="h-5 w-5 text-accent" />
            <span className="font-medium">{streak} Day Streak</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="gradient-primary p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}/{challenges.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="gradient-accent p-2 rounded-lg">
                <Zap className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPoints}</p>
                <p className="text-xs text-muted-foreground">Points Earned</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="gradient-success p-2 rounded-lg">
                <Trophy className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">#42</p>
                <p className="text-xs text-muted-foreground">Leaderboard</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-warning/10 p-2 rounded-lg">
                <Flame className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Today's Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round((completedCount / challenges.length) * 100)}%
              </span>
            </div>
            <Progress value={(completedCount / challenges.length) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Challenges */}
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Challenges</TabsTrigger>
            <TabsTrigger value="aptitude" className="gap-2">
              <Brain className="h-4 w-4" />
              Aptitude
            </TabsTrigger>
            <TabsTrigger value="coding" className="gap-2">
              <Code className="h-4 w-4" />
              Coding
            </TabsTrigger>
            <TabsTrigger value="communication" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Communication
            </TabsTrigger>
          </TabsList>

          {['all', 'aptitude', 'coding', 'communication'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterChallenges(tab).map((challenge) => {
                  const Icon = getTypeIcon(challenge.type);
                  return (
                    <Card
                      key={challenge.id}
                      className={cn(
                        'cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1',
                        challenge.completed && 'border-success/50 bg-success/5'
                      )}
                      onClick={() => setSelectedChallenge(challenge)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className={cn(
                            'p-2 rounded-lg',
                            challenge.type === 'aptitude' && 'bg-primary/10',
                            challenge.type === 'coding' && 'bg-info/10',
                            challenge.type === 'communication' && 'bg-accent/10'
                          )}>
                            <Icon className={cn(
                              'h-5 w-5',
                              challenge.type === 'aptitude' && 'text-primary',
                              challenge.type === 'coding' && 'text-info',
                              challenge.type === 'communication' && 'text-accent'
                            )} />
                          </div>
                          <Badge variant="outline" className="gap-1">
                            <Zap className="h-3 w-3" />
                            {challenge.points} pts
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-3">{challenge.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {challenge.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant={
                            challenge.difficulty === 'easy' ? 'secondary' :
                            challenge.difficulty === 'medium' ? 'default' : 'destructive'
                          }>
                            {challenge.difficulty}
                          </Badge>
                          {challenge.completed ? (
                            <div className="flex items-center gap-2 text-success">
                              <CheckCircle className="h-5 w-5" />
                              <span className="text-sm font-medium">Completed</span>
                            </div>
                          ) : (
                            <Button size="sm" variant="ghost" className="gap-1">
                              Start
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Challenge Modal */}
        {selectedChallenge && (
          <Card className="fixed inset-4 md:inset-auto md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] z-50 shadow-2xl overflow-auto">
            <CardHeader className="sticky top-0 bg-card z-10 border-b">
              <div className="flex items-start justify-between">
                <Badge className={cn(
                  selectedChallenge.type === 'aptitude' && 'gradient-primary border-0',
                  selectedChallenge.type === 'coding' && 'bg-info border-0 text-info-foreground',
                  selectedChallenge.type === 'communication' && 'gradient-accent border-0'
                )}>
                  {selectedChallenge.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <CardTitle className="mt-4">{selectedChallenge.title}</CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant={
                  selectedChallenge.difficulty === 'easy' ? 'secondary' :
                  selectedChallenge.difficulty === 'medium' ? 'default' : 'destructive'
                }>
                  {selectedChallenge.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">~10 mins</span>
                </div>
                <div className="flex items-center gap-1 text-accent">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">{selectedChallenge.points} points</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Question Content */}
              {selectedChallenge.question && (
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedChallenge.question.text}</p>
                  </div>

                  {/* Multiple Choice Options */}
                  {selectedChallenge.question.options && (
                    <RadioGroup
                      value={selectedAnswer?.toString()}
                      onValueChange={(val) => setSelectedAnswer(parseInt(val))}
                      className="space-y-3"
                      disabled={isAnswered}
                    >
                      {selectedChallenge.question.options.map((option, index) => (
                        <div
                          key={index}
                          className={cn(
                            'flex items-center space-x-3 p-4 rounded-lg border transition-colors',
                            selectedAnswer === index && !isAnswered && 'border-primary bg-primary/5',
                            isAnswered && index === selectedChallenge.question?.correctAnswer && 'border-success bg-success/10',
                            isAnswered && selectedAnswer === index && index !== selectedChallenge.question?.correctAnswer && 'border-destructive bg-destructive/10'
                          )}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                          {isAnswered && index === selectedChallenge.question?.correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-success" />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {/* Code Template for Coding Challenges */}
                  {selectedChallenge.question.codeTemplate && (
                    <div className="space-y-3">
                      <Label>Code Template:</Label>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        {selectedChallenge.question.codeTemplate}
                      </pre>
                      {selectedChallenge.question.testCases && (
                        <div className="space-y-2">
                          <Label>Test Cases:</Label>
                          <div className="space-y-2">
                            {selectedChallenge.question.testCases.map((tc, i) => (
                              <div key={i} className="bg-muted/50 p-3 rounded text-sm font-mono">
                                <span className="text-muted-foreground">Input: </span>
                                <span>{tc.input}</span>
                                <br />
                                <span className="text-muted-foreground">Expected: </span>
                                <span className="text-success">{tc.output}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Explanation */}
                  {showExplanation && selectedChallenge.question.explanation && (
                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg space-y-2">
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Lightbulb className="h-5 w-5" />
                        Explanation
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {selectedChallenge.question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedChallenge.question?.options && !isAnswered ? (
                  <Button
                    className="flex-1 gradient-primary"
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    Submit Answer
                  </Button>
                ) : selectedChallenge.type === 'coding' || selectedChallenge.type === 'communication' ? (
                  <Button
                    className={cn(
                      'flex-1',
                      selectedChallenge.completed ? 'bg-success hover:bg-success/90' : 'gradient-primary'
                    )}
                    onClick={() => {
                      toggleComplete(selectedChallenge.id);
                      setSelectedChallenge({ ...selectedChallenge, completed: !selectedChallenge.completed });
                      setShowExplanation(true);
                    }}
                  >
                    {selectedChallenge.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      'Mark as Complete'
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                )}
                {!showExplanation && selectedChallenge.question?.explanation && (
                  <Button
                    variant="outline"
                    onClick={() => setShowExplanation(true)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Show Hint
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overlay */}
        {selectedChallenge && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={handleCloseModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default Practice;
