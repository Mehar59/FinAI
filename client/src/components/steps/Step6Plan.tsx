import { useState } from 'react';
import { useStep } from '@/contexts/StepContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle, Cpu } from 'lucide-react';
import { toast } from 'sonner';

export default function Step6Plan() {
  const { 
    cashFlow, 
    netWorth, 
    goals, 
    riskAssessment, 
    wealthProtection, 
    userData, 
    recommendations, 
    setRecommendations 
  } = useStep();

  const [loading, setLoading] = useState(false);
  const [localAiLoading, setLocalAiLoading] = useState(false);
  const [localAiExplanation, setLocalAiExplanation] = useState<string | null>(null);

  const handleGeneratePlan = async () => {
    // Validate that previous steps are completed
    if (!cashFlow.monthlyIncome) {
      toast.error('Please complete Step 1: Cash Flow');
      return;
    }
    if (netWorth.assets.length === 0 && netWorth.liabilities.length === 0) {
      toast.error('Please complete Step 2: Net Worth');
      return;
    }
    if (goals.goals.length === 0) {
      toast.error('Please complete Step 3: Goals');
      return;
    }
    if (!riskAssessment.riskTolerance) {
      toast.error('Please complete Step 4: Risk Assessment');
      return;
    }
    if (!wealthProtection.cyberAwareness) {
      toast.error('Please complete Step 5: Wealth Protection');
      return;
    }

    setLoading(true);
    try {
      
      const payload = {
        userData: {
          age: userData.age,
          monthlyIncome: cashFlow.monthlyIncome,
          monthlyExpenses: cashFlow.totalExpenses,
          totalAssets: netWorth.totalAssets,
          totalLiabilities: netWorth.totalLiabilities,
          netWorth: netWorth.netWorth,
          riskTolerance: riskAssessment.riskTolerance,
          riskCapacity: riskAssessment.riskCapacity,
          riskProfile: riskAssessment.overallRiskProfile,
          cyberAwareness: wealthProtection.cyberAwareness,
          emergencyFundMonths: wealthProtection.emergencyFundMonths,
          financialGoals: goals.goals,
        },
      };

      
      const N8N_WEBHOOK_URL =
        import.meta.env.VITE_N8N_WEBHOOK_URL ||
        'https://isagi-kaiser.app.n8n.cloud/webhook-test/financial-plan';

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      setLocalAiExplanation(null); // clear old explanation if plan changes
      toast.success('Financial plan generated successfully!');
    } catch (error) {
      console.error('Error generating plan:', error);
      // For demo purposes, generate mock recommendations
      const mockRecommendations = {
        equityAllocation: riskAssessment.riskTolerance > 6 ? 70 : riskAssessment.riskTolerance > 4 ? 50 : 30,
        debtAllocation: riskAssessment.riskTolerance > 6 ? 30 : riskAssessment.riskTolerance > 4 ? 50 : 70,
        mutualFunds: [
          {
            name: 'Large Cap Equity Fund',
            type: 'Equity',
            allocation: riskAssessment.riskTolerance > 6 ? 30 : 15,
            riskLevel: 'Medium',
          },
          {
            name: 'Mid Cap Growth Fund',
            type: 'Equity',
            allocation: riskAssessment.riskTolerance > 6 ? 25 : 10,
            riskLevel: 'High',
          },
          {
            name: 'Debt Fund',
            type: 'Debt',
            allocation: riskAssessment.riskTolerance > 6 ? 20 : 40,
            riskLevel: 'Low',
          },
        ],
        commodities: [
          {
            name: 'Gold',
            allocation: 10,
            reasoning: 'Hedge against inflation and market volatility',
          },
        ],
        cryptocurrency: [
          {
            name: 'Bitcoin',
            allocation: riskAssessment.riskTolerance > 7 ? 5 : 0,
            reasoning: 'High-risk, high-reward asset for diversification',
          },
        ],
        emergencyFund: cashFlow.totalExpenses * wealthProtection.emergencyFundMonths,
        investmentStrategy: `Based on your ${riskAssessment.overallRiskProfile} risk profile, we recommend a balanced approach with emphasis on ${riskAssessment.riskTolerance > 6 ? 'growth' : 'stability'}.`,
      };
      setRecommendations(mockRecommendations);
      setLocalAiExplanation(null);
      toast.success('Demo plan generated (N8N integration needed for live data)');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Local LLM (Ollama) explanation handler
  const handleExplainWithLocalAI = async () => {
    if (!recommendations) {
      toast.error('Generate your plan first, then ask Local AI to explain it.');
      return;
    }

    setLocalAiLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/ollama-explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData: {
            age: userData.age,
            monthlyIncome: cashFlow.monthlyIncome,
            monthlyExpenses: cashFlow.totalExpenses,
            totalAssets: netWorth.totalAssets,
            totalLiabilities: netWorth.totalLiabilities,
            netWorth: netWorth.netWorth,
            riskTolerance: riskAssessment.riskTolerance,
            riskCapacity: riskAssessment.riskCapacity,
            riskProfile: riskAssessment.overallRiskProfile,
            emergencyFundMonths: wealthProtection.emergencyFundMonths,
          },
          recommendations,
        }),
      });

      if (!response.ok) {
        throw new Error('Local AI explanation failed');
      }

      const data = await response.json();
      setLocalAiExplanation(data.explanation || 'Local AI response not available.');
      toast.success('Local AI (Ollama) explanation generated!');
    } catch (error) {
      console.error('Local AI error:', error);
      toast.error('Local AI is not available. Is Ollama + proxy server running?');
    } finally {
      setLocalAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your <span className="text-blue-600">AI-Powered</span> Financial Plan
        </h2>
        <p className="text-gray-600">
          Based on your profile, here are AI-generated recommendations for your financial freedom journey.
        </p>
      </div>

      {!recommendations ? (
        <Card className="p-8 text-center bg-white border-blue-400 border-2 shadow-lg">
          <Cpu className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI is Designing Your Plan</h3>
          <p className="text-gray-600 mb-6">
            Our intelligent system analyzes your data to create a personalized financial roadmap. Click the button below to generate a personalized financial plan based on your information.
          </p>
          <Button 
            onClick={handleGeneratePlan} 
            size="lg" 
            disabled={loading}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'AI is Generating Plan...' : 'Generate AI Plan'}
          </Button>
        </Card>
      ) : (
        <>
          {/* Investment Strategy */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Investment Strategy
            </h3>
            <p className="text-gray-700">{recommendations.investmentStrategy}</p>
          </Card>

          {/* Asset Allocation */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Equity Allocation</p>
                <p className="text-3xl font-bold text-green-600">{recommendations.equityAllocation}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Debt Allocation</p>
                <p className="text-3xl font-bold text-blue-600">{recommendations.debtAllocation}%</p>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-green-500 h-full"
                style={{ width: `${recommendations.equityAllocation}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">Green: Equity | Blue: Debt</p>
          </Card>
          

           {/* Mutual Funds */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Mutual Funds</h3>
            <div className="space-y-3">
              {recommendations.mutualFunds.map((fund: any, idx: number) => (
                <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{fund.name}</h4>
                      <p className="text-sm text-gray-600">{fund.type} Fund</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      fund.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                      fund.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {fund.riskLevel} Risk
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">Allocation</p>
                    <p className="text-2xl font-bold text-blue-600">{fund.allocation}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Commodities */}
          {recommendations.commodities.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Commodity Investments</h3>
              <div className="space-y-3">
                {recommendations.commodities.map((commodity: any, idx: number) => (
                  <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{commodity.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{commodity.reasoning}</p>
                      </div>
                      <span className="text-2xl font-bold text-orange-600">{commodity.allocation}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Cryptocurrency */}
          {recommendations.cryptocurrency.some((c: any) => c.allocation > 0) && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Cryptocurrency (High Risk)
              </h3>
              <div className="space-y-3">
                {recommendations.cryptocurrency.map((crypto: any, idx: number) => (
                  crypto.allocation > 0 && (
                    <div key={idx} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{crypto.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{crypto.reasoning}</p>
                        </div>
                        <span className="text-2xl font-bold text-orange-600">{crypto.allocation}%</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </Card>
          )}

          {/* Local LLM Explanation */}
          {localAiExplanation && (
            <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Explanation from Local AI (Ollama)
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {localAiExplanation}
              </p>
            </Card>
          )}

          {/* Emergency Fund */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Fund</h3>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Recommended Emergency Fund</p>
              <p className="text-3xl font-bold text-green-600">₹{recommendations.emergencyFund.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-2">
                This covers {wealthProtection.emergencyFundMonths} months of your expenses
              </p>
            </div>
          </Card>

          {/* Regenerate + Local AI Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleExplainWithLocalAI}
              variant="secondary"
              className="gap-2"
              disabled={localAiLoading}
            >
              {localAiLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {localAiLoading ? 'Asking Local AI...' : 'Explain with Local AI (Ollama)'}
            </Button>

            <Button 
              onClick={handleGeneratePlan} 
              variant="outline"
              className="gap-2"
            >
              Regenerate Plan
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
