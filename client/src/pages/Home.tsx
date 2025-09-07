import useProducts from "@/features/products/hooks/useFetchAllProducts";
import ProductCards from "@/features/products/ProductCards";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
  const { data, isLoading } = useProducts();
  console.log("datas", data);

  if (isLoading) {
    return <div>Loading......</div>;
  }
  return (
    <div className="w-full bg-amber-100 px-12 py-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.data.lenght>0 ?
          data.data.map((product, index) => (
            <ProductCards product={product} key={`${index}_${product.name}`} />
          )):"No products found"}
      </div>

    </div>
  );
};

export default Home;
