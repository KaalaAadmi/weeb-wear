"use client";
import { ItemCart, ProductType } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface StoreContextType {
  cartItems: ItemCart[];
  setCartItems: React.Dispatch<React.SetStateAction<ItemCart[]>>;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  addToCart: (item: ItemCart) => void;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<ItemCart[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const addToCart = (item: ItemCart) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setRefresh((prev) => !prev); // Toggle refresh to signal a re-fetch
  };

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        setCartItems,
        products,
        setProducts,
        addToCart,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
