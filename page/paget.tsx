import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";
import { Header } from "@/components/shared/Header";
import { fetchGoods } from "../services/axios";
import React from "react";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  weight?: string;
  img?: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

export default function Hom() {
  const [goods, setGoods] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadGoods = async () => {
      setLoading(true);
      try {
        const data = await fetchGoods();
        setGoods(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadGoods();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Title size="xl" text="Усі товари" className="font-extrabold " />
      </Container>
      <TopBar className="mb-6" />
      <Container className="flex pb-14">
        {/* Фільтрація */}
        <div className="flex gap-[60px] mr-12">
          <div className="w-[250px] hidden xl:block">
            <Filters />
          </div>
        </div>

        {/* Список товарів по категоріях */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {loading ? (
              <p>Завантаження товарів...</p>
            ) : (
              goods.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  items={category.products}
                  categoryId={Number(category.id)}
                />
              ))
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
