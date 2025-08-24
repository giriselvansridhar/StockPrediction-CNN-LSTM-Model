import React from 'react';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';

const PredictionCard: React.FC = () => {
  const predictions = [
    {
      symbol: 'AAPL',
      confidence: 94.2,
      direction: 'up',
      target: '$182.50',
      timeframe: '5 days'
    },
    {
      symbol: 'TSLA',
      confidence: 87.6,
      direction: 'down',
      target: '$235.20',
      timeframe: '3 days'
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Brain className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">CNN Analysis</h3>
          <p className="text-sm text-slate-400">Latest predictions</p>
        </div>
      </div>

      <div className="space-y-4">
        {predictions.map((pred, index) => (
          <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-white">{pred.symbol}</span>
              <div className={`flex items-center gap-1 ${
                pred.direction === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${pred.direction === 'down' ? 'rotate-180' : ''}`} />
                <span className="text-sm font-medium">{pred.target}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">Confidence</span>
              </div>
              <span className="text-blue-400 font-medium">{pred.confidence}%</span>
            </div>
            
            <div className="mt-2 bg-slate-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                style={{ width: `${pred.confidence}%` }}
              ></div>
            </div>
            
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
              <Zap className="w-3 h-3" />
              <span>Target: {pred.timeframe}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-red-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-center gap-2 text-sm">
          <Brain className="w-4 h-4 text-blue-400" />
          <span className="text-slate-300">Model trained on 10K+ chart patterns</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;