import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string | undefined;

  size: 25 | 30 | 35 | undefined;
}

export const ProductImage: React.FC<Props> = ({
  className,
  imageUrl,

  size,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className
      )}
    >
      <img
        src={imageUrl}
        alt="Logo"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "w-[300px] h-[300px]": size === 25,
            "w-[350px] h-[350px]": size === 30,
            "w-[400px] h-[400px]": size === 35,
          }
        )}
      />
      
    </div>
  );
};
