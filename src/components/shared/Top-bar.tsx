import { cn } from "@/lib/utils";
import React from "react";
import { Categories, Container, SortPopup } from "@/components/shared";

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex justify-center items-center lg:justify-between lg:flex">
        <Categories />
        <SortPopup className="hidden lg:flex" />
      </Container>
    </div>
  );
};
