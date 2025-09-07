import { SearchContext } from "@/app/AppLayout";
import useProducts from "@/features/products/hooks/useFetchAllProducts";
import { useSearchProduct } from "@/features/products/hooks/useSearchProduct";
import ProductCards from "@/features/products/ProductCards";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { data, isLoading } = useProducts();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { query, setQuery, setSearchParams, searchParams } =
    useContext(SearchContext);
  console.log(searchParams.get("q"));
  const { data: searchProduct } = useSearchProduct(query);
  console.log("search", searchProduct?.data);

  if (isLoading) {
    return <div>Loading......</div>;
  }
  return (
    <div className="w-full flex-1 px-12 py-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {searchProduct && searchProduct.data.length > 0
          ? searchProduct.data.map((product, index) => (
              <ProductCards
                product={product}
                key={`${index}_${product.name}`}
              />
            ))
          : data && data.data.length > 0
            ? data.data.map((product, index) => (
                <ProductCards
                  product={product}
                  key={`${index}_${product.name}`}
                />
              ))
            : "No products found"}
      </div>
    </div>
  );
};

export default Home;
