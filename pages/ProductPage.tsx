import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGoods } from "../services/axios";
import { Recommendations } from "@/components/shared/Recommendations";

import {
  ChoosePizzaForm,
  ChooseProductForm,
  Container,
  Header,
  ProductPageSkeleton,
} from "../src/components/shared/index";
import { RecommendationsSkeleton } from "@/components/shared/Recommendations-Skeleton";

type PizzaSize = 25 | 30 | 35;

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  prices: { label: string; value: string | number }[];
  ingredients?: string[];
  measurements?: { label: string; value: string }[];
  category: string;
}

const CATEGORY_RECOMMENDATIONS_MAP: Record<string, string[]> = {
  "Піци": ["Соуси", "Напої"],
  "Кава": ["Десерти", "Десерти"],
  "Десерти": ["Кава", "Напої"],
  "Напої": ["Закуски", "Десерти", "Піци"],
  "Закуски": ["Соуси", "Напої"],
  "Соуси": ["Піци", "Закуски"],
};

const getRecommendations = (
  allProducts: Product[],
  currentProduct: Product
): Product[] => {
  if (!currentProduct) return [];

  const relatedCategoryNames = CATEGORY_RECOMMENDATIONS_MAP[currentProduct.category] || [];

  const groupedByCategory: Record<string, Product[]> = {};

  // Розділити продукти по категоріям
  for (const product of allProducts) {
    if (
      product.id !== currentProduct.id &&
      relatedCategoryNames.includes(product.category)
    ) {
      if (!groupedByCategory[product.category]) {
        groupedByCategory[product.category] = [];
      }

      groupedByCategory[product.category].push(product);
    }
  }
  const recommendations: Product[] = [];

  for (const category of relatedCategoryNames) {
    const items = groupedByCategory[category];

    if (items && items.length > 0) {
      const shuffled = items.sort(() => 0.5 - Math.random());
      for (let i = 0; i < Math.min(2, shuffled.length); i++) {
        if (recommendations.length < 4) {
          recommendations.push(shuffled[i]);
        }
      }
    }
    if (recommendations.length >= 4) break;
  }
  return recommendations;
};


export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(25);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchGoods();

        const parsedProducts: Product[] = data.flatMap((cat: any) =>
          cat.products.map((p: any) => ({
            id: Number(p.id),
            name: p.name,
            description: p.description,
            imageUrl: p.imageUrl || p.img,
            prices: Array.isArray(p.price)
              ? p.price.map((pObj: any) => {
                  const key = Object.keys(pObj)[0];
                  return { label: key, value: Number(pObj[key]) };
                })
              : [{ label: "25", value: Number(p.price) }],
            ingredients: p.ingredients || [],
            measurements: p.measurements || [],
            category: cat.name, 
          }))
        );
        setAllProducts(parsedProducts);

        const found = parsedProducts.find((p) => p.id === Number(id));
        if (!found) {
          navigate("/not-found", { replace: true });
          return;
        }
        setProduct(found);
        setRecommendations(getRecommendations(parsedProducts, found));
      } catch (error) {
        console.error(error);
        navigate("/not-found", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate]);

  const isPizza = product?.category === "Піци"; 

  return (
    <>
      <Header />
      <Container>
        <div className="flex justify-center flex-1">
          {loading ? (
            <ProductPageSkeleton className="w-full" />
          ) : isPizza && product ? (
            <ChoosePizzaForm
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients?.join(", ")}
              description={product.description}
              prices={product.prices}
              size={selectedSize}
              setSize={setSelectedSize}
            />
          ) : (
            <ChooseProductForm
              id={product?.id}
              className="relative top-8"
              imageUrl={product?.imageUrl}
              name={product?.name}
              description={product?.description}
              prices={product?.prices ?? []}
            />
          )}
        </div>

        <div className="mt-10 mb-15">
        {loading ? (
          <RecommendationsSkeleton className="w-full" />
        ) : recommendations.length > 0 ? (
          <Recommendations products={recommendations} />
        ) : null}
      </div>
      </Container>
    </>
  );
};
