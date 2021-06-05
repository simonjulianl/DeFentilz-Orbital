import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";

const BonusCarousel: React.FC<{}> = () => {
  return (
    <Carousel
      autoPlay
      axis={"horizontal"}
      infiniteLoop={true}
      showThumbs={false}
      showArrows={false}
    >
      <div>
        <img
          width="200px"
          height="100px"
          src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg"
        />
      </div>
      <div>
        <img
          width="200px"
          height="100px"
          alt=""
          src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg"
        />
      </div>
      <div>
        <img
          width="200px"
          height="100px"
          alt=""
          src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg"
        />
      </div>
      <div>
        <img
          width="200px"
          height="100px"
          alt=""
          src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg"
        />
      </div>
    </Carousel>
  );
};

export default BonusCarousel;
