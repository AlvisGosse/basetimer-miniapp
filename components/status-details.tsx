"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { NumberPanel } from "@/components/number-panel";
import { StatusBadge } from "@/components/status-badge";
import { useFirstUse } from "@/hooks/use-first-use";
import { formatElapsedParts, formatFullDate, formatRelativeLabel, formatUnix } from "@/lib/format";

type Segment = "elapsed" | "absolute" | "relative";

export function StatusDetails() {
  const { address } = useAccount();
  const { firstUse, isLoading } = useFirstUse(address);
  const [segment, setSegment] = useState<Segment>("elapsed");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const started = Boolean(firstUse && firstUse > 0n);
  const timestampMs = started ? Number(firstUse) * 1000 : 0;
  const parts = formatElapsedParts(timestampMs, now);

  const panels = useMemo(() => {
    if (!started) {
      return [
        { label: "Days", value: "--", note: "Start your timer first" },
        { label: "Hours", value: "--", note: "No elapsed data yet" },
        { label: "Minutes", value: "--", note: "Connect and start" },
        { label: "Seconds", value: "--", note: "Updates live after start" },
      ];
    }

    if (segment === "absolute") {
      return [
        { label: "Unix", value: formatUnix(firstUse!), note: "Recorded onchain" },
        { label: "UTC hour", value: new Date(timestampMs).getUTCHours().toString().padStart(2, "0"), note: "UTC clock" },
        { label: "Month", value: (new Date(timestampMs).getUTCMonth() + 1).toString().padStart(2, "0"), note: "UTC month" },
        { label: "Day", value: new Date(timestampMs).getUTCDate().toString().padStart(2, "0"), note: "UTC day" },
      ];
    }

    if (segment === "relative") {
      return [
        { label: "Since", value: formatRelativeLabel(timestampMs, now), note: "Relative to now" },
        { label: "Year", value: new Date(timestampMs).getUTCFullYear().toString(), note: "Recorded year" },
        { label: "Weekday", value: new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" }).format(timestampMs), note: "UTC weekday" },
        { label: "Minute", value: new Date(timestampMs).getUTCMinutes().toString().padStart(2, "0"), note: "UTC minute" },
      ];
    }

    return [
      { label: "Days", value: parts.days, note: "Live elapsed" },
      { label: "Hours", value: parts.hours, note: "Live elapsed" },
      { label: "Minutes", value: parts.minutes, note: "Live elapsed" },
      { label: "Seconds", value: parts.seconds, note: "Live elapsed" },
    ];
  }, [firstUse, now, parts.days, parts.hours, parts.minutes, parts.seconds, segment, started, timestampMs]);

  const timeline = started
    ? [
        { step: "Recorded", value: formatUnix(firstUse!), note: "Base stored your first-use second." },
        { step: "Readable", value: formatFullDate(timestampMs), note: "Human-friendly local time." },
        { step: "Relative", value: formatRelativeLabel(timestampMs, now), note: "Distance from the current moment." },
        { step: "State", value: "Locked", note: "The contract will reject a second start." },
      ]
    : [
        { step: "Recorded", value: "--", note: "No transaction confirmed yet." },
        { step: "Readable", value: "Pending", note: "A date appears after the first start." },
        { step: "Relative", value: "Pending", note: "Elapsed time begins after start." },
        { step: "State", value: "Idle", note: "Ready for one first-use write." },
      ];

  return (
    <section className="stack-md">
      <article className="card stack-md">
        <div className="row">
          <div className="stack-sm">
            <p className="time-label">Mode</p>
            <StatusBadge tone={started ? "live" : "idle"} label={started ? "Recorded" : "Waiting"} />
          </div>
          <p className="status-text">{isLoading ? "Syncing..." : started ? "Onchain data live" : "No timestamp yet"}</p>
        </div>

        <div className="segment-wrap">
          {(["elapsed", "absolute", "relative"] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={`segment-button${segment === item ? " segment-button-active" : ""}`}
              onClick={() => setSegment(item)}
            >
              {labelForSegment(item)}
            </button>
          ))}
        </div>

        <div className="panel-grid">
          {panels.map((panel) => (
            <NumberPanel key={panel.label} label={panel.label} value={panel.value} note={panel.note} />
          ))}
        </div>
      </article>

      <article className="card card-muted stack-sm">
        <div className="row">
          <p className="time-label">Timeline</p>
          <p className="status-text">Swipe sideways</p>
        </div>
        <div className="timeline-scroll">
          {timeline.map((item) => (
            <div key={item.step} className="timeline-card">
              <p className="timeline-step">{item.step}</p>
              <p className="timeline-value mono">{item.value}</p>
              <p className="timeline-note">{item.note}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function labelForSegment(segment: Segment) {
  switch (segment) {
    case "absolute":
      return "Absolute";
    case "relative":
      return "Relative";
    default:
      return "Elapsed";
  }
}
