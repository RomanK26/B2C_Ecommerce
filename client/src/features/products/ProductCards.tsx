import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function ProductCards({ product }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDetail = () => navigate(`/products/${product.id}/`);

  return (
    <Card
      className="group/zoom group/detail cursor-pointer bg-white pt-2 shadow-md transition-all duration-300 hover:shadow-lg"
      onClick={handleDetail}
    >
      {/* Image */}
      <CardHeader className="mt-0 px-2">
        <div className="relative aspect-[5/4] w-full overflow-hidden transition-transform duration-200 group-hover/zoom:scale-102 md:aspect-[4/3]">
          <img
            src={`${import.meta.env.VITE_API_URL}${product.images?.[0]?.image}`}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          <Button className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 bg-transparent group-hover/detail:block hover:cursor-pointer hover:bg-gray-800 hover:text-white">
            Click for details
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-lg font-semibold capitalize">
            {product.name}
          </CardTitle>
          <span
            className={`rounded-md px-2 py-0.5 text-sm font-light text-white ${
              product.in_stock ? "bg-green-400" : "bg-red-500"
            }`}
          >
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          Price:
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation(); // prevents triggering navigate
              console.log("Add to cart clicked");
            }}
          >
            <ShoppingCart size={16} />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCards;
