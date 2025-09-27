import React, { useState, useEffect, useMemo } from "react";
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

// Removed mockPositions; real data fetched from API

import { useAccount } from "wagmi";

interface RawStakeRecord {
  id: string;
  amount: number | string;
  choice: "yes" | "no" | string;
  status: string; // pending | won | lost
  created_at: string;
  user_id: string;
  market_id: string;
  markets?: {
    title: string;
    start_date: string;
    end_date: string;
    categories?: { id: string; name: string } | null;
  } | null;
}

export default function MyPositions({ onBack }: MyPositionsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "settled">("all");
  // const [claimingId, setClaimingId] = useState<string>(""); // reserved for future claim logic
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  // Fetch stakes when wallet address changes
  useEffect(() => {
    const fetchStakes = async () => {
      if (!address) return;
      setLoading(true);
      setError(null);
      try {
        // We can call stakes endpoint directly with wallet_address now
        const res = await fetch(`/api/stakes?wallet_address=${address}`);
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || "Failed to fetch stakes");
        }
        const stakes: RawStakeRecord[] = json.stakes || [];
        const mapped: Position[] = stakes.map((s) => ({
          id: s.id,
          marketTitle: s.markets?.title || "Unknown Market",
          outcome: (s.choice?.toLowerCase() === "yes" ? "yes" : "no") as "yes" | "no",
          stakeAmount: Number(s.amount) || 0,
          // Placeholder logic for currentValue & potentialPayout; could be improved with pricing logic
          currentValue: Number(s.amount) || 0,
          potentialPayout:
            s.status === "won"
              ? Number(s.amount) * 2 // simplistic; adjust with real payout formula later
              : Number(s.amount),
          status: (["active", "won", "lost", "pending"].includes(s.status)
            ? s.status
            : "pending") as Position["status"],
          marketEndDate: s.markets?.end_date
            ? new Date(s.markets.end_date).toLocaleDateString()
            : "N/A",
          category: s.markets?.categories?.name || "General",
        }));
        setPositions(mapped);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Error fetching stakes";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchStakes();
  }, [address]);

  const filteredPositions = useMemo(() => {
    return positions.filter((position) => {
      if (activeTab === "active")
        return position.status === "active" || position.status === "pending"; // treat pending as active
      if (activeTab === "settled") return ["won", "lost"].includes(position.status);
      return true;
    });
  }, [positions, activeTab]);

  const totalStaked = useMemo(
    () => positions.reduce((sum, pos) => sum + pos.stakeAmount, 0),
    [positions]
  );
  const totalCurrentValue = useMemo(
    () =>
      positions
        .filter((pos) => pos.status === "active" || pos.status === "pending")
        .reduce((sum, pos) => sum + pos.currentValue, 0),
    [positions]
  );
  const totalWinnings = useMemo(
    () =>
      positions
        .filter((pos) => pos.status === "won")
        .reduce((sum, pos) => sum + pos.potentialPayout, 0),
    [positions]
  );
  const unclaimedWinnings = totalWinnings; // Placeholder; differentiate claimed vs unclaimed later

  // const handleClaim = async (positionId: string) => { /* implement claim later */ };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col   mb-8 gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-muted-foreground  transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Markets</span>
        </button>

        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl sm:text-4xl font-bold text-black/80 dark:text-white">
            My Positions
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
              <div className="text-2xl font-bold text-green-400">{totalWinnings} BDAG</div>
            </div>
            <Trophy className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 dark:text-white/60 text-sm mb-1">Unclaimed</div>
              <div className="text-2xl font-bold text-yellow-400">{unclaimedWinnings} BDAG</div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-1 p-1 bg-white/5 rounded-xl backdrop-blur-xl border dark:border-white/10 w-fit min-w-max">
          {[
            { id: "all", label: "All Positions" },
            { id: "active", label: "Active" },
            { id: "settled", label: "Settled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "all" | "active" | "settled")}
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
      {/* {unclaimedWinnings > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                Unclaimed Winnings Available
              </h3>
              <p className="text-black/50 dark:text-white/70">
                You have {unclaimedWinnings} BDAG ready to claim
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:from-green-400 hover:to-emerald-500 transition-all hover:scale-105 w-full sm:w-auto">
              Claim All Winnings
            </button>
          </div>
        </div>
      )} */}

      {/* Positions List */}
      <div className="space-y-4">
        {loading && <div className="text-center py-12 text-white/60">Loading positions...</div>}
        {error && !loading && <div className="text-center py-12 text-red-400">{error}</div>}
        {!loading &&
          !error &&
          filteredPositions.map((position) => (
            <div
              key={position.id}
              className="backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="px-2 py-1 rounded text-xs font-medium bg-gradient-to-r from-cyan-400 to-purple-500 text-white">
                      {position.category}
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${getStatusColor(position.status)}`}
                    >
                      {getStatusIcon(position.status)}
                      <span className="text-sm font-medium capitalize">{position.status}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-3">
                    {position.marketTitle}
                  </h3>

                  <div className="flex flex-wrap gap-3 sm:gap-6 text-gray-400 dark:text-white/60">
                    <div>
                      <span className="text-sm">Outcome: </span>
                      <span
                        className={`font-semibold ${
                          position.outcome === "yes" ? "text-green-400" : "text-red-400"
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

                <div className="text-left sm:text-right">
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
                        {(position.currentValue - position.stakeAmount).toFixed(0)} BDAG
                      </div>
                    </div>
                  )}

                  {position.status === "won" && (
                    <div className="mb-4">
                      <div className="text-green-400 text-sm">Won</div>
                      <div className="text-2xl font-bold text-green-400">
                        {position.potentialPayout} BDAG
                      </div>
                      {/* <button
                      onClick={() => handleClaim(position.id)}
                      disabled={claimingId === position.id}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-medium hover:from-green-400 hover:to-emerald-500 transition-all disabled:opacity-50 w-full sm:w-auto"
                    >
                      {claimingId === position.id ? "Claiming..." : "Claim"}
                    </button> */}
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

      {!loading && !error && filteredPositions.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No positions found</h3>
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
