import api from './api';
import type { JwtPayload } from '$lib/types';

const refreshAuthToken = async (refresh_token: string) => {
	const refreshResponse = await api({
		payload: {
			query: `
			mutation RefreshToken($refresh_token: String!, $revoke_refresh_token: Boolean!) {
				refreshToken(input: { refreshToken: $refresh_token, revokeRefreshToken: $revoke_refresh_token }) {
					success
					errors
					token {
						payload {
							origIat
							exp
							username
						}
						token
					}
					refreshToken {
						token
						created
						revoked
					}
				}
			}
			`,
			variables: { refresh_token, revoke_refresh_token: true }
		}
	});
	const json = (await refreshResponse.json()) as {
		data: {
			refreshToken: {
				success: boolean;
				errors: string[];
				token: { token: string; payload: JwtPayload };
				refreshToken: { token: string; created: string; revoked: string };
			};
		};
	};

	return json.data.refreshToken;
};

export default refreshAuthToken;
