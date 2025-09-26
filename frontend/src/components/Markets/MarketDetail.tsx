import React, { useState } from 'react';
import { ArrowLeft, Users, Clock, TrendingUp, Plus, Minus } from 'lucide-react';

interface MarketDetailProps {
  marketId: string;
  onBack: () => void;
}

export default function MarketDetail({ marketId, onBack }: MarketDetailProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no'>('yes');
  const [stakeAmount, setStakeAmount] = useState<string>('100');
  const [isStaking, setIsStaking] = useState(false);

  // Mock market data (in real app, fetch based on marketId)
  const market = {
    id: marketId,
    title: 'Will BlockDAG mainnet launch in Q2 2024?',
    description: 'This market resolves to "Yes" if BlockDAG officially launches their mainnet before July 1st, 2024. The launch must be announced by official BlockDAG channels and be accessible to the public.',
    category: 'BlockDAG',
    yesPercentage: 89,
    totalVolume: '523K',
    participants: 892,
    endsAt: 'Jun 30, 2024',
    trending: true,
    yesPrice: 0.89,
    noPrice: 0.11,
    liquidity: '1.2M'
  };

  const handleStake = async () => {
    setIsStaking(true);
    // Simulate staking transaction
    setTimeout(() => {
      setIsStaking(false);
      // Show success message or redirect
    }, 2000);
  };

  const potentialReturn = selectedOutcome === 'yes' 
    ? (parseFloat(stakeAmount) / market.yesPrice).toFixed(2)
    : (parseFloat(stakeAmount) / market.noPrice).toFixed(2);

  const adjustAmount = (delta: number) => {
    const current = parseFloat(stakeAmount) || 0;
    const newAmount = Math.max(0, current + delta);
    setStakeAmount(newAmount.toString());
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 dark:text-white/70 hover:text-white transition-colors mr-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Markets</span>
        </button>
        
        <div className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
          {market.category}
        </div>
        
        {market.trending && (
          <div className="flex items-center ml-3 text-orange-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Trending</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Market Info */}
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white mb-6 leading-tight">
            {market.title}
          </h1>
          
          <div className="backdrop-blur-xl bg-white/5 border  dark:border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Market Details</h3>
            <p className="text-black/50 dark:text-white/70 leading-relaxed mb-6">
              {market.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-4">
                <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Total Volume</div>
                <div className="text-2xl font-bold text-black dark:text-white">${market.totalVolume}</div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-4">
                <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Participants</div>
                <div className="text-2xl font-bold text-black dark:text-white">{market.participants.toLocaleString()}</div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-4">
                <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Liquidity</div>
                <div className="text-2xl font-bold text-black dark:text-white">${market.liquidity}</div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-4">
                <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Ends</div>
                <div className="text-lg font-semibold text-black dark:text-white">{market.endsAt}</div>
              </div>
            </div>
          </div>

          {/* Current Odds */}
          <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Current Odds</h3>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-green-400 font-semibold text-lg">YES {market.yesPercentage}%</span>
              <span className="text-red-400 font-semibold text-lg">NO {100 - market.yesPercentage}%</span>
            </div>
            
            <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ease-out"
                style={{ width: `${market.yesPercentage}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="text-green-400 font-semibold">YES Price</div>
                <div className="text-2xl font-bold text-green-400">${market.yesPrice}</div>
              </div>
              <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="text-red-400 font-semibold">NO Price</div>
                <div className="text-2xl font-bold text-red-400">${market.noPrice}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Staking Panel */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border dark:border-white/20 rounded-2xl p-6 h-fit">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-6">Place Your Stake</h3>
          
          {/* Outcome Selection */}
          <div className="mb-6">
            <div className="text-gray-400 dark:text-white/80 mb-3 font-medium">Choose Outcome</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedOutcome('yes')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedOutcome === 'yes'
                    ? 'bg-green-500/20 border-green-400 text-green-400'
                    : 'bg-white/5 dark:border-white/20 text-black/50 dark:text-white/70 hover:border-green-400/50 hover:text-green-400'
                }`}
              >
                <div className="font-semibold text-lg">YES</div>
                <div className="text-sm opacity-80">${market.yesPrice}</div>
              </button>
              <button
                onClick={() => setSelectedOutcome('no')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedOutcome === 'no'
                    ? 'bg-red-500/20 border-red-400 text-red-400'
                    : 'bg-white/5 dark:border-white/20 text-black/50 dark:text-white/70 hover:border-red-400/50 hover:text-red-400'
                }`}
              >
                <div className="font-semibold text-lg">NO</div>
                <div className="text-sm opacity-80">${market.noPrice}</div>
              </button>
            </div>
          </div>

          {/* Stake Amount */}
          <div className="mb-6">
            <div className="text-black/50 dark:text-white/80 mb-3 font-medium">Stake Amount (BDAG)</div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => adjustAmount(-10)}
                className="w-10 h-10 rounded-lg bg-white/10 border dark:border-white/20 text-black dark:text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/5 border dark:border-white/20 rounded-xl text-black dark:text-white text-center text-xl font-semibold focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="0"
              />
              <button
                onClick={() => adjustAmount(10)}
                className="w-10 h-10 rounded-lg bg-white/10 border dark:border-white/20 text-black dark:text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between mt-2">
              {[25, 50, 100, 250].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setStakeAmount(amount.toString())}
                  className="px-3 py-1 text-sm rounded-lg bg-white/10 border dark:border-white/20 text-black dark:text-white/70 hover:text-white hover:border-cyan-400/50 transition-all"
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Potential Return */}
          <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70">Potential Return:</span>
              <span className="text-2xl font-bold text-cyan-400">{potentialReturn} BDAG</span>
            </div>
            <div className="flex justify-between items-center text-sm text-white/60">
              <span>Profit:</span>
              <span className="text-green-400 font-medium">
                +{(parseFloat(potentialReturn) - parseFloat(stakeAmount)).toFixed(2)} BDAG
              </span>
            </div>
          </div>

          {/* Stake Button */}
          <button
            onClick={handleStake}
            disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) <= 0}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              selectedOutcome === 'yes'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500'
                : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500'
            } text-white shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            {isStaking ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              `Stake ${stakeAmount} BDAG on ${selectedOutcome.toUpperCase()}`
            )}
          </button>
          
          <div className="mt-4 text-center text-black/50 dark:text-white/60 text-sm">
            <div>Your balance: <span className="text-cyan-400 font-medium">1,250 BDAG</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}