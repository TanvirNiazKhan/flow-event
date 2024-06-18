import React, { useState } from "react";

const ThumbnailCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-full">
      <div className="relative h-6/12">
        <button
          onClick={goToPrevSlide}
          className="absolute inset-y-0 left-0 z-0 bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 flex items-center justify-center w-10 h-full focus:outline-none"
        >
          &lt;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-80 object-cover"
        />
        <button
          onClick={goToNextSlide}
          className="absolute inset-y-0 right-0 z-0 bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 flex items-center justify-center w-10 h-full focus:outline-none"
        >
          &gt;
        </button>
      </div>
      <div className="flex justify-center mt-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-9 h-9 mx-1 cursor-pointer border-2 border-transparent ${
              index === currentIndex ? "border-blue-500" : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
