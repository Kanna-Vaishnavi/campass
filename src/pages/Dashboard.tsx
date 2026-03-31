import React from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProgressRing } from '@/components/ui/progress-ring';
import { StatCard } from '@/components/ui/stat-card';
import { mockChallenges } from '@/lib/mockData';
import {
  Target,
  TrendingUp,
  BookOpen,
  Trophy,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react';

const Dashboard = () => {
  const { prediction, assessmentScores, profile } = useUser();
  const navigate = useNavigate();

  const completedChallenges = mockChallenges.filter(c => c.completed).length;
  const totalPoints = mockChallenges.reduce((acc, c) => acc + (c.completed ? c.points : 0), 0);

  if (!prediction) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="gradient-primary p-4 rounded-2xl mb-6">
            <Target className="h-12 w-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold font-display mb-2">Complete Your Assessment First</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            To see your personalized dashboard, you need to complete the placement assessment.
          </p>
          <Button onClick={() => navigate('/')} className="gradient-primary gap-2">
            Start Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Layout>
    );
  }

  const avgScore = Math.round(
    (assessmentScores.aptitude + assessmentScores.coding + assessmentScores.communication + assessmentScores.analytical) / 4
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Track your progress and continue improving your placement chances
            </p>
          </div>
          <Button onClick={() => navigate('/practice')} className="gradient-primary gap-2">
            <Zap className="h-4 w-4" />
            Start Daily Practice
          </Button>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Placement Probability"
            value={`${prediction.probability}%`}
            icon={Target}
            variant="primary"
          />
          <StatCard
            title="Average Score"
            value={`${avgScore}%`}
            icon={TrendingUp}
          />
          <StatCard
            title="Challenges Done"
            value={`${completedChallenges}/${mockChallenges.length}`}
            icon={Trophy}
          />
          <StatCard
            title="Total Points"
            value={totalPoints}
            icon={Zap}
            variant="accent"
          />
        </div>

        {/* Progress Overview */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skill Scores */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Skill Assessment Scores</CardTitle>
              <CardDescription>Your performance across different skill areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(assessmentScores).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <ProgressRing value={value} size={90} />
                    <p className="mt-3 font-medium capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Weekly Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Practice Sessions</span>
                  <span className="font-medium">3/7</span>
                </div>
                <Progress value={43} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Challenges Completed</span>
                  <span className="font-medium">5/10</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Resources Reviewed</span>
                  <span className="font-medium">2/5</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Challenges */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Challenges</CardTitle>
                <CardDescription>Complete these to boost your skills</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => navigate('/practice')}>
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {mockChallenges.slice(0, 3).map((challenge) => (
                <Card key={challenge.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={
                      challenge.type === 'aptitude' ? 'default' :
                      challenge.type === 'coding' ? 'secondary' : 'outline'
                    }>
                      {challenge.type}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Zap className="h-3 w-3" />
                      {challenge.points} pts
                    </Badge>
                  </div>
                  <h4 className="font-medium mb-2">{challenge.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {challenge.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      challenge.difficulty === 'easy' ? 'secondary' :
                      challenge.difficulty === 'medium' ? 'default' : 'destructive'
                    }>
                      {challenge.difficulty}
                    </Badge>
                    {challenge.completed ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Button size="sm" variant="ghost">
                        Start
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1" onClick={() => navigate('/resources')}>
            <div className="flex items-center gap-4">
              <div className="gradient-primary p-3 rounded-xl">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Learning Resources</h3>
                <p className="text-sm text-muted-foreground">Explore courses and tutorials</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1" onClick={() => navigate('/companies')}>
            <div className="flex items-center gap-4">
              <div className="gradient-accent p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Company Insights</h3>
                <p className="text-sm text-muted-foreground">View hiring trends</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1" onClick={() => navigate('/practice')}>
            <div className="flex items-center gap-4">
              <div className="gradient-success p-3 rounded-xl">
                <Trophy className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Daily Practice</h3>
                <p className="text-sm text-muted-foreground">Sharpen your skills</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
