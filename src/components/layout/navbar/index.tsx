"use client";
// import CartModal from "@/components/cart/modal";
import LogoSquare from "@/components/logo-square";
// import { getMenu } from 'lib/shopify';
// import { Menu } from 'lib/shopify/types';
import Link from "next/link";
import { Suspense } from "react";
import Search, { SearchSkeleton } from "./search";
// import { menu } from "../../../../test-data";
import MobileMenu from "./mobile-menu";
import { useAuth } from "@/context/auth-context";
import { buttonVariants } from "@/components/ui/button";
import UserAccountNav from "@/components/user-account-nav";
import OpenCart from "@/components/cart/open-cart";
import Cart from "@/components/cart";
import { useSearchParams } from "next/navigation";
import { menu } from "../../../../test-data";
// import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export default function Navbar() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams?.toString() || "");

  return (
    // <Suspense fallback={null}>
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-4/6">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <p className="ml-2 flex-none text-sm font-bold uppercase md:hidden lg:block">
              {SITE_NAME}
            </p>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => {
                // Update query params for each menu item
                const updatedParams = new URLSearchParams(
                  currentParams.toString()
                );
                if (item?.category) {
                  updatedParams.set("category", item.category);
                } else {
                  updatedParams.delete("category"); // Remove the category for "All"
                }

                const path = `/search?${updatedParams.toString()}`;

                return (
                  <li key={item.title}>
                    {/* <Suspense fallback={null}> */}
                    <Link
                      href={path}
                      prefetch={true}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                    {/* </Suspense> */}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-4/6">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-4/6">
          <div className="hidden md:flex items-center justify-center ">
            {user ? null : (
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Sign in
              </Link>
            )}

            {user ? null : (
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            )}

            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Create account
              </Link>
            )}

            {user ? (
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            ) : null}
          </div>
          <div className="flex justify-end r-0">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
      {/* </Suspense> */}
    </nav>
    // </Suspense>
  );
}
