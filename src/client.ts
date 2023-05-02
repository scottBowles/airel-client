import jwt_decode from 'jwt-decode';
import { HoudiniClient } from '$houdini';
import refreshAuthToken from '$lib/customApiCalls/refreshAuthToken';

export default new HoudiniClient({
	url: 'http://127.0.0.1:8000/graphql/',

	// uncomment this to configure the network call (for things like authentication)
	// for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
	fetchParams({ session }) {
		// if we have a token, check if it's expired and refresh it if it is
		if (session?.token && session?.refresh_token) {
			const decodedJson = jwt_decode(session.token) as { payload: string };
			const decoded = JSON.parse(decodedJson.payload) as {
				exp: string;
				origIat: string;
				username: string;
			};
			const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
			const buffer = 15 * 1000;
			const now = new Date().valueOf();
			const exp = new Date(decoded.exp).valueOf() - timezoneOffset - buffer;
			const shouldRefresh = exp < now;

			if (shouldRefresh) {
				refreshAuthToken(session.refresh_token).then((res) => {
					if (res.success) {
						session.token = res.token.token;
						session.refresh_token = res.refreshToken.token;
						session.user = res.token.payload.username;
					} else {
						session.user = undefined;
					}
				});
			}
		}

		return {
			headers: {
				Authorization: `JWT ${session?.token}`
			}
		};
	}
});
