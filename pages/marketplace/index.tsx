// pages/marketplace/index.tsx

import Head from 'next/head';
import Header from '../../components/Header';
import SakuraBackground from '../../components/SakuraBackground';
import ProductCard from '../../components/ProductCard';

const Marketplace = () => {
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
        <title>Marketplace - Anime Platform</title>
        <meta name="description" content="Marketplace for Anime Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SakuraBackground />
      <Header />
      <main className="relative z-10 p-4">
        <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} image={product.image} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Marketplace;
