"use client";

import ConnectButton from "@/components/ConnectButton";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ConnectionButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address,
  });

  function shortenAddress(addr?: string) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-6);
  }

  return (
    <div>
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
              {isBalanceLoading
                ? "..."
                : `${(balanceData?.formatted || "0").replace(
                    /(\.\d{0,3})\d*$/,
                    "$1"
                  )} ${balanceData?.symbol}`}
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
  );
}
