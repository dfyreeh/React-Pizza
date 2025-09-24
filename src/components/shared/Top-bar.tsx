import { cn } from "@/lib/utils";
import React from "react";
import {
  CartButton,
  Categories,
  Container,
  SortPopup,
} from "@/components/shared";

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Когда страница проскроллена больше 100px — делаем sticky
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 overflow-hidden",
        className
      )}
    >
      <Container className="flex justify-center items-center lg:justify-between lg:flex relative">
        <Categories />

        <div
          className={cn(
            "hidden lg:flex transition-opacity duration-500 ease-in-out",
            isSticky ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <SortPopup />
        </div>

        <div
          className={cn(
            "absolute right-[32px] transition-transform duration-500 ease-in-out",
            "hidden sm:flex", // спрятать на мобильных, показать с sm и выше
            isSticky ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          )}
        >
          <CartButton />
        </div>
      </Container>
    </div>
  );
};
