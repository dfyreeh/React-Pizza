import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import LogoImg from "@/assets/logo.png";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchInput } from "./Search-input";
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
          <div>
            <Button className="group relative">
              <b>580 ₴</b>
              <span className="h-full w-[1px] bg-white/30 mx-0.5" />
              <div className="flex items-center gap-0.5 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                <b>3</b>
              </div>
              <ArrowRight
                size={20}
                className="absolute right-4 -translate-x-1 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
