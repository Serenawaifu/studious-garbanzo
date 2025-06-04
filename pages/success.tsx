// pages/success.tsx

import Head from 'next/head';
import Header from '../components/Header';
import SakuraBackground from '../components/SakuraBackground';

const Success = () => {
  return (
    <>
      <Head>
        <title>Success - Anime Platform</title>
        <meta name="description" content="Payment successful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SakuraBackground />
      <Header />
      <main className="relative z-10 p-4">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg">Thank you for your purchase.</p>
      </main>
    </>
  );
};

export default Success;
