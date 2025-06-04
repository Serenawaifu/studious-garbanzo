import { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css'; // Import global styles
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
