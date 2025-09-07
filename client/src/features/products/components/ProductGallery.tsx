import React, { useState } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

type ProductImage = {
  id: number;
  image: string;
};

interface ProductImageGalleryProps {
  images: ProductImage[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mainImage = images[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mx-auto max-w-md">
      {/* Main Image */}
      <div className="group relative mb-4 h-80 w-full overflow-hidden rounded-lg border">
        <img
          src={`${import.meta.env.VITE_API_URL}${mainImage.image}`}
          alt="Product"
          className="h-full w-full object-cover"
        />

        {/* Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 hidden rounded-full bg-white/70 p-1 shadow group-hover:block"
            >
              <CircleChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 hidden rounded-full bg-white/70 p-1 shadow group-hover:block"
            >
              <CircleChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-3">
        {images.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-20 w-20 cursor-pointer overflow-hidden rounded-lg border ${
              currentIndex === idx ? "ring-2 ring-amber-500" : ""
            }`}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}${img.image}`}
              alt={`Thumbnail ${idx}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;