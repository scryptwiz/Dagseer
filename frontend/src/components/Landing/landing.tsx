import React from 'react';
import { TrendingUp, Wallet, BarChart3, Shield, Zap } from 'lucide-react';

interface LandingPageProps {
  onConnectWallet: () => void;
}

export default function LandingPage({ onConnectWallet }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl shadow-cyan-500/25">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            DAGSeer
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-white/80 mb-4 font-light">
          Predict the Future on BlockDAG
        </p>
        
        <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          The next-generation prediction market built on BlockDAG's revolutionary architecture. 
          Stake, predict, and earn rewards in a decentralized ecosystem.
        </p>
        
        {/* Connect Wallet Button */}
        <button
          onClick={onConnectWallet}
          className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-semibold text-white text-xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
        >
          <Wallet className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span>Connect Wallet</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>
      
      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Diverse Markets</h3>
          <p className="text-white/70 leading-relaxed">
            Trade on sports, crypto, politics, and custom events with real-time odds and transparent outcomes.
          </p>
        </div>
        
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Secure & Transparent</h3>
          <p className="text-white/70 leading-relaxed">
            Built on BlockDAG's robust infrastructure ensuring security, speed, and full transparency for all trades.
          </p>
        </div>
        
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Instant Rewards</h3>
          <p className="text-white/70 leading-relaxed">
            Claim your winnings immediately with BlockDAG's lightning-fast settlement and low transaction fees.
          </p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-12 mt-16 text-center">
        <div>
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">$2.4M</div>
          <div className="text-white/60 mt-1">Volume Traded</div>
        </div>
        <div>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">142</div>
          <div className="text-white/60 mt-1">Active Markets</div>
        </div>
        <div>
          <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">8.9K</div>
          <div className="text-white/60 mt-1">Traders</div>
        </div>
      </div>
    </div>
  );
}