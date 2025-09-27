"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, Clock, Users, ArrowRight } from "lucide-react";

interface Market {
  id: string;
  title: string;
  category: string;
  yesPercentage: number;
  totalVolume: string;
  participants: number;
  endsAt: string;
  trending: boolean;
}

interface ApiMarket {
  id: string;
  title: string;
  description: string;
  category_id: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  trending: boolean;
  min_stake: string;
  max_stake: string;
  created_at: string;
  updated_at: string;
}

interface MarketsListProps {
  onSelectMarket: (marketId: string) => void;
}

export default function MarketsList({ onSelectMarket }: MarketsListProps) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch("/api/markets");
        if (!res.ok) throw new Error("Failed to fetch markets");

        const result = await res.json();
        const apiMarkets: ApiMarket[] = Array.isArray(result)
          ? result
          : result.data;

        const formattedMarkets: Market[] = apiMarkets.map((m) => ({
          id: m.id,
          title: m.title,
          category: m.category_id,
          yesPercentage: Math.floor(Math.random() * 100),
          totalVolume: `${Math.floor(Math.random() * 1000)}K`,
          participants: Math.floor(Math.random() * 2000),
          endsAt: new Date(m.end_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          trending: m.trending,
        }));

        setMarkets(formattedMarkets);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Crypto":
        return "from-orange-400 to-yellow-500";
      case "BlockDAG":
        return "from-cyan-400 to-blue-500";
      case "Stocks":
        return "from-green-400 to-emerald-500";
      case "DeFi":
        return "from-purple-400 to-pink-500";
      case "AI/Crypto":
        return "from-violet-400 to-purple-500";
      case "Economics":
        return "from-blue-400 to-indigo-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading markets...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3">
          Prediction Markets
        </h1>
        <p className="dark:text-white/70 text-black/50 text-base sm:text-lg">
          Discover and trade on the most popular prediction markets
        </p>
      </div>

      {/* Trending Markets */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-black/80 dark:text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-cyan-400" />
          Trending Markets
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {markets
            .filter((market) => market.trending)
            .map((market) => (
              <div
                key={market.id}
                onClick={() => onSelectMarket(market.id)}
                className="group backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 border dark:border-white/20 rounded-2xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                {/* Top Row */}
                <div className="flex flex-wrap items-start justify-between mb-4 gap-2">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(
                      market.category
                    )} text-white`}
                  >
                    {market.category}
                  </div>
                  <div className="flex items-center text-orange-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Trending</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {market.title}
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
                    <span className="text-green-400 font-semibold">
                      YES {market.yesPercentage}%
                    </span>
                    <span className="text-red-400 font-semibold">
                      NO {100 - market.yesPercentage}%
                    </span>
                  </div>
                  <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ease-out"
                      style={{ width: `${market.yesPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between text-white/60 text-xs sm:text-sm gap-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-gray-400">
                        {market.participants.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-gray-400">${market.totalVolume}</div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-gray-400">{market.endsAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs sm:text-sm mr-2 text-gray-400">
                    View Details
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* All Markets */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          All Markets
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market) => (
            <div
              key={market.id}
              onClick={() => onSelectMarket(market.id)}
              className="group backdrop-blur-xl bg-white/5 border dark:border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:border-cyan-400/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center space-x-3 mb-2">
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getCategoryColor(
                        market.category
                      )} text-white`}
                    >
                      {market.category}
                    </div>
                    {market.trending && (
                      <div className="flex items-center text-orange-400 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </div>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-black/80 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {market.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-white/60 text-xs sm:text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{market.participants.toLocaleString()}</span>
                    </div>
                    <div>${market.totalVolume}</div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{market.endsAt}</span>
                    </div>
                  </div>
                </div>

                {/* Right Stats */}
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-400">
                      {market.yesPercentage}%
                    </div>
                    <div className="text-xs text-gray-400 dark:text-white/60 ">
                      YES
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-red-400">
                      {100 - market.yesPercentage}%
                    </div>
                    <div className="text-xs text-gray-400 dark:text-white/60">
                      NO
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 dark:text-white/40 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
