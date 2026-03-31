"use client";

import { useAccount } from "wagmi";
import { NumberPanel } from "@/components/number-panel";
import { StatusBadge } from "@/components/status-badge";
import { useFirstUse } from "@/hooks/use-first-use";
import { formatAddress, formatFullDate, formatUnix } from "@/lib/format";

export function MyDashboard() {
  const { address, chain, isConnected } = useAccount();
  const { firstUse, isLoading } = useFirstUse(address);
  const started = Boolean(firstUse && firstUse > 0n);
  const timestampMs = started ? Number(firstUse) * 1000 : 0;

  return (
    <section className="stack-md">
      <article className="card stack-md">
        <div className="row">
          <StatusBadge tone={isConnected ? "live" : "off"} label={isConnected ? "Connected" : "Disconnected"} />
          <p className="status-text">{chain?.name ?? "Base wallet"}</p>
        </div>
        <div className="panel-grid">
          <NumberPanel label="Wallet" value={address ? formatAddress(address) : "--"} note="Active account" />
          <NumberPanel label="Timer" value={started ? "SET" : "OPEN"} note={started ? "First use recorded" : "Ready to start"} />
          <NumberPanel label="Network" value={chain?.id ? String(chain.id) : "8453"} note="Base mainnet" />
          <NumberPanel label="Unix" value={started ? formatUnix(firstUse!) : "--"} note="Stored timestamp" />
        </div>
      </article>

      <article className="card card-muted stack-sm">
        <div className="row">
          <p className="time-label">Current record</p>
          <StatusBadge tone={started ? "live" : "idle"} label={started ? "Locked" : isLoading ? "Loading" : "Not started"} />
        </div>
        <p className="status-text">{started ? formatFullDate(timestampMs) : "Connect your wallet and use Start Timer once."}</p>
      </article>
    </section>
  );
}
