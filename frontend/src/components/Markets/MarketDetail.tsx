"use client";

import React, { useState } from "react";
import { ArrowLeft, TrendingUp, Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MarketDetailProps {
  marketId: string;
  onBack: () => void;
}

export default function MarketDetail({ marketId, onBack }: MarketDetailProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no">("yes");
  const [stakeAmount, setStakeAmount] = useState<string>("100");
  const [isStaking, setIsStaking] = useState(false);

  // Mock market data (in real app, fetch based on marketId)
  const market = {
    id: marketId,
    title: "Will BlockDAG mainnet launch in Q2 2024?",
    description:
      'This market resolves to "Yes" if BlockDAG officially launches their mainnet before July 1st, 2024. The launch must be announced by official BlockDAG channels and be accessible to the public.',
    category: "BlockDAG",
    yesPercentage: 89,
    totalVolume: "523K",
    participants: 892,
    endsAt: "Jun 30, 2024",
    trending: true,
    yesPrice: 0.89,
    noPrice: 0.11,
    liquidity: "1.2M",
  };

  const handleStake = async () => {
    setIsStaking(true);
    setTimeout(() => {
      setIsStaking(false);
    }, 2000);
  };

  const potentialReturn =
    selectedOutcome === "yes"
      ? (parseFloat(stakeAmount) / market.yesPrice).toFixed(2)
      : (parseFloat(stakeAmount) / market.noPrice).toFixed(2);

  const adjustAmount = (delta: number) => {
    const current = parseFloat(stakeAmount) || 0;
    const newAmount = Math.max(0, current + delta);
    setStakeAmount(newAmount.toString());
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center mb-6 sm:mb-8 gap-3">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 dark:text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm sm:text-base">Back to Markets</span>
        </button>

        <div className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
          {market.category}
        </div>

        {market.trending && (
          <div className="flex items-center text-orange-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-xs sm:text-sm font-medium">Trending</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Market Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 leading-tight">
            {market.title}
          </h1>

          <Card className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-4 sm:p-6 mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-3 sm:mb-4">
              Market Details
            </h3>
            <p className="text-sm sm:text-base text-black/50 dark:text-white/70 leading-relaxed mb-4 sm:mb-6">
              {market.description}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-3 sm:p-4">
                <div className="text-gray-400 dark:text-white/60 text-xs sm:text-sm mb-1">
                  Total Volume
                </div>
                <div className="text-lg sm:text-2xl font-bold text-black dark:text-white">
                  ${market.totalVolume}
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-3 sm:p-4">
                <div className="text-gray-400 dark:text-white/60 text-xs sm:text-sm mb-1">
                  Participants
                </div>
                <div className="text-lg sm:text-2xl font-bold text-black dark:text-white">
                  {market.participants.toLocaleString()}
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-3 sm:p-4">
                <div className="text-gray-400 dark:text-white/60 text-xs sm:text-sm mb-1">
                  Liquidity
                </div>
                <div className="text-lg sm:text-2xl font-bold text-black dark:text-white">
                  ${market.liquidity}
                </div>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-3 sm:p-4">
                <div className="text-gray-400 dark:text-white/60 text-xs sm:text-sm mb-1">
                  Ends
                </div>
                <div className="text-base sm:text-lg font-semibold text-black dark:text-white">
                  {market.endsAt}
                </div>
              </div>
            </div>
          </Card>

          {/* Current Odds */}
          <Card className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
              Current Odds
            </h3>

            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-green-400 font-semibold text-base sm:text-lg">
                YES {market.yesPercentage}%
              </span>
              <span className="text-red-400 font-semibold text-base sm:text-lg">
                NO {100 - market.yesPercentage}%
              </span>
            </div>

            <div className="h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden mb-4 sm:mb-6">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ease-out"
                style={{ width: `${market.yesPercentage}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="text-green-400 font-semibold text-sm sm:text-base">
                  YES Price
                </div>
                <div className="text-lg sm:text-2xl font-bold text-green-400">
                  ${market.yesPrice}
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="text-red-400 font-semibold text-sm sm:text-base">
                  NO Price
                </div>
                <div className="text-lg sm:text-2xl font-bold text-red-400">
                  ${market.noPrice}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Staking Panel */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border dark:border-white/20 rounded-2xl p-4 sm:p-6 h-fit">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
            Place Your Stake
          </h3>

          <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => setSelectedOutcome("yes")}
              className={`flex-1 py-2 sm:py-3 rounded-xl font-semibold transition-colors ${
                selectedOutcome === "yes"
                  ? "bg-green-500 text-white"
                  : "bg-green-500/10 text-green-400"
              }`}
            >
              YES
            </button>
            <button
              onClick={() => setSelectedOutcome("no")}
              className={`flex-1 py-2 sm:py-3 rounded-xl font-semibold transition-colors ${
                selectedOutcome === "no"
                  ? "bg-red-500 text-white"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              NO
            </button>
          </div>

        <div className="mb-4 sm:mb-6">
  <label className="block text-sm sm:text-base text-gray-400 mb-2">
    Stake Amount ($)
  </label>
  <div className="flex items-center gap-2 sm:gap-3 w-full">
    <button
      onClick={() => adjustAmount(-10)}
      className="p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
    >
      <Minus className="w-4 h-4" />
    </button>
    <input
      type="number"
      value={stakeAmount}
      onChange={(e) => setStakeAmount(e.target.value)}
      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black/20 border border-white/10 text-white text-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
    <button
      onClick={() => adjustAmount(10)}
      className="p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
</div>


          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between text-sm sm:text-base text-gray-400">
              <span>Potential Return</span>
              <span className="font-semibold text-white">
                ${potentialReturn}
              </span>
            </div>
          </div>

          <button
            onClick={handleStake}
            disabled={isStaking}
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isStaking ? "Placing Stake..." : "Confirm Stake"}
          </button>
        </Card>
      </div>
    </div>
  );
}
