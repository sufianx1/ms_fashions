import { useState } from 'react';

export default function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Book Home Visit</h2>
      <input required type="date" name="preferredDate" />
      <input required type="time" name="preferredTime" />
      <input required name="city" placeholder="City" />
      <input required name="area" placeholder="Area" />
      <textarea name="collections" placeholder="Preferred collections" />
      <button type="submit">Schedule</button>
      {submitted && <p>Appointment request submitted successfully.</p>}
    </form>
  );
}
