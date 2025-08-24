import React from 'react';
import { 
  BarChart3, 
  Brain, 
  MessageCircle, 
  TrendingUp, 
  Wallet,
  Settings,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'analytics', label: 'CNN Analysis', icon: Brain },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
  ];

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">StockVision</h1>
            <p className="text-xs text-slate-400">CNN Predictions</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Model Active</span>
          </div>
          <p className="text-xs text-slate-400">CNN v2.1 • 94.2% accuracy</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;