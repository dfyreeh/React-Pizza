import React from "react";
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
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore(
    (state: { setActiveId: any }) => state.setActiveId
  );
  const intersectionRef = React.useRef(null as any);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId || 1);
    }
  }, [intersection, categoryId]);

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
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
