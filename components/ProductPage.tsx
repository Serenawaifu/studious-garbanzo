// components/ProductPage.tsx

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Protected from './Protected';
import { useRouter } from 'next/router';
import VideoPlayer from './VideoPlayer';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  muxPlaybackId: string; // Add Mux playback ID
}

const ProductPage = ({ product }: { product: Product }) => {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (session) {
      // Add product to cart logic
      alert(`Added ${product.title} x${quantity} to cart`);
      router.push('/checkout');
    } else {
      alert('Please log in to add items to your cart.');
      router.push('/api/auth/signin');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img src={product.image} alt={product.title} className="w-full h-auto rounded-lg" />
        </div>
        <div className="md:w-2/3 md:ml-4">
          <p className="text-lg mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="text-sm">${product.price.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Protected>
            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
          </Protected>
        </div>
      </div>
      {/* Video Player Section */}
      <div className="mt-4">
        <VideoPlayer
          source={product.muxPlaybackId} // Use the Mux playback ID here
          title={product.title}
          episodeNumber={1} // Update this as needed
          series={product.title} // Update this as needed
        />
      </div>
    </div>
  );
};

export default ProductPage;
