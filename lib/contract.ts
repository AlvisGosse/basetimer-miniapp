export const contractAddress = "0xfdb2512b4d5ad6c4d48a45f7815e65741c8798f3" as const;
export const builderCode = "bc_3v0f5uva" as const;
export const builderDataSuffix =
  "0x62635f33763066357576610b0080218021802180218021802180218021" as const;

export const baseTimerAbi = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "firstUse",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "start",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
