import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGoods } from "../services/axios";
import {
  Container,
  Header,
  ProductImage,
  Title,
} from "../src/components/shared/index";


interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  prices: { label: string; value: string | number }[];
  ingredients?: string[];
  measurements?: { label: string; value: string }[];
}

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // <-- используем navigate
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchGoods();
        const allProducts = data.flatMap((cat: any) => cat.products);
        const found = allProducts.find((p: any) => p.id === Number(id));

        if (!found) {
          navigate("/not-found", { replace: true });
          return;
        }

        // --- Формуємо масив цін ---
        let prices: { label: string; value: string | number }[] = [];
        if (Array.isArray(found.price)) {
          found.price.forEach((pObj: any) => {
            Object.keys(pObj).forEach((key) =>
              prices.push({ label: key, value: pObj[key] })
            );
          });
        } else {
          prices.push({ label: "Ціна", value: found.price });
        }

        // --- Формуємо масив вимірювань (вага або об’єм) ---
        let measurements: { label: string; value: string }[] = [];
        const isDrink = ["coffee", "water", "cocktails"].includes(
          found.category
        );

        if (isDrink) {
          if (found.volume && typeof found.volume === "object") {
            Object.keys(found.volume).forEach((key) =>
              measurements.push({ label: key, value: found.volume[key] })
            );
          } else if (found.volume) {
            measurements.push({ label: "Об’єм", value: found.volume });
          }
        } else {
          if (found.weight && typeof found.weight === "object") {
            Object.keys(found.weight).forEach((key) =>
              measurements.push({ label: key, value: found.weight[key] })
            );
          } else if (found.weight) {
            measurements.push({ label: "Вага", value: found.weight });
          }
        }

        setProduct({
          id: found.id,
          name: found.name,
          description: found.description,
          imageUrl: found.imageUrl,
          prices,
          ingredients: found.ingredients || [],
          measurements,
        });
      } catch (error) {
        console.error("Помилка при завантаженні продукту:", error);
        navigate("/not-found", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  //   if (loading) return <Container>Завантаження...</Container>;

  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-1">
          <ProductImage imageUrl={product?.imageUrl} size={30} />
          <div className="w-[490px] bg-[#FCFCFC] P-7">
            <Title text={product?.name}/>
          </div>
        </div>
      </Container>
    </>
  );
};
