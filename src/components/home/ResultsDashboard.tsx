import React, { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { calculatePlacementProbability, getCompanyRecommendations, getInterviewStrategy } from '@/lib/predictionEngine';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressRing } from '@/components/ui/progress-ring';
import { StatCard } from '@/components/ui/stat-card';
import { UserProfile, AssessmentScores } from '@/types/user';
import { 
  Target, 
  TrendingUp, 
  Briefcase, 
  DollarSign, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Building2,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResultsDashboard() {
  const { profile, assessmentScores, prediction, setPrediction, markStepComplete } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!prediction && profile.userType) {
      const fullProfile: UserProfile = {
        userType: profile.userType,
        academicYear: profile.academicYear || '',
        degree: profile.degree || '',
        branch: profile.branch || '',
        cgpa: profile.cgpa || 7,
        areasOfInterest: profile.areasOfInterest || [],
        preferredJobRoles: profile.preferredJobRoles || [],
        targetCompanies: profile.targetCompanies || [],
        internships: profile.internships,
        technicalSkills: profile.technicalSkills,
        projects: profile.projects,
        workExperience: profile.workExperience,
      };
      const result = calculatePlacementProbability(fullProfile, assessmentScores);
      setPrediction(result);
      markStepComplete(3);
    }
  }, [profile, assessmentScores, prediction, setPrediction, markStepComplete]);

  if (!prediction) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Analyzing your profile...</p>
        </div>
      </div>
    );
  }

  const companies = getCompanyRecommendations(prediction);
  const strategies = getInterviewStrategy(prediction);

  const readinessColors = {
    high: 'text-success',
    moderate: 'text-warning',
    'needs-improvement': 'text-destructive',
  };

  const readinessLabels = {
    high: 'High Readiness',
    moderate: 'Moderate Readiness',
    'needs-improvement': 'Needs Improvement',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-display mb-2">Your Placement Analysis</h2>
        <p className="text-muted-foreground">Based on your profile and assessment scores</p>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="md:col-span-2 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">Placement Probability</h3>
              <p className={cn('text-2xl font-bold mt-2', readinessColors[prediction.readinessLevel])}>
                {readinessLabels[prediction.readinessLevel]}
              </p>
            </div>
            <ProgressRing value={prediction.probability} size={100} />
          </div>
        </Card>

        <StatCard
          title="Expected Package"
          value={`₹${prediction.expectedPackageRange.min}-${prediction.expectedPackageRange.max} LPA`}
          icon={DollarSign}
          variant="primary"
        />

        <StatCard
          title="Recommended Roles"
          value={prediction.recommendedRoles.length}
          icon={Briefcase}
          description="Matching your skills"
        />
      </div>

      {/* Assessment Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Assessment Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(assessmentScores).map(([key, value]) => (
              <div key={key} className="text-center p-4 rounded-lg bg-muted/50">
                <ProgressRing value={value} size={80} />
                <p className="mt-2 font-medium capitalize">{key}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle className="h-5 w-5" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {prediction.strengths.map((strength, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertCircle className="h-5 w-5" />
              Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {prediction.improvements.map((improvement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Roles & Companies */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Recommended Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {prediction.recommendedRoles.map((role, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {role}
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Company Types:</p>
              <div className="flex flex-wrap gap-2">
                {prediction.companyTypes.map((type, index) => (
                  <Badge key={index} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Target Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {companies.map((company, index) => (
                <Badge key={index} className="gradient-primary border-0">
                  {company}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Interview Preparation Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((strategy, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="gradient-accent text-accent-foreground w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-sm">{strategy}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Recommended Learning Paths
          </CardTitle>
          <CardDescription>Curated resources to boost your placement chances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prediction.learningPaths.slice(0, 6).map((path, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{path.skill}</h4>
                  <Badge
                    variant={path.priority === 'high' ? 'destructive' : path.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {path.priority}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {path.resources.slice(0, 2).map((resource, rIndex) => (
                    <li key={rIndex} className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{resource.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {resource.isPaid ? 'Paid' : 'Free'}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{resource.platform}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          onClick={() => navigate('/dashboard')}
          size="lg"
          className="gradient-primary gap-2"
        >
          Go to Dashboard
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => navigate('/practice')}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          Start Practicing
          <TrendingUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
