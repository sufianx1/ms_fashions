import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const method = event.target.paymentMethod.value;
    setMessage(`Order placed with ${method}. Confirmation sent.`);
  };

  return (
    <>
      <Navbar language={language} onToggleLanguage={() => setLanguage(language === 'en' ? 'ur' : 'en')} />
      <main className="container">
        <form className="card" onSubmit={handleSubmit}>
          <h1>Checkout</h1>
          <input required name="address" placeholder="Address" />
          <input required name="city" placeholder="City" />
          <input required name="area" placeholder="Area" />
          <select name="paymentMethod" defaultValue="stripe">
            <option value="stripe">Stripe</option>
            <option value="jazzcash">JazzCash</option>
          </select>
          <button type="submit">Confirm Order</button>
          {message && <p>{message}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}
