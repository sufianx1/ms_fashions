import Sidebar from '../components/Sidebar';

export default function AnalyticsPage() {
  return (
    <main className="container" style={{ display: 'flex', gap: '1rem' }}>
      <Sidebar />
      <section className="card" style={{ flex: 1 }}>
        <h1>Analytics</h1>
        <p>Revenue, sales trends, and appointment conversion metrics.</p>
      </section>
    </main>
  );
}
