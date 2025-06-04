import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src="https://files.catbox.moe/5vvoed.png"
          alt="Anime Platform Logo"
          width={40}
          height={40}
        />
        <span className="ml-2 font-bold">Anime Platform</span>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="text-2xl"
        >
          🔎
        </button>
        {isSearchOpen && (
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 px-4 py-2 rounded-md bg-gray-700 text-white"
          />
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
