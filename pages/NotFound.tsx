import { Container, Header } from "@/components/shared";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
interface Props {
  className?: string;
}

export const NotFound: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Header />
      <Container className="flex flex-col gap-8 justify-center items-center min-h-[80vh]">
        <h1 className="text-9xl">404</h1>
        <p className="text-center text-lg">
          Навіть Мертве море простіше оживити, ніж цю сторінку. <br /> — Джейсон
          Стетхем
        </p>

        <Link className="flex items-center gap-1" to="/">
          <Button
            variant="outline"
            className="flex items-center gap-1 hover:bg-orange-500 hover:text-white"
          >
            <ArrowLeft />
            На головну
          </Button>
        </Link>
      </Container>
    </div>
  );
};
