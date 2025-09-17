import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string | undefined;
  size: number;
}

export const ProductImage: React.FC<Props> = ({
  className,
  imageUrl,
  size,
}) => {
  return (
    <div className={className}>
      <img
        src={imageUrl}
        alt="Logo"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "w-[300px] h-[300px]": size === 25,
            "w-[400px] h-[400px]": size === 30,
            "w-[500px] h-[500px]": size === 45,
          }
        )}
      />
    </div>
  );
};
