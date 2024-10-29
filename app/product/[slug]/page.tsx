"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductType, SizeData } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { formatPrice } from "@/lib/utils";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { TableDemo } from "@/components/DataTable";
import { data } from "@/lib/data";
import { Button } from "@/components/ui/button";
import ImageSlider from "@/components/ImageSlider";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useStore } from "@/context/StoreContext";
import { useFetchCartItems } from "@/hooks/useFetchCartItems";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
type ss = { name: Size; instock: boolean };

const ProductsPage = () => {
  const { addToCart, setRefresh } = useStore();

  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const allSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"]; // Make sure this is typed correctly
  const { user } = useUser();
  const router = useRouter();
  const { cartItems, fetchCartItems } = useFetchCartItems(user?.id || "");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/${params.slug}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        setProduct(data);
      }
    };
    fetchProduct();
  }, []);

  // Map sizes and check against the product sizes
  const sizes = allSizes.map((size) => ({
    name: size,
    instock: product?.sizes?.includes(size),
  }));

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  let validUrls: string[] = [];
  if (product !== null) {
    validUrls = product?.imageUrls?.map(({ url }: { url: string }) => url);
  }
  console.log(selectedSize);
  console.log(selectedColor);

  const breadcrumbs = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Products", href: "/products" },
    // { id: 3, name: product?.name, href: "" },
  ];
  // }//["Home", "Products", product?.name];

  const [units, setUnits] = useState<string>("inches");
  const [filteredData, setFilteredData] = useState<SizeData[]>([]);
  // const filteredData = data.filter((item) => item.unit === units);
  // console.log(filteredData);
  useEffect(() => {
    // Update filteredData when the units change
    const filtered = data.filter((item) => item.unit === units);
    setFilteredData(filtered);
  }, [units]);
  console.log("PRODUCT: ", product?._id);
  console.log("USER: ", user?.id);
  console.log(selectedSize);

  const handleAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color");
      return;
    }

    const cartItem = {
      userId: user?.id,
      productId: product?._id ?? "",
      productName: product?.name,
      productImage: validUrls[0],
      productSize: selectedSize,
      productColor: selectedColor,
      productQuantity: 1,
      productPrice: product?.price ?? 0,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem),
    });

    if (response.ok) {
      addToCart(cartItem);
      setRefresh((prev) => !prev); // Toggle refresh
      fetchCartItems();
      toast.success("Product added to cart!");
    } else {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {breadcrumbs.map((breadcrumb, idx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>

                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <span
                  // href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product?.name}
                </span>
              </li>
            </ol>
          </nav>

          {/* Image Gallery */}
          <div className="hidden mx-auto mt-6 max-w-2xl lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
              {product && (
                <img
                  alt={product?.name?.toString()}
                  src={validUrls[2]}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-8 mt-8">
              {validUrls.length < 4 ? (
                <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
                  {product && (
                    <img
                      alt={product?.name?.toString()}
                      src={validUrls[1]}
                      className="h-full w-full object-cover object-center"
                    />
                  )}
                </div>
              ) : (
                <>
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    {product && (
                      <img
                        alt={product?.name?.toString()}
                        src={validUrls[1]}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </div>
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    {product && (
                      <img
                        src={validUrls[3]}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg mt-8">
              {product && (
                <img
                  src={validUrls[0]}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
            {/* </div> */}
          </div>
          {/* Mobile and tablet view (Swiper) */}
          <div className="lg:hidden">
            <ImageSlider urls={validUrls} />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product?.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {formatPrice(product?.price.toString() as string)}
              </p>

              {/* Reviews */}
              {/* <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div> */}

              <form className="mt-10" id="size-color">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {product?.colors &&
                        Object.entries(product.colors).map(
                          ([name, hexCode]) => (
                            <Radio
                              key={name}
                              value={name}
                              aria-label={name}
                              className={classNames(
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1 data-[checked]:ring-indigo-500"
                                //focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  "h-8 w-8 rounded-full border border-black border-opacity-10"
                                )}
                                style={{ backgroundColor: hexCode }}
                              />
                            </Radio>
                          )
                        )}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <Modal className="bg-white">
                      <ModalTrigger className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        <span
                          onClick={(e) => e.preventDefault()}
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Size Guide
                        </span>
                      </ModalTrigger>

                      <ModalBody>
                        <ModalContent>
                          <h4 className="text-lg md:text-2xl text-neutral-950 font-bold text-center mb-8">
                            Size Guide Information
                          </h4>
                          <div className="flex w-full justify-center items-center gap-2 pb-2">
                            <Button
                              className="hover:bg-indigo-500 hover:text-white"
                              variant={
                                units === "inches" ? "primary" : "secondary"
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setUnits("inches");
                              }}
                            >
                              <span>Inches</span>
                            </Button>
                            <Button
                              className="hover:bg-indigo-500 hover:text-white"
                              variant={units === "cm" ? "primary" : "secondary"}
                              onClick={(e) => {
                                e.preventDefault();
                                setUnits("cm");
                              }}
                            >
                              <span>Centimeters</span>
                            </Button>
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <TableDemo data={filteredData} />
                          </div>
                        </ModalContent>
                      </ModalBody>
                    </Modal>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-3 gap-4 sm:grid-cols-6 lg:grid-cols-3"
                    >
                      {sizes?.map((size) => (
                        <Radio
                          key={size.name}
                          value={size.name}
                          data-checked={selectedSize === size.name}
                          data-disabled={!size?.instock}
                          className={classNames(
                            size.instock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 sm:flex-1 sm:py-6 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.instock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border data-[focus]:ring-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e)}
                  type="submit"
                  className="mt-10 flex gap-2 w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span>Add to cart</span>
                  <ShoppingCart className="h-6 w-6" />
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.descriptionPara1}
                  </p>

                  {/* <br /> */}
                  <p className="text-base text-gray-900">
                    {product?.descriptionPara2}
                  </p>
                  {/* <br /> */}
                  <p className="text-base text-gray-900">
                    {product?.descriptionPara3}
                  </p>
                </div>
              </div>

              {product?.highlights && (
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product?.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product?.details}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
