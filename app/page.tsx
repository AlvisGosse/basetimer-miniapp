import { BottomNav } from "@/components/bottom-nav";
import { HeroStatusCard } from "@/components/hero-status-card";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="stack-lg">
        <div className="stack-sm">
          <p className="eyebrow">BaseTimer</p>
          <h1 className="page-title">Start once. Track forever.</h1>
        </div>
        <HeroStatusCard />
      </section>
      <BottomNav />
    </main>
  );
}
