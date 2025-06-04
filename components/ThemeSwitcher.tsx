import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

const themes = [
  { name: 'Retro Pixel', className: 'retro' },
  { name: 'Sakura Blossom', className: 'sakura' },
  { name: 'Cyberpunk', className: 'cyberpunk' },
  { name: 'Minimal Light', className: 'minimal' },
  { name: 'Cozy Cafe', className: 'cozy' },
];

const ThemeSwitcher: React.FC = () => {
  const { setTheme } = useThemeContext();

  const handleThemeChange = (theme: string) => {
    setTheme(theme as any);
    document.body.className = theme; // Apply theme class to body
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select Theme</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.className}
            onClick={() => handleThemeChange(theme.className)}
            className="bg-gray-700 text-white p-2 rounded-md"
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
