import Sidebar from '../components/Sidebar';
import OrderList from '../components/OrderList';

export default function AdminOrdersPage() {
  return (
    <main className="container" style={{ display: 'flex', gap: '1rem' }}>
      <Sidebar />
      <section style={{ flex: 1 }}>
        <OrderList />
        <div className="card" style={{ marginTop: '1rem' }}>
          <h3>Refunds</h3>
          <p>Process payment refunds and update order statuses.</p>
        </div>
      </section>
    </main>
  );
}
