"use client";

import { useReadContract } from "wagmi";
import { baseTimerAbi, contractAddress } from "@/lib/contract";

export function useFirstUse(address?: `0x${string}`) {
  const query = useReadContract({
    address: contractAddress,
    abi: baseTimerAbi,
    functionName: "firstUse",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
      refetchInterval: 15_000,
    },
  });

  return {
    firstUse: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
    refetch: query.refetch,
  };
}
