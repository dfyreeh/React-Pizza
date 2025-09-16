import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>; // добавляем возможность передать ref
  scrollable?: boolean; // если true — делаем контейнер скроллимым
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
  innerRef,
  scrollable = false,
}) => {
  return (
    <div
      ref={innerRef}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        "max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl",
        scrollable && "overflow-auto h-full", // скролл только если нужно
        className
      )}
    >
      {children}
    </div>
  );
};
