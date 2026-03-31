export function NumberPanel({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <article className="number-panel">
      <p className="number-label">{label}</p>
      <p className="number-value mono">{value}</p>
      {note ? <p className="number-note">{note}</p> : null}
    </article>
  );
}
