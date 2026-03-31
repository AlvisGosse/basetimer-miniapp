"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { baseTimerAbi, contractAddress } from "@/lib/contract";
import { useFirstUse } from "@/hooks/use-first-use";
import { NumberPanel } from "@/components/number-panel";
import { StatusBadge } from "@/components/status-badge";
import { formatAddress, formatElapsed, formatFullDate, formatUnix } from "@/lib/format";

export function HeroStatusCard() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { data: hash, error: writeError, isPending: isWriting, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError } = useWaitForTransactionReceipt({
    hash,
  });
  const { firstUse, isLoading, error, refetch } = useFirstUse(address);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isConfirmed) {
      void refetch();
    }
  }, [isConfirmed, refetch]);

  const hasStarted = Boolean(firstUse && firstUse > 0n);
  const startTimestampMs = hasStarted ? Number(firstUse) * 1000 : 0;
  const elapsed = hasStarted ? formatElapsed(startTimestampMs, now) : "00:00:00";
  const statusTone = hasStarted ? "live" : isConnected ? "idle" : "off";
  const statusLabel = hasStarted ? "Started" : isConnected ? "Ready" : "Wallet needed";
  const resolvedError = writeError?.message ?? receiptError?.message ?? error ?? null;

  const onStart = () => {
    writeContract({
      address: contractAddress,
      abi: baseTimerAbi,
      functionName: "start",
    });
  };

  return (
    <section className="card hero-grid">
      <div className="row">
        <StatusBadge tone={statusTone} label={statusLabel} />
        {isConnected && address ? (
          <button type="button" className="ghost-button" onClick={() => disconnect()}>
            {formatAddress(address)}
          </button>
        ) : null}
      </div>

      <div className="time-display">
        <p className="time-label">Current timer</p>
        <p className="time-main mono">{elapsed}</p>
        <p className="time-sub">{hasStarted ? formatFullDate(startTimestampMs) : "No onchain start recorded yet"}</p>
      </div>

      <div className="panel-grid">
        <NumberPanel label="Status" value={hasStarted ? "ON" : "OFF"} note={hasStarted ? "Locked once" : "Start pending"} />
        <NumberPanel
          label="Timestamp"
          value={hasStarted ? formatUnix(firstUse!) : "--"}
          note={hasStarted ? "Unix seconds" : "Waiting for first start"}
        />
      </div>

      {!isConnected ? (
        <div className="wallet-list">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              type="button"
              className="wallet-button"
              onClick={() => connect({ connector })}
              disabled={isConnecting}
            >
              Connect {connector.name}
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        className="primary-button"
        disabled={!isConnected || hasStarted || isWriting || isConfirming || isLoading}
        onClick={onStart}
      >
        {hasStarted ? "Timer Started" : isWriting || isConfirming ? "Starting..." : "Start Timer"}
      </button>

      <div className="stack-sm">
        <p className="status-text">
          {isLoading
            ? "Loading onchain status..."
            : hasStarted
              ? "Your first-use time is already recorded on Base."
              : "This action can be sent only once for your wallet."}
        </p>
        {isConfirmed ? <div className="status-banner">Start confirmed on Base.</div> : null}
        {resolvedError ? <div className="status-banner">{cleanError(resolvedError)}</div> : null}
      </div>
    </section>
  );
}

function cleanError(message: string) {
  if (message.includes("Already started")) {
    return "This wallet already started the timer.";
  }

  return message.length > 160 ? `${message.slice(0, 157)}...` : message;
}
