import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

// Sample product data (in a real app, this would come from an API)
const sampleProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    details: 'These premium wireless headphones feature active noise cancellation technology, up to 30 hours of battery life, and comfortable over-ear design. They connect via Bluetooth 5.0 for stable, high-quality audio streaming. Perfect for travel, work, or enjoying your favorite music at home.',
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest model smartphone with high-resolution camera and fast processor.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    details: 'This flagship smartphone features a 6.5-inch OLED display, 5G connectivity, and a powerful octa-core processor. The triple-camera system includes a 108MP main sensor for stunning photos in any lighting condition. With 256GB of storage and 12GB of RAM, this phone can handle any task with ease.',
  },
  {
    id: 3,
    name: 'Laptop',
    description: 'Powerful laptop for work and gaming with high-performance specs.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    details: 'This high-performance laptop comes with a 15.6-inch 4K display, the latest generation processor, 32GB of RAM, and a dedicated graphics card. Perfect for professionals, content creators, and gamers alike. The sleek aluminum chassis houses a large battery for all-day productivity.',
  },
  {
    id: 4,
    name: 'Smartwatch',
    description: 'Feature-rich smartwatch with health tracking and notifications.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    details: 'This advanced smartwatch features continuous heart rate monitoring, sleep tracking, and GPS. The bright AMOLED display is visible even in direct sunlight. With 5-day battery life and water resistance up to 50 meters, it\'s perfect for fitness enthusiasts and everyday wear.',
  },
  {
    id: 5,
    name: 'Wireless Earbuds',
    description: 'Compact wireless earbuds with great sound quality and comfortable fit.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    details: 'These true wireless earbuds deliver crystal-clear sound in a compact, comfortable design. With active noise cancellation and transparency mode, you can control how much of your surroundings you hear. The charging case provides up to 24 hours of total battery life.',
  },
  {
    id: 6,
    name: 'Digital Camera',
    description: 'Professional digital camera with high-resolution sensor and interchangeable lenses.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    details: 'This professional-grade digital camera features a 24.2MP full-frame sensor, 4K video recording, and an advanced autofocus system. The weather-sealed body is durable for shooting in any conditions. Compatible with a wide range of lenses, this camera is perfect for photographers of all levels.',
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = sampleProducts.find(p => p.id === parseInt(id));

      if (foundProduct) {
        setProduct(foundProduct);
      }

      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }

      // Navigate to cart
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

          <p className="text-2xl font-bold text-gray-800 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 mb-6">{product.details}</p>

          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="block text-gray-700 font-medium mr-4">
              Quantity:
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 text-gray-700 py-1 px-3 rounded-l-lg hover:bg-gray-300 transition duration-200"
              >
                -
              </button>
              <span className="bg-gray-100 py-1 px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 text-gray-700 py-1 px-3 rounded-r-lg hover:bg-gray-300 transition duration-200"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
