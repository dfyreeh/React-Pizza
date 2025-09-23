import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
}

import ImgSkeleton from "../../assets/imgSkeleton.png";

export const ProductPageSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#e0e0e0] rounded-3xl ml-6 mr-6",
        className
      )}
    >
      <div className="lg:w-1/2 flex items-center justify-center">
        <img className="   w-[300px] h-[300px]  " src={ImgSkeleton} />
      </div>

      {/* <Skeleton className="w-full lg:w-1/2 h-[400px] rounded-3xl" /> */}
      <div className="rounded-3xl w-full lg:w-[490px] h-[400px] bg-[#f7f6f5] p-7 flex flex-col gap-4 mt-6 lg:mt-0 lg:ml-6">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-10 rounded" />
        <Skeleton className="mt-auto h-[55px] w-full rounded-[18px]" />
      </div>
    </div>
  );
};
