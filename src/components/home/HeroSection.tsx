import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div
          className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-info/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center py-16 md:py-24">
        <Badge className="mb-6 px-4 py-1.5 text-sm font-medium gradient-primary border-0">
          <Sparkles className="h-3.5 w-3.5 mr-2" />
          AI-Powered Career Guidance
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 tracking-tight">
          Predict Your{' '}
          <span className="gradient-text">Placement Success</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Get personalized placement predictions, skill assessments, and tailored
          career guidance to maximize your chances of landing your dream job.
        </p>
      </div>
    </div>
  );
}
