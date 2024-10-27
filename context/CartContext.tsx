"use client";
import { ItemCart } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface CartContextType {
  cartItems: ItemCart[];
  addToCart: (item: ItemCart) => void;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<ItemCart[]>([]);
  const [refresh, setRefresh] = useState(false);

  const addToCart = (item: ItemCart) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setRefresh((prev) => !prev); // Toggle refresh to signal a re-fetch
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, refresh, setRefresh }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
