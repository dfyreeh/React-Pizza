import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  //   CarouselNext,
  //   CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { fetchProducts } from "../../../services/axios";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const CarouselNews: React.FC<Props> = ({ className }) => {
  const plugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
    })
  );

  const [loading, setLoading] = React.useState(true);
  const [sliderImages, setSliderImages] = React.useState<{ img: string }[]>([]);
  React.useEffect(() => {
    fetchProducts().then((data) => {
      setSliderImages(data[0].slider);
      setLoading(false);
    });
  }, []);

  return (
    <Container className="w-[1264px]">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        className={cn("w-full mt-10 mb-10", className)}
      >
        <CarouselContent>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-4/5 lg:basis-1/5">
                  <div className="p-1 h-74 w-full">
                    <Card className="h-full w-full p-0 overflow-hidden rounded-3xl">
                      <CardContent className="relative h-full w-full p-0">
                        <Skeleton className="h-full w-full " />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : sliderImages.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                >
                  <div className="p-1 h-74 w-full">
                    <Card className="h-full w-full p-0 overflow-hidden rounded-3xl">
                      <CardContent className="relative h-full w-full p-0">
                        <img
                          src={item.img}
                          className="h-full w-full "
                          alt={`Slide ${index + 1}`}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </Container>
  );
};
