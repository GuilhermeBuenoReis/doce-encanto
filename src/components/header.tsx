import { Cake, Contact, Home, Info, ShoppingCart } from 'lucide-react';
import { Logo } from './logo';
import { useState } from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';

function Header() {
  const [cartQuantity, setCartQuantity] = useState(2);

  return (
    <header className="w-full flex items-center justify-between p-4 bg-pink-200">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Menu para telas maiores */}
      <ul className="hidden md:flex items-center gap-6">
        <li>
          <a href="home" className="font-semibold text-lg text-foreground">
            Home
          </a>
        </li>

        <li>
          <a href="about" className="font-semibold text-lg text-foreground">
            Sobre nós
          </a>
        </li>

        <li>
          <a href="contact" className="font-semibold text-lg text-foreground">
            Contato
          </a>
        </li>

        <li>
          <a
            href="contact"
            className="font-semibold text-lg text-foreground relative"
          >
            {cartQuantity > 0 && (
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-purple-600 p-1 rounded-full w-5 h-5 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {cartQuantity}
                </span>
              </div>
            )}
            <ShoppingCart />
          </a>
        </li>
      </ul>

      {/* Menu para telas pequenas*/}

      <Sheet>
        <SheetTrigger asChild>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="md:hidden flex items-center">
            <Cake />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-6 bg-white z-50">
          <nav className="flex flex-col gap-4">
            <SheetClose asChild>
              <a
                href="home"
                className="font-semibold text-lg text-foreground flex items-center gap-2"
              >
                <Home />
                Home
              </a>
            </SheetClose>

            <SheetClose asChild>
              <a
                href="about"
                className="font-semibold text-lg text-foreground flex items-center gap-2"
              >
                <Info />
                Sobre nós
              </a>
            </SheetClose>

            <SheetClose asChild>
              <a
                href="contact"
                className="font-semibold text-lg text-foreground flex items-center gap-2"
              >
                <Contact />
                Contato
              </a>
            </SheetClose>

            <SheetClose asChild>
              <a
                href="cart"
                className="relative inline-flex items-center font-semibold text-lg text-foreground"
              >
                <ShoppingCart />
                {cartQuantity > 0 && (
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-purple-600 p-1 rounded-full w-5 h-5 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {cartQuantity}
                    </span>
                  </div>
                )}
              </a>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export { Header };
