import { cn } from "@/lib/utils";
import React from "react";
import { ProductImage } from "./Product-image";
import { Title } from "./Title";
import { Button } from "../ui";
import { GroupVariants } from "./Group-variants";

interface Props {
  imageUrl: string | undefined;
  name: string | undefined;
  ingredients: string | undefined;
  prices: { label: string; value: string | number }[];
  size: PizzaSize; // размер пиццы
  setSize: (size: PizzaSize) => void;
  description: string | undefined;
  loading?: boolean;
  className?: string;
}

type PizzaSize = 25 | 30 | 35;

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  ingredients,
  prices,
  loading,
  description,
  className,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(25);

  const priceMap: Record<PizzaSize, number> = React.useMemo(() => {
    const map: Record<PizzaSize, number> = {} as Record<PizzaSize, number>;
    prices.forEach((p) => {
      const sizeKey = parseInt(p.label, 10) as PizzaSize;
      map[sizeKey] = Number(p.value);
    });
    return map;
  }, [prices]);

  const totalPrice = priceMap[size] ?? 0;

  return (
    <div
      className={cn("flex flex-1 ml-6 mr-6 flex-col lg:flex-row", className)}
    >
      <ProductImage imageUrl={imageUrl} size={size} />

      <div className="rounded-3xl w-full lg:w-[490px] h-[400px] bg-[#f7f6f5] p-7 flex flex-col gap-4 mt-6 lg:mt-0 lg:ml-6">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{ingredients}</p>

        <GroupVariants
          Value={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
          items={[
            { name: "Маленька", value: "25" },
            { name: "Середня", value: "30" },
            { name: "Велика", value: "35" },
          ]}
        />

        <div>
          <p>{description}</p>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-auto"
        >
          Додати до кошику {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
