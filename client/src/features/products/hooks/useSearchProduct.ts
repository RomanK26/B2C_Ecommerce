import { useQuery } from "@tanstack/react-query"
import { searchProducts } from "../services/productService"

export const useSearchProduct = (query)=>{
    return useQuery({
        queryKey:["search",query],
        queryFn:()=>searchProducts(query),
        enabled: !!query,

    })
}