import { useEffect } from 'react';
import { BarChart3, Target, Shield, TrendingUp, Cpu, Gauge, Wallet, Monitor } from 'lucide-react';
import { useStep } from '@/contexts/StepContext';
import StepContainer from '@/components/StepContainer';
import Step1CashFlow from '@/components/steps/Step1CashFlow';
import Step2NetWorth from '@/components/steps/Step2NetWorth';
import Step3Goals from '@/components/steps/Step3Goals';
import Step4RiskAssessment from '@/components/steps/Step4RiskAssessment';
import Step5WealthProtection from '@/components/steps/Step5WealthProtection';
import Step6Plan from '@/components/steps/Step6Plan';
import Step7Track from '@/components/steps/Step7Track';
import Step8Status from '@/components/steps/Step8Status';

const STEPS = [
  { number: 1, title: 'Cash Flow', description: 'Track your income and expenses', icon: Wallet },
  { number: 2, title: 'Net Worth', description: 'Calculate your assets and liabilities', icon: Gauge },
  { number: 3, title: 'Goals', description: 'Define your financial goals', icon: Target },
  { number: 4, title: 'Risk Assessment', description: 'Evaluate your risk profile', icon: Shield },
  { number: 5, title: 'Protection', description: 'Assess wealth protection needs', icon: Shield },
  { number: 6, title: 'Plan', description: 'Get AI-powered recommendations', icon: Cpu },
  { number: 7, title: 'Track', description: 'Monitor your progress', icon: Monitor },
   { number: 8, title: 'Status', description: 'View your financial dashboard', icon: BarChart3 },
];

export default function Journey() {
  const { currentStep, loadFromLocalStorage, saveToLocalStorage } = useStep();

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CashFlow />;
      case 2:
        return <Step2NetWorth />;
      case 3:
        return <Step3Goals />;
      case 4:
        return <Step4RiskAssessment />;
      case 5:
        return <Step5WealthProtection />;
      case 6:
        return <Step6Plan />;
      case 7:
        return <Step7Track />;
      case 8:
        return <Step8Status />;
      default:
        return <Step1CashFlow />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <StepContainer steps={STEPS} currentStep={currentStep}>
        {renderStep()}
      </StepContainer>
    </div>
  );
}
