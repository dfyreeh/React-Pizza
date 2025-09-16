import { cn } from "@/lib/utils";
import React from "react";
import { useCategoryStore } from "../../../store/category";

interface Props {
  className?: string;
}

const cats = [
  {
    id: 1,
    name: "Піци",
  },
  {
    id: 2,
    name: "Закуски",
  },
  {
    id: 3,
    name: "Десерти",
  },
  {
    id: 4,
    name: "Соуси",
  },
  {
    id: 5,
    name: "Напої",
  },
  {
    id: 6,
    name: "Кава",
  },
];
export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {cats.map(({ name, id }) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-300 text-primary"
          )}
          href={`#${name}`}
          key={id}
        >
          {name}
        </a>
      ))}
    </div>
  );
};
