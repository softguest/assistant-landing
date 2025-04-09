import { getCurrentUser } from '@/lib/session';
import Link from 'next/link';
import ButtonLogout from './button-logout';
import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-extrabold sm:inline-block">Weekly C</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/main-home">Dashboard</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#faq">FAQ</Link>
          </nav>
        </div>
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 px-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex items-center space-x-2">
          

            {user?.name ? (
                <ButtonLogout />
              ) : (
                <nav className="flex items-center">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </nav>
              )}
        </div>
      </div>
    </header>
  );
};

export default Header;
