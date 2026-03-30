import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { companyInsights, CompanyInsight } from '@/lib/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  Search,
  DollarSign,
  Calendar,
  CheckCircle,
  TrendingUp,
  ExternalLink,
  MapPin,
  Briefcase,
  Users,
  GraduationCap,
  Target,
  Lightbulb,
  Heart,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<CompanyInsight | null>(null);

  const filteredCompanies = companyInsights.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || company.type === selectedType;
    return matchesSearch && matchesType;
  });

  const hiringUpdates = [
    { company: 'Google', update: 'Off-campus hiring starts next month', date: '2 days ago', type: 'positive' },
    { company: 'Microsoft', update: 'Increased package for SDE roles', date: '1 week ago', type: 'positive' },
    { company: 'Amazon', update: 'Virtual interview rounds confirmed', date: '3 days ago', type: 'neutral' },
    { company: 'TCS', update: 'Hiring for 10,000+ freshers', date: '5 days ago', type: 'positive' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Company Insights</h1>
            <p className="text-muted-foreground">
              Explore companies, hiring trends, and eligibility criteria
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Hiring Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Latest Hiring Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hiringUpdates.map((update, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-4 rounded-lg border',
                    update.type === 'positive' && 'border-success/50 bg-success/5',
                    update.type === 'neutral' && 'border-border bg-muted/50'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{update.company}</span>
                    <span className="text-xs text-muted-foreground">{update.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.update}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="gradient-primary p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{companyInsights.length}</p>
                <p className="text-xs text-muted-foreground">Companies</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="gradient-accent p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹6-28 LPA</p>
                <p className="text-xs text-muted-foreground">Package Range</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="gradient-success p-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">150+</p>
                <p className="text-xs text-muted-foreground">Open Positions</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-warning/10 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Hiring This Month</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Company Type Filter */}
        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Companies</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
            <TabsTrigger value="startup">Startup</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedType}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Card
                  key={company.id}
                  className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedCompany(company)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          <Building2 className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                          <Badge
                            variant={
                              company.type === 'product' ? 'default' :
                              company.type === 'service' ? 'secondary' : 'outline'
                            }
                            className={cn(
                              company.type === 'product' && 'gradient-primary border-0'
                            )}
                          >
                            {company.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {company.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-success" />
                        <div>
                          <p className="text-sm font-medium">₹{company.averagePackage} LPA</p>
                          <p className="text-xs text-muted-foreground">Avg Package</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{company.hiringPeriod}</p>
                          <p className="text-xs text-muted-foreground">Hiring</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Eligibility
                      </p>
                      <p className="text-sm">{company.eligibilityCriteria}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {company.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {company.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{company.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2">
                      View Details
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Company Details Dialog */}
        <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            {selectedCompany && (
              <ScrollArea className="max-h-[90vh]">
                <div className="p-6 space-y-6">
                  <DialogHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl">{selectedCompany.name}</DialogTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={cn(
                            selectedCompany.type === 'product' && 'gradient-primary border-0'
                          )}>
                            {selectedCompany.type}
                          </Badge>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-success font-semibold">₹{selectedCompany.averagePackage} LPA avg</span>
                        </div>
                      </div>
                    </div>
                    <DialogDescription className="text-base mt-4">
                      {selectedCompany.description}
                    </DialogDescription>
                  </DialogHeader>

                  <Separator />

                  {/* Open Roles */}
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Open Roles
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {selectedCompany.roles.map((role, i) => (
                        <Card key={i} className="p-4">
                          <h4 className="font-medium">{role.title}</h4>
                          <p className="text-success font-semibold">{role.package}</p>
                          <p className="text-sm text-muted-foreground">{role.openings} openings</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Interview Process */}
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-primary" />
                      Interview Process
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Duration: {selectedCompany.interviewProcess.duration}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.interviewProcess.rounds.map((round, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Badge variant="outline" className="text-sm py-1.5">
                              {i + 1}. {round}
                            </Badge>
                            {i < selectedCompany.interviewProcess.rounds.length - 1 && (
                              <span className="text-muted-foreground">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          Interview Tips
                        </h4>
                        <ul className="space-y-1">
                          {selectedCompany.interviewProcess.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Hiring Trends */}
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Hiring Trends
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedCompany.hiringTrends.map((trend, i) => (
                        <Card key={i} className="p-4 text-center">
                          <p className="text-2xl font-bold">{trend.hired}</p>
                          <p className="text-sm text-muted-foreground">{trend.year}</p>
                          <Badge className={cn(
                            'mt-2',
                            trend.growth.startsWith('+') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                          )}>
                            {trend.growth}
                          </Badge>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Eligibility & Skills */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Eligibility
                      </h3>
                      <p className="text-muted-foreground">{selectedCompany.eligibilityCriteria}</p>
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCompany.skills.map((skill) => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                        <MapPin className="h-5 w-5 text-primary" />
                        Locations
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.locations.map((loc) => (
                          <Badge key={loc} variant="secondary">{loc}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Culture & Benefits */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                        <Users className="h-5 w-5 text-primary" />
                        Culture
                      </h3>
                      <ul className="space-y-2">
                        {selectedCompany.culture.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                        <Heart className="h-5 w-5 text-primary" />
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {selectedCompany.benefits.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  {/* CTA */}
                  <div className="flex gap-4">
                    <Button 
                      className="flex-1 gradient-primary gap-2"
                      onClick={() => window.open(selectedCompany.website, '_blank')}
                    >
                      <Globe className="h-4 w-4" />
                      Visit Careers Page
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedCompany(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Companies;
