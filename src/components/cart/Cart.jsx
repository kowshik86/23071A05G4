import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart, clearCart } from '../../store/slices/cartSlice';

const Cart = () => {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // In a real app, this would navigate to a checkout page
    alert('Checkout functionality would be implemented here!');
  };

  if (items.length === 0) {
    return (
      <div className="text-center" style={{ padding: '3rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Your Cart is Empty</h2>
        <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>Looks like you haven't added any products to your cart yet.</p>
        <Link
          to="/products"
          className="btn"
          style={{ backgroundColor: '#3b82f6', color: 'white' }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>Your Shopping Cart</h2>

      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.5rem' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem 0' }}>Product</th>
                <th style={{ textAlign: 'center', padding: '0.5rem 0' }}>Price</th>
                <th style={{ textAlign: 'center', padding: '0.5rem 0' }}>Quantity</th>
                <th style={{ textAlign: 'right', padding: '0.5rem 0' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '4rem', height: '4rem', objectFit: 'cover', borderRadius: '0.25rem', marginRight: '1rem' }}
                      />
                      <div>
                        <h3 style={{ fontWeight: '600', color: '#111827' }}>{item.name}</h3>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '1rem 0' }}>${item.price.toFixed(2)}</td>
                  <td style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="quantity-btn"
                        style={{ borderRadius: '0.25rem 0 0 0.25rem' }}
                      >
                        -
                      </button>
                      <span className="quantity-input">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="quantity-btn"
                        style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', padding: '1rem 0' }}>${item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '600' }}>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '600' }}>Shipping:</span>
            <span>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>Total:</span>
            <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleClearCart}
          className="btn"
          style={{ backgroundColor: '#ef4444', color: 'white' }}
        >
          Clear Cart
        </button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/products"
            className="btn"
            style={{ backgroundColor: '#6b7280', color: 'white' }}
          >
            Continue Shopping
          </Link>

          <button
            onClick={handleCheckout}
            className="btn"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
