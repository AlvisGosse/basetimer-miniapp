export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatUnix(timestamp: bigint) {
  return timestamp.toString();
}

export function formatFullDate(timestampMs: number) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(timestampMs);
}

export function formatElapsed(timestampMs: number, nowMs: number) {
  if (!timestampMs || nowMs <= timestampMs) {
    return "00:00:00";
  }

  const diffSeconds = Math.floor((nowMs - timestampMs) / 1000);
  const hours = Math.floor(diffSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((diffSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (diffSeconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function formatElapsedParts(timestampMs: number, nowMs: number) {
  if (!timestampMs || nowMs <= timestampMs) {
    return { days: "--", hours: "--", minutes: "--", seconds: "--" };
  }

  const diffSeconds = Math.floor((nowMs - timestampMs) / 1000);
  const days = Math.floor(diffSeconds / 86400).toString().padStart(2, "0");
  const hours = Math.floor((diffSeconds % 86400) / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((diffSeconds % 3600) / 60).toString().padStart(2, "0");
  const seconds = (diffSeconds % 60).toString().padStart(2, "0");

  return { days, hours, minutes, seconds };
}

export function formatRelativeLabel(timestampMs: number, nowMs: number) {
  if (!timestampMs || nowMs <= timestampMs) {
    return "Not started";
  }

  const diffSeconds = Math.floor((nowMs - timestampMs) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}d ago`;
  }
  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes}m ago`;
  }

  return `${diffSeconds}s ago`;
}
