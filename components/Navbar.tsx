"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import { useUser } from "@clerk/clerk-react";
import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname.includes("/admin"));
  const showHeader = pathname.includes("/admin") ? false : true;
  console.log(showHeader);
  const { user, isLoaded } = useUser();

  if (showHeader) {
    return (
      <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
        <header className="relative bg-white h-full flex items-center">
          <MaxWidthWrapper>
            {/* Move MobileNav to the right side */}
            <div className="lg:hidden flex items-center h-full">
              <MobileNav />
            </div>
            <div className="hidden lg:block border-b border-gray-200">
              <div className="flex h-16 items-center justify-between">
                {" "}
                {/* Updated to justify-between */}
                <div className="ml-4 flex lg:ml-0">
                  <Link href="/">
                    <Icons.logo className="h-10 w-10" />
                  </Link>
                </div>
                <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                  <NavItems />
                </div>
                <div className="ml-auto flex items-center">
                  {" "}
                  {/* ml-auto moves it to the right */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
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
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    )}

                    {user ? (
                      <UserAccountNav user={user} isLoaded={isLoaded} />
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
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}

                    {user ? null : (
                      <div className="flex lg:ml-6">
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <div className="ml-4 flow-root lg:ml-6">
                      <Cart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </header>
      </div>
    );
  } else {
    return;
  }
};

export default Navbar;
