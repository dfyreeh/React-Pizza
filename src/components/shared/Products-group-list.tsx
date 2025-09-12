import React from "react";
import { Title } from "./Title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./Product-card";

interface Props {
  title: string;
  items: any[];
  listClassName?: string;
  categoryId?: number;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  return (
    <div className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div
        className={cn(
          "grid gap-8 grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
          listClassName
        )}
      >
        {items.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
