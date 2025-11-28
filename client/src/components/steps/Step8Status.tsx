import { useMemo } from 'react';
import { useStep } from '@/contexts/StepContext';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

export default function Step8Status() {
  const { cashFlow, netWorth, trackingHistory, recommendations } = useStep();

  // Prepare data for charts
  const expenseData = useMemo(() => {
    if (Object.keys(cashFlow.monthlyExpenses).length === 0) return [];
    return Object.entries(cashFlow.monthlyExpenses).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));
  }, [cashFlow.monthlyExpenses]);

  const netWorthTrendData = useMemo(() => {
    if (trackingHistory.length === 0) {
      return [
        {
          month: 'Current',
          netWorth: netWorth.netWorth,
        },
      ];
    }
    return trackingHistory.map(record => ({
      month: record.month,
      netWorth: netWorth.netWorth,
    }));
  }, [trackingHistory, netWorth.netWorth]);

  const cashFlowData = useMemo(() => {
    if (trackingHistory.length === 0) {
      return [
        {
          month: 'Current',
          income: cashFlow.monthlyIncome,
          expenses: cashFlow.totalExpenses,
          savings: cashFlow.netCashFlow,
        },
      ];
    }
    return trackingHistory.map(record => ({
      month: record.month,
      income: record.income,
      expenses: record.expenses,
      savings: record.netCashFlow,
    }));
  }, [trackingHistory, cashFlow]);

  const allocationData = useMemo(() => {
    if (!recommendations) {
      return [
        { name: 'Equity', value: 50 },
        { name: 'Debt', value: 50 },
      ];
    }
    return [
      { name: 'Equity', value: recommendations.equityAllocation },
      { name: 'Debt', value: recommendations.debtAllocation },
    ];
  }, [recommendations]);

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  const totalAssets = netWorth.totalAssets;
  const totalLiabilities = netWorth.totalLiabilities;
  const netWorthValue = netWorth.netWorth;
  const monthlyIncome = cashFlow.monthlyIncome;
  const monthlyExpenses = cashFlow.totalExpenses;
  const netCashFlow = cashFlow.netCashFlow;

  // Calculate key metrics
  const savingsRate = monthlyIncome > 0 ? Math.round((netCashFlow / monthlyIncome) * 100) : 0;
  const debtToAssetRatio = totalAssets > 0 ? Math.round((totalLiabilities / totalAssets) * 100) : 0;
  const equityToAssetRatio = 100 - debtToAssetRatio;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Dashboard</h2>
        <p className="text-gray-600">
          View your financial status with comprehensive charts and key metrics.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <p className="text-sm text-gray-600">Net Worth</p>
          <p className={`text-2xl font-bold ${netWorthValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{netWorthValue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Assets - Liabilities</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <p className="text-sm text-gray-600">Monthly Income</p>
          <p className="text-2xl font-bold text-blue-600">₹{monthlyIncome.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Total earnings</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <p className="text-sm text-gray-600">Monthly Expenses</p>
          <p className="text-2xl font-bold text-red-600">₹{monthlyExpenses.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Total spending</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <p className="text-sm text-gray-600">Savings Rate</p>
          <p className="text-2xl font-bold text-purple-600">{savingsRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Of monthly income</p>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Monthly Cash Flow
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            <Bar dataKey="savings" fill="#3b82f6" name="Savings" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Expense Breakdown */}
      {expenseData.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-orange-600" />
            Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Net Worth Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Net Worth Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={netWorthTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="netWorth" stroke="#10b981" name="Net Worth" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Asset Allocation */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Allocation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Equity vs Debt Meter</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Equity</span>
                <span className="text-sm font-bold text-green-600">{equityToAssetRatio}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full"
                  style={{ width: `${equityToAssetRatio}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Debt</span>
                <span className="text-sm font-bold text-red-600">{debtToAssetRatio}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full"
                  style={{ width: `${debtToAssetRatio}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-green-600">₹{totalAssets.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Total Liabilities</p>
              <p className="text-2xl font-bold text-red-600">₹{totalLiabilities.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Financial Health Summary */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Savings Rate</p>
            <p className="text-2xl font-bold text-green-600">{savingsRate}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {savingsRate >= 20 ? '✓ Excellent' : savingsRate >= 10 ? '✓ Good' : '⚠ Needs improvement'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Debt-to-Asset Ratio</p>
            <p className="text-2xl font-bold text-blue-600">{debtToAssetRatio}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {debtToAssetRatio <= 30 ? '✓ Healthy' : debtToAssetRatio <= 50 ? '⚠ Moderate' : '✗ High'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Monthly Cash Flow</p>
            <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{netCashFlow.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {netCashFlow >= 0 ? '✓ Positive' : '✗ Negative'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Net Worth</p>
            <p className={`text-2xl font-bold ${netWorthValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{netWorthValue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {netWorthValue >= 0 ? '✓ Positive' : '✗ Negative'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
