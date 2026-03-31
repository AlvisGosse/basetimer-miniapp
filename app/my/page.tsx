import { BottomNav } from "@/components/bottom-nav";
import { MyDashboard } from "@/components/my-dashboard";

export default function MyPage() {
  return (
    <main className="page-shell">
      <section className="stack-lg">
        <div className="stack-sm">
          <p className="eyebrow">My page</p>
          <h1 className="page-title">Wallet snapshot</h1>
        </div>
        <MyDashboard />
      </section>
      <BottomNav />
    </main>
  );
}
