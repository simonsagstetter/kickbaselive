import { get, set, del } from "idb-keyval";

export function createIDBPersister(idbValidKey = "reactQuery") {
    return {
        persistClient: async (client) => {
            await set(idbValidKey, client);
        },
        restoreClient: async () => {
            return await get(idbValidKey);
        },
        removeClient: async () => {
            await del(idbValidKey);
        },
    };
}
