import Link from 'next/link';

export default function Navbar({ language, onToggleLanguage }) {
  return (
    <nav>
      <div className="container">
        <strong>MS Fashion Closet</strong>
        <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/appointments">Appointments</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/profile">Profile</Link>
          <button type="button" onClick={onToggleLanguage}>{language === 'en' ? 'اردو' : 'English'}</button>
        </div>
      </div>
    </nav>
  );
}
