import { useState } from 'react';

export default function AdminLogin() {
  const [message, setMessage] = useState('');
  return (
    <main className="container">
      <form className="card" onSubmit={(e) => { e.preventDefault(); setMessage('Admin logged in (demo).'); }}>
        <h1>Admin Login</h1>
        <input type="email" required placeholder="Email" />
        <input type="password" required placeholder="Password" />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
