import React from "react";
import { mainCarouselData } from "./MainCaroselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCarosel = () => {
  const items = mainCarouselData.map((item, index) => (
    <img
      key={index}
      className="w-screen h-[300px] object-cover cursor-pointer -z-10"
      role="presentation"
      src={item.image}
      alt={`Slide ${index + 1}`}
    />
  ));

  return (
    <div className="relative">
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={1000} // Slide changes every 3 seconds
        infinite
        disableButtonsControls
      />
   
      
    </div>
  );
};

export default MainCarosel;
