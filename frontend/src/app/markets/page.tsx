"use client";

import React, { useState } from "react";
import MarketsList from "@/components/Markets/MarketsList";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [selectedMarketId, setSelectedMarketId] = useState<string>("");

  const navigateToMarket = (marketId: string) => {
    setSelectedMarketId(marketId);
    router.push(`/markets/${marketId}`);
    // setCurrentScreen("market-detail");
  };
  return (
    <main>
      <MarketsList onSelectMarket={navigateToMarket} />
    </main>
  );
}
