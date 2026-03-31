type StatusTone = "live" | "idle" | "off";

export function StatusBadge({ tone, label }: { tone: StatusTone; label: string }) {
  return (
    <span className={`badge badge-${tone}`}>
      <span className="badge-dot" />
      {label}
    </span>
  );
}
