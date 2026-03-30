import React from 'react';
import { useUser } from '@/context/UserContext';
import { UserType } from '@/types/user';
import { Card } from '@/components/ui/card';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserTypeCardProps {
  type: UserType;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  isSelected: boolean;
  onSelect: () => void;
}

function UserTypeCard({ type, title, description, icon, features, isSelected, onSelect }: UserTypeCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        'relative p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group overflow-hidden',
        isSelected
          ? 'border-primary shadow-glow ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50'
      )}
    >
      {/* Background gradient on hover */}
      <div className={cn(
        'absolute inset-0 opacity-0 transition-opacity duration-300',
        isSelected ? 'opacity-5' : 'group-hover:opacity-5'
      )} style={{ background: 'var(--gradient-primary)' }} />

      <div className="relative z-10">
        <div className={cn(
          'inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-all duration-300',
          isSelected ? 'gradient-primary' : 'bg-primary/10 group-hover:bg-primary/20'
        )}>
          <div className={cn(
            'transition-colors',
            isSelected ? 'text-primary-foreground' : 'text-primary'
          )}>
            {icon}
          </div>
        </div>

        <h3 className="text-xl font-bold font-display mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className={cn(
          'flex items-center gap-2 font-medium transition-colors',
          isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
        )}>
          <span>Get Started</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Card>
  );
}

export function UserTypeSelection() {
  const { userType, setUserType, setCurrentStep } = useUser();

  const handleSelect = (type: UserType) => {
    setUserType(type);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Let's Get Started
        </h2>
        <p className="text-lg text-muted-foreground">
          Tell us about your current status so we can personalize your experience
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <UserTypeCard
          type="fresher"
          title="I'm a Fresher"
          description="Currently pursuing my degree with no prior work experience"
          icon={<GraduationCap className="h-7 w-7" />}
          features={[
            'Academic profile analysis',
            'Skill assessment modules',
            'Entry-level job recommendations',
            'Campus placement preparation',
          ]}
          isSelected={userType === 'fresher'}
          onSelect={() => handleSelect('fresher')}
        />

        <UserTypeCard
          type="non-fresher"
          title="I Have Experience"
          description="I have internships, projects, or work experience"
          icon={<Briefcase className="h-7 w-7" />}
          features={[
            'Experience-weighted analysis',
            'Advanced skill mapping',
            'Higher package recommendations',
            'Career growth strategies',
          ]}
          isSelected={userType === 'non-fresher'}
          onSelect={() => handleSelect('non-fresher')}
        />
      </div>
    </div>
  );
}
