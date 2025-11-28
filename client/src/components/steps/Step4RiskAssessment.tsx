import { useState } from 'react';
import { useStep } from '@/contexts/StepContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

const RISK_TOLERANCE_QUESTIONS = [
  {
    id: 1,
    question: 'How would you react if your investment dropped 20% in value?',
    options: [
      { text: 'Sell immediately to avoid further losses', score: 1 },
      { text: 'Hold and wait for recovery', score: 5 },
      { text: 'Buy more at the lower price', score: 9 },
    ],
  },
  {
    id: 2,
    question: 'What is your investment time horizon?',
    options: [
      { text: 'Less than 2 years', score: 1 },
      { text: '2-5 years', score: 5 },
      { text: 'More than 5 years', score: 9 },
    ],
  },
  {
    id: 3,
    question: 'How comfortable are you with market volatility?',
    options: [
      { text: 'Very uncomfortable - prefer stable returns', score: 1 },
      { text: 'Moderately comfortable - accept some fluctuation', score: 5 },
      { text: 'Very comfortable - expect and accept volatility', score: 9 },
    ],
  },
];

const RISK_CAPACITY_QUESTIONS = [
  {
    id: 1,
    question: 'What percentage of your income can you afford to invest annually?',
    options: [
      { text: 'Less than 5%', score: 1 },
      { text: '5-15%', score: 5 },
      { text: 'More than 15%', score: 9 },
    ],
  },
  {
    id: 2,
    question: 'Do you have an emergency fund?',
    options: [
      { text: 'No emergency fund', score: 1 },
      { text: '1-3 months of expenses', score: 5 },
      { text: '6+ months of expenses', score: 9 },
    ],
  },
  {
    id: 3,
    question: 'What is your current debt situation?',
    options: [
      { text: 'High debt (debt > assets)', score: 1 },
      { text: 'Moderate debt (debt < assets)', score: 5 },
      { text: 'Low/No debt', score: 9 },
    ],
  },
];

export default function Step4RiskAssessment() {
  const { riskAssessment, setRiskAssessment } = useStep();
  const [toleranceAnswers, setToleranceAnswers] = useState<Record<number, number>>({});
  const [capacityAnswers, setCapacityAnswers] = useState<Record<number, number>>({});

  const handleToleranceAnswer = (questionId: number, score: number) => {
    setToleranceAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleCapacityAnswer = (questionId: number, score: number) => {
    setCapacityAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateRiskTolerance = () => {
    const scores = Object.values(toleranceAnswers);
    if (scores.length === 0) return 5;
    return Math.round(scores.reduce((a, b) => a + b) / scores.length);
  };

  const calculateRiskCapacity = () => {
    const scores = Object.values(capacityAnswers);
    if (scores.length === 0) return 5;
    return Math.round(scores.reduce((a, b) => a + b) / scores.length);
  };

  const getRiskProfile = (tolerance: number, capacity: number) => {
    const average = (tolerance + capacity) / 2;
    if (average <= 3) return 'Conservative';
    if (average <= 6) return 'Moderate';
    return 'Aggressive';
  };

  const handleSave = () => {
    const tolerance = calculateRiskTolerance();
    const capacity = calculateRiskCapacity();
    const profile = getRiskProfile(tolerance, capacity);

    setRiskAssessment({
      riskTolerance: tolerance,
      riskCapacity: capacity,
      overallRiskProfile: profile,
    });
  };

  const riskTolerance = calculateRiskTolerance();
  const riskCapacity = calculateRiskCapacity();
  const riskProfile = getRiskProfile(riskTolerance, riskCapacity);
  const allAnswered = Object.keys(toleranceAnswers).length === 3 && Object.keys(capacityAnswers).length === 3;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Assess Your Risk Profile</h2>
        <p className="text-gray-600">
          Answer questions about your risk tolerance and capacity to determine your investment profile.
        </p>
      </div>

      {/* Risk Tolerance Section */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Risk Tolerance (How much risk are you willing to take?)
        </h3>
        <div className="space-y-6">
          {RISK_TOLERANCE_QUESTIONS.map(question => (
            <div key={question.id} className="bg-white p-4 rounded-lg">
              <p className="font-medium text-gray-900 mb-3">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`tolerance-${question.id}`}
                      checked={toleranceAnswers[question.id] === option.score}
                      onChange={() => handleToleranceAnswer(question.id, option.score)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk Capacity Section */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-green-600" />
          Risk Capacity (How much risk can you afford to take?)
        </h3>
        <div className="space-y-6">
          {RISK_CAPACITY_QUESTIONS.map(question => (
            <div key={question.id} className="bg-white p-4 rounded-lg">
              <p className="font-medium text-gray-900 mb-3">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`capacity-${question.id}`}
                      checked={capacityAnswers[question.id] === option.score}
                      onChange={() => handleCapacityAnswer(question.id, option.score)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Results Summary */}
      {allAnswered && (
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-purple-600" />
            Your Risk Profile
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Risk Tolerance</p>
              <p className="text-3xl font-bold text-blue-600">{riskTolerance}/10</p>
              <p className="text-xs text-gray-500 mt-1">Willingness to take risk</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Risk Capacity</p>
              <p className="text-3xl font-bold text-green-600">{riskCapacity}/10</p>
              <p className="text-xs text-gray-500 mt-1">Ability to take risk</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Overall Profile</p>
              <p className={`text-2xl font-bold ${
                riskProfile === 'Conservative' ? 'text-blue-600' :
                riskProfile === 'Moderate' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {riskProfile}
              </p>
              <p className="text-xs text-gray-500 mt-1">Investment approach</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Your risk profile is determined by both your willingness and ability to take risk.
              The lower of the two is typically your actual risk capacity.
            </p>
          </div>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          size="lg" 
          className="gap-2"
          disabled={!allAnswered}
        >
          Save Risk Assessment
        </Button>
      </div>
    </div>
  );
}
