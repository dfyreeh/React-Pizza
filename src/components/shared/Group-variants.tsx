import { cn } from "@/lib/utils";
import React from "react";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  Value?: Variant["value"];
  className?: string;
}


export const GroupVariants: React.FC<Props> = ({
  items,
  onClick,
  Value,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#ebebeb] rounded-3xl p-1 select-none",
        className
      )}
    >
      {items.map((items) => (
        <button
          key={items.name}
          onClick={() => onClick?.(items.value)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 font-medium text-sm",
            {
              "bg-white shadow": items.value === Value,
              "text-gray-500 cursor-not-allowed select-none opacity-50": items.disabled,
            },
            className
          )}
        >
          {items.name}
        </button>
      ))}
    </div>
  );
};
