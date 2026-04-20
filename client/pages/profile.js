import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  const [language, setLanguage] = useState('en');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = window.localStorage.getItem('msf_wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  return (
    <>
      <Navbar language={language} onToggleLanguage={() => setLanguage(language === 'en' ? 'ur' : 'en')} />
      <main className="container">
        <div className="card">
          <h1>My Profile</h1>
          <p>Manage account details, wishlist, and order history.</p>
          <h3>Order History</h3>
          <p>No orders yet.</p>
          <h3>Wishlist</h3>
          {wishlist.length === 0 ? (
            <p>No wishlist items yet.</p>
          ) : (
            wishlist.map((item) => <p key={item.id}>{item.name}</p>)
          )}
        </div>
      </main>
    </>
  );
}
