// pages/marketplace/[id].tsx

import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductPage from '../../components/ProductPage';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const staticProducts = {
    '1': {
      id: '1',
      title: 'Product 1',
      price: 19.99,
      image: 'https://via.placeholder.com/200x300',
      description: 'Description for Product 1',
    },
    '2': {
      id: '2',
      title: 'Product 2',
      price: 29.99,
      image: 'https://via.placeholder.com/200x300',
      description: 'Description for Product 2',
    },
    // Add more products as needed
  };

  const product = staticProducts[id as string];

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{product.title} - Marketplace</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative z-10">
        <ProductPage product={product} />
      </main>
    </>
  );
};

export default ProductDetailPage;
