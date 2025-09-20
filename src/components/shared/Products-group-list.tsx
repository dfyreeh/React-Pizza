import React, { useRef, useEffect } from "react";
import { useIntersection } from "react-use";
import { Title } from "./Title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./Product-card";
import { useCategoryStore } from "../../../store/category";

interface Props {
  title: string;
  items: any[];
  listClassName?: string;
  categoryId?: number;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLDivElement>; // реф на скролл-контейнер
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef<HTMLDivElement>(null!);

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px 0px -50% 0px",
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId || 1);
    }
  }, [intersection?.isIntersecting, categoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div
        className={cn(
          "grid gap-8 grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
          listClassName
        )}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            imageUrl={product.imageUrl}
            price={
              Array.isArray(product.price)
                ? (Object.values(product.price[0])[0] as number)
                : (product.price as number)
            }
          />
        ))}
      </div>
    </div>
  );
};
