{/*скелетон для рекомендацій*/}
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import ImgSkeleton from "../../assets/ImgSkeleton.png";

interface Props {
  className?: string;
}

export const RecommendationsSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-6 px-6", className)}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#f7f6f5] rounded-2xl p-4 flex flex-col items-center shadow-sm"
        >
          <div className="w-[120px] h-[120px] flex items-center justify-center mb-4">
            <img
              src={ImgSkeleton}
              alt="Skeleton"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-8 w-full rounded-xl mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

