import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./Title";
import { Button } from "../ui";

interface Price {
  label: string;
  value: string | number;
}

interface Props {
  imageUrl: string | undefined;
  name: string | undefined;
  prices: Price[]; // получаем цены с API
  loading?: boolean;
  description: string | undefined;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  prices,
  loading,
  description,
  className,
}) => {
  const totalPrice = prices?.[0]?.value ?? 0;

  return (
    <div
      className={cn("flex flex-col lg:flex-row flex-1 gap-6 px-6", className)}
    >
      <div className="flex items-center justify-center flex-1">
        <img
          src={imageUrl}
          alt="Logo"
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[250px] h-[250px]sm:w-[300px] sm:h-[300px] pxlg:w-[350px] lg:h-[350px]  
      "
        />
      </div>

      <div
        className="rounded-3xl w-full lg:w-[490px] bg-[#f7f6f5] p-7  flex flex-col gap-4
    "
      >
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{description}</p>

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
