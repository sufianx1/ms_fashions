import Sidebar from '../components/Sidebar';

export default function AdminAppointmentsPage() {
  return (
    <main className="container" style={{ display: 'flex', gap: '1rem' }}>
      <Sidebar />
      <section className="card" style={{ flex: 1 }}>
        <h1>Appointments</h1>
        <p>Track pending, confirmed, completed and cancelled visits.</p>
        <p>Send WhatsApp confirmations from this panel.</p>
      </section>
    </main>
  );
}
