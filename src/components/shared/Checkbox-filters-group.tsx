import React from "react";
import { FilterCheckbox, type FilterChecboxProps } from "./Filter-checkbox";
import { Input, Skeleton } from "../ui";
import { cn } from "@/lib/utils";
type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defultItem?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValues?: string[];
  selected?: Set<string>;
  name?: string;
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defultItem,
  limit = 5,
  searchInputPlaceholder = "Пошук...",
  loading = false,
  onClickCheckbox,
  defaultValues,
  selected,
  name, 
  className,

}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold md-3">{title}</p>
        {
          ...Array(limit).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-5 mb-5 rounded-md" />
          ))
        }
        <Skeleton className="h-5 w-1/2 rounded-md" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      
      )
    : (defultItem || items).slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-4 pr-2 scrollbar transition-all duration-300",
          showAll ? "max-h-56 overflow-auto" : "max-h-56 overflow-hidden"
        )}
      >
        {list.map((item, index) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selected?.has(item.value)}
            key={index}
            value={item.value}
            text={item.text}

            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3 cursor-pointer"
          >
            {showAll ? "Згорнути" : "+ Показати всі"}
          </button>
        </div>
      )}
    </div>
  );
};
