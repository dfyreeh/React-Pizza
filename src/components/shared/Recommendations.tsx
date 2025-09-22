import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "./Title";
import { ProductCard } from "./Product-card";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  prices: { label: string; value: string | number }[];
  description?: string;
  className?: string;
}

interface Props {
  products: Product[];
}

export const Recommendations: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-12 w-full">
      <Title text="Рекомендації" className="font-bold" size="sm" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((product) => {
          const minPrice = product.prices.length > 0
            ? Math.min(...product.prices.map((p) => Number(p.value)))
            : 0;

          return (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/product/${product.id}`);
                }
              }}
            >
              <ProductCard
                id={product.id.toString()}
                name={product.name}
                imageUrl={product.imageUrl}
                price={minPrice}
                description={product.description}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
