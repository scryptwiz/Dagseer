import React from "react";
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

interface MarketsListProps {
  onSelectMarket: (marketId: string) => void;
}

const mockMarkets: Market[] = [
  {
    id: "1",
    title: "Will Bitcoin reach $100,000 by end of 2024?",
    category: "Crypto",
    yesPercentage: 67,
    totalVolume: "847K",
    participants: 1234,
    endsAt: "Dec 31, 2024",
    trending: true,
  },
  {
    id: "2",
    title: "Will BlockDAG mainnet launch in Q2 2024?",
    category: "BlockDAG",
    yesPercentage: 89,
    totalVolume: "523K",
    participants: 892,
    endsAt: "Jun 30, 2024",
    trending: true,
  },
  {
    id: "3",
    title: "Will Tesla stock price exceed $300 this quarter?",
    category: "Stocks",
    yesPercentage: 34,
    totalVolume: "234K",
    participants: 567,
    endsAt: "Mar 31, 2024",
    trending: false,
  },
  {
    id: "4",
    title: "Will Ethereum 2.0 staking APY drop below 3%?",
    category: "DeFi",
    yesPercentage: 78,
    totalVolume: "445K",
    participants: 723,
    endsAt: "May 15, 2024",
    trending: false,
  },
  {
    id: "5",
    title: "Will AI tokens outperform BTC in 2024?",
    category: "AI/Crypto",
    yesPercentage: 52,
    totalVolume: "678K",
    participants: 1456,
    endsAt: "Dec 31, 2024",
    trending: true,
  },
  {
    id: "6",
    title: "Will Fed cut rates by more than 1% this year?",
    category: "Economics",
    yesPercentage: 43,
    totalVolume: "156K",
    participants: 234,
    endsAt: "Dec 31, 2024",
    trending: false,
  },
];

export default function MarketsList({ onSelectMarket }: MarketsListProps) {
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Prediction Markets
        </h1>
        <p className="text-white/70 text-lg">
          Discover and trade on the most popular prediction markets
        </p>
      </div>

      {/* Trending Markets */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-cyan-400" />
          Trending Markets
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {mockMarkets
            .filter((market) => market.trending)
            .map((market) => (
              <div
                key={market.id}
                onClick={() => onSelectMarket(market.id)}
                className="group backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="flex items-start justify-between mb-4">
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

                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {market.title}
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-semibold">
                      YES {market.yesPercentage}%
                    </span>
                    <span className="text-red-400 font-semibold">
                      NO {100 - market.yesPercentage}%
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ease-out"
                      style={{ width: `${market.yesPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-white/60 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{market.participants.toLocaleString()}</span>
                    </div>
                    <div>${market.totalVolume}</div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{market.endsAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm mr-2">View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* All Markets */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">All Markets</h2>
        <div className="grid gap-4">
          {mockMarkets.map((market) => (
            <div
              key={market.id}
              onClick={() => onSelectMarket(market.id)}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:border-cyan-400/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
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
                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {market.title}
                  </h3>
                  <div className="flex items-center space-x-6 text-white/60 text-sm">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{market.participants.toLocaleString()}</span>
                    </div>
                    <div>${market.totalVolume}</div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{market.endsAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {market.yesPercentage}%
                    </div>
                    <div className="text-xs text-white/60">YES</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {100 - market.yesPercentage}%
                    </div>
                    <div className="text-xs text-white/60">NO</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
