"use client";
// import CookiePolicy from "@/components/CookiePolicy";
import Hero from "@/components/Hero";
import Hero1 from "@/components/Hero1";
// import LogoCloud from "@/components/LogoCloud";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { ProductType } from "@/lib/types";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const searchParams = useSearchParams();
  const [hasShownToast, setHasShownToast] = useState({
    verified: false,
    signedIn: false,
  });

  useEffect(() => {
    const verified = searchParams.get("verified");
    const signedIn = searchParams.get("signedIn");
    if (verified && !hasShownToast.verified) {
      toast.success("Email verified successfully");
      setHasShownToast((prev) => ({ ...prev, verified: true }));
    }
    if (signedIn && !hasShownToast.signedIn) {
      toast.success("Signed in successfully");
      setHasShownToast((prev) => ({ ...prev, signedIn: true }));
    }
  }, []);
  const perks = [
    {
      name: "Instant Delivery",
      Icon: ArrowDownToLine,
      description:
        "Get your assets delivered to your email in seconds and download them right away.",
    },
    {
      name: "Guaranteed Quality",
      Icon: CheckCircle,
      description:
        "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
    },
    {
      name: "For the Planet",
      Icon: Leaf,
      description:
        "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
    },
  ];
  // const [cookiePolicy, setCookiePolicy] = useState<boolean>(false);
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/featured`
      );
      const data = await response.json();
      if (data.success) {
        setFeaturedProducts(data.featuredProducts);
      }
    };
    fetchFeaturedProducts();
  }, []);
  return (
    <>
      {/* <Hero /> */}
      <Hero1 />
      {/* <LogoCloud /> */}
      {/* Featured Products */}
      <MaxWidthWrapper>
        <ProductReel title={"Featured Products"} products={featuredProducts} />
      </MaxWidthWrapper>
      {/* Perks */}
      <section className="border-t border-gray-200 bg-gray-50 flex-1">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
        {/* <CookiePolicy
          show={cookiePolicy}
          // onClose={() => setCookiePolicy(false)}
        /> */}
      </section>
    </>
  );
}
