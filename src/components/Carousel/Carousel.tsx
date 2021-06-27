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
        aria-label="carousel"
        layout="responsive"
        width={400}
        height={250}
        src="https://bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com/default_image_facility.jpeg"
        priority={true}
      />
      <Image
        aria-label="carousel"
        layout="responsive"
        width={400}
        height={250}
        src="https://bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com/default_image_facility.jpeg"
        priority={true}
      />
    </Carousel>
  );
};

export default BonusCarousel;
