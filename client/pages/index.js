import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const products = [
  { id: '1', name: 'Royal Kashmiri Shawl', description: { en: 'Fine handcrafted luxury shawl', ur: 'بہترین ہاتھ سے تیار کردہ شال' }, price: 18000, collection: 'Kashmiri Shawls' },
  { id: '2', name: 'Elegant Lehenga', description: { en: 'Wedding-ready lehenga with handwork', ur: 'خوبصورت لہنگا ہاتھ کی کڑھائی کے ساتھ' }, price: 45000, collection: 'Lehenga' }
];

export default function HomePage() {
  const [language, setLanguage] = useState('en');
  const featured = useMemo(() => products, []);
  const addToCart = (product) => {
    const current = JSON.parse(window.localStorage.getItem('msf_cart') || '[]');
    const existing = current.find((item) => item.id === product.id);
    const updated = existing
      ? current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...current, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    window.localStorage.setItem('msf_cart', JSON.stringify(updated));
  };

  return (
    <>
      <Navbar language={language} onToggleLanguage={() => setLanguage((prev) => (prev === 'en' ? 'ur' : 'en'))} />
      <main className="container">
        <h1>{language === 'en' ? 'Featured Products' : 'نمایاں مصنوعات'}</h1>
        <div className="grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} language={language} onAdd={addToCart} />
          ))}
        </div>

        <section className="card" style={{ marginTop: '1rem' }}>
          <h2>{language === 'en' ? 'Testimonials' : 'آراء'}</h2>
          <p>“MS Fashion Closet gave me the perfect wedding look!” — Ayesha, Lahore</p>
        </section>

        <section className="card" style={{ marginTop: '1rem' }}>
          <h2>{language === 'en' ? 'Book an Appointment' : 'اپائنٹمنٹ بک کریں'}</h2>
          <p>{language === 'en' ? 'Schedule a home visit for personalized styling.' : 'ذاتی اسٹائلنگ کے لیے ہوم وزٹ شیڈول کریں۔'}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
