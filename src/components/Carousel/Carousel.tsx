import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";
import Image from "next/image";

import { CarouselConfig } from "./CarouselConfig";

const BonusCarousel: React.FC<Record<string, unknown>> = () => {
  return (
    <Carousel
      autoPlay
      axis={"horizontal"}
      infiniteLoop={true}
      showThumbs={false}
      showArrows={false}
    >
      {
        CarouselConfig.map(src => {
          return (
            <Image
            aria-label="carousel"
            layout="responsive"
            width={400}
            height={250}
            src={src}
            priority={true}
          />
          );
        })
      }
    </Carousel>
  );
};

export default BonusCarousel;
