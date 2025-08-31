import { CircleChevronLeft, CircleChevronRight, MoveRight, MoveRightIcon } from "lucide-react";
import React, { useState } from "react";

const ProductImageGallery = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const handleNextImage = (e)=>{
    setMainImage(images[1])
  }

  return (
    <div className="mx-auto max-w-md">
      {/* Main Image */}
      <div className="group relative mb-4 h-80 w-full overflow-hidden rounded-lg border">
        <img
          //   src={mainImage}
          src={images[0]}
          alt="Product"
          className="repeat-0 h-full w-full object-contain"
        />
        <div className="absolute top-1/2 right-1/20 hidden transition-all duration-800 ease-in-out group-hover:block">
          <CircleChevronRight></CircleChevronRight>
        </div>
        <div className="absolute top-1/2 left-1/20 hidden transition-all duration-800 ease-in-out group-hover:block">
          <CircleChevronLeft onClick={handleNextImage}></CircleChevronLeft>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`h-20 w-20 cursor-pointer overflow-hidden rounded-lg border ${
              mainImage === img ? "ring-2 ring-amber-500" : ""
            }`}
            onClick={() => setMainImage(img)}
          >
            <img
              src={img}
              alt={`Thumb ${idx}`}
              className="repeat-0 h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
