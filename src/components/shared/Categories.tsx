import { cn } from "@/lib/utils";
import React from "react";
import { useCategoryStore } from "../../../store/category";

interface Props {
  className?: string;
}

const cats = [
  { id: 1, name: "Піца" },
  { id: 2, name: "Сніданки" },
  { id: 3, name: "Комбо" },
  { id: 4, name: "Закуски" },
  { id: 5, name: "Десерти" },
  { id: 6, name: "Кава" },
  { id: 7, name: "Сік" },
];
export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {cats.map(({ name, id }, index) => (
        <a
          
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-300 text-primary"
          )}
          href={`#${name}`}
          key={index}
        >
          <a className="cursor-pointer">{name}</a>
        </a>
      ))}
    </div>
  );
};
