import React, { useEffect, useState } from 'react';
import { predict, PredictOut } from '../api';
import { TrendingUp, TrendingDown, DollarSign, Target, Brain } from 'lucide-react';
import StockChart from './StockChart';
import PredictionCard from './PredictionCard';

// Dashboard component
const Dashboard: React.FC = () => {
  const stats = [
    {
      label: 'Portfolio Value',
      value: '$124,750',
      change: '+5.2%',
      trend: 'up',
      icon: DollarSign
    },
    {
      label: 'Daily P&L',
      value: '+$2,340',
      change: '+1.8%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      label: 'Model Accuracy',
      value: '94.2%',
      change: '+0.3%',
      trend: 'up',
      icon: Target
    },
    {
      label: 'Active Predictions',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Brain
    }
  ];

  const topStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.43', change: '+2.3%', prediction: 'BUY' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.67', change: '-1.2%', prediction: 'HOLD' },
    { symbol: 'MSFT', name: 'Microsoft', price: '$378.85', change: '+1.8%', prediction: 'BUY' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$454.22', change: '+4.1%', prediction: 'STRONG BUY' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
        <p className="text-slate-400">CNN-powered stock prediction insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Stock Chart */}
        <div className="xl:col-span-3">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">AAPL - Apple Inc.</h2>
                <p className="text-slate-400">Interactive chart analysis with multiple view options</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">$175.43</p>
                <p className="text-green-400 font-medium">+$4.02 (+2.35%)</p>
              </div>
            </div>
            <StockChart />
          </div>
        </div>

        {/* CNN Predictions */}
        <div className="xl:col-span-1 space-y-6">
          <PredictionCard />
          
          {/* Top Stocks */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">CNN Predictions</h3>
            <div className="space-y-4">
              {topStocks.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{stock.symbol}</p>
                    <p className="text-sm text-slate-400">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{stock.price}</p>
                    <p className={`text-sm ${stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    stock.prediction === 'STRONG BUY' ? 'bg-green-600 text-white' :
                    stock.prediction === 'BUY' ? 'bg-green-500/20 text-green-400' :
                    stock.prediction === 'HOLD' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {stock.prediction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// LivePredict component
const LivePredict: React.FC = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictOut | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await predict(symbol);
      setResult(data);
    } catch (e: any) {
      setError(e.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { run(); }, []);

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="bg-slate-900/70 rounded-lg px-3 py-2 outline-none border border-slate-700"
          placeholder="Symbol e.g., AAPL"
        />
        <button onClick={run} className="px-4 py-2 bg-blue-600 rounded-lg text-white disabled:opacity-60" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </div>

      {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black rounded-lg overflow-hidden border border-slate-700">
            <img src={`data:image/png;base64,${result.image_b64}`} alt="chart" className="w-full h-auto" />
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <div className="text-slate-300 mb-2">Symbol</div>
            <div className="text-white text-xl font-semibold mb-4">{result.symbol}</div>
            <div className="text-slate-300 mb-2">Signal</div>
            <div className="text-white text-2xl font-bold mb-4">
              {result.signal === 1 ? 'UP' : result.signal === -1 ? 'DOWN' : 'NEUTRAL'}
            </div>
            <div className="text-slate-300 mb-2">Confidence</div>
            <div className="text-white text-xl">{(result.confidence * 100).toFixed(1)}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper component to export
const DashboardWrapper: React.FC = () => (
  <div>
    <Dashboard />
    <LivePredict />
  </div>
);
export default DashboardWrapper;