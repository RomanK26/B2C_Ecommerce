import { Cross, X } from "lucide-react";
import React from "react";

const ProductPreview = ({ images }) => {
  console.log("images", images);
  return (
    <div className="bg-accent size-36 border p-1">
      <div className="group relative">
        {images?.map((image, idx) => (
          <>
            <img
              key={idx}
              src={`${import.meta.env.VITE_API_URL}/${image.image}`}
              alt={`preview-${idx}`}
              className="object-contain"
            />
            <X className="absolute top-1 right-1 hidden group-hover:block"></X>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductPreview;
