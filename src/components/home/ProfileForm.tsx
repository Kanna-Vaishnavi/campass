import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { degreeOptions, branchOptions, areasOfInterest, technicalSkillsList } from '@/lib/mockData';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProfileForm() {
  const { userType, profile, updateProfile, setCurrentStep, markStepComplete } = useUser();
  const [cgpa, setCgpa] = useState(profile.cgpa || 7);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.areasOfInterest || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(profile.technicalSkills || []);
  const [preferredRoles, setPreferredRoles] = useState<string[]>(profile.preferredJobRoles || []);
  const [roleInput, setRoleInput] = useState('');

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addRole = () => {
    if (roleInput.trim() && !preferredRoles.includes(roleInput.trim())) {
      setPreferredRoles(prev => [...prev, roleInput.trim()]);
      setRoleInput('');
    }
  };

  const removeRole = (role: string) => {
    setPreferredRoles(prev => prev.filter(r => r !== role));
  };

  // Validation check
  const isFormValid = () => {
    const hasAcademicYear = !!profile.academicYear;
    const hasDegree = !!profile.degree;
    const hasBranch = !!profile.branch;
    const hasCGPA = profile.academicYear === 'Fresher' || cgpa >= 4;
    const hasInterests = selectedInterests.length > 0;
    
    return hasAcademicYear && hasDegree && hasBranch && hasCGPA && hasInterests;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }
    
    updateProfile({
      userType,
      cgpa: profile.academicYear === 'Fresher' ? undefined : cgpa,
      areasOfInterest: selectedInterests,
      technicalSkills: selectedSkills,
      preferredJobRoles: preferredRoles,
    });
    markStepComplete(1);
    setCurrentStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setCurrentStep(0)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold font-display">Complete Your Profile</h2>
        <div className="w-24" />
      </div>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
          <CardDescription>Tell us about your educational background</CardDescription>
        </CardHeader>
<CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Academic Year <span className="text-destructive">*</span></Label>
            <Select
              value={profile.academicYear}
              onValueChange={(value) => updateProfile({ academicYear: value })}
            >
              <SelectTrigger className={!profile.academicYear ? 'border-destructive/50' : ''}>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
                <SelectItem value="Graduate">Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Degree <span className="text-destructive">*</span></Label>
            <Select
              value={profile.degree}
              onValueChange={(value) => updateProfile({ degree: value })}
            >
              <SelectTrigger className={!profile.degree ? 'border-destructive/50' : ''}>
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
              <SelectContent>
                {degreeOptions.map(degree => (
                  <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Branch/Specialization <span className="text-destructive">*</span></Label>
            <Select
              value={profile.branch}
              onValueChange={(value) => updateProfile({ branch: value })}
            >
              <SelectTrigger className={!profile.branch ? 'border-destructive/50' : ''}>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branchOptions.map(branch => (
                  <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* CGPA - Only show if NOT Fresher */}
          {profile.academicYear && profile.academicYear !== 'Fresher' && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>CGPA / Percentage <span className="text-destructive">*</span></Label>
                <span className="text-sm font-medium text-primary">{cgpa.toFixed(1)}</span>
              </div>
              <Slider
                value={[cgpa]}
                onValueChange={([value]) => setCgpa(value)}
                max={10}
                min={4}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4.0</span>
                <span>10.0</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Non-fresher specific fields */}
      {userType === 'non-fresher' && (
        <Card>
          <CardHeader>
            <CardTitle>Experience Details</CardTitle>
            <CardDescription>Share your professional experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Number of Internships</Label>
                <Select
                  value={profile.internships?.toString()}
                  onValueChange={(value) => updateProfile({ internships: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Internship' : 'Internships'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Projects Completed</Label>
                <Input
                  placeholder="e.g., E-commerce App, ML Model"
                  value={profile.projects?.join(', ') || ''}
                  onChange={(e) => updateProfile({ projects: e.target.value.split(',').map(p => p.trim()).filter(Boolean) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Work Experience (Optional)</Label>
              <Textarea
                placeholder="Describe any relevant work experience..."
                value={profile.workExperience || ''}
                onChange={(e) => updateProfile({ workExperience: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technical Skills */}
      {userType === 'non-fresher' && (
        <Card>
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
            <CardDescription>Select your technical competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {technicalSkillsList.map(skill => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-all hover:scale-105',
                    selectedSkills.includes(skill) && 'gradient-primary border-0'
                  )}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Areas of Interest */}
      <Card>
        <CardHeader>
          <CardTitle>Areas of Interest <span className="text-destructive">*</span></CardTitle>
          <CardDescription>Select at least one domain you're interested in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {areasOfInterest.map(interest => (
              <Badge
                key={interest}
                variant={selectedInterests.includes(interest) ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-all hover:scale-105',
                  selectedInterests.includes(interest) && 'gradient-accent border-0'
                )}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferred Job Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Preferred Job Roles</CardTitle>
          <CardDescription>Add roles you're targeting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Software Engineer"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRole())}
            />
            <Button onClick={addRole} variant="secondary">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferredRoles.map(role => (
              <Badge key={role} variant="secondary" className="gap-1">
                {role}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeRole(role)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col items-end gap-2">
        {!isFormValid() && (
          <p className="text-sm text-destructive">
            Please fill all required fields (marked with *) to continue
          </p>
        )}
        <Button 
          onClick={handleSubmit} 
          className="gradient-primary gap-2"
          disabled={!isFormValid()}
        >
          Continue to Assessment
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
