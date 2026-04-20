import Sidebar from '../components/Sidebar';
import ProductForm from '../components/ProductForm';

export default function ProductsPage() {
  return (
    <main className="container" style={{ display: 'flex', gap: '1rem' }}>
      <Sidebar />
      <section style={{ flex: 1 }}>
        <ProductForm />
        <div className="card" style={{ marginTop: '1rem' }}>
          <h2>Catalog</h2>
          <p>Manage collections and occasions, including media assets via Cloudinary.</p>
        </div>
      </section>
    </main>
  );
}
