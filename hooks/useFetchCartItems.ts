import { useEffect, useState } from "react";
import { ItemCart } from "@/lib/types";
import { useStore } from "@/context/StoreContext"; // Import the cart context

export const useFetchCartItems = (userId: string) => {
  // const [items, setItems] = useState<ItemCart[]>([]);
  const { cartItems, setCartItems, refresh } = useStore();

  const fetchCartItems = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/cart?userId=${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId, refresh]); // Add `refresh` as a dependency

  return { cartItems, fetchCartItems };
};
