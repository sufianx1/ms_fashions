import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

export default function CartPage() {
  const [language, setLanguage] = useState('en');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = window.localStorage.getItem('msf_cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('msf_cart', JSON.stringify(items));
  }, [items]);

  const onQty = (id, quantity) => setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  const onRemove = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <>
      <Navbar language={language} onToggleLanguage={() => setLanguage(language === 'en' ? 'ur' : 'en')} />
      <main className="container">
        <Cart items={items} onQty={onQty} onRemove={onRemove} />
        <Link href="/checkout">Proceed to checkout</Link>
      </main>
      <Footer />
    </>
  );
}
