import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { productList } from "./schemas/productSchema";
import { Navigate, useNavigate } from "react-router";

function ProductCards({ product }) {
  const navigate = useNavigate()
  const handleDetail = () => {
    console.log('clicked')
    navigate(`products/${product.id}/`)
  };
  return (
    <Card
      className="hover: cursor-pointer rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
      onClick={handleDetail}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-t-2xl object-cover"
            loading="lazy"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-2 p-4">
        <CardTitle className="line-clamp-1 text-lg font-semibold">
          <div>{product.name}</div>
          <div
            className={`${product.in_stock ? "bg-green-400" : "bg-red-400"}`}
          >
            {product.in_stock && "In Stock"}
          </div>
        </CardTitle>
        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
          <Button
            size="sm"
            // onClick={() => onAddToCart(product)}
            className="flex items-center gap-2"
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
