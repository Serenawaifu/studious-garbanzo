// pages/admin/dashboard.tsx

import Head from 'next/head';
import Header from '../../../components/Header';
import SakuraBackground from '../../../components/SakuraBackground';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user.email !== 'admin@example.com') {
      router.push('/');
    }
  }, [session, router]);

  if (!session) {
    return <div>Loading...</div>;
  }

  if (session.user.email !== 'admin@example.com') {
    return <div>You are not authorized to view this page.</div>;
  }

  const orders = [
    {
      id: '1',
      user: 'User1',
      items: [
        { title: 'Product 1', price: 19.99, quantity: 1 },
        { title: 'Product 2', price: 29.99, quantity: 2 },
      ],
      total: 79.97,
      status: 'Pending',
    },
    {
      id: '2',
      user: 'User2',
      items: [
        { title: 'Product 1', price: 19.99, quantity: 1 },
      ],
      total: 19.99,
      status: 'Completed',
    },
    // Add more orders as needed
  ];

  const products = [
    {
      id: '1',
      title: 'Product 1',
      price: 19.99,
      image: 'https://via.placeholder.com/200x300',
      description: 'Description for Product 1',
    },
    {
      id: '2',
      title: 'Product 2',
      price: 29.99,
      image: 'https://via.placeholder.com/200x300',
      description: 'Description for Product 2',
    },
    // Add more products as needed
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard - Anime Platform</title>
        <meta name="description" content="Admin Dashboard for Anime Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SakuraBackground />
      <Header />
      <main className="relative z-10 p-4">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-sm">User: {order.user}</p>
                <p className="text-sm">Total: ${order.total.toFixed(2)}</p>
                <p className="text-sm">Status: {order.status}</p>
                <ul className="mt-2">
                  {order.items.map((item) => (
                    <li key={item.title} className="text-sm">
                      {item.title} - ${item.price.toFixed(2)} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm">${product.price.toFixed(2)}</p>
                <img src={product.image} alt={product.title} className="w-full h-auto mt-2 rounded-lg" />
                <p className="text-sm mt-2">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
