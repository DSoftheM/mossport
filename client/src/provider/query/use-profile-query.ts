import { useMutation, useQuery } from "react-query";
import { apiProvider } from "../api-provider";

export function useProfileQuery() {
    return useQuery({
        queryKey: "profile",
        queryFn: () => apiProvider.auth.getProfile(),
        staleTime: Infinity,
        cacheTime: Infinity,
    });
}

export function useChangePasswordMutation() {
    return useMutation({
        mutationFn: (newPassword: string) => apiProvider.auth.changePassword(newPassword),
        onSuccess: () => {
            // queryClient.invalidateQueries({
            //     queryKey: [JournalQueryKey.GetAllJournals],
            // });
        },
    });
}
