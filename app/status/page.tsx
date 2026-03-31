import { BottomNav } from "@/components/bottom-nav";
import { StatusDetails } from "@/components/status-details";

export default function StatusPage() {
  return (
    <main className="page-shell">
      <section className="stack-lg">
        <div className="stack-sm">
          <p className="eyebrow">Status</p>
          <h1 className="page-title">Time breakdown</h1>
        </div>
        <StatusDetails />
      </section>
      <BottomNav />
    </main>
  );
}
