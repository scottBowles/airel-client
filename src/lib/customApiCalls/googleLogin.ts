import api from './api';

type GoogleLoginResponse = {
	data: {
		googleLogin: {
			success: boolean;
			errors: string[];
			user: { email: string };
			token: { token: string; payload: { origIat: string; exp: number; username: string } };
			refreshToken: {
				token: string;
				created: string;
				revoked: string;
				expiresAt: string;
				isExpired: boolean;
			};
		};
	};
};

const googleLogin = async (credential: string) => {
	const backendResponse = await api({
		payload: {
			query: `
            mutation GoogleLogin($google_token: String!) {
                googleLogin(googleToken: $google_token) {
                    success
                    errors
                    user {
                        email
                    }
                    token {
                        token
                        payload {
                            origIat
                            exp
                            username
                        }
                    }
                    refreshToken {
                        token
                        created
                        revoked
                        expiresAt
                        isExpired
                    }
                }
            }
        `,
			variables: { google_token: credential }
		}
	});
	const json = (await backendResponse.json()) as GoogleLoginResponse;
	return json.data.googleLogin;
};

export default googleLogin;
