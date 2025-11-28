import { useState } from 'react';
import { useStep } from '@/contexts/StepContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Target } from 'lucide-react';

const GOAL_CATEGORIES = [
  'Retirement',
  'Home Purchase',
  'Education',
  'Vacation',
  'Vehicle',
  'Emergency Fund',
  'Business',
  'Investment',
  'Wedding',
  'Other',
];

export default function Step3Goals() {
  const { goals, setGoals } = useStep();
  const [goalsList, setGoalsList] = useState(goals.goals || []);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalTimeline, setNewGoalTimeline] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('');
  const [newGoalPriority, setNewGoalPriority] = useState(5);

  const handleAddGoal = () => {
    if (newGoalName && newGoalAmount && newGoalTimeline && newGoalCategory) {
      const goal = {
        id: Date.now().toString(),
        name: newGoalName,
        targetAmount: parseFloat(newGoalAmount) || 0,
        timeline: parseInt(newGoalTimeline) || 0,
        category: newGoalCategory,
        priority: newGoalPriority,
      };
      setGoalsList([...goalsList, goal]);
      setNewGoalName('');
      setNewGoalAmount('');
      setNewGoalTimeline('');
      setNewGoalCategory('');
      setNewGoalPriority(5);
    }
  };

  const handleRemoveGoal = (id: string) => {
    setGoalsList(goalsList.filter(goal => goal.id !== id));
  };

  const handleUpdateGoal = (id: string, field: string, value: any) => {
    setGoalsList(goalsList.map(goal =>
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  const handleSave = () => {
    setGoals({ goals: goalsList });
  };

  const sortedGoals = [...goalsList].sort((a, b) => b.priority - a.priority);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Define Your Financial Goals</h2>
        <p className="text-gray-600">
          Set clear financial goals with timelines and priorities to stay focused on your objectives.
        </p>
      </div>

      {/* Goals List */}
      {goalsList.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Goals</h3>
          <div className="space-y-3">
            {sortedGoals.map(goal => (
              <div key={goal.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">{goal.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {goal.category}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-600">Target Amount</p>
                        <p className="text-lg font-bold text-green-600">₹{goal.targetAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Timeline</p>
                        <p className="text-lg font-bold text-blue-600">{goal.timeline} months</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Priority</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-6 rounded ${
                                i < goal.priority ? 'bg-orange-500' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemoveGoal(goal.id)}
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

      {/* Add New Goal */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Goal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
            <Input
              type="text"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
              placeholder="e.g., Buy a House, Retirement Fund"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newGoalCategory}
                onChange={(e) => setNewGoalCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select category</option>
                {GOAL_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount (₹)</label>
              <Input
                type="number"
                value={newGoalAmount}
                onChange={(e) => setNewGoalAmount(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline (months)</label>
              <Input
                type="number"
                value={newGoalTimeline}
                onChange={(e) => setNewGoalTimeline(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority (1-10)</label>
              <div className="flex gap-1 mt-2">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setNewGoalPriority(i + 1)}
                    className={`w-6 h-8 rounded transition-colors ${
                      i < newGoalPriority ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleAddGoal} className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>
      </Card>

      {/* Goals Summary */}
      {goalsList.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Goals</p>
              <p className="text-2xl font-bold text-blue-600">{goalsList.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Target Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{goalsList.reduce((sum, g) => sum + g.targetAmount, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Timeline</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(goalsList.reduce((sum, g) => sum + g.timeline, 0) / goalsList.length)} months
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          Save Goals
        </Button>
      </div>
    </div>
  );
}
