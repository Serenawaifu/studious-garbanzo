// pages/cancel.tsx

import Head from 'next/head';
import Header from '../components/Header';
import SakuraBackground from '../components/SakuraBackground';

const Cancel = () => {
  return (
    <>
      <Head>
        <title>Cancel - Anime Platform</title>
        <meta name="description" content="Payment cancelled" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SakuraBackground />
      <Header />
      <main className="relative z-10 p-4">
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-lg">Your payment was cancelled.</p>
      </main>
    </>
  );
};

export default Cancel;
