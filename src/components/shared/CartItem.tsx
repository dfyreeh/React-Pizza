import React from "react";
// import { Title } from "../src/components/shared/index";
import { cn } from "@/lib/utils";


interface CartItemProps{
  name: string;
  price: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    name,
    price,
    count,
    onIncrement,
    onDecrement,
}) => {
    return (
        <div className={cn(" flex justify-between items-center border-b py-3")}>
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-gray-500">{price} грн</p>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={onDecrement} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span>{count}</span>
                <button onClick={onIncrement} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
        </div>
    )
}