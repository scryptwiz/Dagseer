// app/markets/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MarketDetail from "@/components/Markets/MarketDetail";

export default function MarketPage() {
  const { id } = useParams(); // dynamic marketId from URL
  const router = useRouter();

  const [market, setMarket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMarket = async () => {
      try {
        const res = await fetch(`/api/markets/${id}`);
        const json = await res.json();
        if (json.success) {
          setMarket(json.data);
        }
      } catch (err) {
        console.error("Error fetching market:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
  }, [id]);

  if (loading) return <p className="p-6">Loading market...</p>;
  if (!market) return <p className="p-6">Market not found</p>;

  return (
    <main>
      <MarketDetail
        market={market}
        marketId={market.id}
        onBack={() => router.push("/markets")}
      />
    </main>
  );
}
