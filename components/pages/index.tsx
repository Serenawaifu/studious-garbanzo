// pages/index.tsx

import Head from 'next/head';
import Header from '../components/Header';
import SakuraBackground from '../components/SakuraBackground';
import { useRef } from 'react';
import Protected from '../components/Protected';

const Home = () => {
  const animeRef = useRef(null);
  const mangaRef = useRef(null);
  const manhwaRef = useRef(null);
  const marketplaceRef = useRef(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Anime Platform</title>
        <meta name="description" content="A full-stack anime platform website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SakuraBackground />
      <Header />
      <main className="relative z-10">
        <section ref={animeRef} className="py-16 bg-gray-800 text-white">
          <h2 className="text-3xl font-bold mb-4">Anime</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md">
                <div className="h-48 bg-gray-600 rounded-t-md"></div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Placeholder Title</h3>
                  <p className="text-sm">Placeholder Description</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollToSection(mangaRef)}
            className="mt-8 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            🡻 Manga
          </button>
        </section>
        <section ref={mangaRef} className="py-16 bg-gray-900 text-white">
          <h2 className="text-3xl font-bold mb-4">Manga</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md">
                <div className="h-48 bg-gray-600 rounded-t-md"></div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Placeholder Title</h3>
                  <p className="text-sm">Placeholder Description</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollToSection(animeRef)}
            className="mt-8 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            🡹 Anime
          </button>
          <button
            onClick={() => scrollToSection(manhwaRef)}
            className="mt-8 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            🡻 Manhwa
          </button>
        </section>
        <section ref={manhwaRef} className="py-16 bg-gray-800 text-white">
          <h2 className="text-3xl font-bold mb-4">Manhwa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md">
                <div className="h-48 bg-gray-600 rounded-t-md"></div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Placeholder Title</h3>
                  <p className="text-sm">Placeholder Description</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollToSection(mangaRef)}
            className="mt-8 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            🡹 Manga
          </button>
          <button
            onClick={() => scrollToSection(marketplaceRef)}
            className="mt-8 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            🡻 Marketplace
          </button>
        </section>
        <section ref={marketplaceRef} className="py-16 bg-gray-900 text-white">
          <h2 className="text-3xl font-bold mb-4">Marketplace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md">
                <div className="h-48 bg-gray-600 rounded-t-md"></div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Placeholder Title</h3>
                  <p className="text-sm">Placeholder Description</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollToSection(manhwaRef)}
            className="mt-8 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            🡹 Manhwa
          </button>
          <Protected>
            <div className="mt-8 bg-gray-700 p-4 rounded-md">
              <h3 className="text-lg font-semibold">Protected Section</h3>
              <p className="text-sm">This section is protected and requires login.</p>
            </div>
          </Protected>
        </section>
      </main>
    </>
  );
};

export default Home;
