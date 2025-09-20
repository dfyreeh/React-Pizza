import { Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface CartItemProps {
  name: string;
  price: number;
  count: number;
  imageUrl: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  count,
  imageUrl,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  return (
    <div className=" flex justify-between rounded-xl shadow-sm  p-3">
      <div className="flex items-center justify-between  w-full">
        <div className="flex items-center gap-2">
          <img className="w-[40px] h-[40px]" src={imageUrl} alt={name} />
          <p className="font-extrabold">{name}</p>
        </div>

        <div className="flex items-center justify-between w-60">
          <div>
            <p className="font-extrabold">{price} ₴</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onDecrement}
              className="cursor-pointer text-2xl px-3 hover:bg-orange-500 hover:text-white"
            >
              -
            </Button>
            <span className="font-extrabold">{count}</span>
            <Button
              onClick={onIncrement}
              variant="outline"
              className="cursor-pointer text-2xl px-3 hover:bg-orange-500 hover:text-white"
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Plus
          data-slot="button"
          onClick={onDelete}
          className="rotate-45  text-gray-500 hover:text-black transition-colors duration-200 py-0.5 cursor-pointer"
        />
      </div>
    </div>
  );
};
