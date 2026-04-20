export default function Cart({ items, onQty, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="card">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '.6rem', alignItems: 'center' }}>
            <span>{item.name}</span>
            <input value={item.quantity} type="number" min="1" onChange={(e) => onQty(item.id, Number(e.target.value))} style={{ width: '70px' }} />
            <span>PKR {item.price * item.quantity}</span>
            <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: PKR {total}</h3>
    </div>
  );
}
