import {
  CarouselNews,
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";
import { Header } from "@/components/shared/Header";
import { fetchGoods } from "../services/axios";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "@/components/ui/card";
import ImgSkeleton from "../src/assets/ImgSkeleton.png";

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

  const limit = 9;

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Title size="xl" text="Усі товари" className="font-extrabold " />
      </Container>

      <TopBar className="mb-6" />
      <CarouselNews />
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
              <div className="mt-10 grid gap-8 grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {Array(limit)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className=" w-[290px]  flex  gap-6 ">
                      <CardContent className="px-1 flex items-center w-full flex-col gap-3">
                        {/* <Skeleton className="w-[215px] h-[215px] rounded-full  " /> */}

                        <img
                          className="   w-[215px] h-[215px]"
                          src={ImgSkeleton}
                        />

                        <Skeleton className="h-6 w-full rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                        <div className="flex items-center justify-between gap-30 pt-2">
                          <Skeleton className="h-6 w-16 rounded" />
                          <Skeleton className="h-8 w-24 rounded-2xl" />
                        </div>
                      </CardContent>
                    </div>
                  ))}
              </div>
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
