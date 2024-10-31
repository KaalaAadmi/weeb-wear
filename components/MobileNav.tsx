"use client";

import { PRODUCT_CATEGORIES } from "@/config";
// import { Menu, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Adjust import based on your setup
import { Icons } from "./Icons";
import Cart from "./Cart";
import { ScrollArea } from "./ui/scroll-area";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
// import { Button } from "@headlessui/react";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsMenuOpen(false);
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen || isCartOpen)
      document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen, isCartOpen]);

  return (
    <div className="lg:hidden flex justify-between items-center w-full">
      {/* Icon on Left */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="relative -m-2 inline-flex items-center p-2 text-gray-400"
          >
            <Icons.logo className="h-10 w-10" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-full h-full overflow-y-auto" side="left">
          <ScrollArea className="h-full">
            <div className="mt-2">
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li
                    key={category.label}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex">
                        <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                          {category.label}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                      {category.featured.map((item, idx) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group relative text-sm"
                          onClick={() => closeOnCurrent(item.href)}
                        >
                          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <Image
                              fill
                              src={item.imageSrc}
                              alt={`product category image ${idx}`}
                              className="object-cover object-center"
                            />
                          </div>
                          <p className="mt-6 block font-medium text-gray-900">
                            {item.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              {user ? (
                <Link
                  onClick={() => closeOnCurrent("/profile")}
                  href={"/profile"}
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  onClick={() => closeOnCurrent("/sign-in")}
                  href="/sign-in"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
              )}
            </div>
            <div className="flow-root">
              {user ? (
                <Button
                  onClick={() => signOut({ redirectUrl: "/" })}
                  variant="destructive"
                >
                  Sign Out
                </Button>
              ) : (
                <Link
                  onClick={() => closeOnCurrent("/sign-up")}
                  href="/sign-up"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* Cart Icon on Left */}
      <Cart />
    </div>
  );
};

export default MobileNav;
