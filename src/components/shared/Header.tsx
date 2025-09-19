import React from "react";
import { cn } from "@/lib/utils";
import { Container, CartButton } from "./index";
import LogoImg from "@/assets/logo.png";
import { Button } from "../ui";
import { Link } from "react-router-dom";
import { SearchInput } from "./Search-input";
import { User } from "lucide-react";
interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Ліва частина */}
        <Link to="/">
          <div className="flex items-center gap-4">
            <img src={LogoImg} alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">React Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                смачніше не буває
              </p>
            </div>
          </div>
        </Link>

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Права частина */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-1  hover:bg-orange-500 hover:text-white "
          >
            <User size={16} />
            Вхід
          </Button>
          <CartButton />.
        </div>
      </Container>
    </header>
  );
};
