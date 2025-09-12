// import { Container } from "../src/components/shared/Container";

import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";
import { Header } from "@/components/shared/Header";

export default function Hom() {
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Title size="xl" text="Усі піци" className="font-extrabold " />
      </Container>
      <TopBar className="mb-6" />
      <Container className="flex pb-14">
        {/* Фільтрація */}
        <div className="flex gap-[60px] mr-12">
          <div className="w-[250px]">
            <Filters />
          </div>
        </div>
        {/* Список товарів */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <ProductsGroupList
              title="Піци"
              items={[
                {
                  id: 1,
                  name: "Маргарита",

                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
              ]}
              categoryId={1}
            />
            <ProductsGroupList
              title="Сніданки"
              items={[
                {
                  id: 1,
                  name: "Маргарита",

                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl:
                    "https://res.cloudinary.com/dj5m03zpw/image/upload/v1757435723/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0_tzxmqu.png",
                  items: [{ price: 550 }],
                },
              ]}
              categoryId={1}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
