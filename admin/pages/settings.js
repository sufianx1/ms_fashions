import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  return (
    <main className="container" style={{ display: 'flex', gap: '1rem' }}>
      <Sidebar />
      <section className="card" style={{ flex: 1 }}>
        <h1>Settings</h1>
        <p>Manage business profile, payment keys, and WhatsApp API credentials.</p>
      </section>
    </main>
  );
}
