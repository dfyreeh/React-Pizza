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
    <div className="flex items-center justify-between rounded-xl shadow-sm p-3 w-full bg-white">
  {/* Лівий блок: зображення та назва */}
  <div className="flex items-center gap-3">
    <img className="w-14 h-14 object-cover rounded" src={imageUrl} alt={name} />
    <p className="font-bold text-base truncate">{name}</p>
  </div>

  {/* Правий блок: ціна, кнопки та видалення */}
  <div className="flex items-center gap-3">
    <p className="font-bold text-base">{price} ₴</p>
    
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        onClick={onDecrement}
        className="text-xl px-2 hover:bg-orange-500 hover:text-white"
      >
        -
      </Button>
      <span className="font-bold">{count}</span>
      <Button
        variant="outline"
        onClick={onIncrement}
        className="text-xl px-2 hover:bg-orange-500 hover:text-white"
      >
        +
      </Button>
    </div>

    <Plus
      onClick={onDelete}
      className="rotate-45 text-gray-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
      size={20}
    />
  </div>
</div>
  );
};
