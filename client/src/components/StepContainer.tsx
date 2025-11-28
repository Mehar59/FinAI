import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStep } from '@/contexts/StepContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Step {
  icon: LucideIcon;
  number: number;
  title: string;
  description: string;
}

interface StepContainerProps {
  steps: Step[];
  currentStep: number;
  children: React.ReactNode;
}

export default function StepContainer({ steps, currentStep, children }: StepContainerProps) {
  const { setCurrentStep, saveToLocalStorage } = useStep();

  const handleNext = () => {
    if (currentStep < steps.length) {
      saveToLocalStorage();
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      saveToLocalStorage();
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepNumber: number) => {
    saveToLocalStorage();
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FinAI Planner</h1>
              <p className="text-sm text-gray-600 mt-1">Step {currentStep} of {steps.length}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-blue-600">{currentStepData?.title}</p>
              <p className="text-sm text-gray-600">{currentStepData?.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-50 border-b sticky top-[64px] z-30">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => handleStepClick(step.number)}>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all duration-300 ${
                    step.number === currentStep
                      ? 'bg-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-200'
                      : step.number < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <step.icon className='w-6 h-6' />
                  </div>
                  <p className={`text-xs font-medium transition-colors ${step.number === currentStep ? 'text-blue-600' : 'text-gray-500'}`}>{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 rounded-full transition-colors duration-500 ${step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {children}
        </div>
      </main>

      {/* Navigation Buttons */}
      <footer className="bg-gray-50 border-t sticky bottom-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-center hidden sm:block">
              <p className="text-sm text-gray-600">
                Step <span className="font-bold text-blue-600">{currentStep}</span> of{' '}
                <span className="font-bold">{steps.length}</span>
              </p>
            </div>

            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
