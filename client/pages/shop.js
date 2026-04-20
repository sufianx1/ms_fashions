import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const seed = [
  { id: '1', name: 'Royal Kashmiri Shawl', description: { en: 'Fine handcrafted luxury shawl', ur: 'پُرتعیش ہاتھ کی تیار شال' }, price: 18000, collection: 'Kashmiri Shawls', occasion: 'Formal' },
  { id: '2', name: 'Chicken Kari Suit', description: { en: 'Classic Chicken Kari set', ur: 'کلاسک چکن کاری سیٹ' }, price: 15000, collection: 'Chicken Kari', occasion: 'Casual' },
  { id: '3', name: 'Bridal Lehenga', description: { en: 'Heavy bridal handwork', ur: 'بھاری دلہن ہینڈ ورک' }, price: 65000, collection: 'Lehenga', occasion: 'Wedding' }
];

export default function ShopPage() {
  const [language, setLanguage] = useState('en');
  const [occasion, setOccasion] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const addToCart = (product) => {
    const current = JSON.parse(window.localStorage.getItem('msf_cart') || '[]');
    const existing = current.find((item) => item.id === product.id);
    const updated = existing
      ? current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...current, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    window.localStorage.setItem('msf_cart', JSON.stringify(updated));
  };

  const filtered = useMemo(
    () => seed.filter((p) => (!occasion || p.occasion === occasion) && (!maxPrice || p.price <= Number(maxPrice))),
    [occasion, maxPrice]
  );

  return (
    <>
      <Navbar language={language} onToggleLanguage={() => setLanguage(language === 'en' ? 'ur' : 'en')} />
      <main className="container">
        <h1>Shop Collections</h1>
        <div className="card">
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            <option value="">All occasions</option>
            <option value="Wedding">Wedding</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
          </select>
          <input placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
        <div className="grid" style={{ marginTop: '1rem' }}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} language={language} onAdd={addToCart} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
