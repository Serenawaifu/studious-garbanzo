// components/Checkout.tsx

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Protected from './Protected';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Razorpay from 'razorpay';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Product 1',
      price: 19.99,
      quantity: 1,
    },
    {
      id: '2',
      title: 'Product 2',
      price: 29.99,
      quantity: 1,
    },
    // Add more items as needed
  ]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const stripe = useStripe();
  const elements = useElements();

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (paymentMethod === 'stripe') {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });

      const { id } = await response.json();

      if (stripe && elements) {
        const result = await stripe.redirectToCheckout({
          sessionId: id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      }
    } else if (paymentMethod === 'razorpay') {
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await response.json();

      const rzp = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      });

      rzp.open({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Anime Platform',
        order_id: order.id,
        description: 'Test Transaction',
        handler: async (response) => {
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verification = await verifyResponse.json();

          if (verification.status === 'success') {
            alert('Payment successful!');
            router.push('/success');
          } else {
            alert('Payment failed!');
            router.push('/cancel');
          }
        },
        prefill: {
          name: session?.user.name || '',
          email: session?.user.email || '',
        },
        theme: {
          color: '#3399cc',
        },
      });
    } else if (paymentMethod === 'web3') {
      // Web3 payment logic
      alert('Web3 payment not implemented yet.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <Protected>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="stripe">Stripe (Card)</option>
              <option value="razorpay">UPI (Razorpay)</option>
              <option value="web3">Web3 (Crypto)</option>
            </select>
          </div>
          {paymentMethod === 'stripe' && (
            <div className="mb-4">
              <CardElement />
            </div>
          )}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Checkout
          </button>
        </form>
      </Protected>
    </div>
  );
};

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutWrapper;
    
