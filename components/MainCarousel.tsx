"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const itemImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "watch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "purse" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "frier" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
];

const MainCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showArrows={false}
        showStatus={false}
      >
        {itemImages.map((img, i) => (
          <Image
            src={img.imgUrl}
            alt={img.alt}
            width={484}
            height={484}
            className="object-contain "
            key={img.imgUrl}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default MainCarousel;
