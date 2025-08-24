import React from 'react';
import { Brain, Target, TrendingUp, Zap, Eye, Database } from 'lucide-react';

const Analytics: React.FC = () => {
  const modelStats = [
    { label: 'Model Accuracy', value: '94.2%', change: '+0.8%', icon: Target },
    { label: 'Predictions Made', value: '2,847', change: '+127', icon: Brain },
    { label: 'Success Rate', value: '89.1%', change: '+2.3%', icon: TrendingUp },
    { label: 'Processing Speed', value: '0.8s', change: '-0.1s', icon: Zap }
  ];

  const chartPatterns = [
    { name: 'Head & Shoulders', confidence: 96.5, detected: 23 },
    { name: 'Double Top', confidence: 92.1, detected: 18 },
    { name: 'Ascending Triangle', confidence: 89.7, detected: 31 },
    { name: 'Cup & Handle', confidence: 87.4, detected: 15 },
    { name: 'Hammer', confidence: 85.2, detected: 42 },
    { name: 'Doji', confidence: 83.1, detected: 28 }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">CNN Analytics</h1>
        <p className="text-slate-400">Deep learning model performance and insights</p>
      </div>

      {/* Model Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {modelStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-green-400">{stat.change}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Model Architecture */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-400" />
            Model Architecture
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <h3 className="font-medium text-white mb-2">Input Layer</h3>
              <p className="text-sm text-slate-400">224x224x3 RGB chart images</p>
              <div className="mt-2 h-2 bg-slate-800 rounded-full">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-full"></div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <h3 className="font-medium text-white mb-2">Convolutional Layers</h3>
              <p className="text-sm text-slate-400">5 layers with ReLU activation</p>
              <div className="mt-2 h-2 bg-slate-800 rounded-full">
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full w-4/5"></div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <h3 className="font-medium text-white mb-2">Output Layer</h3>
              <p className="text-sm text-slate-400">3-class prediction (Buy/Hold/Sell)</p>
              <div className="mt-2 h-2 bg-slate-800 rounded-full">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-red-500 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">Training Dataset</p>
                <p className="text-sm text-slate-400">150K chart images • 5 years of data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Recognition */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Eye className="w-6 h-6 text-green-400" />
            Pattern Recognition
          </h2>
          
          <div className="space-y-4">
            {chartPatterns.map((pattern, index) => (
              <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{pattern.name}</h3>
                  <span className="text-sm text-blue-400 font-medium">
                    {pattern.confidence}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                  <span>Detected: {pattern.detected} times</span>
                  <span>This week</span>
                </div>
                
                <div className="h-2 bg-slate-800 rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                    style={{ width: `${pattern.confidence}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-medium">Overall Pattern Accuracy</p>
                <p className="text-sm text-slate-400">91.3% success rate across all patterns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Predictions */}
      <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Predictions</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Symbol</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Pattern</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Prediction</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Confidence</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                { symbol: 'AAPL', pattern: 'Ascending Triangle', prediction: 'BUY', confidence: 94.2, status: 'Active' },
                { symbol: 'TSLA', pattern: 'Head & Shoulders', prediction: 'SELL', confidence: 87.6, status: 'Completed' },
                { symbol: 'MSFT', pattern: 'Cup & Handle', prediction: 'BUY', confidence: 91.4, status: 'Active' },
                { symbol: 'NVDA', pattern: 'Double Top', prediction: 'HOLD', confidence: 89.1, status: 'Monitoring' }
              ].map((pred, index) => (
                <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{pred.symbol}</td>
                  <td className="py-3 px-4 text-slate-300">{pred.pattern}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pred.prediction === 'BUY' ? 'bg-green-500/20 text-green-400' :
                      pred.prediction === 'SELL' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {pred.prediction}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-blue-400 font-medium">{pred.confidence}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pred.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                      pred.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {pred.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;