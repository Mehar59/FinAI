import { useState } from 'react';
import { useStep } from '@/contexts/StepContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Step7Track() {
  const { trackingHistory, addTrackingRecord, cashFlow } = useStep();
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddRecord = () => {
    if (!monthlyIncome || !monthlyExpenses) {
      toast.error('Please fill in income and expenses');
      return;
    }

    const record = {
      month: currentMonth,
      income: parseFloat(monthlyIncome),
      expenses: parseFloat(monthlyExpenses),
      investment: parseFloat(investmentAmount) || 0,
      netCashFlow: parseFloat(monthlyIncome) - parseFloat(monthlyExpenses),
      notes,
    };

    addTrackingRecord(record);
    toast.success('Tracking record added successfully!');
    
    // Reset form
    setMonthlyIncome('');
    setMonthlyExpenses('');
    setInvestmentAmount('');
    setNotes('');
    setCurrentMonth(new Date().toISOString().slice(0, 7));
  };

  const handleDeleteRecord = (index: number) => {
    // Note: This would require updating the context to support deletion
    toast.info('Delete functionality coming soon');
  };

  const sortedHistory = [...trackingHistory].sort((a, b) => 
    new Date(b.month).getTime() - new Date(a.month).getTime()
  );

  const averageIncome = sortedHistory.length > 0
    ? Math.round(sortedHistory.reduce((sum, r) => sum + r.income, 0) / sortedHistory.length)
    : 0;

  const averageExpenses = sortedHistory.length > 0
    ? Math.round(sortedHistory.reduce((sum, r) => sum + r.expenses, 0) / sortedHistory.length)
    : 0;

  const totalInvested = sortedHistory.reduce((sum, r) => sum + r.investment, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Monthly Tracking</h2>
        <p className="text-gray-600">
          Track your monthly income, expenses, and investments to monitor your progress.
        </p>
      </div>

      {/* Add New Record */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Add Monthly Record
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
            <input
              type="month"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
              <Input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expenses (₹)</label>
              <Input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₹)</label>
            <Input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this month..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-20 resize-none"
            />
          </div>

          <Button onClick={handleAddRecord} className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Add Record
          </Button>
        </div>
      </Card>

      {/* Tracking Summary */}
      {sortedHistory.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Tracking Summary
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Records</p>
              <p className="text-2xl font-bold text-blue-600">{sortedHistory.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Income</p>
              <p className="text-2xl font-bold text-green-600">₹{averageIncome.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Expenses</p>
              <p className="text-2xl font-bold text-red-600">₹{averageExpenses.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Invested</p>
              <p className="text-2xl font-bold text-purple-600">₹{totalInvested.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tracking History */}
      {sortedHistory.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking History</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sortedHistory.map((record, idx) => (
              <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{record.month}</p>
                    <div className="grid grid-cols-4 gap-4 mt-2 text-sm">
                      <div>
                        <p className="text-gray-600">Income</p>
                        <p className="font-bold text-green-600">₹{record.income.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expenses</p>
                        <p className="font-bold text-red-600">₹{record.expenses.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Net Cash Flow</p>
                        <p className={`font-bold ${record.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{record.netCashFlow.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Invested</p>
                        <p className="font-bold text-blue-600">₹{record.investment.toLocaleString()}</p>
                      </div>
                    </div>
                    {record.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">Note: {record.notes}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => handleDeleteRecord(idx)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {sortedHistory.length === 0 && (
        <Card className="p-8 text-center bg-gray-50">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No tracking records yet. Start by adding your first monthly record above.</p>
        </Card>
      )}
    </div>
  );
}
