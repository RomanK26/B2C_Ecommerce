import useProducts, {
  useProductDetail,
} from "@/features/products/hooks/useProducts";
import React, { useState } from "react";
import { useNavigate, useParams,  } from "react-router";
import shoes from "/shoes.avif";
import shoes2 from "/shoes2.avif";
import QuantityStepper from "@/components/QuantityStepper";
import {  ShoppingCartIcon } from "lucide-react";
import ProductImageGallery from "@/features/products/components/ProductGallery";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const {isAuthenticated} = useSelector((state) => state.auth);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error,isSuccess } = useProductDetail(Number(id));
  const { mutate, isPending } = useAddToCart();
//   console.log(data);

  const handleAddcart = () => {
    console.log("isAuthenticated", isAuthenticated);
    if (!isAuthenticated) {
      navigate("/login/");
      return;
    }
    mutate({ product: id, quantity: quantity });
    if(isSuccess){
       
        setQuantity(1)
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>Failed to load product.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      {/* Product Header */}
      <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-md md:flex-row">
        {/* Images */}
        {/* <div className="flex-1">
          {
          data.images && data.images.length > 0 ? (
            <img
              src={data.images[0].url}
              alt={data.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
              <span>No Image</span>
            </div>
          )}
        </div> */}
        <div className="flex-1">
          {/* <img src={shoes} alt="" />
           */}
          <ProductImageGallery images={[shoes, shoes2, shoes, shoes]} />
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold">{data.data.name}</h1>
            {/* <p className="text-gray-600 mb-4">{data.data.category}</p> */}
            <p className="text-gray-800">{data.data.description}</p>
            <div className="flex justify-between">
              <p className="mb-4 text-2xl font-semibold">${data.data.price}</p>
              <p className="text-bold h-6 rounded-md bg-green-500 px-2 text-center text-white">
                In-Stock
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="text-center">
              <p className="font-semibold">Qty.</p>
              <QuantityStepper quantity={quantity} setQuantity={setQuantity} />
            </div>
            <button
              onClick={handleAddcart}
              disabled={isPending}
              className="mt-6 flex flex-col items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-black transition hover:cursor-pointer hover:bg-amber-600"
            >
              <ShoppingCartIcon></ShoppingCartIcon>
              <p>Add to Cart</p>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {/* {data.reviews && data.reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {data.reviews.map((review: any, idx: number) => (
              <div key={idx} className="p-4 bg-white rounded-lg shadow-sm">
                <p className="font-semibold">{review.user}</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductDetail;
