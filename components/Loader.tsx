import Image from 'next/image';
import React from 'react';

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image
          src="/logo-1-black.png"
          fill
          alt="logo"
        />
      </div>
      <p className="text=sm text-muted-foreground">
        {' '}
        I am thinking...
      </p>
    </div>
  );
};

export default Loader;
