import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../userService"


const useFetchUser=()=>{
    return useQuery({
        queryKey:["user"],
        queryFn:fetchUser
    })
}
export default useFetchUser