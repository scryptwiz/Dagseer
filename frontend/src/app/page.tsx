"use client";

import ConnectButton from "@/components/ConnectButton";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({ address });

  function shortenAddress(addr?: string) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-6);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#070E1B]">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-2xl font-bold text-white mb-8">BlockDAG Starter Kit</h1>
        <div className="bg-gray-800 rounded-lg p-6">
          {isConnected ? (
            <Button
              onClick={() => disconnect()}
              className="flex items-center gap-4 px-4 py-5 rounded-full bg-[#232b39] hover:bg-[#2c3650] border border-[#3a4663] text-white font-medium transition-all"
              variant="ghost"
            >
              <span className="flex items-center">
                {/* BlockDAG logo */}
                <span className="w-6 h-6 flex items-center justify-center">
                  <Image src="/icon.svg" alt="BDAG" width={20} height={20} />
                </span>
                {/* Balance */}
                <span className="text-base font-semibold">
                  {isBalanceLoading ? "..." : `${(balanceData?.formatted || "0").replace(/(\.\d{0,3})\d*$/, "$1")} ${balanceData?.symbol}`}
                </span>
              </span>
              {/* Wallet icon (optional) */}
              <span className="flex items-center bg-[#232b39] px-3 py-1 rounded-full border border-[#3a4663]">
                <span className="w-6 h-6 flex items-center justify-center">
                  <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500" />
                </span>
                {/* Shortened address */}
                <span className="text-sm">{shortenAddress(address)}</span>
              </span>
            </Button>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </main>
  );
}
