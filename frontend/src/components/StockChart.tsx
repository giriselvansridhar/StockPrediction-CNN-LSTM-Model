import React, { useState } from 'react';
import { TrendingUp, BarChart3, Activity, PieChart } from 'lucide-react';

interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const StockChart: React.FC = () => {
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'area' | 'bar'>('candlestick');
  
  // Generate sample OHLC data
  const generateChartData = (): ChartData[] => {
    const data: ChartData[] = [];
    let currentPrice = 175;
    
    for (let i = 0; i < 30; i++) {
      const open = currentPrice;
      const change = (Math.random() - 0.5) * 8;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 3;
      const low = Math.min(open, close) - Math.random() * 3;
      const volume = Math.random() * 1000000 + 500000;
      
      data.push({
        time: `Day ${i + 1}`,
        open,
        high,
        low,
        close,
        volume
      });
      
      currentPrice = close;
    }
    
    return data;
  };

  const chartData = generateChartData();
  const chartTypes = [
    { id: 'candlestick', label: 'Candlestick', icon: BarChart3 },
    { id: 'line', label: 'Line', icon: Activity },
    { id: 'area', label: 'Area', icon: TrendingUp },
    { id: 'bar', label: 'Volume', icon: PieChart }
  ];

  const renderCandlestickChart = () => {
    const width = 800;
    const height = 400;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxPrice = Math.max(...chartData.map(d => d.high));
    const minPrice = Math.min(...chartData.map(d => d.low));
    const priceRange = maxPrice - minPrice;
    
    const candleWidth = chartWidth / chartData.length * 0.6;
    const candleSpacing = chartWidth / chartData.length;

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width={chartWidth / 10} height={chartHeight / 8} patternUnits="userSpaceOnUse">
            <path d={`M ${chartWidth / 10} 0 L 0 0 0 ${chartHeight / 8}`} fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect x={padding} y={padding} width={chartWidth} height={chartHeight} fill="url(#grid)" />
        
        {/* Price axis labels */}
        {Array.from({ length: 6 }, (_, i) => {
          const price = minPrice + (priceRange * i / 5);
          const y = padding + chartHeight - (price - minPrice) / priceRange * chartHeight;
          return (
            <g key={i}>
              <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="#64748B" strokeWidth="1" />
              <text x={padding - 10} y={y + 4} fill="#64748B" fontSize="10" textAnchor="end">
                ${price.toFixed(0)}
              </text>
            </g>
          );
        })}
        
        {/* Candlesticks */}
        {chartData.map((candle, index) => {
          const x = padding + index * candleSpacing + candleSpacing / 2;
          const openY = padding + chartHeight - (candle.open - minPrice) / priceRange * chartHeight;
          const closeY = padding + chartHeight - (candle.close - minPrice) / priceRange * chartHeight;
          const highY = padding + chartHeight - (candle.high - minPrice) / priceRange * chartHeight;
          const lowY = padding + chartHeight - (candle.low - minPrice) / priceRange * chartHeight;
          
          const isGreen = candle.close > candle.open;
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);
          
          return (
            <g key={index}>
              {/* Wick */}
              <line 
                x1={x} y1={highY} x2={x} y2={lowY} 
                stroke={isGreen ? "#10B981" : "#EF4444"} 
                strokeWidth="1"
              />
              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(bodyHeight, 1)}
                fill={isGreen ? "#10B981" : "#EF4444"}
                stroke={isGreen ? "#10B981" : "#EF4444"}
                strokeWidth="1"
              />
            </g>
          );
        })}
        
        {/* Prediction overlay */}
        <path
          d={`M ${padding + chartWidth * 0.8} ${padding + 60} L ${padding + chartWidth * 0.9} ${padding + 40} L ${padding + chartWidth} ${padding + 30}`}
          fill="none"
          stroke="#DC2626"
          strokeWidth="3"
          strokeDasharray="8,4"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const renderLineChart = () => {
    const width = 800;
    const height = 400;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxPrice = Math.max(...chartData.map(d => d.close));
    const minPrice = Math.min(...chartData.map(d => d.close));
    const priceRange = maxPrice - minPrice;
    
    const points = chartData.map((d, i) => {
      const x = padding + (i / (chartData.length - 1)) * chartWidth;
      const y = padding + chartHeight - (d.close - minPrice) / priceRange * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid */}
        <defs>
          <pattern id="lineGrid" width={chartWidth / 10} height={chartHeight / 8} patternUnits="userSpaceOnUse">
            <path d={`M ${chartWidth / 10} 0 L 0 0 0 ${chartHeight / 8}`} fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect x={padding} y={padding} width={chartWidth} height={chartHeight} fill="url(#lineGrid)" />
        
        {/* Price line */}
        <polyline
          points={points}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {chartData.map((d, i) => {
          const x = padding + (i / (chartData.length - 1)) * chartWidth;
          const y = padding + chartHeight - (d.close - minPrice) / priceRange * chartHeight;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#3B82F6"
              stroke="#1E293B"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  };

  const renderAreaChart = () => {
    const width = 800;
    const height = 400;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxPrice = Math.max(...chartData.map(d => d.close));
    const minPrice = Math.min(...chartData.map(d => d.close));
    const priceRange = maxPrice - minPrice;
    
    const points = chartData.map((d, i) => {
      const x = padding + (i / (chartData.length - 1)) * chartWidth;
      const y = padding + chartHeight - (d.close - minPrice) / priceRange * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    const areaPath = `M ${padding},${padding + chartHeight} L ${points} L ${padding + chartWidth},${padding + chartHeight} Z`;

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid */}
        <defs>
          <pattern id="areaGrid" width={chartWidth / 10} height={chartHeight / 8} patternUnits="userSpaceOnUse">
            <path d={`M ${chartWidth / 10} 0 L 0 0 0 ${chartHeight / 8}`} fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x={padding} y={padding} width={chartWidth} height={chartHeight} fill="url(#areaGrid)" />
        
        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
        />
        
        {/* Area line */}
        <polyline
          points={points}
          fill="none"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderBarChart = () => {
    const width = 800;
    const height = 400;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxVolume = Math.max(...chartData.map(d => d.volume));
    const barWidth = chartWidth / chartData.length * 0.8;
    const barSpacing = chartWidth / chartData.length;

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid */}
        <defs>
          <pattern id="barGrid" width={chartWidth / 10} height={chartHeight / 8} patternUnits="userSpaceOnUse">
            <path d={`M ${chartWidth / 10} 0 L 0 0 0 ${chartHeight / 8}`} fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect x={padding} y={padding} width={chartWidth} height={chartHeight} fill="url(#barGrid)" />
        
        {/* Volume bars */}
        {chartData.map((d, i) => {
          const x = padding + i * barSpacing + (barSpacing - barWidth) / 2;
          const barHeight = (d.volume / maxVolume) * chartHeight;
          const y = padding + chartHeight - barHeight;
          
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#8B5CF6"
              opacity="0.8"
            />
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    switch (chartType) {
      case 'candlestick':
        return renderCandlestickChart();
      case 'line':
        return renderLineChart();
      case 'area':
        return renderAreaChart();
      case 'bar':
        return renderBarChart();
      default:
        return renderCandlestickChart();
    }
  };

  return (
    <div className="h-96 relative">
      {/* Chart Type Selector */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {chartTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setChartType(type.id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                chartType === type.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Chart Legend */}
      <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
        <div className="flex items-center gap-4 text-xs">
          {chartType === 'candlestick' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span className="text-slate-300">Bullish</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <span className="text-slate-300">Bearish</span>
              </div>
            </>
          )}
          {chartType === 'line' && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span className="text-slate-300">Price Movement</span>
            </div>
          )}
          {chartType === 'area' && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500/40 border border-green-500 rounded-sm"></div>
              <span className="text-slate-300">Price Trend</span>
            </div>
          )}
          {chartType === 'bar' && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
              <span className="text-slate-300">Volume</span>
            </div>
          )}
          <div className="w-px h-4 bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500 border-dashed border-t border-red-500"></div>
            <span className="text-slate-300">CNN Prediction</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-full bg-slate-900/50 rounded-lg border border-slate-700 p-4">
        {renderChart()}
      </div>

      {/* Chart Info */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
        <div className="flex items-center gap-4 text-sm">
          <div className="text-white">
            <span className="text-slate-400">Current: </span>
            <span className="font-semibold">${chartData[chartData.length - 1]?.close.toFixed(2)}</span>
          </div>
          <div className="text-green-400">
            <span className="text-slate-400">Change: </span>
            <span className="font-semibold">+2.35%</span>
          </div>
          {chartType === 'bar' && (
            <div className="text-purple-400">
              <span className="text-slate-400">Volume: </span>
              <span className="font-semibold">{(chartData[chartData.length - 1]?.volume / 1000000).toFixed(1)}M</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockChart;