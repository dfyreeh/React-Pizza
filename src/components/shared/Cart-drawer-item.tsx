import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./Title";
import { Minus, Plus } from "lucide-react";

interface Props {
  id: number;
  size?: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl: string;
  className?: string;
  onIncrease?: (id: number, size?: number) => void;
  onDecrease?: (id: number, size?: number) => void;
}

export const CartDrawerItem: React.FC<Props> = ({
  id,
  size,
  imageUrl,
  name,
  description,
  price,
  quantity,
  className,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div
      className={cn(
        "flex items-center ml-2 mr-2 bg-white p-3 gap-4 rounded-xl shadow-sm",
        className
      )}
    >
      <img
        className="h-[50px] w-[50px] rounded-lg object-cover"
        src={imageUrl}
        alt={name}
      />

      <div className="flex-1">
        <Title text={name} size="xs" />
        {description && <p className="text-gray-500 text-sm">{description}</p>}

        <div className="flex-1 border-b border-1 mt-1 mb-3 border-dashed w-full border-b-neutral-400 relative w-1xl top-0.5 " />

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => onDecrease && onDecrease(id, size)}
            className="p-1 group border cursor-pointer border-orange-500 hover:bg-orange-500 hover:text-white rounded-lg"
          >
            <Minus size={16} className="text-orange-500 hover:text-white" />
          </button>

          <span className="text-base font-medium">{quantity}</span>

          <button
            onClick={() => onIncrease && onIncrease(id, size)}
            className="p-1 border cursor-pointer border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
          >
            <Plus size={16} className="text-orange-500 hover:text-white" />
          </button>
        </div>
      </div>

      <div className="font-bold text-lg whitespace-nowrap">{price} ₴</div>
    </div>
  );
};
