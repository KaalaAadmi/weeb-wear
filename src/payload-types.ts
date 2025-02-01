/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    products: Product;
    reviews: Review;
    newsletter: Newsletter;
    carts: Cart;
    orders: Order;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    products: ProductsSelect<false> | ProductsSelect<true>;
    reviews: ReviewsSelect<false> | ReviewsSelect<true>;
    newsletter: NewsletterSelect<false> | NewsletterSelect<true>;
    carts: CartsSelect<false> | CartsSelect<true>;
    orders: OrdersSelect<false> | OrdersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name: string;
  role?: ('admin' | 'customer') | null;
  password: string | null;
  address?: string | null;
  mobileNumber?: string | null;
  profileImage?: (string | null) | Media;
  stripeCustomerId?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  cloudinaryUrl?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  descriptionPara1: string;
  descriptionPara2?: string | null;
  descriptionPara3?: string | null;
  featured?: boolean | null;
  category: 'tshirt' | 'poster' | 'hoodie' | 'mug' | 'sticker' | 'phone-case' | 'hat' | 'bag' | 'inner';
  images?:
    | {
        image: string | Media;
        id?: string | null;
      }[]
    | null;
  sizes?: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '5x7' | 'A2' | 'A1')[] | null;
  colors?: ('White' | 'Black' | 'Blue' | 'Brown' | 'Green' | 'Purple' | 'Navy' | 'Red' | 'Teal' | 'Maroon')[] | null;
  highlights?:
    | {
        highlight?: string | null;
        id?: string | null;
      }[]
    | null;
  slug?: string | null;
  tags?:
    | {
        tag?: string | null;
        id?: string | null;
      }[]
    | null;
  stripeProductId?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews".
 */
export interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  product?: (string | null) | Product;
  author: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsletter".
 */
export interface Newsletter {
  id: string;
  email: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "carts".
 */
export interface Cart {
  id: string;
  userId: string | User;
  name: string;
  productId: string | Product;
  quantity: number;
  price: number;
  color: string;
  category: string;
  size: string;
  image: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  name: string;
  email: string;
  currency: string;
  amount: number;
  address:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  date: string;
  receipt_url: string;
  checkout_session_id: string;
  transaction_id: string;
  payment_intent_id: string;
  type: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'products';
        value: string | Product;
      } | null)
    | ({
        relationTo: 'reviews';
        value: string | Review;
      } | null)
    | ({
        relationTo: 'newsletter';
        value: string | Newsletter;
      } | null)
    | ({
        relationTo: 'carts';
        value: string | Cart;
      } | null)
    | ({
        relationTo: 'orders';
        value: string | Order;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  role?: T;
  password?: T;
  address?: T;
  mobileNumber?: T;
  profileImage?: T;
  stripeCustomerId?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  cloudinaryUrl?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products_select".
 */
export interface ProductsSelect<T extends boolean = true> {
  name?: T;
  price?: T;
  descriptionPara1?: T;
  descriptionPara2?: T;
  descriptionPara3?: T;
  featured?: T;
  category?: T;
  images?:
    | T
    | {
        image?: T;
        id?: T;
      };
  sizes?: T;
  colors?: T;
  highlights?:
    | T
    | {
        highlight?: T;
        id?: T;
      };
  slug?: T;
  tags?:
    | T
    | {
        tag?: T;
        id?: T;
      };
  stripeProductId?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews_select".
 */
export interface ReviewsSelect<T extends boolean = true> {
  title?: T;
  content?: T;
  rating?: T;
  product?: T;
  author?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsletter_select".
 */
export interface NewsletterSelect<T extends boolean = true> {
  email?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "carts_select".
 */
export interface CartsSelect<T extends boolean = true> {
  userId?: T;
  name?: T;
  productId?: T;
  quantity?: T;
  price?: T;
  color?: T;
  category?: T;
  size?: T;
  image?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders_select".
 */
export interface OrdersSelect<T extends boolean = true> {
  name?: T;
  email?: T;
  currency?: T;
  amount?: T;
  address?: T;
  date?: T;
  receipt_url?: T;
  checkout_session_id?: T;
  transaction_id?: T;
  payment_intent_id?: T;
  type?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}