"use client";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi } from "../constants/abi";
import { parseEther, formatEther } from "viem";
import { contractAddress, tokenAddress } from "@/constants";

// Minimal ERC-20 ABI for approve
const ERC20ABI = [
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    type: "function",
  },
];

const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  contractAddress) as `0x${string}`;
const BDAG_TOKEN_ADDRESS = (process.env.NEXT_PUBLIC_BDAG_TOKEN_ADDRESS ||
  tokenAddress) as `0x${string}`;

export const useStakeContract = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Place a stake
  const placeStake = async ({
    choice,
    amount,
    userId,
    marketId,
    minAmount,
  }: {
    choice: boolean;
    amount: number | string;
    userId: string;
    marketId: string;
    minAmount: number | string;
  }) => {
    try {
      // Approve BDAG tokens
      await writeContractAsync({
        address: BDAG_TOKEN_ADDRESS,
        abi: ERC20ABI,
        functionName: "approve",
        args: [CONTRACT_ADDRESS, parseEther(amount.toString())],
      });

      // Call placeStake with StakePayload struct
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: "placeStake",
        args: [
          {
            choice,
            amount: parseEther(amount.toString()),
            userId,
            marketId,
            minAmount: parseEther(minAmount.toString()),
          },
        ],
      });
      return tx;
    } catch (error) {
      console.error("Stake failed:", error);
      throw error;
    }
  };

  // Read stakes for a market
  const { data: allStakes } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "getAllStakesForMarket",
    args: ["market1"], // Example marketId
  });

  // Demo place stake with fixed data
  const demoPlaceStake = async () => {
    try {
      const tx = await placeStake({
        choice: true,
        amount: 2, // 0.1 tokens
        userId: "demo-user-123",
        marketId: "demo-market-456",
        minAmount: 1, // Minimum stake
      });
      console.log("Demo stake successful, tx:", tx);
      return tx;
    } catch (error) {
      console.error("Demo stake failed:", error);
      throw error;
    }
  };

  return {
    placeStake,
    demoPlaceStake,
    allStakes: Array.isArray(allStakes)
      ? allStakes.map((stake) => ({
          staker: stake.staker,
          amount: formatEther(stake.amount),
          choice: stake.choice,
          timestamp: Number(stake.timestamp),
        }))
      : [],
  };
};
