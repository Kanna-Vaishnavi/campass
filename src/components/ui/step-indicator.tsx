import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  className?: string;
}

export function StepIndicator({ steps, currentStep, completedSteps, className }: StepIndicatorProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index);
        const isCurrent = currentStep === index;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                  isCompleted
                    ? 'border-success bg-success text-success-foreground'
                    : isCurrent
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium text-center max-w-[80px]',
                  isCurrent ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-2 transition-all duration-300',
                  isCompleted ? 'bg-success' : 'bg-muted'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
