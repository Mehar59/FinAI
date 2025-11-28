import { useState } from 'react';
import { useStep } from '@/contexts/StepContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

const EXPENSE_CATEGORIES = [
  'Housing',
  'Food & Groceries',
  'Transportation',
  'Utilities',
  'Insurance',
  'Healthcare',
  'Entertainment',
  'Education',
  'Savings',
  'Other',
];

export default function Step1CashFlow() {
  const { cashFlow, setCashFlow } = useStep();
  const [monthlyIncome, setMonthlyIncome] = useState(cashFlow.monthlyIncome || 0);
  const [expenses, setExpenses] = useState<Record<string, number>>(cashFlow.monthlyExpenses || {});
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const handleIncomeChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    setMonthlyIncome(amount);
  };

  const handleExpenseChange = (category: string, value: string) => {
    const amount = parseFloat(value) || 0;
    setExpenses(prev => ({
      ...prev,
      [category]: amount,
    }));
  };

  const handleAddExpense = () => {
    if (newExpenseCategory && newExpenseAmount) {
      const amount = parseFloat(newExpenseAmount) || 0;
      setExpenses(prev => ({
        ...prev,
        [newExpenseCategory]: amount,
      }));
      setNewExpenseCategory('');
      setNewExpenseAmount('');
    }
  };

  const handleRemoveExpense = (category: string) => {
    setExpenses(prev => {
      const updated = { ...prev };
      delete updated[category];
      return updated;
    });
  };

  const handleSave = () => {
    const totalExpenses = Object.values(expenses).reduce((sum, amount) => sum + amount, 0);
    const netCashFlow = monthlyIncome - totalExpenses;

    setCashFlow({
      monthlyIncome,
      monthlyExpenses: expenses,
      totalExpenses,
      netCashFlow,
    });
  };

  const totalExpenses = Object.values(expenses).reduce((sum, amount) => sum + amount, 0);
  const netCashFlow = monthlyIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Your Cash Flow</h2>
        <p className="text-gray-600">
          Enter your monthly income and expenses to understand your cash flow.
        </p>
      </div>

      {/* Income Section */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Income</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Total Monthly Income</label>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-700">₹</span>
            <Input
              type="number"
              value={monthlyIncome || ''}
              onChange={(e) => handleIncomeChange(e.target.value)}
              placeholder="Enter your monthly income"
              className="text-lg"
            />
          </div>
        </div>
      </Card>

      {/* Expenses Section */}
      <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h3>

        <div className="space-y-4">
          {/* Predefined Categories */}
          {EXPENSE_CATEGORIES.map(category => (
            <div key={category} className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-700 w-32">{category}</label>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-semibold text-gray-700">₹</span>
                <Input
                  type="number"
                  value={expenses[category] || ''}
                  onChange={(e) => handleExpenseChange(category, e.target.value)}
                  placeholder="0"
                  className="flex-1"
                />
              </div>
              {expenses[category] && (
                <Button
                  onClick={() => handleRemoveExpense(category)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          {/* Add Custom Expense */}
          <div className="border-t pt-4 mt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Add Custom Expense Category</p>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                placeholder="Category name"
                className="flex-1"
              />
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-700">₹</span>
                <Input
                  type="number"
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-32"
                />
              </div>
              <Button onClick={handleAddExpense} className="gap-2">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Monthly Income</p>
            <p className="text-2xl font-bold text-green-600">₹{monthlyIncome.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Net Cash Flow</p>
            <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{netCashFlow.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          Save Cash Flow Data
        </Button>
      </div>
    </div>
  );
}
