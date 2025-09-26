"use client";

import MyPositions from "@/components/Positions/MyPositions";
import WalletGuard from "@/utils/WalletGuard";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <WalletGuard>
      <main>
        <MyPositions onBack={() => router.push("/markets")} />
      </main>
    </WalletGuard>
  );
};

export default page;
