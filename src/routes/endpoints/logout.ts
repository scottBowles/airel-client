export async function post(request) {
	console.log('running lougout endpoint with', { request });
	return {
		headers: {
			'set-cookie': 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
		},
		body: {
			ok: true
		}
	};
}
