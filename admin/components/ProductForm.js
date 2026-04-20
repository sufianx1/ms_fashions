import { useState } from 'react';

export default function ProductForm() {
  const [status, setStatus] = useState('');

  return (
    <form className="card" onSubmit={(e) => { e.preventDefault(); setStatus('Product saved (demo).'); }}>
      <h2>Add Product</h2>
      <input required placeholder="Name" />
      <input required placeholder="Collection" />
      <input required type="number" min="0" placeholder="Price" />
      <textarea placeholder="Description" />
      <input type="file" multiple />
      <button type="submit">Save</button>
      {status && <p>{status}</p>}
    </form>
  );
}
