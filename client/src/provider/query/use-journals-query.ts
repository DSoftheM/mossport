import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiProvider } from "../api-provider";
import { Journal } from "../../components/main-page/journals/types";

enum JournalQueryKey {
    GetAllJournals = "GetAllJournals",
}

export function useGetJournalsQuery() {
    return useQuery({
        queryKey: [JournalQueryKey.GetAllJournals],
        queryFn: () =>
            apiProvider.journals.getAll().then((journals) => {
                journals.forEach((j) => {
                    j.startDate = new Date(j.startDate);
                    j.generalInformation.sportsmen.forEach((s) => {
                        s.birthDate = new Date(s.birthDate);
                        s.medicalExamination.first = new Date(s.medicalExamination.first);
                        s.medicalExamination.second = new Date(s.medicalExamination.second);
                    });
                    return j;
                });
                return journals;
            }),
    });
}

export function useCreateJournalMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (journal: Journal) => apiProvider.journals.create(journal),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [JournalQueryKey.GetAllJournals],
            });
        },
    });
}

export function useEditJournalMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (journal: Journal) => apiProvider.journals.edit(journal),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [JournalQueryKey.GetAllJournals],
            });
        },
    });
}
