import { QueryClient } from "@tanstack/react-query";
import { createIDBPersister } from "./persister";

export const BUSTER = "KBLIVE_TQUERY_1_0_3";
const CACHE_KEY = "KBLIVE_TQUERY";

/**
 * Query Client Object
 * @constant
 * @description staleTime 60 min / gcTime 24h
 *
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 60,
            gcTime: 1000 * 60 * 60 * 24,
        },
    },
});

export const indexDBPersister = createIDBPersister(CACHE_KEY);
export const liveRefetchInterval = 10000;
