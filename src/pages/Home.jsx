import { Link } from 'react-router-dom';
import ProductList from '../components/product/ProductList';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h1>Welcome to E-Shop</h1>
          <p>
            Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast delivery.
          </p>
          <Link
            to="/products"
            className="btn"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <ProductList />

      {/* Features Section */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937', textAlign: 'center' }}>Why Choose Us</h2>

        <div className="grid">
          <div className="card">
            <div style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}>🚚</div>
            <h3>Free Shipping</h3>
            <p>
              Enjoy free shipping on all orders over $50. Fast and reliable delivery to your doorstep.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}>⭐</div>
            <h3>Quality Products</h3>
            <p>
              We offer only the highest quality products, carefully selected for our customers.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}>🔄</div>
            <h3>Easy Returns</h3>
            <p>
              Not satisfied? Return your purchase within 30 days for a full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
