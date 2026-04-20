import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState('');

  return (
    <>
      <Navbar language={language} onToggleLanguage={() => setLanguage(language === 'en' ? 'ur' : 'en')} />
      <main className="container">
        <form className="card" onSubmit={(e) => { e.preventDefault(); setMessage('Logged in (demo).'); }}>
          <h1>Login</h1>
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <button type="submit">Login</button>
          {message && <p>{message}</p>}
        </form>
      </main>
    </>
  );
}
