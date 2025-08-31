import useProducts from "@/features/products/hooks/useProducts";
import ProductCards from "@/features/products/ProductCards";
import React from "react";

const Home = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <div>Loading......</div>;
  }
  return (
    <div className="w-full bg-amber-100 px-12 py-6">
 
      <div className="grid grid-cols-6 gap-5">
        {data &&
          data.data.map((product, index) => (
            <ProductCards product={product} key={`${index}_${product.name}`} />
          ))}
      </div>
    </div>
  );
};

export default Home;
