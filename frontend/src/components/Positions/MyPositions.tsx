import React, { useState } from "react";
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";

interface Position {
  id: string;
  marketTitle: string;
  outcome: "yes" | "no";
  stakeAmount: number;
  currentValue: number;
  potentialPayout: number;
  status: "active" | "won" | "lost" | "pending";
  marketEndDate: string;
  category: string;
}

interface MyPositionsProps {
  onBack: () => void;
}

const mockPositions: Position[] = [
  {
    id: "1",
    marketTitle: "Will BlockDAG mainnet launch in Q2 2024?",
    outcome: "yes",
    stakeAmount: 250,
    currentValue: 285,
    potentialPayout: 320,
    status: "active",
    marketEndDate: "Jun 30, 2024",
    category: "BlockDAG",
  },
  {
    id: "2",
    marketTitle: "Will Bitcoin reach $100,000 by end of 2024?",
    outcome: "yes",
    stakeAmount: 150,
    currentValue: 142,
    potentialPayout: 200,
    status: "active",
    marketEndDate: "Dec 31, 2024",
    category: "Crypto",
  },
  {
    id: "3",
    marketTitle: "Will Ethereum 2.0 staking APY drop below 3%?",
    outcome: "no",
    stakeAmount: 100,
    currentValue: 124,
    potentialPayout: 130,
    status: "won",
    marketEndDate: "Mar 15, 2024",
    category: "DeFi",
  },
  {
    id: "4",
    marketTitle: "Will Tesla stock exceed $300 this quarter?",
    outcome: "yes",
    stakeAmount: 80,
    currentValue: 0,
    potentialPayout: 0,
    status: "lost",
    marketEndDate: "Mar 31, 2024",
    category: "Stocks",
  },
];

export default function MyPositions({ onBack }: MyPositionsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "settled">(
    "all"
  );
  const [claimingId, setClaimingId] = useState<string>("");

  const filteredPositions = mockPositions.filter((position) => {
    if (activeTab === "active") return position.status === "active";
    if (activeTab === "settled")
      return ["won", "lost"].includes(position.status);
    return true;
  });

  const totalStaked = mockPositions.reduce(
    (sum, pos) => sum + pos.stakeAmount,
    0
  );
  const totalCurrentValue = mockPositions
    .filter((pos) => pos.status === "active")
    .reduce((sum, pos) => sum + pos.currentValue, 0);
  const totalWinnings = mockPositions
    .filter((pos) => pos.status === "won")
    .reduce((sum, pos) => sum + pos.potentialPayout, 0);
  const unclaimedWinnings = mockPositions
    .filter((pos) => pos.status === "won")
    .reduce((sum, pos) => sum + pos.potentialPayout, 0);

  const handleClaim = async (positionId: string) => {
    setClaimingId(positionId);
    // Simulate claim transaction
    setTimeout(() => {
      setClaimingId("");
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "lost":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "active":
        return <Clock className="w-5 h-5 text-cyan-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won":
        return "text-green-400";
      case "lost":
        return "text-red-400";
      case "active":
        return "text-cyan-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 dark:text-white/70 hover:text-white transition-colors mr-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Markets</span>
        </button>

        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-black/80 dark:text-white">My Positions</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Total Staked</div>
              <div className="text-2xl font-bold text-black dark:text-white">
                {totalStaked} BDAG
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Current Value</div>
              <div className="text-2xl font-bold text-black dark:text-white">
                {totalCurrentValue} BDAG
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Total Winnings</div>
              <div className="text-2xl font-bold text-green-400">
                {totalWinnings} BDAG
              </div>
            </div>
            <Trophy className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Unclaimed</div>
              <div className="text-2xl font-bold text-yellow-400">
                {unclaimedWinnings} BDAG
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 p-1 bg-white/5 rounded-xl backdrop-blur-xl border dark:border-white/10 w-fit">
          {[
            { id: "all", label: "All Positions" },
            { id: "active", label: "Active" },
            { id: "settled", label: "Settled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "text-black/80 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/30 dark:hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Claim All */}
      {unclaimedWinnings > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                Unclaimed Winnings Available
              </h3>
              <p className="text-black/50 dark:text-white/70">
                You have {unclaimedWinnings} BDAG ready to claim
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:from-green-400 hover:to-emerald-500 transition-all hover:scale-105">
              Claim All Winnings
            </button>
          </div>
        </div>
      )}

      {/* Positions List */}
      <div className="space-y-4">
        {filteredPositions.map((position) => (
          <div
            key={position.id}
            className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="px-2 py-1 rounded text-xs font-medium bg-gradient-to-r from-cyan-400 to-purple-500 text-white">
                    {position.category}
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${getStatusColor(
                      position.status
                    )}`}
                  >
                    {getStatusIcon(position.status)}
                    <span className="text-sm font-medium capitalize">
                      {position.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                  {position.marketTitle}
                </h3>

                <div className="flex items-center space-x-6 text-gray-400 dark:text-white/60">
                  <div>
                    <span className="text-sm">Outcome: </span>
                    <span
                      className={`font-semibold ${
                        position.outcome === "yes"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {position.outcome.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Staked: </span>
                    <span className="text-black dark:text-white font-medium">
                      {position.stakeAmount} BDAG
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Ends: </span>
                    <span className="text-black dark:text-white">{position.marketEndDate}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                {position.status === "active" && (
                  <div className="mb-4">
                    <div className="text-gray-400 dark:text-white/60 text-sm">Current Value</div>
                    <div className="text-2xl font-bold text-black dark:text-white">
                      {position.currentValue} BDAG
                    </div>
                    <div
                      className={`text-sm ${
                        position.currentValue > position.stakeAmount
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {position.currentValue > position.stakeAmount ? "+" : ""}
                      {(position.currentValue - position.stakeAmount).toFixed(
                        0
                      )}{" "}
                      BDAG
                    </div>
                  </div>
                )}

                {position.status === "won" && (
                  <div className="mb-4">
                    <div className="text-green-400 text-sm">Won</div>
                    <div className="text-2xl font-bold text-green-400">
                      {position.potentialPayout} BDAG
                    </div>
                    <button
                      onClick={() => handleClaim(position.id)}
                      disabled={claimingId === position.id}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-medium hover:from-green-400 hover:to-emerald-500 transition-all disabled:opacity-50"
                    >
                      {claimingId === position.id ? "Claiming..." : "Claim"}
                    </button>
                  </div>
                )}

                {position.status === "lost" && (
                  <div className="mb-4">
                    <div className="text-red-400 text-sm">Lost</div>
                    <div className="text-xl font-bold text-red-400">
                      -{position.stakeAmount} BDAG
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPositions.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No positions found
          </h3>
          <p className="text-white/60">
            {activeTab === "active"
              ? "You don't have any active positions yet"
              : activeTab === "settled"
              ? "No settled positions to show"
              : "Start trading to see your positions here"}
          </p>
        </div>
      )}
    </div>
  );
}
