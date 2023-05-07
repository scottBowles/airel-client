/**
 * Logout endpoint
 */
export async function POST(event) {
	// logout by clearing the cookie
	event.cookies.set('token', '', {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 0
	});
	event.cookies.set('refresh_token', '', {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 0
	});

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
