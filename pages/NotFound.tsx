import { Container, Header } from "@/components/shared";
import React from "react";
import imgNotFound from "../src/assets/imgNotFound.jpg";
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
        <img className="w-150 rounded-3xl mt-5" src={imgNotFound} alt="404" />
        <Link className="flex items-center gap-1" to="/">
          <Button variant="outline" className="flex items-center gap-1 hover:bg-orange-500 hover:text-white">
            <ArrowLeft />
            На головну
          </Button>
        </Link>
      </Container>
    </div>
  );
};
