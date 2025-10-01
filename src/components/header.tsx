'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';
import { Vote, LogOut } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAppContext();

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Vote className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            Demôkrasy
          </span>
        </Link>
        <nav className="flex-1">
          <ul className="flex items-center gap-4 text-sm font-medium">
            <li>
              <Link href="/petitions" className="text-foreground/80 transition-colors hover:text-foreground">
                Vata hevitra
              </Link>
            </li>
            {user && (
               <li>
                <Link href="/dashboard" className="text-foreground/80 transition-colors hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm font-medium hidden sm:inline-block">Welcome, {user.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className='hidden sm:inline'>Logout</span>
              </Button>
            </>
          ) : (
            <>
              {/* <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
