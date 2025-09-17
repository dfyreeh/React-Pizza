// pages/ProductPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../services/axios";
import { Container, Title } from "../src/components/shared/index";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  items: { price: number }[];
  ingredients?: string[];
}

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProducts(); // или отдельный endpoint для одного продукта
        if (!data || !data[0]) return;

        // Находим продукт по id
        const allProducts = [
          ...data[0].pizzas,
          ...data[0].snacks,
          ...data[0].desserts,
          ...data[0].sauces,
          ...data[0].coffees,
          ...data[0].drinks,
        ];

        const found = allProducts.find((p) => p.id === Number(id));
        if (found) {
          setProduct({
            id: found.id,
            name: found.name,
            description: found.description,
            imageUrl: found.img || found.imageUrl,
            items: found.prices
              ? [{ price: found.prices[Object.keys(found.prices)[0]] }]
              : [{ price: 0 }],
            ingredients: found.ingredients || [],
          });
        }
      } catch (error) {
        console.error("Ошибка при загрузке продукта:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <Container>Загрузка...</Container>;
  if (!product) return <Container>Продукт не знайдено</Container>;

  return (
    <Container className="mt-5">
      <Title text={product.name} size="xl" className="font-extrabold mb-4" />
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full max-w-sm mb-4 rounded-lg"
      />
      <p className="mb-2">{product.description}</p>
      {product.ingredients && product.ingredients.length > 0 && (
        <ul className="mb-4 list-disc pl-5">
          {product.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      )}
      <p className="text-lg font-bold">Ціна: {product.items[0].price}₴</p>
    </Container>
  );
};
