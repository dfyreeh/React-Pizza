import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./Cart-drawer";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [prevTotal, setPrevTotal] = React.useState(totalPrice);

  React.useEffect(() => {
    if (totalPrice !== prevTotal) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setPrevTotal(totalPrice);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [totalPrice, prevTotal]);
  return (
    <CartDrawer>
      <Button className={cn("group relative", className)} loading={isLoading}>
        <b>{totalPrice} ₴</b>
        <span className="h-full w-[1px] bg-white/30 mx-0.5" />
        <div className="flex items-center gap-0.5 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{cartItems.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-4 -translate-x-1 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
