import React, { useRef } from 'react';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';

const HomeSectionCarosel = ({ data, sectionName }) => {
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 6},
  };

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev(); // USE THIS
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext(); // USE THIS
    }
  };

  const items = data.map((item, index) => (
    <div key={index} className="flex justify-center mx-4">
      <HomeSectionCard
        name={item.name}
        description={item.description}
        image={item.image}
        category={sectionName.toLowerCase()}
      />
    </div>
  ));

  return (
    <div className="relative px-4 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-800 py-4 capitalize">{sectionName}</h2>
      <div className="relative p-5 border-2">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          infinite
        />
        {/* Right Button */}
        <Button
          variant="contained"
          className="z-50 bg-white"
          onClick={slideNext}
          sx={{
            position: 'absolute',
            top: "7rem",
            right: "0rem",
            transform: "translateX(50%) rotate(90deg)",
            bgcolor: "white",
          }}
          aria-label="next"
        >
          <KeyboardArrowLeftIcon sx={{ transform: "rotate(+90deg)", color: 'black' }} />
        </Button>

        {/* Left Button */}
        <Button
          variant="contained"
          className="z-50 bg-white"
          onClick={slidePrev}
          sx={{
            position: 'absolute',
            top: "7rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(90deg)",
            bgcolor: "white",
          }}
          aria-label="prev"
        >
          <KeyboardArrowLeftIcon sx={{ transform: "rotate(-90deg)", color: 'black' }} />
        </Button>
      </div>
    </div>
  );
};

export default HomeSectionCarosel;
