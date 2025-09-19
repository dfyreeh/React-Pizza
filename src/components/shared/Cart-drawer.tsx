import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Button } from "../ui/index";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./Cart-drawer-item";
import type { RootState } from "../../../store/store";
import { addItem, removeItem, decreaseItem } from "../../../store/cartSlice";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleIncrease = (id: number, size?: number) => {
    const item = cartItems.find(i => i.id === id && i.size === size);
    if (item) {
      dispatch(addItem({ ...item, quantity: 1 }));
    }
  };

  const handleDecrease = (id: number, size?: number) => {
    const item = cartItems.find(i => i.id === id && i.size === size);
    if (!item) return;

    if (item.quantity > 1) {
      dispatch(decreaseItem({ id: item.id, size: item.size }));
    } else {
      dispatch(removeItem({ id: item.id, size: item.size }));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col h-full bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            У кошику <span className="font-bold">{cartItems.length} товарів</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col gap-2 overflow-y-auto px-2">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-4">Кошик пустий...</p>
          ) : (
            cartItems.map(item => (
              <CartDrawerItem
                key={`${item.id}-${item.size}`}
                id={item.id}
                size={item.size}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
                onIncrease={() => handleIncrease(item.id, item.size)}
                onDecrease={() => handleDecrease(item.id, item.size)}
              />
            ))
          )}
        </div>

        <SheetFooter className="bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Ітого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">{totalPrice} ₴</span>
            </div>

            <Link to="/orderProcessing">
              <Button type="submit" className="w-full h-12 text-base">
                Оформити замовлення
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
