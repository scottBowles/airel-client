import { KitQLClient } from '@kitql/client';
import { API_PATH, CACHE_MS } from '$lib/config/settings';

export type AppHeaders = {
	Authorization?: `JWT ${string}`;
};

export const kitQLClient = new KitQLClient<AppHeaders>({
	url: API_PATH,
	headersContentType: 'application/json',
	logType: ['client', 'server', 'operationAndvariables'],
	cacheMs: CACHE_MS
});
