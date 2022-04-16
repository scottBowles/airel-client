import { KitQLClient } from '@kitql/client';
import settings from '$lib/settings';

export type AppHeaders = {
	Authorization?: `JWT ${string}`;
};

export const kitQLClient = new KitQLClient<AppHeaders>({
	url: settings.API_PATH,
	headersContentType: 'application/json',
	logType: ['client', 'server', 'operationAndvariables'],
	cacheMs: settings.CACHE_MS
});
