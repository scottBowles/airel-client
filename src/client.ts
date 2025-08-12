import { PUBLIC_GRAPHQL_URL, PUBLIC_SVELTEKIT_APP_ORIGIN } from '$env/static/public';
import { HoudiniClient, type ClientPlugin } from '$houdini';
import { jwtDecode } from 'jwt-decode';

export const authRefreshPlugin: ClientPlugin = () => {
	return {
		async network(ctx, { next }) {
			const { token, refresh_token } = ctx.session ?? {};
			if (ctx.session && token && refresh_token) {
				const decodedJwt = jwtDecode(token) as { payload: string };
				const decoded = JSON.parse(decodedJwt.payload) as {
					exp: string;
					origIat: string;
					username: string;
				};
				const buffer = 15 * 1000;
				const now = new Date().valueOf();
				const exp = new Date(decoded.exp).valueOf() - buffer;
				const shouldRefresh = exp < now;

				if (shouldRefresh) {
					const formData = new FormData();
					formData.append('refresh_token', refresh_token);
					const res = await globalThis.fetch(
						`${PUBLIC_SVELTEKIT_APP_ORIGIN}/endpoints/refresh_token`,
						{
							method: 'POST',
							credentials: 'include',
							body: formData
						}
					);

					if (res?.ok) {
						const body = await res.json();
						const { token, refresh_token, user } = body;
						ctx.session.token = token;
						ctx.session.refresh_token = refresh_token;
						ctx.session.user = user;
						if (!ctx.fetchParams) ctx.fetchParams = {};
						ctx.fetchParams.headers = {
							Authorization: `JWT ${token}`
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
