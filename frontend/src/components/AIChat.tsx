import React, { useState } from 'react';
import { Send, Bot, User, TrendingUp, BarChart, Brain } from 'lucide-react';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm your AI trading assistant powered by CNN analysis. I can help you analyze chart patterns, predict stock movements, and provide market insights. What would you like to know?",
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      type: 'user',
      content: "What's the prediction for AAPL in the next week?",
      timestamp: new Date(Date.now() - 3 * 60000)
    },
    {
      type: 'bot',
      content: "Based on my CNN analysis of AAPL's chart patterns, I predict a bullish trend with 94.2% confidence. The model identified a ascending triangle pattern with strong support at $172. Target price: $182.50 within 5-7 days. Key factors: Technical breakout above resistance, positive volume momentum, and favorable sentiment analysis.",
      timestamp: new Date(Date.now() - 2 * 60000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    { icon: TrendingUp, label: 'Market Overview', query: 'Give me today\'s market overview' },
    { icon: BarChart, label: 'Top Gainers', query: 'Show me today\'s top gaining stocks' },
    { icon: Brain, label: 'CNN Insights', query: 'What are the latest CNN predictions?' }
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newUserMessage = {
        type: 'user' as const,
        content: inputMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setInputMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const botResponse = {
          type: 'bot' as const,
          content: "I'm analyzing the latest market data and chart patterns. Based on current CNN model predictions, I can provide detailed insights about stock movements, technical patterns, and risk assessments. What specific aspect would you like me to focus on?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Trading Assistant</h1>
            <p className="text-slate-400">Powered by CNN chart analysis</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-3 mt-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(action.query)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700 transition-all duration-200"
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : ''}`}>
            {message.type === 'bot' && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
            
            <div className={`max-w-2xl ${message.type === 'user' ? 'order-first' : ''}`}>
              <div className={`p-4 rounded-xl ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800/50 border border-slate-700 text-slate-100'
              }`}>
                <p className="leading-relaxed">{message.content}</p>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>

            {message.type === 'user' && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-300" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-800">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about stock predictions, market analysis, or chart patterns..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-white font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
        
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>AI model active • Response time: ~1.2s</span>
        </div>
      </div>
    </div>
  );
};

export default AIChat;