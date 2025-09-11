// import { Container } from "../src/components/shared/Container";

import { Container, Filters, Title, TopBar } from "@/components/shared";
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
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
        </div>
        {/* Список товарів */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">Список товарів</div>
        </div>
      </Container>
    </>
  );
}
