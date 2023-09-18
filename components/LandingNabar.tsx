'use client';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';

const font = Montserrat({
  weight: '600',
  subsets: ['latin'],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-10 w-20 mr-4">
          <Image fill alt="Logo" src="/logo-1.webp" />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', font.className)}>
          AI Generator
        </h1>
      </Link>
      <div className="flex items-center gap-x-2 ">
        <Link href={isSignedIn ? '/dashboard' : 'sign-up'}>
          <Button variant="outline" className="rounded-full">
            {isSignedIn ? 'Dashboard' : 'Get Started'}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
