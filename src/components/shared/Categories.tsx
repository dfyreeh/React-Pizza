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

  const containerRef = React.useRef<HTMLDivElement>(null);
  const categoryRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  React.useEffect(() => {
    const activeIndex = cats.findIndex((cat) => cat.id === categoryActiveId);
    const activeEl = categoryRefs.current[activeIndex];

    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // по вертикали не скроллит
        inline: "center", // по горизонтали центрирует
      } as ScrollIntoViewOptions);
    }
  }, [categoryActiveId]);
  return (
    <div
      ref={containerRef}
      className={cn(
        "flex gap-1 bg-gray-50 p-1 rounded-2xl overflow-x-auto scrollbar-hide",
        className
      )}
    >
      {cats.map(({ name, id }, index) => (
        <a
          ref={(el) => {
            categoryRefs.current[index] = el; // сохраняем элемент в массив
          }}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5 flex-shrink-0",
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
