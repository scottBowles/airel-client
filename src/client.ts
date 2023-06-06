import { HoudiniClient, type ClientPlugin } from '$houdini';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public';
import jwt_decode from 'jwt-decode';
import refreshAuthToken from '$lib/customApiCalls/refreshAuthToken';

export const authRefreshPlugin: ClientPlugin = () => {
	return {
		async network(ctx, { next }) {
			const { token, refresh_token } = ctx.session ?? {};
			if (ctx.session && token && refresh_token) {
				const decodedJon = jwt_decode(token) as { payload: string };
				const decoded = JSON.parse(decodedJon.payload) as {
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
					const res = await refreshAuthToken(refresh_token);
					if (res.success) {
						ctx.session.token = res.token.token;
						ctx.session.refresh_token = res.refreshToken.token;
						ctx.session.user = res.token.payload.username;
						if (!ctx.fetchParams) ctx.fetchParams = {};
						ctx.fetchParams.headers = {
							Authorization: `JWT ${res.token.token}`
						};
					} else {
						ctx.session.user = undefined;
					}
				}
			}
			next(ctx);
		}
	};
};

export default new HoudiniClient({
	url: PUBLIC_GRAPHQL_URL,
	plugins: [authRefreshPlugin],
	fetchParams({ session }) {
		return {
			headers: {
				Authorization: `JWT ${session?.token}`
			}
		};
	}
});
