import { cn } from "@/lib/utils";
import React from "react";
import { ProductImage } from "./Product-image";
import { Title } from "./Title";
import { Button } from "../ui";
import { GroupVariants } from "./Group-variants";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/cartSlice";
import toast from "react-hot-toast";

type PizzaSize = 25 | 30 | 35;

interface Props {
  id: number;
  imageUrl: string | undefined;
  name: string | undefined;
  ingredients: string | undefined;
  prices: { label: string; value: string | number }[];
  description: string | undefined;
  loading?: boolean;
  className?: string;
  size?: PizzaSize;
  setSize?: React.Dispatch<React.SetStateAction<PizzaSize>>;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  id,
  ingredients,
  prices,
  loading,
  description,
  className,
}) => {
  const dispatch = useDispatch();
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
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = () => {
    if (!id || !name) return;

    setIsAdding(true);

    const uniqueId = id * 1000 + size;

    const itemToAdd = {
      id: uniqueId,
      productId: id,
      size,
      name: `${name} ${size} см`,
      price: totalPrice,
      imageUrl: imageUrl ?? "",
      quantity: 1,
    };

    dispatch(addItem(itemToAdd));

    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${name} (${size} см) додано до кошику!`);
    }, 500);
  };

  return (
    <div
      className={cn(
        "flex flex-1 ml-6 mr-6 bg-[#e0e0e0] rounded-3xl flex-col lg:flex-row",
        className
      )}
    >
      <ProductImage imageUrl={imageUrl} size={size} />

      <div className="rounded-3xl w-full lg:w-[490px] h-[400px] bg-[#f7f6f5] p-7 flex flex-col gap-4 mt-6 lg:mt-0 lg:ml-6">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <div>
          <span className=" font-extrabold">Інгредієнти:</span>
          <p className="text-gray-400">{ingredients}</p>
        </div>

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
          onClick={handleAddToCart}
          loading={isAdding}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-auto"
        >
          Додати до кошику {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
