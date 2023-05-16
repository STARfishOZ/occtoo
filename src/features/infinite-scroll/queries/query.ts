import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { getPictures } from '../api/api';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getPicsListInfiniteQuery = (limit: number): UseInfiniteQueryResult => useInfiniteQuery({
    queryKey: ['pictures'],
    queryFn: ({ pageParam = 1 }) => getPictures(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => lastPage.length === limit ? allPages.length + 1 : undefined,
})