// import { PRODUCT_CATEGORIES } from "@/config";
import { ItemCart } from "@/lib/types";
// import { useCart } from '@/hooks/use-cart'
import { formatPrice } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const CartItem = ({
  product,
  onRemoveItem,
  setRefresh,
}: {
  product: ItemCart;
  onRemoveItem: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const productImage = product?.productImage;

  const handleRemoveItem = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id, userId: product.userId }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Item removed from cart");
        onRemoveItem(); // Trigger the cart re-fetch
        setRefresh((prev) => !prev); // Triggers re-fetch in `cart.tsx`
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {productImage ? (
              <Image
                src={productImage}
                alt={product?.productName || ""}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product?.productName}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {product?.productSize} - {product?.productColor}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => handleRemoveItem(product?._id || "")}
                className="flex items-center gap-0.5 hover:text-red-500"
              >
                <X className="w-3 h-4 hover:text-red-500" />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product?.productPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
