"use client";

import { useParams, useRouter } from "next/navigation";
import MarketDetail from "@/components/Markets/MarketDetail";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  return (
    <main>
      <MarketDetail marketId={id} onBack={() => router.push("/markets")} />
    </main>
  );
}
