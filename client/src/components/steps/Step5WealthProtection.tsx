import { useState } from 'react';
import { useStep } from '@/contexts/StepContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Shield, AlertTriangle } from 'lucide-react';

const INSURANCE_TYPES = [
  { name: 'Life Insurance', description: 'Protects your family from financial loss' },
  { name: 'Health Insurance', description: 'Covers medical expenses' },
  { name: 'Disability Insurance', description: 'Replaces income if you become disabled' },
  { name: 'Home Insurance', description: 'Protects your property' },
  { name: 'Auto Insurance', description: 'Covers vehicle-related risks' },
  { name: 'Travel Insurance', description: 'Covers travel-related risks' },
];

const CYBER_SECURITY_QUESTIONS = [
  {
    id: 1,
    question: 'Do you use strong, unique passwords for financial accounts?',
    score: 2,
  },
  {
    id: 2,
    question: 'Do you enable two-factor authentication (2FA)?',
    score: 2,
  },
  {
    id: 3,
    question: 'Do you regularly update your devices and software?',
    score: 2,
  },
  {
    id: 4,
    question: 'Do you avoid phishing emails and suspicious links?',
    score: 2,
  },
  {
    id: 5,
    question: 'Do you use a VPN on public WiFi networks?',
    score: 2,
  },
];

export default function Step5WealthProtection() {
  const { wealthProtection, setWealthProtection, userData } = useStep();
  const [cyberAwareness, setCyberAwareness] = useState<Record<number, boolean>>(
    wealthProtection.cyberAwareness ? {} : {}
  );
  const [emergencyFundMonths, setEmergencyFundMonths] = useState(wealthProtection.emergencyFundMonths || 6);
  const [insuranceNeeds, setInsuranceNeeds] = useState<Record<string, boolean>>(
    wealthProtection.insuranceNeeds || {}
  );

  const handleCyberAwarenessChange = (id: number, checked: boolean) => {
    setCyberAwareness(prev => ({ ...prev, [id]: checked }));
  };

  const handleInsuranceChange = (insurance: string, checked: boolean) => {
    setInsuranceNeeds(prev => ({ ...prev, [insurance]: checked }));
  };

  const handleSave = () => {
    const cyberScore = Object.values(cyberAwareness).filter(Boolean).length * 2;
    const protectionScore = Math.round((cyberScore + Object.values(insuranceNeeds).filter(Boolean).length * 2) / 2);

    setWealthProtection({
      cyberAwareness: cyberScore,
      emergencyFundMonths,
      insuranceNeeds,
      protectionScore,
    });
  };

  const cyberScore = Object.values(cyberAwareness).filter(Boolean).length * 2;
  const insuranceCount = Object.values(insuranceNeeds).filter(Boolean).length;
  const protectionScore = Math.round((cyberScore + insuranceCount * 2) / 2);

  // Calculate recommended emergency fund
  const monthlyExpenses = userData.monthlyExpenses || 0;
  const recommendedEmergencyFund = monthlyExpenses * emergencyFundMonths;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wealth Protection Assessment</h2>
        <p className="text-gray-600">
          Evaluate your protection needs including emergency funds, insurance, and cyber security.
        </p>
      </div>

      {/* Emergency Fund Section */}
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Emergency Fund
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many months of expenses should you keep as emergency fund?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="12"
                value={emergencyFundMonths}
                onChange={(e) => setEmergencyFundMonths(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-bold text-amber-600 w-16">{emergencyFundMonths} months</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Monthly Expenses</p>
            <p className="text-2xl font-bold text-gray-900">₹{monthlyExpenses.toLocaleString()}</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-amber-300">
            <p className="text-sm text-gray-600">Recommended Emergency Fund</p>
            <p className="text-3xl font-bold text-amber-600">₹{recommendedEmergencyFund.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">
              This covers {emergencyFundMonths} months of your expenses
            </p>
          </div>
        </div>
      </Card>

      {/* Insurance Needs Section */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Insurance Coverage
        </h3>

        <div className="space-y-3">
          {INSURANCE_TYPES.map(insurance => (
            <label key={insurance.name} className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50">
              <input
                type="checkbox"
                checked={insuranceNeeds[insurance.name] || false}
                onChange={(e) => handleInsuranceChange(insurance.name, e.target.checked)}
                className="w-4 h-4 mt-1"
              />
              <div>
                <p className="font-medium text-gray-900">{insurance.name}</p>
                <p className="text-sm text-gray-600">{insurance.description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Coverage Status:</strong> You have selected {insuranceCount} insurance types.
          </p>
        </div>
      </Card>

      {/* Cyber Security Section */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cyber Security Awareness</h3>

        <div className="space-y-3">
          {CYBER_SECURITY_QUESTIONS.map(question => (
            <label key={question.id} className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-green-50">
              <input
                type="checkbox"
                checked={cyberAwareness[question.id] || false}
                onChange={(e) => handleCyberAwarenessChange(question.id, e.target.checked)}
                className="w-4 h-4 mt-1"
              />
              <p className="text-gray-900">{question.question}</p>
            </label>
          ))}
        </div>

        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-sm text-green-900">
            <strong>Cyber Score:</strong> {cyberScore}/10 - You are {cyberScore >= 8 ? 'well protected' : cyberScore >= 5 ? 'moderately protected' : 'at risk'}
          </p>
        </div>
      </Card>

      {/* Protection Summary */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Protection Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Cyber Security Score</p>
            <p className="text-3xl font-bold text-green-600">{cyberScore}/10</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Insurance Coverage</p>
            <p className="text-3xl font-bold text-blue-600">{insuranceCount}/{INSURANCE_TYPES.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Overall Protection</p>
            <p className="text-3xl font-bold text-purple-600">{protectionScore}/10</p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          Save Protection Assessment
        </Button>
      </div>
    </div>
  );
}
