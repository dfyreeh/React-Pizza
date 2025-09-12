import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import React from "react";
import { Title } from "./Title";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  imageUrl,
  price,
  className,
}) => {
  return (
    <div className={cn(className, "group")}>
      <Link to={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px] overflow-hidden">
          <img
            className="w-[215px] h-[215px] transition-transform duration-500 group-hover:translate-y-2"
            src={imageUrl}
            alt={name}
          />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          томатний соус, моцарела, оливкова олія, орегано, базилік
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            від <b>{price} ₴</b>
          </span>
          <Button variant="secondary" className="px-4 py-2">
            <Plus size={20} className="h-5 mr-1" />
            Додати
          </Button>
        </div>
      </Link>
    </div>
  );
};
