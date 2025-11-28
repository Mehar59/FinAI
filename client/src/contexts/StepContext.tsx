import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CashFlowData {
  monthlyIncome: number;
  monthlyExpenses: Record<string, number>;
  totalExpenses: number;
  netCashFlow: number;
}

export interface AssetLiability {
  id: string;
  name: string;
  amount: number;
}

export interface NetWorthData {
  assets: AssetLiability[];
  liabilities: AssetLiability[];
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  timeline: number;
  category: string;
  priority: number;
}

export interface GoalsData {
  goals: FinancialGoal[];
}

export interface RiskAssessmentData {
  riskTolerance: number;
  riskCapacity: number;
  overallRiskProfile: string;
}

export interface WealthProtectionData {
  cyberAwareness: number;
  emergencyFundMonths: number;
  insuranceNeeds: Record<string, boolean>;
  protectionScore: number;
}

export interface UserData {
  age: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface RecommendationData {
  equityAllocation: number;
  debtAllocation: number;
  mutualFunds: Array<{
    name: string;
    type: string;
    allocation: number;
    riskLevel: string;
  }>;
  commodities: Array<{
    name: string;
    allocation: number;
    reasoning: string;
  }>;
  cryptocurrency: Array<{
    name: string;
    allocation: number;
    reasoning: string;
  }>;
  emergencyFund: number;
  investmentStrategy: string;
}

export interface StepContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  
  // Step data
  cashFlow: CashFlowData;
  setCashFlow: (data: CashFlowData) => void;
  
  netWorth: NetWorthData;
  setNetWorth: (data: NetWorthData) => void;
  
  goals: GoalsData;
  setGoals: (data: GoalsData) => void;
  
  riskAssessment: RiskAssessmentData;
  setRiskAssessment: (data: RiskAssessmentData) => void;
  
  wealthProtection: WealthProtectionData;
  setWealthProtection: (data: WealthProtectionData) => void;
  
  userData: UserData;
  setUserData: (data: UserData) => void;
  
  recommendations: RecommendationData | null;
  setRecommendations: (data: RecommendationData | null) => void;
  
  trackingHistory: Array<any>;
  addTrackingRecord: (record: any) => void;
  
  // Helper functions
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetAllData: () => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

const defaultCashFlow: CashFlowData = {
  monthlyIncome: 0,
  monthlyExpenses: {},
  totalExpenses: 0,
  netCashFlow: 0,
};

const defaultNetWorth: NetWorthData = {
  assets: [],
  liabilities: [],
  totalAssets: 0,
  totalLiabilities: 0,
  netWorth: 0,
};

const defaultGoals: GoalsData = {
  goals: [],
};

const defaultRiskAssessment: RiskAssessmentData = {
  riskTolerance: 5,
  riskCapacity: 5,
  overallRiskProfile: 'Moderate',
};

const defaultWealthProtection: WealthProtectionData = {
  cyberAwareness: 5,
  emergencyFundMonths: 6,
  insuranceNeeds: {},
  protectionScore: 0,
};

const defaultUserData: UserData = {
  age: 30,
  monthlyIncome: 0,
  monthlyExpenses: 0,
};

export function StepProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [cashFlow, setCashFlow] = useState<CashFlowData>(defaultCashFlow);
  const [netWorth, setNetWorth] = useState<NetWorthData>(defaultNetWorth);
  const [goals, setGoals] = useState<GoalsData>(defaultGoals);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessmentData>(defaultRiskAssessment);
  const [wealthProtection, setWealthProtection] = useState<WealthProtectionData>(defaultWealthProtection);
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [recommendations, setRecommendations] = useState<RecommendationData | null>(null);
  const [trackingHistory, setTrackingHistory] = useState<Array<any>>([]);

  const addTrackingRecord = useCallback((record: any) => {
    setTrackingHistory(prev => [...prev, { ...record, timestamp: new Date().toISOString() }]);
  }, []);

  const saveToLocalStorage = useCallback(() => {
    const data = {
      currentStep,
      cashFlow,
      netWorth,
      goals,
      riskAssessment,
      wealthProtection,
      userData,
      recommendations,
      trackingHistory,
    };
    localStorage.setItem('ffp_journeyData', JSON.stringify(data));
  }, [currentStep, cashFlow, netWorth, goals, riskAssessment, wealthProtection, userData, recommendations, trackingHistory]);

  const loadFromLocalStorage = useCallback(() => {
    const saved = localStorage.getItem('ffp_journeyData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentStep(data.currentStep || 1);
        setCashFlow(data.cashFlow || defaultCashFlow);
        setNetWorth(data.netWorth || defaultNetWorth);
        setGoals(data.goals || defaultGoals);
        setRiskAssessment(data.riskAssessment || defaultRiskAssessment);
        setWealthProtection(data.wealthProtection || defaultWealthProtection);
        setUserData(data.userData || defaultUserData);
        setRecommendations(data.recommendations || null);
        setTrackingHistory(data.trackingHistory || []);
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    }
  }, []);

  const resetAllData = useCallback(() => {
    setCurrentStep(1);
    setCashFlow(defaultCashFlow);
    setNetWorth(defaultNetWorth);
    setGoals(defaultGoals);
    setRiskAssessment(defaultRiskAssessment);
    setWealthProtection(defaultWealthProtection);
    setUserData(defaultUserData);
    setRecommendations(null);
    setTrackingHistory([]);
    localStorage.removeItem('ffp_journeyData');
  }, []);

  const value: StepContextType = {
    currentStep,
    setCurrentStep,
    cashFlow,
    setCashFlow,
    netWorth,
    setNetWorth,
    goals,
    setGoals,
    riskAssessment,
    setRiskAssessment,
    wealthProtection,
    setWealthProtection,
    userData,
    setUserData,
    recommendations,
    setRecommendations,
    trackingHistory,
    addTrackingRecord,
    saveToLocalStorage,
    loadFromLocalStorage,
    resetAllData,
  };

  return (
    <StepContext.Provider value={value}>
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  const context = useContext(StepContext);
  if (context === undefined) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
}
