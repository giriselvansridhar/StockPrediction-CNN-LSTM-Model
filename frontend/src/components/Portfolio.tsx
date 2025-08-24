import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, AlertTriangle, Star } from 'lucide-react';

const Portfolio: React.FC = () => {
  const portfolioStats = [
    { label: 'Total Value', value: '$124,750', change: '+5.2%', trend: 'up' },
    { label: 'Day Change', value: '+$2,340', change: '+1.8%', trend: 'up' },
    { label: 'Total Return', value: '+$24,750', change: '+24.7%', trend: 'up' },
    { label: 'Win Rate', value: '78.4%', change: '+3.1%', trend: 'up' }
  ];

  const holdings = [
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      shares: 50, 
      avgCost: '$165.20', 
      currentPrice: '$175.43', 
      value: '$8,771.50', 
      change: '+6.2%',
      cnnScore: 94.2,
      recommendation: 'STRONG BUY'
    },
    { 
      symbol: 'TSLA', 
      name: 'Tesla Inc.', 
      shares: 25, 
      avgCost: '$245.80', 
      currentPrice: '$248.67', 
      value: '$6,216.75', 
      change: '+1.2%',
      cnnScore: 87.6,
      recommendation: 'HOLD'
    },
    { 
      symbol: 'MSFT', 
      name: 'Microsoft Corp.', 
      shares: 30, 
      avgCost: '$365.40', 
      currentPrice: '$378.85', 
      value: '$11,365.50', 
      change: '+3.7%',
      cnnScore: 91.4,
      recommendation: 'BUY'
    },
    { 
      symbol: 'NVDA', 
      name: 'NVIDIA Corp.', 
      shares: 15, 
      avgCost: '$420.15', 
      currentPrice: '$454.22', 
      value: '$6,813.30', 
      change: '+8.1%',
      cnnScore: 96.1,
      recommendation: 'STRONG BUY'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
        <p className="text-slate-400">AI-optimized investment portfolio</p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {portfolioStats.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 p-2 bg-green-500/20 rounded-lg text-green-400" />
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
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Holdings */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Holdings</h2>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <PieChart className="w-4 h-4" />
                4 positions
              </div>
            </div>

            <div className="space-y-4">
              {holdings.map((holding, index) => (
                <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:bg-slate-800/30 transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{holding.symbol}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{holding.symbol}</h3>
                        <p className="text-sm text-slate-400">{holding.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{holding.value}</p>
                      <p className={`text-sm font-medium ${holding.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {holding.change}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Shares</p>
                      <p className="text-white font-medium">{holding.shares}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Avg Cost</p>
                      <p className="text-white font-medium">{holding.avgCost}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Current</p>
                      <p className="text-white font-medium">{holding.currentPrice}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-slate-300">CNN Score: {holding.cnnScore}%</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      holding.recommendation === 'STRONG BUY' ? 'bg-green-600 text-white' :
                      holding.recommendation === 'BUY' ? 'bg-green-500/20 text-green-400' :
                      holding.recommendation === 'HOLD' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {holding.recommendation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Insights */}
        <div className="space-y-6">
          {/* Risk Analysis */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Risk Analysis
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Portfolio Beta</span>
                  <span className="text-white font-medium">1.24</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-3/4"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Volatility</span>
                  <span className="text-white font-medium">18.2%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full w-2/3"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Sharpe Ratio</span>
                  <span className="text-white font-medium">2.14</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">AI Recommendations</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 font-medium text-sm">Portfolio Rebalancing</p>
                <p className="text-slate-300 text-xs mt-1">Consider increasing NVDA position by 10%</p>
              </div>
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 font-medium text-sm">Diversification</p>
                <p className="text-slate-300 text-xs mt-1">Add healthcare sector exposure</p>
              </div>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 font-medium text-sm">Risk Management</p>
                <p className="text-slate-300 text-xs mt-1">Set stop-loss for TSLA at $235</p>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">30-Day Performance</h3>
            
            <div className="h-32 relative">
              <svg width="100%" height="100%" viewBox="0 0 300 120" className="overflow-visible">
                <defs>
                  <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                <path
                  d="M 0,80 Q 50,60 100,70 T 200,50 T 300,40"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                <path
                  d="M 0,80 Q 50,60 100,70 T 200,50 T 300,40 L 300,120 L 0,120 Z"
                  fill="url(#portfolioGradient)"
                />
              </svg>
              
              <div className="absolute top-4 right-4 text-green-400">
                <span className="text-sm font-medium">+24.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;