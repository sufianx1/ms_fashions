export default function ProductCard({ product, language = 'en', onAdd }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.description?.[language] || product.description?.en}</p>
      <p><strong>PKR {product.price}</strong></p>
      <p>{product.collection}</p>
      <button type="button" onClick={() => onAdd?.(product)}>Add to Cart</button>
      <button type="button" onClick={() => {
        const existing = JSON.parse(window.localStorage.getItem('msf_wishlist') || '[]');
        if (!existing.some((item) => item.id === product.id)) {
          window.localStorage.setItem('msf_wishlist', JSON.stringify([...existing, product]));
        }
      }} style={{ marginLeft: '.5rem' }}>Add to Wishlist</button>
    </div>
  );
}
