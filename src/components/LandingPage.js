import React from 'react';
import { Database, RefreshCw } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Welcome to TradeXpert Learning Administration Panel
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-xl mx-auto">
          TradeXpert Learning is your gateway to mastering the tools, strategies, and skills essential for effective administration in today's fast-paced trading environment.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch w-full max-w-md mx-auto px-4">
          <a 
            href="/add"
            className="flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 w-full no-underline touch-manipulation"
          >
            <Database className="w-5 h-5" />
            Add Data
          </a>

          <a 
            href="/manage"
            className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 w-full no-underline touch-manipulation"
          >
            <RefreshCw className="w-5 h-5" />
            Manage Data
          </a>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default LandingPage;