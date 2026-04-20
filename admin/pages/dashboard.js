import Sidebar from '../components/Sidebar';

export default function DashboardPage() {
  return (
    <main className="container" style={{ display: 'flex', gap: '1rem' }}>
      <Sidebar />
      <section style={{ flex: 1 }}>
        <div className="card"><h1>Dashboard</h1><p>Sales, appointment and order highlights.</p></div>
      </section>
    </main>
  );
}
