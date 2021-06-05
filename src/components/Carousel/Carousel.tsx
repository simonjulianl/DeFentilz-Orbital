import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";
import Image from "next/image";

const BonusCarousel: React.FC<{}> = () => {
  return (
    <Carousel
      autoPlay
      axis={"horizontal"}
      infiniteLoop={true}
      showThumbs={false}
      showArrows={false}
    >
      <Image
        layout="responsive"
        width={400}
        height={250}
        src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg"
        priority={true}
      />
      <Image
        layout="responsive"
        width={400}
        height={250}
        src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg"
        priority={true}
      />
      <Image
        layout="responsive"
        width={400}
        height={250}
        src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg"
        priority={true}
      />
      <Image
        layout="responsive"
        width={400}
        height={250}
        src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg"
        priority={true}
      />
    </Carousel>
  );
};

export default BonusCarousel;
