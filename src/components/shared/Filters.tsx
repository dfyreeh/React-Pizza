 
 
import { FilterCheckbox, Title,    }  from "@/components/shared";
import React from "react";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фшльтрація" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно зібрати"  value="1"/>
      </div>

    </div>
  );
};
