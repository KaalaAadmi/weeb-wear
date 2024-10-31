// import { Document, Types } from "mongoose";

export interface ProductType {
  _id: string;
  name: string;
  descriptionPara1: string;
  descriptionPara2: string;
  descriptionPara3?: string;
  price: number;
  imageUrls: {
    key: string;
    url: string;
  }[];
  featured?: boolean;
  category: string;
  colors: Map<string, string>;
  highlights: string[];
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  createdAt: Date;
  updatedAt: Date;
}

export type SizeData = {
  unit: string;
  sizeLabel: string;
  length: number;
  width: number;
};

export interface ItemCart {
  _id?: string;
  userId: string;
  productId: string;
  productName?: string;
  productImage?: string;
  productSize: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  productColor: string;
  productQuantity: number;
  productPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
