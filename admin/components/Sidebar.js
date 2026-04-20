import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="card" style={{ minWidth: 220 }}>
      <h3>Admin</h3>
      <p><Link href="/dashboard">Dashboard</Link></p>
      <p><Link href="/products">Products</Link></p>
      <p><Link href="/appointments">Appointments</Link></p>
      <p><Link href="/orders">Orders</Link></p>
      <p><Link href="/analytics">Analytics</Link></p>
      <p><Link href="/settings">Settings</Link></p>
    </aside>
  );
}
