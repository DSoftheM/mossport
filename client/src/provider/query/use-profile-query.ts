import { useQuery } from "react-query";
import { apiProvider } from "../api-provider";

export function useProfileQuery() {
    return useQuery({
        queryKey: "profile",
        queryFn: () => apiProvider.auth.getProfile(),
        staleTime: Infinity,
        cacheTime: Infinity,
    });
}
