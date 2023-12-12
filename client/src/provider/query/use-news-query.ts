import { useQuery } from "react-query";
import { apiProvider } from "../api-provider";

export function useNewsQuery() {
    return useQuery({
        queryKey: "news",
        queryFn: () => apiProvider.news.getNews(),
        enabled: false,
    });
}
