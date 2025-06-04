import React from 'react';

const SakuraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(https://i.imgur.com/6XKjLQe.gif)' }}></div>
    </div>
  );
};

export default SakuraBackground;
