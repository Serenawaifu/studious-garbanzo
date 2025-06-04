import Image from 'next/image';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { signIn, signOut, useSession } from 'next-auth/react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);
  const { data: session } = useSession();

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
        <button
          onClick={() => setIsThemeSwitcherOpen(!isThemeSwitcherOpen)}
          className="ml-4 bg-gray-700 text-white px-4 py-2 rounded-md"
        >
          Themes
        </button>
        {isThemeSwitcherOpen && <ThemeSwitcher />}
        {session ? (
          <button
            onClick={() => signOut()}
            className="ml-4 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => signIn('google')}
              className="ml-4 bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Login with Google
            </button>
            <button
              onClick={() => signIn('email')}
              className="ml-4 bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Login with Email
            </button>
            <button
              onClick={() => signIn('walletconnect')}
              className="ml-4 bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Login with WalletConnect
            </button>
          </>
        )}
        {session && session.user.email === 'admin@example.com' && (
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="ml-4 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            Admin Dashboard
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
