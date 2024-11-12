import { SizeData } from "@/lib/types";

export const PRODUCT_CATEGORIES = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=ui_kits`,
        imageSrc: "/assets/images/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=ui_kits&sort=desc",
        imageSrc: "/assets/images/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        imageSrc: "/assets/images/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: `/products?category=icons`,
        imageSrc: "/assets/images/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=icons&sort=desc",
        imageSrc: "/assets/images/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        imageSrc: "/assets/images/bestsellers.jpg",
      },
    ],
  },
];

export const data: SizeData[] = [
  {
    unit: "inches",
    sizeLabel: "XS",
    length: 27,
    width: 16.5,
  },
  {
    unit: "inches",
    sizeLabel: "S",
    length: 28,
    width: 18,
  },
  {
    unit: "inches",
    sizeLabel: "M",
    length: 29,
    width: 20,
  },
  {
    unit: "inches",
    sizeLabel: "L",
    length: 30,
    width: 22,
  },
  {
    unit: "inches",
    sizeLabel: "XL",
    length: 31,
    width: 24,
  },
  {
    unit: "inches",
    sizeLabel: "XXL",
    length: 32,
    width: 26,
  },
  {
    unit: "inches",
    sizeLabel: "XXXL",
    length: 33,
    width: 28,
  },
  {
    unit: "inches",
    sizeLabel: "XXXXL",
    length: 34,
    width: 30,
  },
  {
    unit: "inches",
    sizeLabel: "XXXXXL",
    length: 35,
    width: 32,
  },
  {
    unit: "cm",
    sizeLabel: "XS",
    length: 68.6,
    width: 42,
  },
  {
    unit: "cm",
    sizeLabel: "S",
    length: 71,
    width: 45.7,
  },
  {
    unit: "cm",
    sizeLabel: "M",
    length: 73.7,
    width: 50.8,
  },
  {
    unit: "cm",
    sizeLabel: "L",
    length: 76.2,
    width: 56,
  },
  {
    unit: "cm",
    sizeLabel: "XL",
    length: 78.7,
    width: 61,
  },
  {
    unit: "cm",
    sizeLabel: "XXL",
    length: 81.3,
    width: 66,
  },
  {
    unit: "cm",
    sizeLabel: "XXXL",
    length: 83.8,
    width: 71,
  },
  {
    unit: "cm",
    sizeLabel: "XXXXL",
    length: 86.4,
    width: 76.2,
  },
  {
    unit: "cm",
    sizeLabel: "XXXXXL",
    length: 89,
    width: 81.3,
  },
];

export const sortOptions = [
  { name: "Most Popular", value: "popular", href: "#", current: true },
  { name: "Best Rating", value: "best", href: "#", current: false },
  { name: "Newest", value: "newest", href: "#", current: false },
  { name: "Price: Low to High", value: "pricelow", href: "#", current: false },
  { name: "Price: High to Low", value: "pricehigh", href: "#", current: false },
];
export const subCategories = [
  { name: "T-Shirt", value: "tshirt" },
  { name: "Hoodie", value: "hoodie" },
  { name: "Phone Cases", value: "phonecase" },
  { name: "Posters", value: "poster" },
  { name: "Rugs", value: "rug" },
];
export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: false },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: false },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "XS", label: "XS", checked: false },
      { value: "S", label: "S", checked: false },
      { value: "M", label: "M", checked: false },
      { value: "L", label: "L", checked: false },
      { value: "XL", label: "XL", checked: false },
      { value: "XXL", label: "XXL", checked: false },
      { value: "XXXL", label: "XXXL", checked: false },
      { value: "XXXXL", label: "XXXXL", checked: false },
      { value: "XXXXXL", label: "XXXXXL", checked: false },
    ],
  },
];

export const colors = [
  { name: "White", value: "#fffefa" },
  { name: "Black", value: "#0a0a0a" },
  { name: "Blue", value: "#01408c" },
  { name: "Brown", value: "brown" },
  { name: "Green", value: "#5d9447" },
  { name: "Purple", value: "#536aa6" },
  { name: "Navy", value: "#1a2230" },
  { name: "Red", value: "#cf081c" },
  { name: "Teal", value: "#447085" },
  { name: "Maroon", value: "#8a0c1f" },
];

export const sizes = [
  { name: "XS", value: "XS" },
  { name: "S", value: "S" },
  { name: "M", value: "M" },
  { name: "L", value: "L" },
  { name: "XL", value: "XL" },
  { name: "XXL", value: "XXL" },
  { name: '5"X7"', value: '5"X7"' },
  { name: "A2", value: "A2" },
  { name: "A1", value: "A1" },
];
