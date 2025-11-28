import { useState } from 'react';
import { useStep } from '@/contexts/StepContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

const ASSET_CATEGORIES = [
  'Cash & Savings',
  'Real Estate',
  'Vehicles',
  'Investments',
  'Retirement Accounts',
  'Jewelry & Valuables',
  'Business',
  'Other',
];

const LIABILITY_CATEGORIES = [
  'Mortgage',
  'Car Loan',
  'Personal Loan',
  'Credit Card Debt',
  'Student Loan',
  'Business Loan',
  'Other',
];

export default function Step2NetWorth() {
  const { netWorth, setNetWorth } = useStep();
  const [assets, setAssets] = useState(netWorth.assets || []);
  const [liabilities, setLiabilities] = useState(netWorth.liabilities || []);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetAmount, setNewAssetAmount] = useState('');
  const [newLiabilityName, setNewLiabilityName] = useState('');
  const [newLiabilityAmount, setNewLiabilityAmount] = useState('');

  const handleAddAsset = () => {
    if (newAssetName && newAssetAmount) {
      const asset = {
        id: Date.now().toString(),
        name: newAssetName,
        amount: parseFloat(newAssetAmount) || 0,
      };
      setAssets([...assets, asset]);
      setNewAssetName('');
      setNewAssetAmount('');
    }
  };

  const handleAddLiability = () => {
    if (newLiabilityName && newLiabilityAmount) {
      const liability = {
        id: Date.now().toString(),
        name: newLiabilityName,
        amount: parseFloat(newLiabilityAmount) || 0,
      };
      setLiabilities([...liabilities, liability]);
      setNewLiabilityName('');
      setNewLiabilityAmount('');
    }
  };

  const handleRemoveAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const handleRemoveLiability = (id: string) => {
    setLiabilities(liabilities.filter(liability => liability.id !== id));
  };

  const handleAssetAmountChange = (id: string, amount: string) => {
    setAssets(assets.map(asset =>
      asset.id === id ? { ...asset, amount: parseFloat(amount) || 0 } : asset
    ));
  };

  const handleLiabilityAmountChange = (id: string, amount: string) => {
    setLiabilities(liabilities.map(liability =>
      liability.id === id ? { ...liability, amount: parseFloat(amount) || 0 } : liability
    ));
  };

  const handleSave = () => {
    const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
    const netWorthValue = totalAssets - totalLiabilities;

    setNetWorth({
      assets,
      liabilities,
      totalAssets,
      totalLiabilities,
      netWorth: netWorthValue,
    });
  };

  const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const netWorthValue = totalAssets - totalLiabilities;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your Net Worth</h2>
        <p className="text-gray-600">
          List all your assets and liabilities to determine your net worth.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Assets Section */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assets</h3>

          <div className="space-y-3 mb-4">
            {assets.map(asset => (
              <div key={asset.id} className="flex items-center gap-2 bg-white p-3 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{asset.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-600">₹</span>
                    <Input
                      type="number"
                      value={asset.amount || ''}
                      onChange={(e) => handleAssetAmountChange(asset.id, e.target.value)}
                      className="text-sm h-8"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleRemoveAsset(asset.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add Asset */}
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Add Asset</p>
            <select
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select or type category</option>
              {ASSET_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 flex-1">
                <span className="text-sm font-semibold text-gray-700">₹</span>
                <Input
                  type="number"
                  value={newAssetAmount}
                  onChange={(e) => setNewAssetAmount(e.target.value)}
                  placeholder="Amount"
                  className="text-sm"
                />
              </div>
              <Button onClick={handleAddAsset} size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">Total Assets</p>
            <p className="text-2xl font-bold text-green-600">₹{totalAssets.toLocaleString()}</p>
          </div>
        </Card>

        {/* Liabilities Section */}
        <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Liabilities</h3>

          <div className="space-y-3 mb-4">
            {liabilities.map(liability => (
              <div key={liability.id} className="flex items-center gap-2 bg-white p-3 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{liability.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-600">₹</span>
                    <Input
                      type="number"
                      value={liability.amount || ''}
                      onChange={(e) => handleLiabilityAmountChange(liability.id, e.target.value)}
                      className="text-sm h-8"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleRemoveLiability(liability.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add Liability */}
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Add Liability</p>
            <select
              value={newLiabilityName}
              onChange={(e) => setNewLiabilityName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select or type category</option>
              {LIABILITY_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 flex-1">
                <span className="text-sm font-semibold text-gray-700">₹</span>
                <Input
                  type="number"
                  value={newLiabilityAmount}
                  onChange={(e) => setNewLiabilityAmount(e.target.value)}
                  placeholder="Amount"
                  className="text-sm"
                />
              </div>
              <Button onClick={handleAddLiability} size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">Total Liabilities</p>
            <p className="text-2xl font-bold text-red-600">₹{totalLiabilities.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      {/* Net Worth Summary */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Net Worth Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Assets</p>
            <p className="text-2xl font-bold text-green-600">₹{totalAssets.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Liabilities</p>
            <p className="text-2xl font-bold text-red-600">₹{totalLiabilities.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Net Worth</p>
            <p className={`text-2xl font-bold ${netWorthValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{netWorthValue.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          Save Net Worth Data
        </Button>
      </div>
    </div>
  );
}
