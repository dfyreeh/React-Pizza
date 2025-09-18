import React from "react";
import { Trash } from "lucide-react";

interface CartItemProps{
  name: string;
  price: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    name,
    price,
    count,
    onIncrement,
    onDecrement,
    onDelete,
}) => {
    return (
        <div className=" flex justify-between items-center py-3">
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-gray-500">{price} грн</p>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={onDecrement} className="px-2.5 py-0.5 cursor-pointer text-orange-500 bg-gray-100 rounded-2xl">-</button>
                <span>{count}</span>
                <button onClick={onIncrement} className="px-2.5 py-0.5 cursor-pointer text-orange-500 bg-gray-100 rounded-2xl">+</button>
                <Trash data-slot="button" onClick={onDelete} className="py-0.5 cursor-pointer"/> 
            </div>
        </div>
    )
}