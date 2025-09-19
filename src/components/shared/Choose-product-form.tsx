import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Title } from "./Title";
import { Button } from "../ui";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/cartSlice";
import toast from "react-hot-toast";

interface Price {
  label: string;
  value: string | number;
}

interface Props {
  imageUrl: string | undefined;
  name: string | undefined;
  prices: Price[];
  description: string | undefined;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  prices,
  description,
  className,
}) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const totalPrice = prices?.[0]?.value ?? 0;

  const handleAddToCart = () => {
    if (!name) return;

    setIsAdding(true);

    const itemToAdd = {
      id: Date.now(),
      name,
      price: Number(totalPrice),
      imageUrl: imageUrl ?? "",
      quantity: 1,
    };

    dispatch(addItem(itemToAdd));

    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${name} додано до кошику!`);
    }, 500);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-[#e0e0e0] rounded-3xl lg:flex-row flex-1 gap-6",
        className
      )}
    >
      <div className="flex items-center justify-center flex-1">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]"
        />
      </div>

      <div className="rounded-3xl w-full lg:w-[490px] bg-[#f7f6f5] p-7 flex flex-col gap-4">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{description}</p>

        <Button
          loading={isAdding}
          onClick={handleAddToCart}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-auto"
        >
          Додати до кошику {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
