import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projectIdeas, learningResources, certifications } from '@/lib/mockData';
import {
  BookOpen,
  Video,
  Award,
  ExternalLink,
  Search,
  TrendingUp,
  Lightbulb,
  Users,
  Star,
  Clock,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = learningResources.filter(
    course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const trendingSkills = ['GenAI', 'LLMs', 'System Design', 'Kubernetes', 'React', 'TypeScript'];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Learning Resources</h1>
            <p className="text-muted-foreground">
              Curated courses, certifications, and project ideas
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Trending Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trending Skills in 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {trendingSkills.map((skill) => (
                <Badge
                  key={skill}
                  className="px-4 py-2 text-sm cursor-pointer hover:scale-105 transition-transform gradient-primary border-0"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="courses">
          <TabsList className="mb-6">
            <TabsTrigger value="courses" className="gap-2">
              <Video className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="certifications" className="gap-2">
              <Award className="h-4 w-4" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Project Ideas
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant={course.isPaid ? 'default' : 'secondary'}>
                        {course.isPaid ? (course.price || 'Paid') : 'Free'}
                      </Badge>
                      {course.trending && (
                        <Badge className="gradient-accent border-0 gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-3 line-clamp-2">{course.title}</CardTitle>
                    <CardDescription>
                      {course.platform} • {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.enrolled}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {course.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full gradient-primary gap-2"
                      onClick={() => window.open(course.url, '_blank')}
                    >
                      View Course
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="gradient-primary p-3 rounded-xl">
                      <Award className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cert.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant={
                      cert.difficulty === 'Beginner' ? 'secondary' :
                      cert.difficulty === 'Intermediate' ? 'default' : 'destructive'
                    }>
                      {cert.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {cert.value} Value
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{cert.cost}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{cert.duration}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => window.open(cert.url, '_blank')}
                  >
                    Learn More
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid md:grid-cols-2 gap-6">
              {projectIdeas.map((project, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="gradient-accent p-3 rounded-xl">
                      <Lightbulb className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={project.type === 'individual' ? 'secondary' : 'default'}>
                        {project.type}
                      </Badge>
                      <Badge variant={
                        project.difficulty === 'Beginner' ? 'secondary' :
                        project.difficulty === 'Intermediate' ? 'default' : 'destructive'
                      }>
                        {project.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Resources;
