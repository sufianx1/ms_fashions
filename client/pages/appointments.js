import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppointmentForm from '../components/AppointmentForm';

export default function AppointmentsPage() {
  const [language, setLanguage] = useState('en');

  return (
    <>
      <Navbar language={language} onToggleLanguage={() => setLanguage(language === 'en' ? 'ur' : 'en')} />
      <main className="container">
        <AppointmentForm />
      </main>
      <Footer />
    </>
  );
}
