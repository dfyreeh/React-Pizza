import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGoods } from "../services/axios";
import {
  ChoosePizzaForm,
  ChooseProductForm,
  Container,
  Header,
} from "../src/components/shared/index";

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

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(25);

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

        let prices: { label: string; value: number }[] = [];
        if (Array.isArray(found.price)) {
          found.price.forEach((pObj: any) => {
            Object.keys(pObj).forEach(key => {
              prices.push({ label: key, value: Number(pObj[key]) });
            });
          });
        } else {
          prices.push({ label: "25", value: Number(found.price) });
        }

        setProduct({
          id: found.id,
          name: found.name,
          description: found.description,
          imageUrl: found.imageUrl,
          prices,
          ingredients: found.ingredients || [],
          measurements: found.measurements || [],
          category: found.category,
        });
      } catch (error) {
        console.error(error);
        navigate("/not-found", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const isPizza = product?.category === "pizza";

  return (
    <>
      <Header />
      <Container>
        <div className="flex justify-center flex-1">
          {isPizza && product ? (
            <ChoosePizzaForm
              id={product.id} // правильно передаем id
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients?.join(", ")}
              description={product.description}
              prices={product.prices}
              loading={loading}
              size={selectedSize}
              setSize={setSelectedSize}
            />
          ) : (
            <ChooseProductForm
              className="relative top-8"
              imageUrl={product?.imageUrl}
              name={product?.name}
              description={product?.description}
              prices={product?.prices ?? []}
            />
          )}
        </div>
      </Container>
    </>
  );
};
