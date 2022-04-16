import { KitQLClient } from '@kitql/client';
import { API_PATH } from '../config/settings';

export const kitQLClient = new KitQLClient({
	url: API_PATH,
	headersContentType: 'application/json',
	logType: ['client', 'server', 'operationAndvariables']
});
// export const kitQLClient = new KitQLClient({
// 	url: `https://countries.trevorblades.com/graphql`,
// 	headersContentType: 'application/json',
// 	logType: ['client', 'server', 'operationAndvariables'],
// 	endpointSSRDelayMs: 1000,
// 	endpointNetworkDelayMs: 2000
// });
